import uuid
from django.db import models
from core.models import CompanyRelatedModel
from accounts.models import User
from pos.models import Customer
from pos.models import Rental

import stripe


class CreatePayment(models.Generic):

    def create_payment():
        pass

class Payment(CompanyRelatedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rental = models.ForeignKey(Rental, on_delete=models.CASCADE)
    date = models.DateTimeField('date', auto_now_add=True)
    amount = models.IntegerField('amount', blank=False)



