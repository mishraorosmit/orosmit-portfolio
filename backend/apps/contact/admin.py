from django.contrib import admin
from .models import ContactMessage

@admin.action(description='Mark selected messages as read')
def mark_as_read(modeladmin, request, queryset):
    queryset.update(is_read=True)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'timestamp', 'is_read')
    list_filter = ('is_read', 'timestamp')
    search_fields = ('name', 'email', 'message')
    actions = [mark_as_read]

    def has_add_permission(self, request): 
        return False
        
    def has_change_permission(self, request, obj=None): 
        return False
