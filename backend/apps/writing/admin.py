from django.contrib import admin
from .models import Writing

@admin.register(Writing)
class WritingAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'created_at')
    list_filter = ('type',)
    search_fields = ('title', 'body', 'excerpt')
