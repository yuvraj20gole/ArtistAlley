import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Heart, ShoppingCart, Search, Filter, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { artworkAPI, type Artwork } from "../services/api";
import { cartUtils } from "../utils/cart";

// Use the Artwork interface from the API
type BrowseArtwork = Artwork;

interface BrowseArtworkProps {
  initialSearchQuery?: string;
}

export function BrowseArtwork({ initialSearchQuery = "" }: BrowseArtworkProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [artworks, setArtworks] = useState<BrowseArtwork[]>([]);
  const [loading, setLoading] = useState(true);

  // Update search query when prop changes
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Load public artworks from API
  useEffect(() => {
    const loadArtworks = async () => {
      try {
        setLoading(true);
        const data = await artworkAPI.getPublicArtworks();
        
        // Handle both paginated response and direct array
        let artworksArray: BrowseArtwork[] = [];
        if (Array.isArray(data)) {
          artworksArray = data;
        } else if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
          artworksArray = (data as any).results;
        }
        
        setArtworks(artworksArray);
      } catch (error) {
        console.error('Failed to load artworks:', error);
        toast.error('Failed to load artworks. Please try again.');
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  // Filter and sort artwork
  const filteredArtwork = artworks
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.artist_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.artist_username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      const matchesPrice = itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "price-low":
          return (typeof a.price === 'string' ? parseFloat(a.price) : a.price) - (typeof b.price === 'string' ? parseFloat(b.price) : b.price);
        case "price-high":
          return (typeof b.price === 'string' ? parseFloat(b.price) : b.price) - (typeof a.price === 'string' ? parseFloat(a.price) : a.price);
        case "popular":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const handleAddToCart = (item: Artwork) => {
    const success = cartUtils.addToCart({
      id: item.id,
      title: item.title,
      artist_name: item.artist_name,
      artist_username: item.artist_username,
      category: item.category,
      price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
      image_url: item.image_url,
    });
    
    if (success) {
      toast.success(`Added "${item.title}" to cart!`);
    } else {
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const handleAddToWishlist = (item: Artwork) => {
    toast.success(`Added "${item.title}" to wishlist!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display' }}>Browse Artwork</h2>
        <p className="text-stone-600">Discover unique pieces from talented artists</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-stone-200/50 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
          <Input
            type="text"
            placeholder="Search artwork or artist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input-background border-stone-300"
          />
        </div>

        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 text-stone-600 hover:text-stone-800"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
          <div>
            <label className="block text-sm mb-2 text-stone-700">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-input-background border-stone-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Paintings">Paintings</SelectItem>
                <SelectItem value="Vases">Vases</SelectItem>
                <SelectItem value="Decor">Decor</SelectItem>
                <SelectItem value="Jewelry">Jewelry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-stone-700">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-input-background border-stone-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-2 text-stone-700">
              Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={100000}
              step={1000}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-stone-600">
          Showing {filteredArtwork.length} {filteredArtwork.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-stone-600">Loading artworks...</p>
          </div>
        </div>
      ) : filteredArtwork.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtwork.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-xl transition-all group">
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src={item.image_url || "https://images.unsplash.com/photo-1577083300962-7d5d4b4d41e4?w=400&h=400&fit=crop&q=80"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.status !== 'active' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white px-4 py-2 rounded-md">
                      {item.status === 'sold' ? 'Sold' : item.status === 'draft' ? 'Draft' : 'Unavailable'}
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAddToWishlist(item)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors shadow-md"
                    disabled={item.status !== 'active'}
                  >
                    <Heart className="w-5 h-5 text-pink-500" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="mb-1" style={{ fontFamily: 'Playfair Display' }}>{item.title}</h3>
                  <p className="text-sm text-stone-600">by {item.artist_name || item.artist_username}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="text-xl" style={{ fontFamily: 'Playfair Display' }}>₹{(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toLocaleString()}</span>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={item.status !== 'active'}
                    size="sm"
                    className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-lg border border-stone-200/50">
          <p className="text-stone-600 text-lg">No artwork found matching your criteria</p>
          <p className="text-stone-500 mt-2">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
