from django.urls import path
from .views import ContactAPIView, ContactTestAPIView

urlpatterns = [
    path('', ContactAPIView.as_view(), name='contact'),
    path('test/', ContactTestAPIView.as_view(), name='contact-test'),
]
