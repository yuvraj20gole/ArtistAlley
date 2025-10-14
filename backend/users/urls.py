from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    # Auth endpoints (mapped to /api/auth/)
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('profile/', views.get_user_profile, name='profile'),
    path('check-user/', views.check_user_exists, name='check_user'),
    path('google/login/', views.google_oauth_login, name='google_login'),
    path('google/callback/', views.google_oauth_callback, name='google_callback'),
    
    # User management endpoints (mapped to /api/users/)
    path('all/', views.get_all_users, name='all_users'),
]
