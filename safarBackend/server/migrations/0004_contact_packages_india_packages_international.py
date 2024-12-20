# Generated by Django 5.1 on 2024-09-17 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_payment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('mobile', models.IntegerField()),
                ('message', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Packages_india',
            fields=[
                ('package_name', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('img_poster', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Packages_international',
            fields=[
                ('package_name', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('img_poster', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
    ]
