from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Payment
        fields = (
            'id',
            'customer',
            'amount',
            'rental',
            'date',
            'stripe_payment_intent',
            'stripe_payment_confirmation'
        )