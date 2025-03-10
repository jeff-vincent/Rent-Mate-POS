# Generated by Django 3.1.3 on 2020-11-08 21:09

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=100, verbose_name='first-name')),
                ('last_name', models.CharField(max_length=100, verbose_name='last-name')),
                ('company', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='customer', to='accounts.company')),
            ],
            options={
                'db_table': 'customers',
                'ordering': ['last_name'],
            },
        ),
        migrations.CreateModel(
            name='RentalItem',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, verbose_name='name')),
                ('size', models.CharField(max_length=100, verbose_name='size')),
                ('color', models.CharField(max_length=100, verbose_name='color')),
                ('sku', models.IntegerField(verbose_name='sku')),
                ('description', models.TextField(verbose_name='description')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='date')),
                ('company', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='rentalitem', to='accounts.company')),
            ],
            options={
                'db_table': 'rental_items',
                'ordering': ['sku'],
            },
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('reservation_start', models.DateTimeField(verbose_name='reservation-start')),
                ('reservation_end', models.DateTimeField(verbose_name='reservation-end')),
                ('company', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='reservation', to='accounts.company')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pos.customer')),
                ('rental_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pos.rentalitem')),
            ],
            options={
                'db_table': 'reservations',
                'ordering': ['reservation_start'],
            },
        ),
    ]
