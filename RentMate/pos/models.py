from django.contrib.auth import get_user_model
from django.db import models

from core.models import CompanyRelatedModel


User = get_user_model()


class RentalItem(CompanyRelatedModel):
    sku = models.TextField('message', blank=False, null=False)
    text = models.TextField('message', blank=False, null=False)
    date = models.DateTimeField('date', auto_now_add=True)


    class Meta:
        db_table = 'rental_item'
        ordering = ['sku']