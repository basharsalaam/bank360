from email.policy import default
import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser

from django.core.exceptions import ValidationError

from month.models import MonthField
from psqlextra.models import PostgresModel

from api.util.enums import AccountStatus
from api.connect import Mono

# Create your models here.

class TimePass(models.Model):
    email = models.EmailField(max_length=100, unique=True)
    time_pass = models.PositiveIntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.email}, {self.time_pass}"

class User(AbstractUser):

    def nameFile( instance, filename, type = True):
        return f"{'users' if type else 'org'}/{str(instance.uuid)}_{instance.first_name}.{filename.split('.')[-1]}"

    def file_size(value):
        limit = 1024 * 1024
        if value.size > limit:
            raise ValidationError('image is too large max size allowed is 1MB')

    def delete(self, *args, **kwargs):
        for account in self.account_set.all():
            account.delete()
        super().delete(*args, **kwargs)

    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    username = None
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_no = models.CharField(max_length=20)
    org_name = models.CharField(max_length=100, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    avatar = models.ImageField(upload_to=nameFile, null=True, default='avatar.svg', validators=[file_size])
    #org_email = models.EmailField(max_length=100, null=True)
    #org_image = models.ImageField(null=True, default="company.svg")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def is_online(self):
        pass

class Category(PostgresModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)
    default = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.category

    class Meta:
        constraints = (
            models.UniqueConstraint(fields=['category', 'user'], name='users category'),
        )
        get_latest_by = ('updated_at', 'created_at')
        ordering = ('-updated_at', '-created_at')

class Account(models.Model):
    account_id = models.CharField(max_length=26)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_no = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    acc_type = models.CharField(max_length=30)
    balance = models.BigIntegerField()
    initial_balance = models.BigIntegerField(default=0)
    currency = models.CharField(max_length=5)
    bank_name = models.CharField(max_length=100)
    institution_type = models.CharField(max_length=50, null = True)
    status = models.CharField(max_length=15, choices=AccountStatus.choices, default=AccountStatus.AVAILABLE)
    re_auth = models.BooleanField(default=False)
    re_auth_code = models.CharField(max_length=30, null=True)
    auth_method = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        if Account.objects.filter(account_id =self.account_id).count() == 1:
            Mono.unlink(self.account_id)
        super().delete(*args, **kwargs)

    def authentication_method(self) -> str:
        if self.auth_method:
            return 'mobile_banking'
        return 'internet_banking'

    def __str__(self) -> str:
        return f'{self.account_no}, {self.name}'

    class Meta:
        constraints = (
            models.UniqueConstraint(fields=('account_id', 'user'), name='users account'),
        )
        get_latest_by = ('updated_at', 'created_at')
        ordering = ('-updated_at', '-created_at')

class Transactions(PostgresModel):
    uuid = models.CharField(max_length=26, unique=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    tran_type = models.BooleanField(default=True)
    amount = models.BigIntegerField()
    balance = models.BigIntegerField()
    auto_category = models.CharField(max_length=30, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    channels = models.CharField(max_length=100)
    narration = models.TextField()
    tran_date = models.DateTimeField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def account_info(self):
        return self.account

    def category_info(self):
        return self.category

    def __str__(self):
        return f'{self.uuid}, {self.tran_type}, {self.amount}, {self.tran_date}'

    class Meta:
        get_latest_by = ('tran_date', 'created_at')
        ordering = ('-tran_date', '-created_at')

class Credit(PostgresModel):
    class Meta:
        unique_together = ('bank_account', 'month')
        ordering = ('-month', 'bank_account', 'user')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bank_account = models.ForeignKey(Account, on_delete=models.CASCADE)
    month = MonthField()
    score = models.FloatField()
    inflow = models.BigIntegerField()
    outflow = models.BigIntegerField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)