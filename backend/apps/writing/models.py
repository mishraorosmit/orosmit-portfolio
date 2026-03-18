from django.db import models

class Writing(models.Model):
    TYPE_CHOICES = [
        ('poem', 'Poem'),
        ('story', 'Story'),
        ('script', 'Script'),
    ]
    title = models.CharField(max_length=255, blank=True, default="")
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, blank=True, default="poem")
    excerpt = models.TextField(blank=True, default="", help_text="Short preview shown on cards")
    body = models.TextField(blank=True, default="")
    year = models.CharField(max_length=4, default="2024", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or "Untitled Writing"
