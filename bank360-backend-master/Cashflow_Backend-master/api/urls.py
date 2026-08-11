from django.urls import path

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from api.views import UserViewSet, UserResetviewSet, CategoryViewSet, AccountView, TransactionView, CreditView, get_otp, deleteAccount, editTransaction
from api.authenticate import TokenObtainView, verify
from api.recieve import mono_webhook

router = DefaultRouter()
router.register('user', UserViewSet, basename='users')
router.register('category', CategoryViewSet, basename='category')

urlpatterns = [
    path('webhooks/', mono_webhook, name='webhooks'),

    path('time_pass/', get_otp, name='time_pass'),

    path('transaction/<str:uuid>/', editTransaction, name='edit_transaction'),
    path('account/<str:id>/', deleteAccount, name='delete_user'),

    path('<str:type>/accounts/', AccountView.as_view(), name='accounts'),
    path('<str:type>/transactions/', TransactionView.as_view(), name='transactions'),
    path('credit/score/', CreditView.as_view(), name='credit_score'),
    
    path('user/reset/', UserResetviewSet.as_view(), name = 'reset_user'),

    path('verify/', verify, name='verify_user'),
    path('token/', TokenObtainView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls