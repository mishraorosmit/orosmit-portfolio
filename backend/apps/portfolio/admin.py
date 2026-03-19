from django.contrib import admin
from .models import Project, AvailabilityStatus

@admin.register(AvailabilityStatus)
class AvailabilityStatusAdmin(admin.ModelAdmin):
    list_display = ['status', 'message', 'updated_at']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'year', 'is_featured')
    list_filter = ('category', 'year', 'is_featured')
    search_fields = ('title', 'description', 'tags')
