from django.urls import path
from . import views

urlpatterns = [
    path('track-behavior/', views.TrackBehaviorView.as_view(), name='track_behavior'),
    path('get-recommendations/', views.GetRecommendationsView.as_view(), name='get_recommendations'),
    path('user-preferences/', views.GetUserPreferencesView.as_view(), name='user_preferences'),
]
