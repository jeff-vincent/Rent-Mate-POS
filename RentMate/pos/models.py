from django.contrib.auth import get_user_model
from django.db import models

from core.models import CompanyRelatedModel


class RentalItem(CompanyRelatedModel):
    sku = models.IntegerField('sku', blank=False, null=False)
    description = models.TextField('description', blank=False, null=False)
    date = models.DateTimeField('date', auto_now_add=True)


    class Meta:
        db_table = 'rental_items'
        ordering = ['sku']


class Reservation(CompanyRelatedModel):
    rental_item = models.ForeignKey(RentalItem, on_delete=models.CASCADE)
    reservation_start = models.DateTimeField('reservation_start')
    reservation_end = models.DateTimeField('reservation_end')


    class Meta:
        db_table = 'reservations'
        ordering = ['reservation_start']







# class Rental(CompanyRelatedModel):
