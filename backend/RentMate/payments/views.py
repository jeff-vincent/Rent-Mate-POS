from rest_framework import permissions
from rest_framework import generics
import stripe

from . import serializers
from .models import Payment
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
        stripe_customer_token = self.request.data.get('stripe_customer_token')
        stripe_account_token = self.request.data.get('stripe_account_token')
        amount = self.request.data.get('amount')
        stripe_payment = stripe.PaymentIntent.create(
            customer=stripe_customer_token, 
            stripe_account=stripe_account_token,
            amount=amount, 
            currency='usd'
            )
        company_id = self.request.user.company_id
        serializer.save(company_id=company_id, stripe_payment_intent=stripe_payment.id)

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