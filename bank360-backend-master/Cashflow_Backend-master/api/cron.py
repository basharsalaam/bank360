from datetime import date

from api.models import User, Transactions
from api.filter import TransactionFilter
from api.util.misc import date_split
from api.endpoints import compare_result_list

def weekly_note():
    users = User.objects.all()

    params = {'date': date.today().strftime('%Y,%m,%d'), 'duration': 7, 'size': 1, 'currency' : 'ngn'}

    kwargs = {'type': 'compare'}

    before, after , conditions = date_split(params, kwargs)

    params['tran_date_before'] = before
    params['tran_date_after'] = after

    for user in users:
        queryset = Transactions.objects.prefetch_related('account', 'user').filter(account__user = user)
        filter_set = TransactionFilter(params, queryset).qs
        print(compare_result_list(conditions, filter_set, queryset, params, user))
        print('\n\n')