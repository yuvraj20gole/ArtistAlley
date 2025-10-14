from django.db import models
from django.conf import settings

class UserBehavior(models.Model):
    """Track user behavior for recommendation system"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=20, choices=[
        ('view', 'View'),
        ('like', 'Like'),
        ('purchase', 'Purchase'),
        ('search', 'Search'),
        ('cart_add', 'Add to Cart'),
        ('cart_remove', 'Remove from Cart'),
        ('follow_artist', 'Follow Artist'),
    ])
    artwork_id = models.IntegerField(null=True, blank=True)
    artist_id = models.IntegerField(null=True, blank=True)
    category = models.CharField(max_length=50, null=True, blank=True)
    search_query = models.CharField(max_length=200, null=True, blank=True)
    price_range = models.CharField(max_length=20, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user', 'action_type']),
            models.Index(fields=['user', 'timestamp']),
            models.Index(fields=['action_type', 'timestamp']),
        ]

class UserPreferences(models.Model):
    """Store calculated user preferences"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    preferred_categories = models.JSONField(default=list)
    preferred_price_range = models.CharField(max_length=20, default='medium')
    preferred_artists = models.JSONField(default=list)
    last_updated = models.DateTimeField(auto_now=True)

class RecommendationCache(models.Model):
    """Cache recommendations for performance"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    recommendations = models.JSONField()
    algorithm_version = models.CharField(max_length=20, default='v1')
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        indexes = [
            models.Index(fields=['user', 'expires_at']),
        ]
