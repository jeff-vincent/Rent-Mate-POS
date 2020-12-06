import uuid
from django.db import models
from core.models import CompanyRelatedModel
from accounts.models import User
from pos.models import Customer
from pos.models import Rental


class Payment(CompanyRelatedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.CharField('user-id', blank=False, null=False, max_length=100)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rental = models.ForeignKey(Rental, on_delete=models.CASCADE)
    date = models.DateTimeField('date', auto_now_add=True)
    amount = models.IntegerField('amount', blank=False)
    stripe_payment_intent = models.CharField('stripe-payment-intent', max_length=250)
    stripe_payment_confirmation = models.CharField('stripe-payment-confirmation', max_length=250)



    class Meta:
        db_table = 'payments'
        ordering = ['date']

    def __str__(self):
        return f'({self.customer.name}) - {self.amount} - {self.date}'



