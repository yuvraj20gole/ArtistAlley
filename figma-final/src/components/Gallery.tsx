import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, Grid3x3, List, Filter, Search, Heart, Eye, Camera, Palette, Layers, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GalleryProps {
  onNavigateToHome: () => void;
  onNavigateToRegister: (defaultRole?: string) => void;
}

export function Gallery({ onNavigateToHome, onNavigateToRegister }: GalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Artwork', count: 1247, icon: Layers },
    { id: 'paintings', name: 'Paintings', count: 456, icon: Palette },
    { id: 'digital', name: 'Digital Art', count: 321, icon: Camera },
    { id: 'sculptures', name: 'Sculptures', count: 189, icon: Sparkles },
    { id: 'photography', name: 'Photography', count: 234, icon: Eye },
    { id: 'mixed', name: 'Mixed Media', count: 47, icon: Layers }
  ];

  const artworkCollection = [
    {
      id: 1,
      title: "Gallery Exhibition",
      artist: "Contemporary Masters",
      category: "exhibitions",
      medium: "Mixed Exhibition",
      price: "Exhibition",
      dimensions: "Gallery Space",
      year: 2024,
      image: "https://images.unsplash.com/photo-1713779490284-a81ff6a8ffae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NTY1MDQ0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      views: 1247,
      likes: 89,
      featured: true,
      description: "A curated exhibition showcasing contemporary art from emerging and established artists."
    },
    {
      id: 2,
      title: "Flowing Waters",
      artist: "Meera Krishnan",
      category: "paintings",
      medium: "Watercolor",
      price: "₹18,500",
      dimensions: "16\" x 20\"",
      year: 2024,
      image: "https://images.unsplash.com/photo-1703587820463-31df3ad2d39b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBhcnR8ZW58MXx8fHwxNzU2NDg2MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      views: 892,
      likes: 67,
      featured: false,
      description: "A serene watercolor painting capturing the gentle flow of water through natural landscapes."
    },
    {
      id: 3,
      title: "Digital Dreams",
      artist: "Arjun Tech",
      category: "digital",
      medium: "Digital Illustration",
      price: "₹25,000",
      dimensions: "24\" x 36\"",
      year: 2024,
      image: "https://images.unsplash.com/photo-1634035302742-91206968e455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1NjQzNzEzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      views: 1456,
      likes: 134,
      featured: true,
      description: "A vibrant digital artwork exploring futuristic themes and imaginative landscapes."
    },
    {
      id: 4,
      title: "Classical Beauty",
      artist: "Ravi Saxena",
      category: "paintings",
      medium: "Oil on Canvas",
      price: "₹65,000",
      dimensions: "30\" x 40\"",
      year: 2023,
      image: "https://images.unsplash.com/photo-1681235853785-abd5838a71ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBwYWludGluZyUyMGNhbnZhc3xlbnwxfHx8fDE3NTY0ODQxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      views: 743,
      likes: 52,
      featured: false,
      description: "A masterful oil painting showcasing traditional techniques with contemporary appeal."
    }
  ];

  const featuredExhibitions = [
    {
      title: "Contemporary Visions",
      curator: "Dr. Anita Rao",
      artworks: 24,
      duration: "Jan 15 - Mar 30, 2024",
      description: "Exploring modern artistic expressions and contemporary themes."
    },
    {
      title: "Traditional Roots",
      curator: "Prof. Suresh Kumar",
      artworks: 18,
      duration: "Feb 1 - Apr 15, 2024",
      description: "Celebrating India's rich artistic heritage and traditional crafts."
    },
    {
      title: "Digital Frontier",
      curator: "Nikita Sharma",
      artworks: 15,
      duration: "Mar 1 - May 20, 2024",
      description: "The intersection of technology and artistic expression."
    }
  ];

  const filteredArtwork = selectedCategory === 'all' 
    ? artworkCollection 
    : artworkCollection.filter(artwork => artwork.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-200/40">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={onNavigateToHome}
            className="mb-6 text-gray-600 hover:text-blue-600 hover:bg-blue-100/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl text-gray-800 flex items-center justify-center gap-3">
              <Palette className="w-8 h-8 text-blue-500" />
              Art Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore curated collections and discover exceptional artwork from talented artists
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-blue-500" />
                <span>Curated Collections</span>
              </div>
              <div className="flex items-center gap-1">
                <Layers className="w-4 h-4 text-green-500" />
                <span>All Categories</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Featured Artists</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Search and Filters */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search artwork, artists, or styles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'masonry' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('masonry')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Exhibitions */}
        <section>
          <h2 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            Featured Exhibitions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredExhibitions.map((exhibition, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg text-gray-800 mb-2">{exhibition.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">Curated by {exhibition.curator}</p>
                  <p className="text-gray-600 mb-4 text-sm">{exhibition.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Artworks:</span>
                      <span className="text-gray-800">{exhibition.artworks} pieces</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-gray-800 text-xs">{exhibition.duration}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Exhibition
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Category Navigation */}
        <section>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-6 w-full max-w-4xl mx-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex flex-col gap-1">
                  <category.icon className="w-4 h-4" />
                  <span className="text-xs">{category.name}</span>
                  <Badge variant="secondary" className="text-xs px-1">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </section>

        {/* Artwork Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-800">
              {selectedCategory === 'all' ? 'All Artwork' : 
               categories.find(cat => cat.id === selectedCategory)?.name || 'Artwork'}
            </h2>
            <div className="text-gray-600">
              {filteredArtwork.length} pieces
            </div>
          </div>
          
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {filteredArtwork.map((artwork) => (
              <Card key={artwork.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={artwork.image}
                    alt={artwork.title}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === 'grid' ? 'h-64' : 'h-80'
                    }`}
                  />
                  {artwork.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-blue-500 text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button size="sm" variant="secondary" className="p-2 bg-white/90 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-4 text-white text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{artwork.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{artwork.likes}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-3">
                    <Badge variant="outline" className="text-xs">
                      {artwork.medium}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg text-gray-800 mb-1">{artwork.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {artwork.artist}</p>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{artwork.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{artwork.dimensions}</span>
                    <span>{artwork.year}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg text-blue-600">{artwork.price}</div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Discover More */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl text-gray-800 mb-4">Discover More Art</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of art lovers and get access to exclusive collections, artist interviews, and curated exhibitions.
          </p>
          <div className="flex items-center justify-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-500" />
              <span>Curated Collections</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-500" />
              <span>Artist Spotlights</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-500" />
              <span>Exclusive Access</span>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 mr-4"
            onClick={() => onNavigateToRegister()}
          >
            <Heart className="w-5 h-5 mr-2" />
            Join Community
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Camera className="w-5 h-5 mr-2" />
            Virtual Tours
          </Button>
        </section>
      </div>
    </div>
  );
}