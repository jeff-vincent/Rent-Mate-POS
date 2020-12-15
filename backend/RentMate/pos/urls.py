from django.urls import path
from django.urls import re_path
from . import views


urlpatterns = [
    path('rental-items/', views.RentalItemList.as_view(), name=views.RentalItemList.name),
    path('rental-items/<uuid:pk>', views.RentalItemDetail.as_view(), name=views.RentalItemDetail.name),
    path('reservations/', views.ReservationList.as_view(), name=views.ReservationList.name),
    path('reservations/<uuid:pk>', views.ReservationDetail.as_view(), name=views.ReservationDetail.name),
    path('customers/', views.CustomerList.as_view(), name=views.CustomerList.name),
    path('customers/<uuid:pk>', views.CustomerDetail.as_view(), name=views.CustomerDetail.name),
    path('rentals/', views.RentalList.as_view(), name=views.RentalList.name),
    path('rentals/<uuid:pk>', views.RentalDetail.as_view(), name=views.RentalDetail.name),
    re_path(r'^search/(?P<search_terms>\D+)/', views.SearchRentalItems.as_view(), name=views.SearchRentalItems.name)
]