# Generated by Django 5.1 on 2024-10-01 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_alter_booking_destination_alter_booking_travel_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='booking_id',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]
