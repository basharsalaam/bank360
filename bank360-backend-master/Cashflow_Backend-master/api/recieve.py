from cashflow import settings

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated

from api.tasks import process_webhook

@api_view(('post', ))
@authentication_classes([])
@permission_classes([])
def mono_webhook(request):
    if request.headers['mono-webhook-secret'] != settings.MONO_WEBKOOK_SECRET:
        raise NotAuthenticated('Invalid Key was provided')
    process_webhook.delay(request.data)
    print(request.data)
    return Response({'message': 'OK'})