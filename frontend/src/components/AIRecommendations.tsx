import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sparkles, Heart, TrendingUp, ShoppingBag, UserPlus, Info, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AIRecommendation, trackUserBehavior } from "../services/api";
import { cartUtils } from "../utils/cart";

interface RecommendationItem {
  artwork_id: number;
  title: string;
  artist_name: string;
  category: string;
  price: number;
  image_url: string;
  match_score: number;
  reasons: string[];
  algorithm: string;
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followedArtists, setFollowedArtists] = useState<Set<string>>(new Set());

  // Load recommendations
  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get user ID from localStorage or use a default
      const userId = localStorage.getItem('userId') || '1';
      const data = await AIRecommendation(userId);
      setRecommendations(data);
      
      console.log('AI Recommendations loaded:', data);
    } catch (err) {
      console.error('Failed to load recommendations:', err);
      setError('Failed to load AI recommendations');
      toast.error('Failed to load recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleArtworkAction = async (artworkId: number, action: 'view' | 'like' | 'cart_add' | 'follow_artist', artistName?: string) => {
    try {
      // Track user behavior for AI learning
      await trackUserBehavior({
        action_type: action,
        artwork_id: artworkId,
        category: recommendations.find(r => r.artwork_id === artworkId)?.category,
      });
      
      if (action === 'like') {
        toast.success('Added to favorites! This helps improve your recommendations.');
      } else if (action === 'cart_add') {
        // Add to cart using cartUtils
        const artwork = recommendations.find(r => r.artwork_id === artworkId);
        if (artwork) {
          cartUtils.addToCart({
            id: artwork.artwork_id,
            title: artwork.title,
            artist_name: artwork.artist_name,
            artist_username: artwork.artist_name.toLowerCase().replace(/\s+/g, '_'),
            price: artwork.price,
            image_url: artwork.image_url,
            category: artwork.category
          });
          toast.success('Added to cart!');
        }
      } else if (action === 'follow_artist' && artistName) {
        // Add to followed artists
        setFollowedArtists(prev => new Set([...prev, artistName]));
        toast.success(`Now following ${artistName}! You'll see more of their work.`);
      }
    } catch (err) {
      console.error('Failed to track behavior:', err);
      // Still show success message even if tracking fails
      if (action === 'like') {
        toast.success('Added to favorites!');
      } else if (action === 'cart_add') {
        // Add to cart using cartUtils even if tracking fails
        const artwork = recommendations.find(r => r.artwork_id === artworkId);
        if (artwork) {
          cartUtils.addToCart({
            id: artwork.artwork_id,
            title: artwork.title,
            artist_name: artwork.artist_name,
            artist_username: artwork.artist_name.toLowerCase().replace(/\s+/g, '_'),
            price: artwork.price,
            image_url: artwork.image_url,
            category: artwork.category
          });
          toast.success('Added to cart!');
        }
      } else if (action === 'follow_artist' && artistName) {
        // Add to followed artists even if tracking fails
        setFollowedArtists(prev => new Set([...prev, artistName]));
        toast.success(`Now following ${artistName}!`);
      }
    }
  };

  const handleRefreshRecommendations = () => {
    loadRecommendations();
    toast.success('Recommendations refreshed! New artwork based on your preferences is now available.');
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 55) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getAlgorithmIcon = (algorithm: string) => {
    switch (algorithm) {
      case 'content-based':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'collaborative':
        return <UserPlus className="w-4 h-4 text-blue-600" />;
      case 'popularity':
        return <Sparkles className="w-4 h-4 text-yellow-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) {
  return (
      <div className="space-y-8">
      {/* Header */}
        <div className="flex items-center justify-between">
      <div>
            <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display' }}>
              AI-Powered Recommendations
            </h2>
            <p className="text-stone-600">
              Discover artwork tailored to your preferences
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Loading recommendations...</span>
          </div>
                </div>

        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </Card>
            ))}
          </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <Info className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Failed to Load Recommendations</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={loadRecommendations} className="mx-auto">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
                </div>
              </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display' }}>
            🎨 AI-Powered Recommendations
          </h2>
          <p className="text-stone-600">
            Discover artwork tailored to your preferences
          </p>
          </div>
        <Button 
          onClick={handleRefreshRecommendations}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          size="sm"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Get New Recommendations
        </Button>
      </div>

      {/* Recommendations Grid */}
      <div>
        {recommendations.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Recommendations Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start browsing and liking artwork to get personalized recommendations!
            </p>
            <Button onClick={() => window.location.href = '/buyer-dashboard?tab=browse'}>
              Browse Artwork
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <Card key={rec.artwork_id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-square relative overflow-hidden">
                    <ImageWithFallback
                    src={rec.image_url}
                    alt={rec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge className={`text-xs ${getMatchScoreColor(rec.match_score)}`}>
                      {rec.match_score}% match
                      </Badge>
                    <div className="bg-white/90 rounded-full p-1">
                      {getAlgorithmIcon(rec.algorithm)}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                      onClick={() => handleArtworkAction(rec.artwork_id, 'like')}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-1">{rec.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground">{rec.artist_name}</p>
                    <Button
                      size="sm"
                      variant={followedArtists.has(rec.artist_name) ? "default" : "outline"}
                      className={`text-xs ${followedArtists.has(rec.artist_name) ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                      onClick={() => handleArtworkAction(rec.artwork_id, 'follow_artist', rec.artist_name)}
                      disabled={followedArtists.has(rec.artist_name)}
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      {followedArtists.has(rec.artist_name) ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <div className="mb-3">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      onClick={() => handleArtworkAction(rec.artwork_id, 'cart_add')}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                  
                  {/* Reasons */}
                  <div className="mb-3">
                    {rec.reasons.slice(0, 2).map((reason, index) => (
                      <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                        {reason}
                      </Badge>
                    ))}
                </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">₹{rec.price.toLocaleString()}</span>
                  </div>
              </div>
            </Card>
          ))}
        </div>
        )}
      </div>

      {/* How It Works */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">How AI Recommendations Work</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <h4 className="font-medium">Content-Based Filtering</h4>
              <p className="text-sm text-muted-foreground">
                Analyzes your viewing history, likes, and purchases to recommend similar artwork
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <UserPlus className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium">Collaborative Filtering</h4>
              <p className="text-sm text-muted-foreground">
                Finds users with similar tastes and recommends what they liked
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-yellow-600 mt-1" />
            <div>
              <h4 className="font-medium">Popularity & Trends</h4>
              <p className="text-sm text-muted-foreground">
                Includes trending and popular items that match your preferences
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AIRecommendations;