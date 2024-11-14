from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'  # This will include all fields from the Payment model

    def validate(self, data):
        """
        Check that the amount is positive and any other custom validation
        """
        if data['amount'] <= 0:
            raise serializers.ValidationError("Amount must be positive.")
        return data

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__' # Include all fields from the Booking model

class TravellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Traveller
        fields = ['traveller_id', 'name', 'age', 'email', 'mobile', 'country', 'pancard', 'passportNo', 'issueDate', 'booking_id']

class PackagesIndiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Packages_india
        fields = '__all__'

class PackagesInternationalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Packages_international
        fields = '__all__'
class DomesticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domestic
        fields = '__all__'

class InternationalSerializer(serializers.ModelSerializer):
    class Meta:
        model = International
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class PdfSerializer(serializers.Serializer):
    booking_id = serializers.CharField(max_length=10)  # Adjust max_length as needed
    username = serializers.CharField(max_length=20) 