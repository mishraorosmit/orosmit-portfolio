from django.db import models

class Resume(models.Model):
    file = models.FileField(upload_to='resumes/', blank=True, null=True)
    version = models.CharField(max_length=50, blank=True, default="1.0")
    is_active = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.is_active:
            Resume.objects.filter(is_active=True).update(is_active=False)
        super(Resume, self).save(*args, **kwargs)

    def __str__(self):
        return f"Resume v{self.version} {'(Active)' if self.is_active else ''}"
