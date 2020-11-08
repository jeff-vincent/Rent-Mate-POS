from rest_framework import serializers
from .models import RentalItem, Reservation


class RentalItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RentalItem
        fields = (
            'id',
            'url',
            'sku',
            'description',
            'date',
        )


class ReservationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reservation
        fields = (
            'id',
            'url',
            'rental_item',
            'reservation_start',
            'reservation_end'
        )