from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


admin.site.site_header = "Orosmit Portfolio Admin"
admin.site.site_title = "OM Admin"
admin.site.index_title = "Content Management"

from apps.portfolio.views import AvailabilityStatusView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/portfolio/', include('apps.portfolio.urls')),
    path('api/v1/writing/', include('apps.writing.urls')),
    path('api/v1/contact/', include('apps.contact.urls')),
    path('api/v1/status/', AvailabilityStatusView.as_view()),
    path('api/v1/resume/', include('apps.resume.urls')),
    path('api/v1/blog/', include('apps.blog.urls')),
]


if getattr(settings, 'DEBUG', False):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
