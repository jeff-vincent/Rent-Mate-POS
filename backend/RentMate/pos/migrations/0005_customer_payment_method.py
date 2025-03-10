# Generated by Django 3.1.3 on 2020-11-26 23:45

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('pos', '0004_customer_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='payment_method',
            field=models.CharField(default=django.utils.timezone.now, max_length=250, verbose_name='stripe-payment-method'),
            preserve_default=False,
        ),
    ]
