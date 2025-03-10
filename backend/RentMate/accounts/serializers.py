from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Company


User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = (
            'url',
            'id',
            'username',
            'password',
            'lat',
            '_long',
            'max_distance'
        )
        # Make sure that the password field is never sent back to the client.
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        updated = super().update(instance, validated_data)

        # We save again the user if the password was specified to make sure it's properly hashed.
        if 'password' in validated_data:
            updated.set_password(validated_data['password'])
            updated.save()
        return updated


class CompanySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Company
        fields = (
            'id',
            'name',
            'address',
            'email',
            'stripe_onboarding_link'
        )


class AccountSerializer(serializers.Serializer):
    """Serializer that has two nested Serializers: company and user"""

    company = CompanySerializer()
    user = UserSerializer()

    def create(self, validated_data):
        company_data = validated_data['company']
        user_data = validated_data['user']

        # Call our CompanyManager method to create the Company and the User
        company, user = Company.objects.create_account(
            company_name=company_data.get('name'),
            company_address=company_data.get('address'),
            email=company_data.get('email'),
            username=user_data.get('username'),
            password=user_data.get('password'),
            lat=user_data.get('lat'),
            _long=user_data.get('_long'),
            max_distance=user_data.get('max_distance')
        )

        return {'company': company, 'user': user}

    def update(self, instance, validated_data):
        raise NotImplementedError('Cannot call update() on an account')