from django.contrib.auth import authenticate

from api.util.misc import otpcheck

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(('post', ))
@authentication_classes([])
@permission_classes([])
def verify(request):
    data = {key : value for key , value in request.data.items()}
    if not authenticate(**data):
        raise PermissionDenied('no user with the specified credentials found')
    return Response({'data' : 'user is valid'})

class TokenObtainView(TokenObtainPairView):
    serilizer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # otpcheck(request.data)
        return super().post(request, *args, **kwargs)