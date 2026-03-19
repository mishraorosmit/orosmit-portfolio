from django.urls import path
from .views import ContactAPIView, ContactTestAPIView, ContactMessageListView

urlpatterns = [
    path('', ContactAPIView.as_view(), name='contact'),
    path('test/', ContactTestAPIView.as_view(), name='contact-test'),
    path('messages/', ContactMessageListView.as_view(), name='contact-messages'),
]
