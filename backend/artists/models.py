from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class ArtistProfile(models.Model):
    """
    Extended profile for artists with additional information.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='artist_profile'
    )
    
    # Basic Information
    bio = models.TextField(_('biography'), blank=True, help_text=_("Tell us about yourself and your art"))
    birth_date = models.DateField(_('date of birth'), null=True, blank=True)
    location = models.CharField(_('location'), max_length=100, blank=True)
    
    # Social Media & Contact
    website = models.URLField(_('website'), blank=True)
    instagram_handle = models.CharField(_('instagram handle'), max_length=30, blank=True)
    twitter_handle = models.CharField(_('twitter handle'), max_length=30, blank=True)
    facebook_url = models.URLField(_('facebook page'), blank=True)
    
    # Artist Details
    art_mediums = models.ManyToManyField('ArtMedium', related_name='artists', blank=True)
    art_style = models.CharField(_('art style'), max_length=100, blank=True)
    years_of_experience = models.PositiveIntegerField(_('years of experience'), default=0)
    
    # Professional Information
    education = models.TextField(_('education'), blank=True)
    exhibitions = models.TextField(_('exhibitions'), blank=True, help_text=_("List your exhibitions"))
    awards = models.TextField(_('awards and recognitions'), blank=True)
    
    # Settings
    is_featured = models.BooleanField(_('featured artist'), default=False)
    is_verified = models.BooleanField(_('verified artist'), default=False)
    
    # Timestamps
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('artist profile')
        verbose_name_plural = _('artist profiles')
    
    def __str__(self):
        return f"{self.user.get_full_name()}'s Artist Profile"
    
    @property
    def full_name(self):
        """Return the artist's full name."""
        return self.user.get_full_name() or self.user.username


class ArtMedium(models.Model):
    """
    Represents different art mediums (e.g., Oil, Watercolor, Digital).
    """
    name = models.CharField(_('name'), max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True, blank=True)
    description = models.TextField(_('description'), blank=True)
    
    class Meta:
        verbose_name = _('art medium')
        verbose_name_plural = _('art mediums')
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.name
