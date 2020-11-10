from rest_framework import permissions
from rest_framework import generics

from . import serializers
from .models import RentalItem, Reservation, Customer, Rental


class RentalItemList(generics.ListCreateAPIView):
    name = 'rentalitem-list'
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = serializers.RentalItemSerializer
    queryset = RentalItem.objects.all()

    def perform_create(self, serializer):
        company_id = self.request.user.company_id
        serializer.save(company_id=company_id)

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)


class RentalItemDetail(generics.RetrieveAPIView):
    name = 'rentalitem-detail'
    permission_classes = (
       permissions.IsAuthenticated,
    )
    serializer_class = serializers.RentalItemSerializer
    queryset = RentalItem.objects.all()

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)


class ReservationList(generics.ListCreateAPIView):
    name = 'reservation-list'
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = serializers.ReservationSerializer
    queryset = Reservation.objects.all()

    def perform_create(self, serializer):
        company_id = self.request.user.company_id
        serializer.save(company_id=company_id)

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)

    
class ReservationDetail(generics.RetrieveAPIView):
    name = 'reservation-detail'
    permission_classes = (
       permissions.IsAuthenticated,
    )
    serializer_class = serializers.ReservationSerializer
    queryset = Reservation.objects.all()

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)


class CustomerList(generics.ListCreateAPIView):
    name = 'customer-list'
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = serializers.CustomerSerializer
    queryset = Customer.objects.all()

    def perform_create(self, serializer):
        company_id = self.request.user.company_id
        serializer.save(company_id=company_id)

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)

    
class CustomerDetail(generics.RetrieveAPIView):
    name = 'customer-detail'
    permission_classes = (
       permissions.IsAuthenticated,
    )
    serializer_class = serializers.CustomerSerializer
    queryset = Customer.objects.all()

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)


class RentalList(generics.ListCreateAPIView):
    name = 'rental-list'
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = serializers.RentalSerializer
    queryset = Rental.objects.all()

    def perform_create(self, serializer):
        company_id = self.request.user.company_id
        serializer.save(company_id=company_id)

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)

    
class RentalDetail(generics.RetrieveAPIView):
    name = 'rental-detail'
    permission_classes = (
       permissions.IsAuthenticated,
    )
    serializer_class = serializers.RentalSerializer
    queryset = Rental.objects.all()

    def get_queryset(self):
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)
