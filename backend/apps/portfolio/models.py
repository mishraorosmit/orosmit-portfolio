from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=255, blank=True, default="")
    category = models.CharField(max_length=100, blank=True, default="")
    image = models.ImageField(upload_to='portfolio_images/', blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, default="")
    tags = models.JSONField(default=list, blank=True)
    year = models.CharField(max_length=4, default="2024", blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or "Untitled Project"
