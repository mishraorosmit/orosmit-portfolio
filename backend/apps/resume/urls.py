from django.urls import path
from .views import LatestResumeAPIView

urlpatterns = [
    path('latest/', LatestResumeAPIView.as_view(), name='latest-resume'),
]
