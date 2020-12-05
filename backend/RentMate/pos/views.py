from rest_framework import permissions
from rest_framework import generics
import stripe

from . import serializers
from .models import RentalItem, Reservation, Customer, Rental
from accounts.models import Company
from RentMate.settings import STRIPE_API_KEY

stripe.api_key = STRIPE_API_KEY


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
        email = self.request.data.get('email')
        payment_method = self.request.data.get('payment_method')
        company_id = self.request.user.company_id
        queryset = Company.objects.filter(id=company_id)
        data_list = list(queryset.values())
        data = data_list[0]
        stripe_account_token = data['stripe_account_token']
        stripe_customer = stripe.Customer.create(
            email=email, 
            payment_method=payment_method,
            stripe_account=stripe_account_token
        )
        stripe_customer_token = stripe_customer.id
        serializer.save(company_id=company_id, stripe_customer_token=stripe_customer_token)

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
