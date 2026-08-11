from random import randint
from datetime import date

from django.http import Http404
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.db.models import F, Avg, Sum, When, Case, Value, Window, IntegerField
from django.db.models.functions import Lag, Cast

from rest_framework import viewsets, status, mixins
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound, ParseError
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from api.serilizers import UserSerializer, CategorySerializer, AccountSerializer, TransactionSerializer, CreditSerializer
from api.models import Account, User, Category, Transactions, TimePass, Credit
from api.filter import AccountFilter, TransactionFilter
from api.connect import Mono
from api.endpoints import Mixins, save_account
from api.util.misc import otpcheck, date_split
from api.util.pagination import CustomPageNumberPagination
from api.tasks import save_transactions


# Create your views here.

@api_view(('post', ))
@authentication_classes([])
@permission_classes([])
def get_otp(request):
    auto = lambda : randint(0, 10000)
    if 'email' not in request.data:
        raise ParseError({'email' : ['this field is required']})
    if not TimePass.objects.filter(email = request.data.get('email')).exists():
        otp = TimePass(email = request.data.get('email'), time_pass = auto())
        otp.save()
    else:
        otp = TimePass.objects.get(email = request.data.get('email'))
        otp.time_pass = auto()
        otp.save()
    return Response({'data' : str(otp.time_pass).zfill(4)})

@api_view(('delete', ))
def deleteAccount(request, id):
    get_object_or_404(Account, account_id = id, user = request.user).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(('patch', ))
def editTransaction(request, uuid):
    try:
        transaction = Transactions.objects.get(uuid = uuid, account__user = request.user)
    except:
        raise NotFound('transaction was not found')
    if 'category' in request.data:
        id = int(request.data['category'])
        try:
            category = Category.objects.get(id = id, user = request.user)
        except:
            raise NotFound('category does not exist')
        transaction.category = category
    transaction.save()
    serializer = TransactionSerializer(transaction)
    return Response(serializer.data)

class AnalyticsView(GenericAPIView, mixins.ListModelMixin, Mixins):
    queryset = None
    common_filters = {}
    allowed_options = {}
    pagination_class = CustomPageNumberPagination

    def initial(self, request, *args, **kwargs):
        self.initialize()
        request.GET._mutable = True
        if {'date', 'duration', 'size'} & set(request.query_params):
            before, after, conditions = date_split(request.query_params, kwargs)
            request.query_params['tran_date_before'] = before
            request.query_params['tran_date_after'] = after
            setattr(self, 'conditions', conditions)
        if request.method.lower() not in self.allowed_options:
            self.http_method_not_allowed(request)
        else:
            if kwargs['type'] not in self.allowed_options[request.method.lower()]:
                raise Http404
        super().initial(request, *args, **kwargs)

    def paginate_queryset(self, queryset):
        if self.request.query_params.get('paginate', 'True').lower() == 'false':
            return
        return super().paginate_queryset(queryset)

    def full_list(self, queryset):
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return serializer.data

    def get(self, request, *args, **kwargs):
        output = getattr(self, kwargs['type'])(request, self.get_queryset(), *args, **kwargs)
        return output if isinstance(output, Response) else Response(output)
        
class AccountView(AnalyticsView, mixins.CreateModelMixin):
    queryset = Account.objects.prefetch_related('user')
    serializer_class = AccountSerializer
    filterset_class = AccountFilter
    search_fields = ('account_no', 'account_id', 'name', 'acc_type', 'bank_name', 'institution_type', 'status')
    

    def initialize(self):
        self.allowed_options['post'] = ('new', 'refresh')
        self.allowed_options['get'] = (
            'number_account',
            'balance_account',
            'list_account',
            'currency_account',
            'bank_account'
        )
        self.common_filters.update({'user' : self.request.user})

    def get_queryset(self):
        return super().get_queryset().filter(user = self.request.user)

    def post(self, request, *args, **kwargs):
        if kwargs['type'] == 'new':
            mono_account = Mono.auth(request.data.get('code'))
        elif kwargs.pop('type') == 'refresh': 
            try:
                account = Account.objects.filter(user = request.user).get(account_id = request.data.get('code'))
            except Account.DoesNotExist:
                raise NotFound("The requested account does not exist")
            mono_account = Mono.sync(account)
            mono_account['instance'] = account.id
        else:
            raise NotFound()
        kwargs['mono_account'] = mono_account
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            mono_account = kwargs['mono_account']
            if Account.objects.filter(account_id = mono_account['account']['_id']).exists() and kwargs['type'] == 'new':
                save_transactions.delay(request.user.id, **mono_account)
            data, _ = save_account(request.user.id, **mono_account)
        headers = self.get_success_headers(data)
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)

class TransactionView(AnalyticsView):
    queryset = Transactions.objects.prefetch_related('account', 'category', 'account__user')
    serializer_class = TransactionSerializer
    filterset_class = TransactionFilter
    search_fields = ('narration','uuid','category__category', 'channels', 'account__account_no', 'account__name', 'account__bank_name')

    def initialize(self):
        self.allowed_options['get'] = (
            'number_transaction',
            'channel_transaction',
            'category_transaction',
            'categories_transaction',
            'list_transaction',
            'list_transaction_amount',
            'amount_transaction',
            'compare',
            'channel_graph',
            'category_graph'
        )
        self.common_filters.update({'account__user' : self.request.user})

    def get_queryset(self):
        return super().get_queryset().filter(account__user = self.request.user)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "uuid"
    filter_backends = []

    def get_permissions(self):
        if self.request.method == 'POST':
            return []
        return super().get_permissions()

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        # otpcheck(request.data)
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        if self.get_object() != request.user:
            raise PermissionDenied('You cannot update this user')
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if self.get_object() != request.user:
            raise PermissionDenied("You can not delete this user.")
        return super().destroy(request, *args, **kwargs)

class UserResetviewSet(APIView):
    permission_classes = ()
    queryset = User.objects.all()
    authentication_classes = ()
    serializer_class =  UserSerializer

    def get_object(self, request):
        return get_object_or_404(User, email=request.data.get("email"))

    def post(self, request):
        # otpcheck(request.data)
        required = ('time_pass', 'password')
        for value in required:
            if not request.data.get(value):
                raise ParseError({value :[f"{value} is not provided"]})
        user = self.get_object(request)
        serializer = UserSerializer(user, data=request.data, partial = True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message" : "password sucessfully changed", "detail" : serializer.data})

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    search_fields = ('category')
    # pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def category_permission(self, method):
        if self.get_object().default:
            raise PermissionDenied(f"default category cannot be {method}")

    def edit_request(self):
        data = self.request.data
        if type(data) != dict:
            data._mutable = True
        data['user'] = self.request.user.id
        return data

    def create(self, request, *args, **kwargs):
        data = self.edit_request()
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        data = self.edit_request()
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        self.category_permission('deleted')
        instance = self.get_object()
        instance.transaction_set.update(category=Category.objects.get(user=request.user, category='Others'))
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class CreditView(ListAPIView):
    pagination_class = CustomPageNumberPagination

    serializer_class = CreditSerializer

    def get_queryset(self):

        queryset = Credit.objects.prefetch_related('user').filter(user = self.request.user, month__lte = date.today())\
            .values('month')\
                .annotate(
                    credit_score = Avg(F('score')),
                    cur_val = Cast('credit_score', output_field=IntegerField()),
                    outval = Sum(F('outflow')),
                    inval = Sum(F('inflow')),
                    eligible = Case(When(inval__gt = F('outval'), then=Value('ELIGIBLE FOR LOAN')), default=Value('NOT ELIGIBLE FOR LOAN')),
                    prev_val = Window(
                        expression=Lag('cur_val', offset=1, default=0),
                        order_by=F('month').desc()
                    ),
                    change = Case(
                        When(cur_val__gt = F('prev_val'), then=Value(True)),
                        default=Value(False)
                    )
                )
        return queryset.order_by('-month')