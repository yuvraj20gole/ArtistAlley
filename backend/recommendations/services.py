from django.utils import timezone
from django.contrib.auth import get_user_model
from datetime import timedelta
from collections import Counter, defaultdict
import json
import math
from typing import List, Dict, Any
from .models import UserBehavior, UserPreferences, RecommendationCache

User = get_user_model()

class RecommendationEngine:
    """AI-powered recommendation engine"""
    
    def __init__(self):
        self.algorithm_version = "v1"
        self.cache_duration = timedelta(hours=6)
    
    def track_user_behavior(self, user_id: int, action_type: str, **kwargs):
        """Track user behavior for learning"""
        UserBehavior.objects.create(
            user_id=user_id,
            action_type=action_type,
            **kwargs
        )
        
        # Update user preferences after tracking
        self._update_user_preferences(user_id)
    
    def get_recommendations(self, user_id: int, limit: int = 12) -> List[Dict[str, Any]]:
        """Get AI recommendations for a user"""
        
        # Check cache first
        cached_recs = self._get_cached_recommendations(user_id)
        if cached_recs:
            return cached_recs[:limit]
        
        # Generate new recommendations
        recommendations = self._generate_recommendations(user_id, limit)
        
        # Cache the results
        self._cache_recommendations(user_id, recommendations)
        
        return recommendations
    
    def _update_user_preferences(self, user_id: int):
        """Update user preferences based on behavior"""
        # Get recent behavior (last 30 days)
        thirty_days_ago = timezone.now() - timedelta(days=30)
        behaviors = UserBehavior.objects.filter(
            user_id=user_id,
            timestamp__gte=thirty_days_ago
        )
        
        # Analyze behavior patterns
        category_counts = Counter()
        price_ranges = []
        artist_counts = Counter()
        
        for behavior in behaviors:
            if behavior.category:
                category_counts[behavior.category] += 1
            if behavior.price_range:
                price_ranges.append(behavior.price_range)
            if behavior.artist_id:
                artist_counts[behavior.artist_id] += 1
        
        # Calculate preferences
        preferred_categories = [cat for cat, count in category_counts.most_common(5)]
        preferred_price_range = self._calculate_preferred_price_range(price_ranges)
        preferred_artists = [artist_id for artist_id, count in artist_counts.most_common(10)]
        
        # Update or create preferences
        preferences, created = UserPreferences.objects.get_or_create(
            user_id=user_id,
            defaults={
                'preferred_categories': preferred_categories,
                'preferred_price_range': preferred_price_range,
                'preferred_artists': preferred_artists,
            }
        )
        
        if not created:
            preferences.preferred_categories = preferred_categories
            preferences.preferred_price_range = preferred_price_range
            preferences.preferred_artists = preferred_artists
            preferences.save()
    
    def _calculate_preferred_price_range(self, price_ranges: List[str]) -> str:
        """Calculate user's preferred price range"""
        if not price_ranges:
            return 'medium'
        
        counter = Counter(price_ranges)
        return counter.most_common(1)[0][0]
    
    def _generate_recommendations(self, user_id: int, limit: int) -> List[Dict[str, Any]]:
        """Generate recommendations using hybrid approach"""
        
        # Get user preferences
        try:
            preferences = UserPreferences.objects.get(user_id=user_id)
        except UserPreferences.DoesNotExist:
            # Return popular items for new users
            return self._get_popular_recommendations(limit)
        
        # Content-based filtering
        content_recs = self._content_based_filtering(user_id, preferences, limit * 2)
        
        # Collaborative filtering
        collab_recs = self._collaborative_filtering(user_id, limit * 2)
        
        # Combine and rank
        combined_recs = self._combine_recommendations(content_recs, collab_recs, limit)
        
        # Add business rules
        final_recs = self._apply_business_rules(combined_recs, user_id)
        
        return final_recs[:limit]
    
    def _content_based_filtering(self, user_id: int, preferences: UserPreferences, limit: int) -> List[Dict[str, Any]]:
        """Content-based filtering based on user preferences"""
        recommendations = []
        
        # This would typically query your artwork database
        # For now, we'll simulate with mock data
        mock_artworks = self._get_mock_artworks()
        
        for artwork in mock_artworks:
            score = 0
            reasons = []
            
            # Category match
            if artwork['category'] in preferences.preferred_categories:
                score += 40
                reasons.append(f"Similar to your interest in {artwork['category']}")
            
            # Price range match
            if artwork['price_range'] == preferences.preferred_price_range:
                score += 30
                reasons.append(f"Matches your preferred price range")
            
            # Artist preference
            if artwork['artist_id'] in preferences.preferred_artists:
                score += 20
                reasons.append(f"From artists you like")
            
            # Popularity boost
            score += artwork['popularity_score']
            
            if score > 50:  # Threshold for recommendation
                recommendations.append({
                    'artwork_id': artwork['id'],
                    'title': artwork['title'],
                    'artist_name': artwork['artist_name'],
                    'category': artwork['category'],
                    'price': artwork['price'],
                    'image_url': artwork['image_url'],
                    'match_score': min(score, 95),  # Cap at 95%
                    'reasons': reasons[:3],  # Top 3 reasons
                    'algorithm': 'content-based'
                })
        
        return sorted(recommendations, key=lambda x: x['match_score'], reverse=True)[:limit]
    
    def _collaborative_filtering(self, user_id: int, limit: int) -> List[Dict[str, Any]]:
        """Collaborative filtering based on similar users"""
        # Get users with similar behavior
        similar_users = self._find_similar_users(user_id)
        
        if not similar_users:
            return []
        
        # Get items liked by similar users
        recommendations = []
        for similar_user_id in similar_users[:5]:  # Top 5 similar users
            user_behaviors = UserBehavior.objects.filter(
                user_id=similar_user_id,
                action_type__in=['like', 'purchase']
            ).values('artwork_id').distinct()
            
            for behavior in user_behaviors:
                if behavior['artwork_id']:
                    recommendations.append({
                        'artwork_id': behavior['artwork_id'],
                        'match_score': 75,  # Base score for collaborative
                        'reasons': ['Liked by users with similar tastes'],
                        'algorithm': 'collaborative'
                    })
        
        return recommendations[:limit]
    
    def _find_similar_users(self, user_id: int) -> List[int]:
        """Find users with similar behavior patterns"""
        # Get user's recent behaviors
        user_behaviors = UserBehavior.objects.filter(
            user_id=user_id,
            timestamp__gte=timezone.now() - timedelta(days=30)
        )
        
        user_categories = set(behavior.category for behavior in user_behaviors if behavior.category)
        user_artists = set(behavior.artist_id for behavior in user_behaviors if behavior.artist_id)
        
        if not user_categories and not user_artists:
            return []
        
        # Find users with overlapping preferences
        similar_users = []
        all_users = User.objects.exclude(id=user_id)
        
        for other_user in all_users:
            other_behaviors = UserBehavior.objects.filter(
                user_id=other_user.id,
                timestamp__gte=timezone.now() - timedelta(days=30)
            )
            
            other_categories = set(behavior.category for behavior in other_behaviors if behavior.category)
            other_artists = set(behavior.artist_id for behavior in other_behaviors if behavior.artist_id)
            
            # Calculate similarity
            category_overlap = len(user_categories & other_categories) / max(len(user_categories | other_categories), 1)
            artist_overlap = len(user_artists & other_artists) / max(len(user_artists | other_artists), 1)
            
            similarity = (category_overlap + artist_overlap) / 2
            
            if similarity > 0.3:  # 30% similarity threshold
                similar_users.append((other_user.id, similarity))
        
        # Return top similar users
        return [user_id for user_id, similarity in sorted(similar_users, key=lambda x: x[1], reverse=True)]
    
    def _combine_recommendations(self, content_recs: List[Dict], collab_recs: List[Dict], limit: int) -> List[Dict]:
        """Combine content-based and collaborative recommendations"""
        combined = {}
        
        # Add content-based recommendations with higher weight
        for rec in content_recs:
            artwork_id = rec['artwork_id']
            combined[artwork_id] = rec.copy()
            combined[artwork_id]['final_score'] = rec['match_score'] * 0.7  # 70% weight
        
        # Add collaborative recommendations
        for rec in collab_recs:
            artwork_id = rec['artwork_id']
            if artwork_id in combined:
                # Boost existing recommendation
                combined[artwork_id]['final_score'] += rec['match_score'] * 0.3
                combined[artwork_id]['reasons'].extend(rec['reasons'])
            else:
                # Add new recommendation
                combined[artwork_id] = rec.copy()
                combined[artwork_id]['final_score'] = rec['match_score'] * 0.3
        
        # Sort by final score and return
        return sorted(combined.values(), key=lambda x: x['final_score'], reverse=True)[:limit]
    
    def _apply_business_rules(self, recommendations: List[Dict], user_id: int) -> List[Dict]:
        """Apply business rules and constraints"""
        # Remove items user has already purchased
        purchased_items = set(
            UserBehavior.objects.filter(
                user_id=user_id,
                action_type='purchase'
            ).values_list('artwork_id', flat=True)
        )
        
        filtered_recs = [rec for rec in recommendations if rec['artwork_id'] not in purchased_items]
        
        # Add diversity (ensure different categories)
        diverse_recs = []
        used_categories = set()
        
        for rec in filtered_recs:
            if rec['category'] not in used_categories or len(diverse_recs) < 6:
                diverse_recs.append(rec)
                used_categories.add(rec['category'])
        
        return diverse_recs
    
    def _get_popular_recommendations(self, limit: int) -> List[Dict[str, Any]]:
        """Get popular items for new users"""
        # Get most liked/purchased items
        from django.db import models
        popular_items = UserBehavior.objects.filter(
            action_type__in=['like', 'purchase']
        ).values('artwork_id').annotate(
            popularity=models.Count('artwork_id')
        ).order_by('-popularity')[:limit]
        
        # Convert to recommendation format
        recommendations = []
        for item in popular_items:
            if item['artwork_id']:
                recommendations.append({
                    'artwork_id': item['artwork_id'],
                    'match_score': 60,  # Base popularity score
                    'reasons': ['Popular choice among buyers'],
                    'algorithm': 'popularity'
                })
        
        return recommendations
    
    def _get_mock_artworks(self) -> List[Dict[str, Any]]:
        """Mock artwork data for demonstration"""
        return [
            {
                'id': 1,
                'title': 'Abstract Harmony',
                'artist_name': 'Priya Sharma',
                'artist_id': 1,
                'category': 'abstract',
                'price': 15000,
                'price_range': 'high',
                'image_url': '/sample/abstract1.jpg',
                'popularity_score': 15
            },
            {
                'id': 2,
                'title': 'Ocean Waves',
                'artist_name': 'Rahul Mehta',
                'artist_id': 2,
                'category': 'landscape',
                'price': 8000,
                'price_range': 'medium',
                'image_url': '/sample/landscape1.jpg',
                'popularity_score': 12
            },
            # Add more mock artworks...
        ]
    
    def _get_cached_recommendations(self, user_id: int) -> List[Dict[str, Any]]:
        """Get cached recommendations if still valid"""
        try:
            cache = RecommendationCache.objects.get(
                user_id=user_id,
                expires_at__gt=timezone.now()
            )
            return cache.recommendations
        except RecommendationCache.DoesNotExist:
            return None
    
    def _cache_recommendations(self, user_id: int, recommendations: List[Dict[str, Any]]):
        """Cache recommendations for performance"""
        try:
            # Remove old cache
            RecommendationCache.objects.filter(user_id=user_id).delete()
            
            # Create new cache
            RecommendationCache.objects.create(
                user_id=user_id,
                recommendations=recommendations,
                algorithm_version=self.algorithm_version,
                expires_at=timezone.now() + self.cache_duration
            )
        except Exception as e:
            # If caching fails, just log it and continue
            print(f"Failed to cache recommendations: {e}")
