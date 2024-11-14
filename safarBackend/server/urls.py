from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from server import views as SV
from safarBackend import views as MV
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', SV.register_user, name='register_user'),
    path('password_reset_token/<str:email>',MV.password_reset_token , name='password_reset_token'),
    path('password_reset/<str:token>/<str:new_password>',MV.password_reset , name='password_reset'),
    path('payment/',SV.PaymentCreateView.as_view(),name="payment-create"),
    path('bookings/', SV.BookingCreateAPIView.as_view(), name='booking-create'),
    path('travellers/', SV.TravellerCreateView.as_view(), name='traveller-create'),
    path('packages/india/', SV.PackagesIndiaView.as_view(), name='packages-india-list'),
    path('packages/international/', SV.PackagesInternationalView.as_view(), name='packages-international-list'),
    path('domestic/<str:destination>/',SV.DestinationListView.as_view(),name="domestic-list"),
    path('international/<str:destination>/',SV.InternationalListView.as_view(),name="inter-list"),
    path('bookings/<str:username>/', SV.BookingListByUsername.as_view(), name='bookings-by-username'),
    path('check-booking-id/<str:booking_id>/', SV.check_booking_id, name='check-booking-id'),
    path('downpdf/', SV.pdf_download, name='pdf-download'),
    
]