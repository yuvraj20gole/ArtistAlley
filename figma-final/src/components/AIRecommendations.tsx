import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sparkles, Heart, TrendingUp, ShoppingBag, UserPlus, Info } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Artist {
  id: number;
  name: string;
  specialty: string;
  image: string;
  artworkCount: number;
  priceRange: string;
  matchScore: number;
  similarTo: string[];
  reasons: string[];
  isFollowing: boolean;
  hasPurchasedFrom: boolean;
}

interface FollowedArtist {
  id: number;
  name: string;
  specialty: string;
}

// Mock data for followed/purchased artists
const followedArtists: FollowedArtist[] = [
  { id: 1, name: "Priya Sharma", specialty: "Abstract Paintings" },
  { id: 2, name: "Rahul Mehta", specialty: "Landscape Art" },
  { id: 5, name: "Meera Reddy", specialty: "Traditional Decor" },
];

const purchasedFromArtists: FollowedArtist[] = [
  { id: 1, name: "Priya Sharma", specialty: "Abstract Paintings" },
  { id: 3, name: "Anjali Kapoor", specialty: "Ceramic Art" },
];

// AI-recommended artists based on following and purchase history
const recommendedArtists: Artist[] = [
  {
    id: 9,
    name: "Deepak Kumar",
    specialty: "Contemporary Abstract",
    image: "abstract artist",
    artworkCount: 24,
    priceRange: "₹6,000 - ₹15,000",
    matchScore: 95,
    similarTo: ["Priya Sharma"],
    reasons: [
      "Similar abstract painting style to Priya Sharma",
      "Price range matches your purchase history",
      "Popular among buyers who follow Priya Sharma"
    ],
    isFollowing: false,
    hasPurchasedFrom: false,
  },
  {
    id: 10,
    name: "Lakshmi Nair",
    specialty: "Nature & Landscapes",
    image: "landscape artist",
    artworkCount: 31,
    priceRange: "₹8,000 - ₹18,000",
    matchScore: 92,
    similarTo: ["Rahul Mehta"],
    reasons: [
      "Creates landscape art like Rahul Mehta",
      "Similar color palette and technique",
      "Highly rated by your network"
    ],
    isFollowing: false,
    hasPurchasedFrom: false,
  },
  {
    id: 11,
    name: "Amit Malhotra",
    specialty: "Modern Ceramics",
    image: "ceramic artist",
    artworkCount: 18,
    priceRange: "₹3,000 - ₹8,000",
    matchScore: 88,
    similarTo: ["Anjali Kapoor"],
    reasons: [
      "Similar ceramic style to Anjali Kapoor",
      "You've purchased from ceramic artists before",
      "Specializes in modern designs you might like"
    ],
    isFollowing: false,
    hasPurchasedFrom: false,
  },
  {
    id: 12,
    name: "Pooja Deshmukh",
    specialty: "Traditional Textiles",
    image: "textile artist",
    artworkCount: 27,
    priceRange: "₹5,000 - ₹12,000",
    matchScore: 85,
    similarTo: ["Meera Reddy"],
    reasons: [
      "Creates traditional decor like Meera Reddy",
      "Handcrafted textiles match your interests",
      "Price range fits your budget"
    ],
    isFollowing: false,
    hasPurchasedFrom: false,
  },
  {
    id: 13,
    name: "Ravi Shankar",
    specialty: "Abstract Expressionism",
    image: "expressionist artist",
    artworkCount: 22,
    priceRange: "₹7,000 - ₹20,000",
    matchScore: 82,
    similarTo: ["Priya Sharma", "Rahul Mehta"],
    reasons: [
      "Combines styles from multiple artists you follow",
      "Bold colors and expressive techniques",
      "Featured in collections similar to yours"
    ],
    isFollowing: false,
    hasPurchasedFrom: false,
  },
  {
    id: 14,
    name: "Neha Gupta",
    specialty: "Minimalist Ceramics",
    image: "minimalist artist",
    artworkCount: 16,
    priceRange: "₹4,000 - ₹10,000",
    matchScore: 79,
    similarTo: ["Anjali Kapoor"],
    reasons: [
      "Modern minimalist approach to ceramics",
      "Complements your existing collection",
      "Rising artist with unique perspective"
    ],
    isFollowing: false,
    hasPurchasedFrom: false,
  },
];

export function AIRecommendations() {
  const [artists, setArtists] = useState(recommendedArtists);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleFollow = (artistId: number) => {
    setArtists(artists.map(artist => 
      artist.id === artistId 
        ? { ...artist, isFollowing: !artist.isFollowing }
        : artist
    ));
    
    const artist = artists.find(a => a.id === artistId);
    if (artist) {
      toast.success(artist.isFollowing ? `Unfollowed ${artist.name}` : `Now following ${artist.name}!`);
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    return "text-amber-600 bg-amber-50";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>AI Artist Recommendations</h2>
        </div>
        <p className="text-stone-600">Discover artists similar to those you follow and have purchased from</p>
      </div>

      {/* How It Works */}
      <Card className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm border-purple-200/50 p-6">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-2 w-full text-left"
        >
          <Info className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg" style={{ fontFamily: 'Playfair Display' }}>How AI Recommendations Work</h3>
        </button>
        
        {showExplanation && (
          <div className="mt-4 space-y-3 text-stone-700">
            <p>Our AI analyzes your activity to suggest artists you'll love:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Artists you follow and their specialties</li>
              <li>Your purchase history and preferences</li>
              <li>Similar styles, price ranges, and techniques</li>
              <li>Popular choices among users with similar tastes</li>
            </ul>
          </div>
        )}
      </Card>

      {/* Your Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-pink-600" />
            <h3 className="text-lg" style={{ fontFamily: 'Playfair Display' }}>Artists You Follow</h3>
          </div>
          <div className="space-y-2">
            {followedArtists.map((artist) => (
              <div key={artist.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <div>
                  <p>{artist.name}</p>
                  <p className="text-sm text-stone-600">{artist.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-green-600" />
            <h3 className="text-lg" style={{ fontFamily: 'Playfair Display' }}>Purchased From</h3>
          </div>
          <div className="space-y-2">
            {purchasedFromArtists.map((artist) => (
              <div key={artist.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <div>
                  <p>{artist.name}</p>
                  <p className="text-sm text-stone-600">{artist.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recommended Artists */}
      <div>
        <h3 className="text-xl mb-4" style={{ fontFamily: 'Playfair Display' }}>Recommended for You</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {artists.map((artist) => (
            <Card key={artist.id} className="bg-white/80 backdrop-blur-sm border-stone-200/50 overflow-hidden hover:shadow-xl transition-all">
              <div className="p-6">
                <div className="flex gap-4 mb-4">
                  {/* Artist Image */}
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-stone-100 flex-shrink-0">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80`}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Artist Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="mb-1" style={{ fontFamily: 'Playfair Display' }}>{artist.name}</h4>
                        <p className="text-stone-600 text-sm">{artist.specialty}</p>
                      </div>
                      <Badge className={`${getMatchColor(artist.matchScore)} border-none`}>
                        {artist.matchScore}% Match
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm text-stone-600">
                      <p className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {artist.artworkCount} artworks
                      </p>
                      <p>{artist.priceRange}</p>
                    </div>
                  </div>
                </div>

                {/* Similar To */}
                <div className="mb-4">
                  <p className="text-sm mb-2">
                    <span className="text-stone-600">Similar to:</span>{' '}
                    {artist.similarTo.map((name, idx) => (
                      <span key={idx}>
                        <span className="text-purple-600">{name}</span>
                        {idx < artist.similarTo.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                </div>

                {/* AI Reasons */}
                <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <p className="text-sm">Why we recommend this artist:</p>
                  </div>
                  <ul className="space-y-1 text-sm text-stone-700">
                    {artist.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleFollow(artist.id)}
                    variant={artist.isFollowing ? "outline" : "default"}
                    className={`flex-1 ${
                      artist.isFollowing 
                        ? 'border-stone-300' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    }`}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {artist.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-stone-300"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-br from-stone-800 to-neutral-800 text-white p-8 text-center">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-amber-400" />
        <h3 className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display' }}>Get Better Recommendations</h3>
        <p className="text-stone-200 mb-6 max-w-2xl mx-auto">
          Follow more artists and make purchases to help our AI understand your preferences better
        </p>
        <Button
          className="bg-white text-stone-800 hover:bg-stone-100"
        >
          Browse All Artists
        </Button>
      </Card>
    </div>
  );
}
