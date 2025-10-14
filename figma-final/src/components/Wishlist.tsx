import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface WishlistItem {
  id: number;
  artworkId: number;
  title: string;
  artist: string;
  category: string;
  price: number;
  image: string;
  addedDate: string;
  inStock: boolean;
}

// Mock wishlist data
const initialWishlist: WishlistItem[] = [
  {
    id: 1,
    artworkId: 1,
    title: "Sunset Dreams",
    artist: "Priya Sharma",
    category: "Paintings",
    price: 8500,
    image: "abstract painting",
    addedDate: "2024-09-15",
    inStock: true,
  },
  {
    id: 2,
    artworkId: 3,
    title: "Ceramic Elegance",
    artist: "Anjali Kapoor",
    category: "Vases",
    price: 3500,
    image: "ceramic vase",
    addedDate: "2024-09-20",
    inStock: true,
  },
  {
    id: 3,
    artworkId: 5,
    title: "Wall Tapestry",
    artist: "Meera Reddy",
    category: "Decor",
    price: 6800,
    image: "wall tapestry",
    addedDate: "2024-09-22",
    inStock: true,
  },
  {
    id: 4,
    artworkId: 7,
    title: "Gold Necklace",
    artist: "Sanjana Iyer",
    category: "Jewelry",
    price: 15000,
    image: "gold necklace",
    addedDate: "2024-09-25",
    inStock: true,
  },
  {
    id: 5,
    artworkId: 9,
    title: "Mountain Majesty",
    artist: "Priya Sharma",
    category: "Paintings",
    price: 11000,
    image: "mountain painting",
    addedDate: "2024-09-28",
    inStock: true,
  },
  {
    id: 6,
    artworkId: 11,
    title: "Terracotta Pot",
    artist: "Anjali Kapoor",
    category: "Vases",
    price: 2800,
    image: "terracotta pot",
    addedDate: "2024-09-29",
    inStock: true,
  },
  {
    id: 7,
    artworkId: 12,
    title: "Crystal Vase",
    artist: "Vikram Singh",
    category: "Vases",
    price: 5500,
    image: "crystal vase",
    addedDate: "2024-09-30",
    inStock: false,
  },
  {
    id: 8,
    artworkId: 2,
    title: "Ocean Waves",
    artist: "Rahul Mehta",
    category: "Paintings",
    price: 12000,
    image: "ocean painting",
    addedDate: "2024-10-01",
    inStock: true,
  },
];

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlist);

  const handleRemoveFromWishlist = (itemId: number) => {
    const item = wishlistItems.find(i => i.id === itemId);
    setWishlistItems(wishlistItems.filter(i => i.id !== itemId));
    toast.success(`Removed "${item?.title}" from wishlist`);
  };

  const handleMoveToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      toast.error(`"${item.title}" is out of stock`);
      return;
    }
    setWishlistItems(wishlistItems.filter(i => i.id !== item.id));
    toast.success(`Moved "${item.title}" to cart!`);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlistItems([]);
      toast.success('Wishlist cleared');
    }
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display' }}>My Wishlist</h2>
          <p className="text-stone-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <Button
            onClick={handleClearWishlist}
            variant="outline"
            className="border-stone-300 text-stone-600 hover:bg-stone-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Wishlist
          </Button>
        )}
      </div>

      {wishlistItems.length > 0 ? (
        <>
          {/* Wishlist Summary */}
          <Card className="bg-gradient-to-r from-pink-50/80 to-purple-50/80 backdrop-blur-sm border-pink-200/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-pink-600" />
                <div>
                  <p className="text-lg" style={{ fontFamily: 'Playfair Display' }}>Total Wishlist Value</p>
                  <p className="text-stone-600 text-sm">Estimated combined value of all items</p>
                </div>
              </div>
              <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>₹{totalValue.toLocaleString()}</p>
            </div>
          </Card>

          {/* Wishlist Items */}
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-stone-200/50 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Image */}
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-stone-100 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1577083300962-7d5d4b4d41e4?w=200&h=200&fit=crop&q=80`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white px-3 py-1 rounded-md text-sm">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg mb-1" style={{ fontFamily: 'Playfair Display' }}>{item.title}</h3>
                        <p className="text-stone-600 text-sm">by {item.artist}</p>
                        <p className="text-stone-500 text-sm mt-1">Added on {new Date(item.addedDate).toLocaleDateString('en-IN')}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-2"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>₹{item.price.toLocaleString()}</span>
                      <Button
                        onClick={() => handleMoveToCart(item)}
                        disabled={!item.inStock}
                        className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Move to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div>
                <p className="text-lg mb-1" style={{ fontFamily: 'Playfair Display' }}>Ready to purchase?</p>
                <p className="text-stone-600 text-sm">Move items to cart and complete your order</p>
              </div>
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Move All to Cart
              </Button>
            </div>
          </Card>
        </>
      ) : (
        <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-stone-300" />
          <h3 className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display' }}>Your Wishlist is Empty</h3>
          <p className="text-stone-600 mb-6">Start adding items you love to your wishlist!</p>
          <Button className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700">
            Browse Artwork
          </Button>
        </Card>
      )}
    </div>
  );
}
