import stripe
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Company
from . import serializers
from RentMate.settings import STRIPE_API_KEY

stripe.api_key = STRIPE_API_KEY


User = get_user_model()


class AccountCreate(generics.CreateAPIView):
    name = 'account-create'
    serializer_class = serializers.AccountSerializer


class UserList(generics.ListCreateAPIView):
    name = 'user-list'
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        company_id = self.request.user.company_id
        serializer.save(company_id=company_id)

    def get_queryset(self):
        # Ensure that the users belong to the company of the user that is making the request
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'user-detail'
    permission_classes = (
       permissions.IsAuthenticated,
    )
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        # Ensure that the user belongs to the company of the user that is making the request
        # Note that this method is identical to the one in `UserList`
        company_id = self.request.user.company_id
        return super().get_queryset().filter(company_id=company_id)


class CompanyDetail(generics.RetrieveUpdateAPIView):
    name = 'company-detail'
    permission_classes = (
        permissions.IsAuthenticated,
    )
    serializer_class = serializers.CompanySerializer

    def get_object(self):
        # Ensure that users can only see the company that they belong to
        return self.request.user.company

    def put(self, request, *args, **kwargs):
        company = self.get_object()
        stripe_onboarding_link = stripe.AccountLink.create(
            account=company.stripe_account_token,
            refresh_url="http://127.0.0.1:8000/reauth",
            return_url="http://127.0.0.1:8000/return",
            type="account_onboarding",
        )
        company.stripe_onboarding_link = stripe_onboarding_link.url
        company.save()

        serializer = self.get_serializer(company)

        return Response(serializer.data)

