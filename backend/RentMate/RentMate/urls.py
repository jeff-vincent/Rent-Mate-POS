from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/accounts/', include('accounts.urls')),
    path('api/v1/pos/', include('pos.urls')),
    path('api/v1/payments/', include('payments.urls')),

    path('api/v1/auth/', include('rest_framework.urls'))
]