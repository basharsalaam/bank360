from secrets import compare_digest

from cashflow import settings

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated

from api.tasks import process_webhook

@api_view(('post', ))
@authentication_classes([])
@permission_classes([])
def mono_webhook(request):
    supplied_secret = request.headers.get('mono-webhook-secret', '')
    if not settings.MONO_WEBHOOK_SECRET or not compare_digest(
        supplied_secret, settings.MONO_WEBHOOK_SECRET
    ):
        raise NotAuthenticated('Invalid Key was provided')
    process_webhook.delay(dict(request.data))
    return Response({'message': 'OK'})
