import time
from datetime import datetime, timedelta

from cashflow.celery import app
from django.utils import timezone
from django.db.models.functions import TruncMonth
from django.db.models import F, Sum, Case, When, Count
from django.db import transaction

from psqlextra.query import ConflictAction

from api.models import User, Credit, Account, Transactions
from api.ml_model.models import tran_credit
from api.endpoints import save_account
from api.connect import Mono
from api.util.initialize import Mono_Serilizers

@app.task()
def all_account():
    users = User.objects.all()
    for user in users:
        if user.id != 11:
            get_transaction(user.id)

    return

def condition(clause, field):
    value = F('transactions__amount') if field else 1
    return Sum(Case(When(transactions__tran_type=clause, then=value), default=0))

@app.task()
def get_transaction(user_id, start = timezone.make_aware(timezone.datetime.min, timezone.get_default_timezone()), acccount_id = 0):
    tran_set = User.objects.get(id = user_id).account_set.prefetch_related('transaction')\
        .filter(transactions__created_at__gte = start)\
        .annotate(month = TruncMonth('transactions__tran_date'))
    if acccount_id:
        tran_set = tran_set.filter(id = acccount_id)
    if tran_set.count() < 1:
        return
    tran_set = tran_set.values('month', 'user_id', bank_account_id = F('id')).annotate(
        inflow = condition(True, True),
        outflow = condition(False, True),
        cr_vol = condition(True, False),
        dr_vol = condition(False, False),
        tranx_vol = Count(F('transactions__id'))
    ).order_by('bank_account_id')

    credit = tran_credit(tran_set)

    saved = Credit.objects\
        .on_conflict(('bank_account', 'month'), ConflictAction.UPDATE)\
            .bulk_insert(credit)

    return saved[-1]

@app.task()
def process_webhook(payload):
    event = payload.get('event')
    if event == 'mono.events.account_updated':
        return account_updated(payload['data'])
    elif event == 'mono.events.account_reauthorized':
        return account_reauthorized(payload['data'])

def account_reauthorized(reauth_data):
    account_id = reauth_data['data']['account']['_id']
    Account.objects.filter(account_id = account_id).update(re_auth = False, re_auth_code = None)
    Mono.account(account_id)

def transactions_are_available(account_data):
    meta = account_data.get('meta') or {}
    status = str(meta.get('data_status', '')).upper()
    retrieved_data = meta.get('retrieved_data') or []
    return status == 'AVAILABLE' or (
        status == 'PARTIAL' and 'transactions' in retrieved_data
    )

def account_updated(account_data):
    account_info = account_data.get('account') or {}
    id = account_info.get('_id') or account_info.get('id')
    if not id:
        return 'account id missing from webhook'

    i = 0
    while (not Account.objects.filter(account_id = id).exists()) and i <= 30:
        time.sleep(1)
        i += 1

    if i > 30:
        Mono.unlink(id)
        message = f'waited too long {id} not in database'
        return message

    accounts = Account.objects.filter(account_id = id)
    updated_accounts = []
    for account in accounts:
        current_account_data = {**account_data, 'instance': account.id}
        if transactions_are_available(account_data):
            save_transactions.delay(account.user.id, **current_account_data)
        else:
            save_account(account.user.id, **current_account_data)
        updated_accounts.append(str(account))

    return updated_accounts

@app.task(bind=True, max_retries=20)
def save_transactions(self, user_id, **mono_account):
    with transaction.atomic():
        account_id = mono_account.get('account', {}).get('_id')
        instance_id = mono_account.get('instance')
        if instance_id:
            account = Account.objects.get(id=instance_id)
            account_data = Mono.account(account.account_id)
            account_data['instance'] = account.id
        elif account_id:
            account_data = Mono.account(account_id)
        else:
            raise ValueError('Mono account ID is required to save transactions')

        if not transactions_are_available(account_data):
            raise self.retry(
                exc=RuntimeError('Mono account transactions are still processing'),
                countdown=30,
            )

        data, account = save_account(user_id, **account_data)

        try:
            start = Transactions.objects.filter(account = account.id).latest().tran_date.strftime('%d-%m-%Y')
        except Transactions.DoesNotExist:
            start = ''

        trans_info = Mono.transactions(account.account_id, start)
        if not trans_info.get('data'):
            raise self.retry(
                exc=RuntimeError('Mono returned no transactions yet'),
                countdown=30,
            )
        trans_info['account_data'] = account
        trans_info['user'] = user_id
        return_tran = Mono_Serilizers.get(mono_transaction = trans_info)
        if return_tran:
            first_date = return_tran.tran_date
            if start == '':
                if return_tran.tran_type:
                    account.initial_balance = return_tran.balance - return_tran.amount
                else:
                    account.initial_balance = return_tran.balance + return_tran.amount
                account.save()
            get_transaction.delay(user_id, first_date, account.id)
        return data
