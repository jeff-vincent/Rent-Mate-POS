import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models, transaction
from RentMate.settings import STRIPE_API_KEY
import stripe


stripe.api_key = STRIPE_API_KEY


class CompanyManager(models.Manager):
    """Manager for the Company model. Also handles the account creation"""

    @transaction.atomic
    def create_account(self, company_name, username, password, email, company_address=None):
        """Creates a Company along with the User and returns them both"""

        stripe_account = stripe.Account.create(
            type="standard",
            country="US",
            email=email,
        )

        stripe_onboarding_link = stripe.AccountLink.create(
            account=stripe_account.id,
            refresh_url="http://127.0.0.1:8000/reauth",
            return_url="http://127.0.0.1:8000/return",
            type="account_onboarding",
        )

        company = Company(
            name=company_name,
            address=company_address,
            email=email,
            stripe_account_token=stripe_account.id,
            stripe_onboarding_link=stripe_onboarding_link.url
        )
        company.save()

        user = User.objects.create_user(
            username=username,
            password=password,
            company=company,
            email=email,
        )

        return company, user


class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('name', max_length=100)
    address = models.CharField('address', max_length=250, blank=True)
    email = models.EmailField(max_length=254)
    stripe_account_token = models.CharField('stripe_account_token', max_length=300)
    stripe_onboarding_link = models.CharField('stripe_onboarding_link', max_length=300)

    objects = CompanyManager()

    class Meta:
        db_table = 'companies'

    def __str__(self):
        return self.name


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, related_name='%(class)s', on_delete=models.CASCADE, editable=False)
    email = models.EmailField(max_length=254)
    
    class Meta:
        db_table = 'users'

    def __str__(self):
        return f'({self.company.name}) - {self.username}'