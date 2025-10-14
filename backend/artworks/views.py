from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.db.models import Q
from .models import Artwork, Promotion
from .serializers import (
    ArtworkSerializer, ArtworkCreateSerializer,
    PromotionSerializer, PromotionCreateSerializer
)

User = get_user_model()

class ArtworkListCreateView(generics.ListCreateAPIView):
    serializer_class = ArtworkSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Artwork.objects.filter(artist=user).order_by('-created_at')
        return Artwork.objects.none()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ArtworkCreateSerializer
        return ArtworkSerializer

    def perform_create(self, serializer):
        serializer.save(artist=self.request.user)


class ArtworkDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArtworkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Artwork.objects.filter(artist=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ArtworkCreateSerializer
        return ArtworkSerializer


class PublicArtworkListView(generics.ListAPIView):
    """Public view for browsing all artworks"""
    serializer_class = ArtworkSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Artwork.objects.filter(status='active').order_by('-created_at')
        
        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        
        # Search by title or description
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search) |
                Q(tags__icontains=search)
            )
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        return queryset


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def increment_artwork_views(request, artwork_id):
    """Increment view count for an artwork"""
    try:
        artwork = Artwork.objects.get(id=artwork_id)
        artwork.increment_views()
        return Response({'views': artwork.views}, status=status.HTTP_200_OK)
    except Artwork.DoesNotExist:
        return Response({'error': 'Artwork not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def like_artwork(request, artwork_id):
    """Like an artwork"""
    try:
        artwork = Artwork.objects.get(id=artwork_id)
        artwork.increment_likes()
        return Response({'likes': artwork.likes}, status=status.HTTP_200_OK)
    except Artwork.DoesNotExist:
        return Response({'error': 'Artwork not found'}, status=status.HTTP_404_NOT_FOUND)


class PromotionListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Promotion.objects.filter(artist=self.request.user).order_by('-created_at')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PromotionCreateSerializer
        return PromotionSerializer

    def perform_create(self, serializer):
        serializer.save(artist=self.request.user)


class PromotionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PromotionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Promotion.objects.filter(artist=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_artwork_categories(request):
    """Get list of available artwork categories"""
    categories = [{'value': choice[0], 'label': choice[1]} for choice in Artwork.CATEGORY_CHOICES]
    return Response(categories, status=status.HTTP_200_OK)