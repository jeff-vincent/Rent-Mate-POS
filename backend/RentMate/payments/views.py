from rest_framework import permissions
from rest_framework import generics

import stripe

from .models import Payment
from . import serializers

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
        customer = self.request.data.get('customer')
        stripe_account_token = self.request.user.company.get('stripe_account_token')
        stripe_payment = stripe.PaymentIntent.create(
            customer=customer, 
            stripe_account=stripe_account_token
            )
        company_id = self.request.user.company_id
        serializer.save(company_id=company_id, stripe_payment=stripe_payment.id)

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