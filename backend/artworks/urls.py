from django.urls import path
from . import views

app_name = 'artworks'

urlpatterns = [
    # Artwork URLs
    path('artworks/', views.ArtworkListCreateView.as_view(), name='artwork-list-create'),
    path('artworks/<int:pk>/', views.ArtworkDetailView.as_view(), name='artwork-detail'),
    path('artworks/<int:artwork_id>/view/', views.increment_artwork_views, name='artwork-increment-views'),
    path('artworks/<int:artwork_id>/like/', views.like_artwork, name='artwork-like'),
    path('public/artworks/', views.PublicArtworkListView.as_view(), name='public-artwork-list'),
    path('categories/', views.get_artwork_categories, name='artwork-categories'),
    
    # Promotion URLs
    path('promotions/', views.PromotionListCreateView.as_view(), name='promotion-list-create'),
    path('promotions/<int:pk>/', views.PromotionDetailView.as_view(), name='promotion-detail'),
]
