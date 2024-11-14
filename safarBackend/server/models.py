from django.db import models
from django.contrib.auth.models import User

class Booking(models.Model):
    booking_id=models.CharField(max_length=50,primary_key=True)
    booking_date=models.DateField(auto_now_add=True)
    destination=models.CharField(max_length=200)
    no_of_travellers=models.IntegerField()
    username=models.ForeignKey(User,on_delete=models.CASCADE)
    travel_date=models.CharField(max_length=50)
    tour=models.CharField(max_length=20)

    def __str__(self):
        return f"{self.booking_id} {self.username}"

class Traveller(models.Model):
    traveller_id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=100)
    age=models.IntegerField()
    email=models.EmailField(max_length=100,null=True,blank=True)
    mobile=models.IntegerField(null=True,blank=True)
    country=models.CharField(max_length=20,null=True,blank=True)
    pancard=models.CharField(max_length=20,null=True,blank=True)
    passportNo=models.CharField(max_length=20,null=True,blank=True)
    issueDate=models.DateField(null=True,blank=True)
    booking_id=models.ForeignKey(Booking,on_delete=models.CASCADE)

    def __str__(self) :
        return self.name

class Payment(models.Model):
    payment_id = models.AutoField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)  # Foreign key to User
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Amount in decimal format
    date = models.DateField(auto_now_add=True)  # Date of payment
    credit = models.CharField(max_length=8)  
    booking_id = models.ForeignKey(Booking, on_delete=models.CASCADE)  # Foreign key to Booking

    def __str__(self):
        return f"Payment {self.payment_id} for Booking {self.booking_id} by {self.username}"

class Packages_india(models.Model):
    package_name=models.CharField(max_length=20,primary_key=True)
    img_poster=models.CharField(max_length=100)

    def __str__(self):
        return self.package_name

class Packages_international(models.Model):
    package_name=models.CharField(max_length=20,primary_key=True)
    img_poster=models.CharField(max_length=100)
    description=models.TextField()

    def __str__(self):
        return self.package_name

class Contact(models.Model):
    name=models.CharField(max_length=20)
    email=models.EmailField()
    mobile=models.IntegerField()
    message=models.TextField()

    def __str__(self):
        return self.name

class Domestic(models.Model):
    destination=models.CharField(max_length=50,primary_key=True)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    days=models.CharField(max_length=10)
    nights=models.CharField(max_length=10)
    img_path=models.CharField(max_length=250)
    highlights=models.TextField()
    overview=models.TextField()
    itinerary=models.TextField()
    dates=models.TextField()

    def __str__(self):
        return self.destination

class International(models.Model):
    destination=models.CharField(max_length=50,primary_key=True)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    days=models.CharField(max_length=10)
    nights=models.CharField(max_length=10)
    img_path=models.CharField(max_length=250)
    highlights=models.TextField()
    overview=models.TextField()
    itinerary=models.TextField()
    dates=models.TextField()

    def __str__(self):
        return self.destination