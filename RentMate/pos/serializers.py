from rest_framework import serializers
from .models import RentalItem


class RentalItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RentalItem
        fields = (
            'id',
            'url',
            'sku',
            'text',
            'date',
        )