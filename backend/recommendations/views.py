from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
import json
from .services import RecommendationEngine

# Initialize recommendation engine
recommendation_engine = RecommendationEngine()

@method_decorator(csrf_exempt, name='dispatch')
class TrackBehaviorView(View):
    """Track user behavior for AI learning"""
    
    def post(self, request):
        try:
            data = json.loads(request.body)
            
            # Extract data
            action_type = data.get('action_type')
            artwork_id = data.get('artwork_id')
            artist_id = data.get('artist_id')
            category = data.get('category')
            search_query = data.get('search_query')
            price_range = data.get('price_range')
            session_id = data.get('session_id')
            
            # Track behavior
            recommendation_engine.track_user_behavior(
                user_id=request.user.id,
                action_type=action_type,
                artwork_id=artwork_id,
                artist_id=artist_id,
                category=category,
                search_query=search_query,
                price_range=price_range,
                session_id=session_id
            )
            
            return JsonResponse({
                'success': True,
                'message': 'Behavior tracked successfully'
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class GetRecommendationsView(View):
    """Get AI recommendations for user"""
    
    def get(self, request):
        try:
            limit = int(request.GET.get('limit', 12))
            
            # Check if user is authenticated
            if not request.user.is_authenticated:
                # Return mock data for unauthenticated users
                mock_recommendations = [
                    {
                        'artwork_id': 1,
                        'title': 'Abstract Art Vibes',
                        'artist_name': 'Mira Sen',
                        'category': 'abstract',
                        'price': 15000,
                        'image_url': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop&crop=center',
                        'match_score': 85,
                        'reasons': ['Similar to your interest in abstract art'],
                        'algorithm': 'content-based'
                    },
                    {
                        'artwork_id': 2,
                        'title': "Nature's Flow",
                        'artist_name': 'Arjun Desai',
                        'category': 'landscape',
                        'price': 12000,
                        'image_url': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&crop=center',
                        'match_score': 78,
                        'reasons': ['From artists you like'],
                        'algorithm': 'collaborative'
                    },
                    {
                        'artwork_id': 3,
                        'title': 'Digital Dreamscape',
                        'artist_name': 'Ananya Rao',
                        'category': 'digital',
                        'price': 8000,
                        'image_url': 'https://images.unsplash.com/photo-1557683316-973673baf926?w=500&h=500&fit=crop&crop=center',
                        'match_score': 92,
                        'reasons': ['Popular choice among buyers'],
                        'algorithm': 'popularity'
                    },
                    {
                        'artwork_id': 4,
                        'title': 'Urban Canvas',
                        'artist_name': 'Priya Sharma',
                        'category': 'street',
                        'price': 9500,
                        'image_url': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop&crop=center',
                        'match_score': 88,
                        'reasons': ['Trending in your area'],
                        'algorithm': 'content-based'
                    },
                    {
                        'artwork_id': 5,
                        'title': 'Ocean Depths',
                        'artist_name': 'Rajesh Kumar',
                        'category': 'abstract',
                        'price': 18000,
                        'image_url': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center',
                        'match_score': 76,
                        'reasons': ['Similar to your liked artworks'],
                        'algorithm': 'collaborative'
                    },
                    {
                        'artwork_id': 6,
                        'title': 'Geometric Harmony',
                        'artist_name': 'Sneha Patel',
                        'category': 'geometric',
                        'price': 11000,
                        'image_url': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&crop=center',
                        'match_score': 91,
                        'reasons': ['Highly rated by similar users'],
                        'algorithm': 'popularity'
                    }
                ]
                
                return JsonResponse({
                    'success': True,
                    'recommendations': mock_recommendations[:limit],
                    'algorithm_version': 'mock-v1',
                    'total_count': len(mock_recommendations[:limit])
                })
            
            # Get recommendations for authenticated users
            recommendations = recommendation_engine.get_recommendations(
                user_id=request.user.id,
                limit=limit
            )
            
            return JsonResponse({
                'success': True,
                'recommendations': recommendations,
                'algorithm_version': recommendation_engine.algorithm_version,
                'total_count': len(recommendations)
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class GetUserPreferencesView(View):
    """Get user preferences and insights"""
    
    def get(self, request):
        try:
            from .models import UserPreferences
            
            preferences = UserPreferences.objects.get(user_id=request.user.id)
            
            # Get behavior insights
            from .models import UserBehavior
            from django.utils import timezone
            from datetime import timedelta
            
            thirty_days_ago = timezone.now() - timedelta(days=30)
            recent_behaviors = UserBehavior.objects.filter(
                user_id=request.user.id,
                timestamp__gte=thirty_days_ago
            )
            
            insights = {
                'total_views': recent_behaviors.filter(action_type='view').count(),
                'total_likes': recent_behaviors.filter(action_type='like').count(),
                'total_purchases': recent_behaviors.filter(action_type='purchase').count(),
                'favorite_categories': preferences.preferred_categories,
                'preferred_price_range': preferences.preferred_price_range,
                'followed_artists_count': len(preferences.preferred_artists)
            }
            
            return JsonResponse({
                'success': True,
                'preferences': {
                    'preferred_categories': preferences.preferred_categories,
                    'preferred_price_range': preferences.preferred_price_range,
                    'preferred_artists': preferences.preferred_artists,
                    'last_updated': preferences.last_updated.isoformat()
                },
                'insights': insights
            })
            
        except UserPreferences.DoesNotExist:
            return JsonResponse({
                'success': True,
                'preferences': None,
                'insights': {
                    'total_views': 0,
                    'total_likes': 0,
                    'total_purchases': 0,
                    'favorite_categories': [],
                    'preferred_price_range': 'medium',
                    'followed_artists_count': 0
                }
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)
