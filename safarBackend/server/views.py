from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
# from .models import
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .pdf_generate import generate
from django.core.mail import send_mail,EmailMessage
from django.conf import settings
from django.http import HttpResponse
import os


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            booking = serializer.save()  # Save the new booking instance
            booking_id = booking.booking_id  # Get the booking_id
            return Response({'booking_id': booking_id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TravellerCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = TravellerSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PackagesIndiaView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        india_packages = Packages_india.objects.all()
        serializer = PackagesIndiaSerializer(india_packages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PackagesInternationalView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        international_packages = Packages_international.objects.all()
        serializer = PackagesInternationalSerializer(
            international_packages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DestinationListView(APIView):
    # Allow access to any user (no authentication required)
    permission_classes = [AllowAny]

    def get(self, request, destination):
        # Query all Destination objects
        destinations = Domestic.objects.get(destination=destination)
        # destinations=destinations.filter(destination=destination)
        # Serialize the data
        serializer = DomesticSerializer(destinations)
        # Return the serialized data as a response
        return Response(serializer.data)


class InternationalListView(APIView):
    # Allow access to any user (no authentication required)
    permission_classes = [AllowAny]

    def get(self, request, destination):
        # Query all Destination objects
        destinations = International.objects.get(destination=destination)
        # Serialize the data
        serializer = InternationalSerializer(destinations)
        # Return the serialized data as a response
        return Response(serializer.data)


class BookingListByUsername(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        try:
            bookings = Booking.objects.filter(username=username)
            serializer = BookingSerializer(bookings, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({"error": "No bookings found for this user"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def check_booking_id(request, booking_id):
    exists = Booking.objects.filter(booking_id=booking_id).exists()
    return Response({'exists': exists})


@api_view(['POST'])
@permission_classes([AllowAny])
def pdf_download(request):

    try:
        serializer = PdfSerializer(data=request.data)

        if serializer.is_valid():
            booking_id = serializer.validated_data['booking_id']
            username = serializer.validated_data['username']

            booking = Booking.objects.get(booking_id=booking_id)
            payment = Payment.objects.get(booking_id=booking_id)
            traveller = Traveller.objects.filter(booking_id=booking_id)
            user = User.objects.get(id=username)

            id = 0
            mobile = ""
            travel_list = []

            for travel in traveller:
                id = id+1
                name = travel.name
                age = travel.age

                if (travel.mobile):
                    mobile = travel.mobile

                travel_list.append({'id': id, 'name': name, 'age': age})

            context = {'username': user.username, 'email': user.email, 'mobile': mobile, 'travelers': travel_list, 'bookingID': booking_id, 'booking_date': booking.booking_date.strftime('%d %B %Y'),
                       'destination': booking.destination, 'travel_date': booking.travel_date, 'tour_type': booking.tour, 'amount': f"{payment.amount:.2f}"}
            print(context['booking_date'])
            generate(context=context)

            # email send
            # Define the email subject and content
            subject = 'Safar Karo Booking Receipt'
            message = """
Dear Sir/Madam,

Thank you for choosing Safar Karo for your travel plans!.

Please find your booking receipt attached as a PDF to this email. It contains all the details of your trip, including payment confirmation.

If you have any questions or encounter any issues, please don't hesitate to contact us at info@safarkaro.com or call us at 48004400.

We look forward to serving you and ensuring your journey is as smooth as possible.

Best regards,  
Safar Karo Team  
"""

            # List of recipient emails
            recipient_list = [user.email]
             # Email "from" address
            email_from = settings.EMAIL_HOST_USER

            # Create EmailMessage object
            email = EmailMessage(subject, message, email_from, recipient_list)

            # Path to the PDF file in your media folder
            pdf_name="Booking_Receipt-"+context['bookingID']+".pdf"
            pdf_path = os.path.join(settings.MEDIA_ROOT,'pdf',pdf_name)
            
            with open(pdf_path, 'rb') as pdf_file:
                email.attach(pdf_name, pdf_file.read(), 'application/pdf')
                
            # Send the email
            email.send()
            return HttpResponse("Successfull")
        
        else:
            return Response(serializer.errors, status=400)
    except Exception as e:
        print(e)
        return Response({'error': 'error'}, status=400)



