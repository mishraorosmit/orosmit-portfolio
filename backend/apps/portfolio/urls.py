from django.urls import path
from .views import ProjectListView, ProjectCreateView, ProjectUpdateView, ProjectDeleteView, ProjectDetailView

urlpatterns = [
    path('', ProjectListView.as_view()),
    path('<int:pk>/', ProjectDetailView.as_view()),
    path('create/', ProjectCreateView.as_view()),
    path('<int:pk>/update/', ProjectUpdateView.as_view()),
    path('<int:pk>/delete/', ProjectDeleteView.as_view()),
]

