import re
from collections import defaultdict
from itertools import count as counter

from django.conf import settings
from django.db.models import Sum, Case, When, Q, Value, Count, Subquery, OuterRef, F

from rest_framework.exceptions import ParseError

from api.models import Account
from api.filter import multiple_filter, TransactionFilter
from api.util import constants
from api.util.initialize import Mono_Serilizers

get_data = lambda queryset : queryset.values_list('time', 'tran_type')\
                                .annotate(count = Count('id'), amount_value = Sum('amount'))

compare_format = lambda : {'now': 0, 'then' : 0, 'diff': 0, 'percent' : 0.0}

spend_format = lambda : {'count': compare_format(), 'amount': compare_format()}

root_format = lambda : {'inflow': spend_format(), 'outflow' : spend_format(), 'balance': compare_format()}

calc_percent = lambda change, old : (0 if not old else change / old) * 100

def save_account(user_id, **mono_account):
    mono_account['user_id'] = user_id
    return Mono_Serilizers.get(mono_account = mono_account)

nested_dict = lambda: defaultdict(nested_dict)

def check_currency(request):
    if 'currency' not in request.query_params:
        raise ParseError('currency not provided')

def time_transaction(conditions, queryset):
    when_values = [When(tran_date__gte = conditions[0], then = Value(0))]

    for i in range(1, len(conditions)):
            when_values.append(When(Q(tran_date__lt = conditions[i-1]) & Q(tran_date__gte = conditions[i]), then = Value(i)))
    return queryset.annotate(time = Case(*when_values))

def account_balance(user, tran_query, query_params = []):

    accounts = Account.objects.filter(user = user)
    for params in query_params:
        if getattr(Account, params, False):
            accounts = multiple_filter(accounts, params, query_params.get(params))

    newest = tran_query.filter(account_id = OuterRef('pk')).values('balance').order_by('-tran_date')[:1]
    accounts = accounts.annotate(latest_tran_balance = Subquery(newest))\
        .annotate(latest_balance = Case(When(Q(latest_tran_balance__isnull = True), then=F('initial_balance')), default=F('latest_tran_balance')))

    return accounts.aggregate(Sum('latest_balance'))['latest_balance__sum']

def aggregate_bal(compare_results):
    compare_results = compare_results[:-1]

    for row, i in zip(compare_results, counter(-1)):
        bal_row = row['balance']
        print(bal_row)
        change_bal = bal_row['diff'] = row['inflow']['amount']['now'] - row['outflow']['amount']['now']

        if i >= 0:
            bal_row['now'] = compare_results[i]['balance']['then']

        prev_bal = bal_row['then'] = bal_row['now'] - change_bal
        bal_row['percent'] = calc_percent(change_bal, prev_bal)

    return compare_results

def get_compare(queryset, cur_bal, total):
    compare_results = [root_format() for _ in range(total)]
    queryset = list(queryset)
    queryset.reverse()

    for time, tran_type, count, amount in queryset:
        tran_type = 'inflow' if tran_type else 'outflow'
        current = compare_results[time][tran_type]
        cur_count = current['count']['now'] = count
        cur_sum = current['amount']['now'] = amount
        if time == 0:
            compare_results[time]['balance']['now'] = cur_bal
        if time < total-1:
            previous = compare_results[time + 1][tran_type]

            prev_count = current['count']['then'] = previous['count']['now']
            prev_sum = current['amount']['then'] = previous['amount']['now']

            change_count = current['count']['diff'] = cur_count - prev_count
            change_sum = current['amount']['diff'] = cur_sum - prev_sum

            current['count']['percent'] = calc_percent(change_count, prev_count)
            current['amount']['percent'] = calc_percent(change_sum, prev_sum)

    return compare_results

def compare_result_list(conditions, filter_set, queryset, query_params, user):
    lean_filter = query_params.copy()
    lean_filter.pop('tran_date_after')
    cur_bal = account_balance(user, TransactionFilter(lean_filter, queryset).qs, query_params)
    queryset = get_data(time_transaction(conditions, filter_set))

    total = len(conditions)

    return aggregate_bal(get_compare(queryset, cur_bal, total))



class Mixins:
    def number_account(self, request, queryset, *arg, **kwargs):
        return {'data' : self.filter_queryset(queryset).count()}

    def number_transaction(self, request, queryset, *arg, **kwargs):
        return {'data' : self.filter_queryset(queryset).count()}

    def currency_account(self, request, queryset, *arg, **kwargs):
        currency = self.queryset.values_list('currency', flat=True).distinct().order_by()
        return {'data' : [constants.currrency[val] for val in currency]}

    def bank_account(self, request, queryset, *arg, **kwargs):
        banks = set(queryset.values_list('bank_name', flat=True))
        return {'data' : [{'name': val, 'logo': request.build_absolute_uri(f"{settings.MEDIA_URL}banks/{re.sub(' +', '-', re.sub(' *bank', '-bank', val.lower()))}-icon.png")} for val in banks]}

    def channel_transaction(self, request, queryset, *arg, **args):
        return {'data' : queryset.values_list('channels', flat=True).distinct().order_by()}

    def category_transaction(self, request, queryset, *arg, **kwargs):
        return {'data' : queryset.values_list('category', flat=True).distinct().order_by()}

    def categories_transaction(self, request, queryset, *arg, **args):
        return {'data' : queryset.values_list('category__category', flat=True).distinct().order_by()}

    def balance_account(self, request, queryset, *arg, **kwargs):
        check_currency(request)
        
        return self.filter_queryset(queryset).aggregate(data = Sum('balance'))

    def amount_transaction(self, request, queryset, *arg, **kwargs):
        check_currency(request)
        return self.filter_queryset(queryset).aggregate(data = Sum('amount'))

    def list_account(self, request, queryset, *arg, **kwargs):
        check_currency(request)
        queryset = self.filter_queryset(queryset)
        return self.full_list(queryset)

    def list_transaction(self, request, queryset, *arg, **kwargs):
        check_currency(request)
        queryset = self.filter_queryset(queryset)
        return self.full_list(queryset)

    def list_transaction_amount(self, request, queryset, *arg, **kwargs):
        check_currency(request)
        queryset = self.filter_queryset(queryset).order_by('-amount')
        return self.full_list(queryset)

    def compare(self, request, queryset, *arg, **kwargs):
        check_currency(request)

        if 'duration' not in request.query_params:
            raise ParseError('duration not provided')

        return compare_result_list(self.conditions, self.filter_queryset(queryset), queryset, request.query_params, request.user)
        
    def channel_graph(self, request, queryset, *arg, **kwargs):
        check_currency(request)
        queryset = self.filter_queryset(queryset)
        return dict(queryset.values_list('channels').annotate(amount = Sum('amount')))

    def category_graph(self, request, queryset, *arg, **kwargs):
        check_currency(request)
        queryset = self.filter_queryset(queryset)
        return dict(queryset.values_list('category__category').annotate(amount = Sum('amount')))