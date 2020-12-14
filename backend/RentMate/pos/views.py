import json

from rest_framework import permissions
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from geopy.distance import geodesic
import stripe

from . import serializers
from .models import RentalItem, Reservation, Customer, Rental
from accounts.models import Company
from RentMate.settings import STRIPE_API_KEY

stripe.api_key = STRIPE_API_KEY


class SearchRentalItems(generics.ListAPIView):
    name = 'search-rental-items'
    permission_classes = (
        permissions.IsAuthenticated,
    )
    renderer_classes = [JSONRenderer]
    serializer_class = serializers.RentalItemSerializer
    # queryset = RentalItem.objects.get(title_icontains='test', description_icontains='test')

    def get(self, request):

        # TEST VALUE
        search_terms = 'kayak'

        user_lat = request.user.lat
        user_long = request.user._long
        max_distance = request.user.max_distance
        # search_terms = self.request.query_params.get('search_terms')

        querylist = RentalItem.objects.filter(
            company_id=request.user.company_id,
            name__icontains=search_terms,
            description__icontains=search_terms
            ).values()

        within_max_distance = [i for i in querylist if geodesic(
            (i['lat'], i['_long']), (user_lat, user_long)).miles < max_distance]

        return Response(within_max_distance)


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
