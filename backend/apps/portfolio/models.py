from django.db import models

class AvailabilityStatus(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available for Work'),
        ('busy', 'Currently Busy'),
        ('partial', 'Limited Availability'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    message = models.CharField(max_length=100, blank=True, 
        default='Open to freelance, teaching & collabs')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Availability Status'

    def save(self, *args, **kwargs):
        # Only one status record ever exists
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get_status(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

class SiteSettings(models.Model):
    taglines = models.JSONField(default=list)
    hero_subtitle = models.CharField(max_length=200, blank=True)
    site_name = models.CharField(max_length=100, default='Orosmit Mishra Portfolio')
    contact_email = models.EmailField(default='study.orosmit21@gmail.com')
    github_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    
    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)
    
    @classmethod
    def get_settings(cls):
        obj, _ = cls.objects.get_or_create(pk=1, defaults={
            'taglines': [
                'Graphic Designer', 'Web Developer', 
                'Physics Teacher', 'Poet', 'Brand Builder'
            ]
        })
        return obj

    class Meta:
        verbose_name_plural = 'Site Settings'

class Project(models.Model):
    title = models.CharField(max_length=255, blank=True, default="")
    category = models.CharField(max_length=100, blank=True, default="")
    image = models.ImageField(upload_to='portfolio_images/', blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, default="")
    tags = models.JSONField(default=list, blank=True)
    year = models.CharField(max_length=4, default="2024", blank=True)
    is_featured = models.BooleanField(default=False)
    
    problem = models.TextField(blank=True)
    process = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    result = models.TextField(blank=True)
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    images = models.JSONField(default=list, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or "Untitled Project"
