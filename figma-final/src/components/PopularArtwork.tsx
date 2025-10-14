import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Eye, ArrowRight } from "lucide-react";

const artworks = [
  {
    id: 1,
    title: "Abstract Dreams",
    artist: "Sarah Chen",
    price: 37500,
    category: "Painting",
    image: "https://images.unsplash.com/photo-1536241455566-5709c3aefd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1vZGVybiUyMGFydCUyMHBhaW50aW5nfGVufDF8fHx8MTc1NTE4NjExMHww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 234,
    views: 1200,
    trending: true
  },
  {
    id: 2,
    title: "Ceramic Elegance",
    artist: "Marcus Rivera",
    price: 10000,
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1675604587136-f91dc1a4473b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwdmFzZSUyMHBvdHRlcnl8ZW58MXx8fHwxNzU1MTk4NjYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 89,
    views: 456,
    trending: false
  },
  {
    id: 3,
    title: "Golden Necklace",
    artist: "Elena Kozlova",
    price: 23000,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1613989999658-0075d1359836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBuZWNrbGFjZXxlbnwxfHx8fDE3NTUxOTg2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 156,
    views: 789,
    trending: true
  },
  {
    id: 4,
    title: "Modern Sculpture",
    artist: "David Kim",
    price: 70500,
    category: "Sculpture",
    image: "https://images.unsplash.com/photo-1750920362984-0a0d44d04577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmUlMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc1NTE5ODY2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 67,
    views: 234,
    trending: false
  },
  {
    id: 5,
    title: "Floral Watercolor",
    artist: "Sarah Chen",
    price: 26500,
    category: "Painting",
    image: "https://images.unsplash.com/photo-1700608277944-98b04da666ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBmbG93ZXJzfGVufDF8fHx8MTc1NTE5ODY2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 198,
    views: 1100,
    trending: true
  },
  {
    id: 6,
    title: "Minimalist Vase",
    artist: "Marcus Rivera",
    price: 8000,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    likes: 76,
    views: 345,
    trending: false
  }
];

interface PopularArtworkProps {
  onNavigateToGallery?: () => void;
}

export function PopularArtwork({ onNavigateToGallery }: PopularArtworkProps) {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Static section background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/70 via-pink-50/60 to-blue-100/70"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-100/50 via-transparent to-yellow-100/40"></div>
        
        {/* Static mesh pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mesh" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 L80 40 M40 0 L40 80" stroke="currentColor" strokeWidth="0.5" className="text-pink-400/50" fill="none" />
                <circle cx="40" cy="40" r="2" fill="currentColor" className="text-purple-400/40" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-800 mb-4">
            Popular Artwork
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most loved pieces from talented artists around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className="group"
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-purple-200/50 hover:border-pink-300/70 bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:-translate-y-3 hover:scale-105">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-600"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs bg-white/95 backdrop-blur-sm shadow-sm text-gray-700">
                      {artwork.category}
                    </Badge>
                  </div>
                  
                  {artwork.trending && (
                    <div className="absolute top-3 right-3">
                      <Badge className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                        Trending
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <div className="bg-purple-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center backdrop-blur-sm shadow-sm hover:bg-purple-600/90 transition-colors">
                      <Heart className="h-3 w-3 mr-1" />
                      {artwork.likes}
                    </div>
                    <div className="bg-purple-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center backdrop-blur-sm shadow-sm hover:bg-purple-600/90 transition-colors">
                      <Eye className="h-3 w-3 mr-1" />
                      {artwork.views}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4 bg-white/90 backdrop-blur-sm">
                  <h3 className="text-gray-800 mb-1">
                    {artwork.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    by {artwork.artist}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-purple-600 group-hover:text-purple-700 transition-colors">
                      ₹{artwork.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-gray-500">
                      Free shipping
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={onNavigateToGallery}
            className="text-purple-600 hover:text-pink-600 transition-colors duration-300 inline-flex items-center group bg-transparent border-none cursor-pointer"
          >
            View All Artwork 
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}