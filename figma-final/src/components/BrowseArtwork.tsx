import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Heart, ShoppingCart, Search, Filter } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Artwork {
  id: number;
  title: string;
  artist: string;
  artistId: number;
  category: 'Paintings' | 'Vases' | 'Decor' | 'Jewelry';
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

// Mock artwork data
const allArtwork: Artwork[] = [
  { id: 1, title: "Sunset Dreams", artist: "Priya Sharma", artistId: 1, category: "Paintings", price: 8500, image: "abstract painting", description: "Beautiful abstract sunset", inStock: true },
  { id: 2, title: "Ocean Waves", artist: "Rahul Mehta", artistId: 2, category: "Paintings", price: 12000, image: "ocean painting", description: "Serene ocean landscape", inStock: true },
  { id: 3, title: "Ceramic Elegance", artist: "Anjali Kapoor", artistId: 3, category: "Vases", price: 3500, image: "ceramic vase", description: "Handcrafted ceramic vase", inStock: true },
  { id: 4, title: "Modern Minimalist", artist: "Vikram Singh", artistId: 4, category: "Vases", price: 4200, image: "modern vase", description: "Contemporary design", inStock: true },
  { id: 5, title: "Wall Tapestry", artist: "Meera Reddy", artistId: 5, category: "Decor", price: 6800, image: "wall tapestry", description: "Intricate wall art", inStock: true },
  { id: 6, title: "Wooden Sculpture", artist: "Arjun Patel", artistId: 6, category: "Decor", price: 9500, image: "wooden sculpture", description: "Hand-carved sculpture", inStock: true },
  { id: 7, title: "Gold Necklace", artist: "Sanjana Iyer", artistId: 7, category: "Jewelry", price: 15000, image: "gold necklace", description: "Elegant gold necklace", inStock: true },
  { id: 8, title: "Silver Earrings", artist: "Kiran Desai", artistId: 8, category: "Jewelry", price: 2500, image: "silver earrings", description: "Handmade silver earrings", inStock: true },
  { id: 9, title: "Mountain Majesty", artist: "Priya Sharma", artistId: 1, category: "Paintings", price: 11000, image: "mountain painting", description: "Majestic mountain view", inStock: true },
  { id: 10, title: "Floral Fantasy", artist: "Rahul Mehta", artistId: 2, category: "Paintings", price: 7500, image: "floral painting", description: "Vibrant floral art", inStock: true },
  { id: 11, title: "Terracotta Pot", artist: "Anjali Kapoor", artistId: 3, category: "Vases", price: 2800, image: "terracotta pot", description: "Traditional terracotta", inStock: true },
  { id: 12, title: "Crystal Vase", artist: "Vikram Singh", artistId: 4, category: "Vases", price: 5500, image: "crystal vase", description: "Elegant crystal design", inStock: false },
];

export function BrowseArtwork() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort artwork
  const filteredArtwork = allArtwork
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return b.id - a.id; // Mock popularity
        case "newest":
        default:
          return b.id - a.id;
      }
    });

  const handleAddToCart = (item: Artwork) => {
    toast.success(`Added "${item.title}" to cart!`);
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
              max={20000}
              step={500}
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

      {/* Artwork Grid */}
      {filteredArtwork.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtwork.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-xl transition-all group">
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1577083300962-7d5d4b4d41e4?w=400&h=400&fit=crop&q=80`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white px-4 py-2 rounded-md">Out of Stock</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAddToWishlist(item)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors shadow-md"
                    disabled={!item.inStock}
                  >
                    <Heart className="w-5 h-5 text-pink-500" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="mb-1" style={{ fontFamily: 'Playfair Display' }}>{item.title}</h3>
                  <p className="text-sm text-stone-600">by {item.artist}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="text-xl" style={{ fontFamily: 'Playfair Display' }}>₹{item.price.toLocaleString()}</span>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
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
