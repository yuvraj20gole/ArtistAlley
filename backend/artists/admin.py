from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import ArtistProfile, ArtMedium


class ArtMediumAdmin(admin.ModelAdmin):
    """Admin configuration for ArtMedium model."""
    list_display = ('name', 'slug', 'description_short')
    search_fields = ('name', 'description', 'slug')
    
    def description_short(self, obj):
        """Return a shortened version of the description for the list display."""
        if obj.description:
            return obj.description[:50] + '...' if len(obj.description) > 50 else obj.description
        return ''
    description_short.short_description = _('description')


class ArtistProfileAdmin(admin.ModelAdmin):
    """Admin configuration for ArtistProfile model."""
    list_display = ('user_display', 'location', 'is_verified', 'is_featured', 'created_at')
    list_filter = ('is_verified', 'is_featured', 'created_at')
    search_fields = ('user__username', 'user__first_name', 'user__last_name', 'artist_name', 'location')
    list_select_related = ('user',)
    raw_id_fields = ('user',)
    filter_horizontal = ('art_mediums',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (_('User'), {
            'fields': ('user', 'is_verified', 'is_featured')
        }),
        (_('Basic Information'), {
            'fields': ('bio', 'birth_date', 'location')
        }),
        (_('Artist Details'), {
            'fields': ('art_mediums', 'art_style', 'years_of_experience')
        }),
        (_('Professional Information'), {
            'fields': ('education', 'exhibitions', 'awards'),
            'classes': ('collapse',)
        }),
        (_('Social Media & Contact'), {
            'fields': ('website', 'instagram_handle', 'twitter_handle', 'facebook_url'),
            'classes': ('collapse',)
        }),
        (_('Timestamps'), {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def user_display(self, obj):
        """Return a formatted string with user information."""
        return f"{obj.user.get_full_name()} ({obj.user.username})"
    user_display.short_description = _('user')
    user_display.admin_order_field = 'user__first_name'


# Register models with their admin classes
admin.site.register(ArtistProfile, ArtistProfileAdmin)
admin.site.register(ArtMedium, ArtMediumAdmin)
