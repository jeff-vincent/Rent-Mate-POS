from rest_framework import permissions
from rest_framework import generics
import stripe

from . import serializers
from .models import Payment
from accounts.models import Company
from pos.models import Customer
from RentMate.settings import STRIPE_API_KEY

stripe.api_key = STRIPE_API_KEY


class PaymentList(generics.ListCreateAPIView):
    name = 'payment-list'
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = serializers.PaymentSerializer
    queryset = Payment.objects.all()

    def perform_create(self, serializer):
        amount = self.request.data.get('amount')
        customer_url = self.request.data.get('customer')
        customer_list = customer_url.split('/')
        customer_id = customer_list[-1]

        queryset = Customer.objects.filter(id=customer_id)
        data_list = list(queryset.values())
        data = data_list[0]
        stripe_customer_token = data['stripe_customer_token']
        payment_method = data['payment_method']

        company_id = self.request.user.company_id
        queryset = Company.objects.filter(id=company_id)
        data_list = list(queryset.values())
        data = data_list[0]
        stripe_account_token = data['stripe_account_token']
        

        stripe_payment_intent = stripe.PaymentIntent.create(
            customer=stripe_customer_token, 
            stripe_account=stripe_account_token,
            payment_method=payment_method,
            amount=amount, 
            currency='usd'
        )

        stripe_payment_confirmation = stripe.PaymentIntent.confirm(
            stripe_payment_intent.id,
            payment_method=payment_method,
            stripe_account=stripe_account_token,
        )
        serializer.save(
            company_id=company_id, 
            stripe_payment_intent=stripe_payment_intent.id,
            stripe_payment_confirmation=stripe_payment_confirmation.id
        )

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)

    
class PaymentDetail(generics.RetrieveAPIView):
    name = 'payment-detail'
    permission_classes = (
       permissions.IsAuthenticated,
    )
    serializer_class = serializers.PaymentSerializer
    queryset = Payment.objects.all()

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)