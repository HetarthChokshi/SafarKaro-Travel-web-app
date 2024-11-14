from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(['POST','GET'])
@permission_classes([AllowAny])
def password_reset_token(request,email):
    if request.method == 'GET':
        # Email = request.POST.get("email") 
        # user1 = get_object_or_404(User,email="raj55@gmail.com")
        user = get_object_or_404(User,email=email)
        # Generate a JWT token for the user
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        # print(token)
        return Response({'token':token})
    return Response({'message':'error generating token'})

@api_view(['GET'])
@permission_classes([AllowAny])
def password_reset(request,token,new_password):
    if request.method == 'GET':
        try:
            # Decode and verify the token   
            # token = request.POST.get('token')
            access_token = AccessToken(token)
            user_id = access_token["user_id"]
            # print("user.id=",user_id)
            user = get_object_or_404(User, pk=user_id)         
            # Get the new password from the request
            # new_password = request.POST.get('password')
            user.set_password(new_password)
            user.save()
            return Response({'message':'Password has been changed.'})
        except Exception as e:
            print(e,"error")
            return Response({'message':'Error resetting password'})


@api_view(['POST'])
def get_user_id(request):
    username = request.data.get('username')
    try:
        user = User.objects.get(username=username)
        return Response({'user_id': user.id})
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)