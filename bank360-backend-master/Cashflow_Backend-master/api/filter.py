import re

from django.db.models import Q

from django_filters import rest_framework as filters

from api.models import Account, Transactions

def multiple_filter(queryset, name, value):
    value = value.split(",")
    value = map(lambda choice: re.sub(' +', ' ', choice.strip()) , value)

    def convert(val):
        try:
            result = int(val)
        except ValueError:
            result = val
        return result

    value =  map(convert, value)
    query = Q()
    for val in value:
        query = query | Q(**{name if type(val) == int else f'{name}__iexact' : val})
    queryset = queryset.filter(query)
    return queryset

class AccountFilter(filters.FilterSet):
    bank_name = filters.CharFilter(method=multiple_filter)
    currency = filters.CharFilter(field_name='currency', lookup_expr='iexact')
    account_id = filters.CharFilter(method=multiple_filter)

    class Meta:
        model = Account
        fields = ('currency', 'bank_name', 'account_id')

class TransactionFilter(filters.FilterSet):
    tran_date = filters.IsoDateTimeFromToRangeFilter()
    uuid = filters.UUIDFilter(method=multiple_filter)
    currency = filters.CharFilter(field_name='account__currency', lookup_expr='iexact')
    account_no = filters.CharFilter(field_name='account__account_no')
    account_id = filters.CharFilter(field_name='account__account_id')
    bank_name = filters.CharFilter(field_name='account__bank_name', method=multiple_filter)
    channels = filters.CharFilter(method=multiple_filter)
    category = filters.CharFilter(field_name='category', method=multiple_filter)
    categories = filters.CharFilter(field_name='category__category', method=multiple_filter)


    class Meta:
        model = Transactions
        fields = ('tran_type', )