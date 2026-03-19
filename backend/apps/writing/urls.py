from django.urls import path
from .views import WritingListView, WritingCreateView, WritingUpdateView, WritingDeleteView, WritingDetailView

urlpatterns = [
    path('', WritingListView.as_view()),
    path('<int:pk>/', WritingDetailView.as_view()),
    path('create/', WritingCreateView.as_view()),
    path('<int:pk>/update/', WritingUpdateView.as_view()),
    path('<int:pk>/delete/', WritingDeleteView.as_view()),
]

