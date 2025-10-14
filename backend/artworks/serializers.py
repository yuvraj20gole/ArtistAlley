from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import Artwork, Promotion

User = get_user_model()

class ArtworkSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist.full_name', read_only=True)
    artist_username = serializers.CharField(source='artist.username', read_only=True)
    image_url = serializers.SerializerMethodField()
    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = Artwork
        fields = [
            'id', 'title', 'description', 'category', 'price', 'image_url',
            'status', 'views', 'likes', 'created_at', 'updated_at',
            'is_featured', 'tags', 'artist_name', 'artist_username', 'discounted_price'
        ]
        read_only_fields = ['artist', 'views', 'likes', 'created_at', 'updated_at']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_discounted_price(self, obj):
        # Get active promotion for this artwork
        active_promotion = obj.promotions.filter(
            is_active=True,
            start_date__lte=timezone.now(),
            end_date__gte=timezone.now()
        ).first()
        
        if active_promotion:
            return active_promotion.get_discounted_price(obj.price)
        return obj.price

    def create(self, validated_data):
        # Set the artist to the current user
        validated_data['artist'] = self.context['request'].user
        return super().create(validated_data)


class ArtworkCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = [
            'title', 'description', 'category', 'price', 'image',
            'tags', 'status'
        ]

    def create(self, validated_data):
        validated_data['artist'] = self.context['request'].user
        return super().create(validated_data)


class PromotionSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist.full_name', read_only=True)
    artwork_count = serializers.SerializerMethodField()
    is_currently_active = serializers.SerializerMethodField()

    class Meta:
        model = Promotion
        fields = [
            'id', 'title', 'description', 'discount_percentage',
            'start_date', 'end_date', 'is_active', 'created_at',
            'artist_name', 'artwork_count', 'is_currently_active'
        ]
        read_only_fields = ['artist', 'created_at']

    def get_artwork_count(self, obj):
        return obj.artworks.count()

    def get_is_currently_active(self, obj):
        return obj.is_currently_active()

    def create(self, validated_data):
        validated_data['artist'] = self.context['request'].user
        return super().create(validated_data)


class PromotionCreateSerializer(serializers.ModelSerializer):
    artwork_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Promotion
        fields = [
            'title', 'description', 'discount_percentage',
            'start_date', 'end_date', 'artwork_ids'
        ]

    def create(self, validated_data):
        artwork_ids = validated_data.pop('artwork_ids', [])
        validated_data['artist'] = self.context['request'].user
        
        promotion = super().create(validated_data)
        
        # Add artworks to promotion
        if artwork_ids:
            artworks = Artwork.objects.filter(
                id__in=artwork_ids,
                artist=promotion.artist
            )
            promotion.artworks.set(artworks)
        
        return promotion
