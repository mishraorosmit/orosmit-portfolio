from django.contrib import admin
from .models import Resume

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('version', 'is_active', 'uploaded_at')
    list_filter = ('is_active',)
