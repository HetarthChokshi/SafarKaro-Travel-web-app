from django.contrib import admin
from django.contrib.auth.models import User
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email')

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

class BookingAdmin(admin.ModelAdmin):
    # List all fields to display in the Django admin list view
    list_display = ('booking_id', 'booking_date', 'destination', 'no_of_travellers', 'username', 'travel_date', 'tour')
admin.site.register(Booking, BookingAdmin)

class TravellerAdmin(admin.ModelAdmin):
    # List all fields to display in the Django admin list view
    list_display = (
        'traveller_id', 'name', 'age', 'email', 'mobile', 'country', 
        'pancard', 'passportNo', 'issueDate', 'booking_id'
    )
admin.site.register(Traveller, TravellerAdmin)

class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        'payment_id', 'username', 'amount', 'date', 'credit', 'booking_id'
    )
admin.site.register(Payment, PaymentAdmin)



@admin.register(Packages_india)
class PackagesIndiaAdmin(admin.ModelAdmin):
    list_display = ('package_name', 'img_poster')
    search_fields = ('package_name',)

@admin.register(Packages_international)
class PackagesInternationalAdmin(admin.ModelAdmin):
    list_display = ('package_name', 'img_poster', 'description')
    search_fields = ('package_name',)
    list_filter = ('package_name',)  # Add filters based on fields if needed

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'mobile')
    search_fields = ('name', 'email')
    list_filter = ('name',)  # Add filters based on fields if needed


@admin.register(Domestic)
class DomesticAdmin(admin.ModelAdmin):
    list_display = ('destination', 'price', 'days', 'nights')
    search_fields = ('destination', 'price', 'days', 'nights')

@admin.register(International)
class DomesticAdmin(admin.ModelAdmin):
    list_display = ('destination', 'price', 'days', 'nights')
    search_fields = ('destination', 'price', 'days', 'nights')