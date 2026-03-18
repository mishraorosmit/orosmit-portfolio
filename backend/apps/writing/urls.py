from django.urls import path
from .views import WritingListAPIView, WritingDetailAPIView

urlpatterns = [
    path('', WritingListAPIView.as_view(), name='writing-list'),
    path('<int:pk>/', WritingDetailAPIView.as_view(), name='writing-detail'),
]
