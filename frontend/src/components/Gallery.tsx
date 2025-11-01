import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, Grid3x3, List, Filter, Search, Heart, Eye, Camera, Palette, Layers, Sparkles, Play, X, ArrowRight, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface GalleryProps {
  onNavigateToHome: () => void;
  onNavigateToRegister: (defaultRole?: string) => void;
}

export function Gallery({ onNavigateToHome, onNavigateToRegister }: GalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExhibition, setSelectedExhibition] = useState<any>(null);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'All Exhibition', count: 1247, icon: Layers },
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
      duration: "Jan 15 - Mar 30, 2026",
      description: "Exploring modern artistic expressions and contemporary themes.",
      buttonText: "View Exhibition"
    },
    {
      title: "Traditional Roots",
      curator: "Prof. Suresh Kumar",
      artworks: 18,
      duration: "Feb 1 - Apr 15, 2026",
      description: "Celebrating India's rich artistic heritage and traditional crafts.",
      buttonText: "Explore Heritage"
    },
    {
      title: "Digital Frontier",
      curator: "Nikita Sharma",
      artworks: 15,
      duration: "Mar 1 - May 20, 2026",
      description: "The intersection of technology and artistic expression.",
      buttonText: "Enter Digital World"
    }
  ];

  const filteredArtwork = artworkCollection.filter(artwork => {
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.medium.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      case 'price-low':
        return parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''));
      case 'popular':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const handleViewExhibition = (exhibition: any) => {
    setSelectedExhibition(exhibition);
    toast.success(`Opening ${exhibition.title} exhibition details...`);
  };

  const handleVirtualTour = () => {
    setShowVirtualTour(true);
    toast.success('🎥 Starting virtual gallery tour...');
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
    toast.success(showFilters ? 'Filters hidden' : 'Filters shown');
  };

  const handlePreview = () => {
    toast.info('Preview feature coming soon! Join our community to get early access.');
  };

  const closeExhibitionModal = () => {
    setSelectedExhibition(null);
  };

  const closeVirtualTour = () => {
    setShowVirtualTour(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-8 px-4 bg-gradient-to-br from-purple-50 to-pink-50 border-b border-purple-200/40">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={onNavigateToHome}
            className="mb-6 text-gray-600 hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl text-gray-800 flex items-center justify-center gap-3">
              <Palette className="w-8 h-8 text-purple-500" />
              Art Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore curated collections and discover exceptional artwork from talented artists
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-purple-500" />
                <span>Curated Collections</span>
              </div>
              <div className="flex items-center gap-1">
                <Layers className="w-4 h-4 text-pink-500" />
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
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length > 2) {
                      toast.success(`Searching for: ${e.target.value}`);
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-purple-400/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      toast.success('Search cleared');
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant={showFilters ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => {
                  handleFilterToggle();
                  toast.success(showFilters ? 'Filters hidden' : 'Filters shown');
                }}
                title="Toggle Filters"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setViewMode('grid');
                    toast.success('Switched to Grid View');
                  }}
                  className="p-2"
                  title="Grid View"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'masonry' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setViewMode('masonry');
                    toast.success('Switched to List View');
                  }}
                  className="p-2"
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      toast.success(`Sorted by: ${e.target.value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
                    }}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-purple-400/20"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select 
                    value={priceRange} 
                    onChange={(e) => {
                      setPriceRange(e.target.value);
                      toast.success(`Price range: ${e.target.value === 'all' ? 'All prices' : e.target.value}`);
                    }}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-purple-400/20"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-10k">Under ₹10,000</option>
                    <option value="10k-25k">₹10,000 - ₹25,000</option>
                    <option value="25k-50k">₹25,000 - ₹50,000</option>
                    <option value="over-50k">Over ₹50,000</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setSortBy('recent');
                      setPriceRange('all');
                      toast.success('Filters cleared');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
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
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => handleViewExhibition(exhibition)}
                  >
                    {exhibition.buttonText}
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
              {selectedCategory === 'all' ? 'All Exhibition' : 
               categories.find(cat => cat.id === selectedCategory)?.name || 'Exhibition'}
            </h2>
            <div className="text-gray-600">
              {filteredArtwork.length} pieces
            </div>
          </div>
          
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
            {filteredArtwork.map((artwork) => (
              <Card key={artwork.id} className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${viewMode === 'masonry' ? 'flex md:flex-row flex-col' : ''}`}>
                <div className={`relative ${viewMode === 'masonry' ? 'md:w-1/3 w-full' : 'w-full'}`}>
                  <ImageWithFallback
                    src={artwork.image}
                    alt={artwork.title}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === 'grid' ? 'h-64' : viewMode === 'masonry' ? 'h-48 md:h-full' : 'h-80'
                    }`}
                  />
                  {artwork.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-purple-500 text-white border-0">
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
                
                <CardContent className={`p-6 ${viewMode === 'masonry' ? 'md:w-2/3 w-full flex flex-col justify-between' : ''}`}>
                  <div>
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
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg text-purple-600">{artwork.price}</div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedArtwork(artwork)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Discover More */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl text-gray-800 mb-4">Discover More Art</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of art lovers and get access to exclusive collections, artist interviews, and curated exhibitions.
          </p>
          <div className="flex items-center justify-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-500" />
              <span>Curated Collections</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-pink-500" />
              <span>Artist Spotlights</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>Exclusive Access</span>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 mr-4"
            onClick={() => onNavigateToRegister()}
          >
            <Heart className="w-5 h-5 mr-2" />
            Join Community
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
            onClick={handleVirtualTour}
          >
            <Camera className="w-5 h-5 mr-2" />
            Virtual Tours
          </Button>
        </section>
      </div>

      {/* Exhibition Details Modal */}
      {selectedExhibition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedExhibition.title}</h2>
                <Button variant="ghost" size="sm" onClick={closeExhibitionModal}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-600">Curated by <strong>{selectedExhibition.curator}</strong></span>
                </div>
                
                <p className="text-gray-700">{selectedExhibition.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Number of Artworks</div>
                    <div className="text-xl font-bold text-purple-600">{selectedExhibition.artworks} pieces</div>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="text-lg font-semibold text-pink-600">{selectedExhibition.duration}</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">What to Expect</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Immersive art experience with curated pieces</li>
                    <li>• Artist insights and behind-the-scenes stories</li>
                    <li>• Interactive displays and multimedia content</li>
                    <li>• Expert-guided tours available</li>
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => onNavigateToRegister('buyer')}>
                    <Heart className="w-4 h-4 mr-2" />
                    Join to View
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handlePreview}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Camera className="w-6 h-6 text-purple-500" />
                  Virtual Gallery Tour
                </h2>
                <Button variant="ghost" size="sm" onClick={closeVirtualTour}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8 text-center mb-6">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">360° Gallery Experience</h3>
                <p className="text-gray-600 mb-4">
                  Take a virtual walk through our stunning gallery spaces and explore artworks in detail.
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-800">3D Navigation</div>
                    <div className="text-gray-600">Interactive 360° views</div>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-800">Artwork Details</div>
                    <div className="text-gray-600">Zoom and explore</div>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-800">Audio Guides</div>
                    <div className="text-gray-600">Expert commentary</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Available Tours</h4>
                {[
                  { name: "Contemporary Masters", duration: "15 min", artworks: 24, status: "Coming Soon" },
                  { name: "Traditional Heritage", duration: "12 min", artworks: 18, status: "Coming Soon" },
                  { name: "Digital Frontier", duration: "10 min", artworks: 15, status: "Coming Soon" }
                ].map((tour, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{tour.name}</div>
                        <div className="text-sm text-gray-600">{tour.duration} • {tour.artworks} artworks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={tour.status === "Available" ? "default" : "secondary"}>
                        {tour.status}
                      </Badge>
                      {tour.status === "Available" ? (
                        <Button size="sm">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Pro Tip:</strong> Virtual tours work best on desktop or tablet devices. 
                  For mobile users, we recommend using our mobile gallery app.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Artwork Details Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
              <h3 className="text-2xl font-semibold text-gray-800">Artwork Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedArtwork(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Artwork Image */}
                <div className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedArtwork.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedArtwork.likes} likes</span>
                    </div>
                  </div>
                </div>

                {/* Artwork Info */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-3xl font-bold text-gray-900 mb-2">{selectedArtwork.title}</h4>
                    <p className="text-xl text-purple-600 mb-4">by {selectedArtwork.artist}</p>
                    <p className="text-gray-600 leading-relaxed">{selectedArtwork.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Medium</p>
                      <p className="font-semibold text-gray-900">{selectedArtwork.medium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Dimensions</p>
                      <p className="font-semibold text-gray-900">{selectedArtwork.dimensions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Year</p>
                      <p className="font-semibold text-gray-900">{selectedArtwork.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Category</p>
                      <p className="font-semibold text-gray-900 capitalize">{selectedArtwork.category}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Price</p>
                        <p className="text-3xl font-bold text-purple-600">{selectedArtwork.price}</p>
                      </div>
                      {selectedArtwork.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
                        onClick={() => {
                          setSelectedArtwork(null);
                          onNavigateToRegister('buyer');
                        }}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Register to Purchase
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setSelectedArtwork(null);
                            onNavigateToHome();
                            // User can then navigate to login from homepage
                            toast.info('Please login to purchase this artwork');
                          }}
                        >
                          Go to Login
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <p className="text-sm text-purple-900 font-medium mb-2">
                        🎨 Why Register?
                      </p>
                      <ul className="text-xs text-purple-700 space-y-1">
                        <li>• Purchase original artworks directly from artists</li>
                        <li>• Save favorites to your wishlist</li>
                        <li>• Get personalized AI recommendations</li>
                        <li>• Track your orders and delivery</li>
                        <li>• Access exclusive exhibitions and collections</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}