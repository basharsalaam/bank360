from http.client import PROCESSING
from django.db import models
from django.utils.translation import gettext_lazy as _

class AccountStatus(models.TextChoices):
    AVAILABLE = 'AVAILABLE', _('AVAILABLE')
    PARTIAL = 'PARTIAL', _('PARTIAL')
    UNAVAILABLE = 'UNAVAILABLE', _('UNAVAILABLE')
    PROCESSING = 'PROCESSING', _('PROCESSING')
    FAILED = 'FAILED', _('FAILED')
