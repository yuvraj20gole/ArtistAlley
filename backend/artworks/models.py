from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

User = get_user_model()

class Artwork(models.Model):
    CATEGORY_CHOICES = [
        ('painting', 'Painting'),
        ('digital-art', 'Digital Art'),
        ('sculpture', 'Sculpture'),
        ('photography', 'Photography'),
        ('jewelry', 'Jewelry'),
        ('pottery', 'Pottery & Ceramics'),
        ('textile', 'Textile Art'),
        ('mixed-media', 'Mixed Media'),
        ('illustration', 'Illustration'),
        ('printmaking', 'Printmaking'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('sold', 'Sold'),
        ('inactive', 'Inactive'),
    ]

    artist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artworks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='other')
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    image = models.ImageField(upload_to='artworks/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured = models.BooleanField(default=False)
    tags = models.CharField(max_length=500, blank=True, help_text="Comma-separated tags")
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} by {self.artist.username}"

    def increment_views(self):
        self.views += 1
        self.save(update_fields=['views'])

    def increment_likes(self):
        self.likes += 1
        self.save(update_fields=['likes'])


class Promotion(models.Model):
    artist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='promotions')
    title = models.CharField(max_length=200)
    description = models.TextField()
    discount_percentage = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)]
    )
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField()
    artworks = models.ManyToManyField(Artwork, blank=True, related_name='promotions')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.discount_percentage}% off"

    def is_currently_active(self):
        now = timezone.now()
        return self.is_active and self.start_date <= now <= self.end_date

    def get_discounted_price(self, original_price):
        discount_amount = (original_price * self.discount_percentage) / 100
        return original_price - discount_amount