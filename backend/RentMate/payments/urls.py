from django.urls import path
from payments import views

urlpatterns = [
    path('payments/', views.PaymentList.as_view(), name=views.PaymentList.name),
    path('payments/<uuid:pk>', views.PaymentDetail.as_view(), name=views.PaymentDetail.name),
]