from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import CustomUser

# This will be used to create a profile when a new user is created
# For now, we're just keeping it as a placeholder
# We'll implement the actual signal handlers when we have more complex logic

# Example signal (commented out for now):
# @receiver(post_save, sender=CustomUser)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         # Create a profile for the new user
#         pass
