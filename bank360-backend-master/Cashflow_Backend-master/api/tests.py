from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from django.test import SimpleTestCase

from api.connect import Mono
from api.models import Account, Category, Transactions
from api.tasks import account_updated
from api.util.initialize import Mono_Serilizers


class MonoPayloadTests(SimpleTestCase):
    def test_normalizes_current_v2_account_payload(self):
        payload = {
            'status': 'successful',
            'data': {
                'account': {
                    'id': 'account-123',
                    'account_number': '0123456789',
                    'name': 'Test User',
                    'type': 'SAVINGS',
                    'balance': 5000,
                    'currency': 'NGN',
                    'institution': {
                        'name': 'Test Bank',
                        'bank_code': '999',
                        'type': 'PERSONAL_BANKING',
                    },
                },
                'meta': {
                    'data_status': 'available',
                    'auth_method': 'internet_banking',
                },
            },
        }

        normalized = Mono._normalize_account_payload(payload)

        self.assertEqual(normalized['account']['_id'], 'account-123')
        self.assertEqual(normalized['account']['accountNumber'], '0123456789')
        self.assertEqual(normalized['account']['institution']['bankCode'], '999')
        self.assertEqual(normalized['meta']['data_status'], 'AVAILABLE')

    @patch('api.util.initialize.Transactions.objects.bulk_create')
    @patch('api.util.initialize.Category.objects.filter')
    @patch('api.util.initialize.tran_classification')
    def test_ingests_current_v2_transaction_id(
        self, classify, category_filter, bulk_create
    ):
        classify.side_effect = [['Internet Banking'], ['Others']]
        category_filter.return_value = [Category(id=1, category='Others')]
        account = Account(id=7, balance=2000)
        transaction_payload = {
            'data': [
                {
                    'id': 'transaction-123',
                    'type': 'credit',
                    'narration': 'TRANSFER CREDIT',
                    'amount': 500,
                    'balance': 2000,
                    'date': '2026-08-11T10:15:30.000Z',
                    'category': 'transfer',
                }
            ],
            'account_data': account,
            'user': 1,
        }

        result = Mono_Serilizers.mono_transaction(transaction_payload)

        saved_transactions = bulk_create.call_args.args[0]
        self.assertEqual(len(saved_transactions), 1)
        self.assertEqual(saved_transactions[0].uuid, 'transaction-123')
        self.assertEqual(result.uuid, 'transaction-123')

    @patch('api.tasks.save_transactions.delay')
    @patch('api.tasks.Account.objects.filter')
    def test_available_account_webhook_queues_transaction_sync(
        self, account_filter, save_transactions_delay
    ):
        account = SimpleNamespace(id=7, user=SimpleNamespace(id=11))
        queryset = MagicMock()
        queryset.exists.return_value = True
        queryset.__iter__.return_value = iter([account])
        account_filter.return_value = queryset

        result = account_updated({
            'account': {'_id': 'account-123'},
            'meta': {
                'data_status': 'PARTIAL',
                'retrieved_data': ['transactions'],
            },
        })

        save_transactions_delay.assert_called_once()
        self.assertEqual(result, [str(account)])
