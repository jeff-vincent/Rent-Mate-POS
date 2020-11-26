import uuid
from django.contrib.auth import get_user_model
from django.db import models

from core.models import CompanyRelatedModel


class RentalItem(CompanyRelatedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('name', max_length=100, blank=False, null=False)
    size = models.CharField('size', max_length=100, blank=False)
    color = models.CharField('color', max_length=100, blank=False)
    sku = models.IntegerField('sku', blank=False, null=False)
    description = models.TextField('description', blank=False, null=False)
    date = models.DateTimeField('date', auto_now_add=True)


    class Meta:
        db_table = 'rental_items'
        ordering = ['sku']

    def __str__(self):
        return f'({self.name}) - {self.size} - {self.color}'


class Customer(CompanyRelatedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField('first-name', blank=False, null=False, max_length=100)
    last_name = models.CharField('last-name', blank=False, null=False, max_length=100)
    email = models.EmailField(max_length=254)
    payment_method = models.CharField('stripe-payment-method', max_length=250)
    stripe_customer_token = models.CharField('stripe-customer-token', max_length=250)

    class Meta:
        db_table = 'customers'
        ordering = ['last_name']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Reservation(CompanyRelatedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rental_item = models.ForeignKey(RentalItem, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    reservation_start = models.DateTimeField('reservation-start')
    reservation_end = models.DateTimeField('reservation-end')


    class Meta:
        db_table = 'reservations'
        ordering = ['reservation_start']

    def __str__(self):
        return self.rental_item.name


class Rental(CompanyRelatedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rental_item = models.ForeignKey(RentalItem, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rental_start = models.DateTimeField('rental-start')
    rental_end = models.DateTimeField('rental-end')

    class Meta:
        db_table = 'rentals'
        ordering = ['rental_start']

    def __str__(self):
        return self.rental_item.name