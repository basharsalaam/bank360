from datetime import datetime
from itertools import count

from api.serilizers import AccountSerializer
from api.models import Account, Category, Transactions
from api.util.enums import AccountStatus
from api.apps import category_model, channel_model
from api.util.constants import channels, categories
from api.ml_model.models import tran_classification

class Mono_Serilizers:

    __suported_keys = ('mono_account', 'mono_transaction')

    @staticmethod
    def mono_account(info):
        mono_meta = info['meta']
        mono_account = info['account']
        mono_bank = mono_account['institution']
        account_instance_id = info.pop('instance', None)
        account_instance = None if not account_instance_id else Account.objects.get(id = account_instance_id)
        serializer = AccountSerializer(instance=account_instance, data={
            'account_id' : mono_account['_id'],
            'user' : info['user_id'],
            'account_no' : mono_account['accountNumber'],
            'name' : mono_account['name'],
            'acc_type' : mono_account['type'],
            'balance' : mono_account['balance'],
            'currency' : mono_account['currency'],
            'bank_name' : mono_bank['name'],
            'institution_type' : mono_bank.pop('type', None),
            're_auth' : False,
            'status' : AccountStatus(mono_meta['data_status']),
            'auth_method' : True if mono_meta['auth_method'] == 'internet_banking' else False
        })

        if serializer.is_valid(raise_exception=True):
            account = serializer.save()

        return (serializer.data, account)

    @staticmethod
    def mono_transaction(trans_info):

        data = trans_info['data']
        narrations = [value['narration'] for value in data]
        channel_result = tran_classification(narrations, channel_model, channels)
        category_result = tran_classification(narrations, category_model, categories)

        category_list = Category.objects.filter(user=trans_info['user'])
        category_list = {category.category : category for category in category_list}
        tran_list = []
        for line, chan, cat, i in zip(data, channel_result, category_result, count(-1)):

            balance = line['balance']
            if balance is None:
                if i < 0:
                    balance = trans_info['account_data'].balance
                else:
                    if tran_list[i].tran_type:
                        balance = tran_list[i].balance - tran_list[i].amount
                    else:
                        balance = tran_list[i].balance + tran_list[i].amount

            transaction = Transactions(
                uuid = line['_id'],
                account = trans_info['account_data'],
                tran_type = True if line['type'] == 'credit' else False,
                amount = line['amount'],
                balance = balance,
                auto_category = None if not 'category' in line.keys() else line['category'],
                category = category_list[cat],
                channels = chan,
                narration = line['narration'],
                tran_date = datetime.strptime(line['date'], '%Y-%m-%dT%H:%M:%S.%f%z')
            )

            tran_list.append(transaction)

        print(tran_list)

        Transactions.objects.bulk_create(tran_list, 1000, ignore_conflicts=True)

        first_tran = None if not data else tran_list[-1]
        return first_tran

    @staticmethod
    def get(**kwargs):
        if len(kwargs) != 1:
            raise ValueError(f'1 arguments expected got { len(kwargs) }')
        key = list(kwargs.keys())[0]
        if key not in Mono_Serilizers.__suported_keys:
            raise ValueError(f'unknown type {key}')
        return getattr(Mono_Serilizers, key)(kwargs[key])