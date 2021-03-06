# Generated by Django 3.0.5 on 2020-05-02 03:31

from django.db import migrations


def create_data(apps, schema_editor):
    User = apps.get_model('users', 'User')
    User(first_name="User 001", last_name="User 001", email="user001@gmail.com", phone="00000000",
         address="Customer 000 Address", description="Customer 001 description").save()


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20200502_0330'),
    ]

    operations = [
        migrations.RunPython(create_data)
    ]
