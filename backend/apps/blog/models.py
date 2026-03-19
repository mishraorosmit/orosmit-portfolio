from django.db import models

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.CharField(max_length=300)
    body = models.TextField()
    category = models.CharField(max_length=50, choices=[
        ('design', 'Design'),
        ('tech', 'Tech'),
        ('teaching', 'Teaching'),
        ('life', 'Life'),
    ])
    reading_time = models.IntegerField(default=3)
    created_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
