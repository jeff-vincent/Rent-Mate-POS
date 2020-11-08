from django.urls import path
from . import views


urlpatterns = [
    path('rental-items/', views.RentalItemList.as_view(), name=views.RentalItemList.name),
    path('rental-items/<uuid:pk>', views.RentalItemDetail.as_view(), name=views.RentalItemDetail.name),
    path('reservations/', views.ReservationList.as_view(), name=views.ReservationList.name),
    path('reservations/<uuid:pk>', views.ReservationDetail.as_view(), name=views.ReservationDetail.name),
]