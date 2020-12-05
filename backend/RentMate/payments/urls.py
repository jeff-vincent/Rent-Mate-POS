from django.urls import path
from . import views

urlpatterns = [
    path('', views.PaymentList.as_view(), name=views.PaymentList.name),
    path('<uuid:pk>', views.PaymentDetail.as_view(), name=views.PaymentDetail.name),
]