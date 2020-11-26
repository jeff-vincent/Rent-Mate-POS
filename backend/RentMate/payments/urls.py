from django.conf.urls import url
from payments import views

urlpatterns = [
    url(r'^api/v1/payments/$', views.test),
]