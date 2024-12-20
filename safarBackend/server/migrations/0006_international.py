# Generated by Django 5.1 on 2024-09-17 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0005_domestic'),
    ]

    operations = [
        migrations.CreateModel(
            name='International',
            fields=[
                ('destination', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('days', models.CharField(max_length=10)),
                ('nights', models.CharField(max_length=10)),
                ('img_path', models.CharField(max_length=250)),
                ('highlights', models.TextField()),
                ('overview', models.TextField()),
                ('itinerary', models.TextField()),
                ('dates', models.TextField()),
            ],
        ),
    ]
