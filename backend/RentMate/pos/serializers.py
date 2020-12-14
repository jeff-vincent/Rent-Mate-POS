from rest_framework import serializers
from .models import RentalItem, Reservation, Customer, Rental


class RentalItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RentalItem
        fields = (
            'id',
            'url',
            'sku',
            'name',
            'size',
            'color',
            'description',
            'date',
            'lat',
            '_long'
        )


class ReservationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reservation
        fields = (
            'id',
            'url',
            'rental_item',
            'reservation_start',
            'reservation_end',
            'customer'
        )


class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = (
            'id',
            'url',
            'first_name',
            'last_name',
            'email',
            'payment_method',
            'stripe_customer_token'
        )


class RentalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rental
        fields = (
            'id',
            'url',
            'rental_item',
            'customer',
            'rental_start',
            'rental_end',
        )
        