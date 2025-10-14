from django.contrib import admin
from .models import Artwork, Promotion

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ['title', 'artist', 'category', 'price', 'status', 'is_featured', 'views', 'likes', 'created_at']
    list_filter = ['category', 'status', 'is_featured', 'created_at']
    search_fields = ['title', 'artist__username', 'artist__email', 'tags']
    readonly_fields = ['views', 'likes', 'created_at', 'updated_at']
    list_editable = ['status', 'is_featured']
    ordering = ['-created_at']

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ['title', 'artist', 'discount_percentage', 'start_date', 'end_date', 'is_active']
    list_filter = ['is_active', 'start_date', 'end_date']
    search_fields = ['title', 'artist__username']
    readonly_fields = ['created_at', 'updated_at']
    filter_horizontal = ['artworks']