import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ShoppingCart, Trash2, Plus, Minus, Heart, Tag } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CartItem {
  id: number;
  artworkId: number;
  title: string;
  artist: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
}

// Mock cart data
const initialCart: CartItem[] = [
  {
    id: 1,
    artworkId: 2,
    title: "Ocean Waves",
    artist: "Rahul Mehta",
    category: "Paintings",
    price: 12000,
    image: "ocean painting",
    quantity: 1,
    inStock: true,
  },
  {
    id: 2,
    artworkId: 4,
    title: "Modern Minimalist",
    artist: "Vikram Singh",
    category: "Vases",
    price: 4200,
    image: "modern vase",
    quantity: 2,
    inStock: true,
  },
  {
    id: 3,
    artworkId: 8,
    title: "Silver Earrings",
    artist: "Kiran Desai",
    category: "Jewelry",
    price: 2500,
    image: "silver earrings",
    quantity: 1,
    inStock: true,
  },
];

export function ShoppingCartComponent() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId: number) => {
    const item = cartItems.find(i => i.id === itemId);
    setCartItems(cartItems.filter(i => i.id !== itemId));
    toast.success(`Removed "${item?.title}" from cart`);
  };

  const handleMoveToWishlist = (item: CartItem) => {
    setCartItems(cartItems.filter(i => i.id !== item.id));
    toast.success(`Moved "${item.title}" to wishlist!`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      toast.success('Cart cleared');
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'ARTIST10') {
      setDiscount(10);
      toast.success('Promo code applied! 10% discount');
    } else if (promoCode.toUpperCase() === 'FIRST20') {
      setDiscount(20);
      toast.success('Promo code applied! 20% discount');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxRate = 18; // GST 18%
  const taxAmount = ((subtotal - discountAmount) * taxRate) / 100;
  const total = subtotal - discountAmount + taxAmount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display' }}>Shopping Cart</h2>
          <p className="text-stone-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        {cartItems.length > 0 && (
          <Button
            onClick={handleClearCart}
            variant="outline"
            className="border-stone-300 text-stone-600 hover:bg-stone-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-stone-200/50 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-stone-100 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1577083300962-7d5d4b4d41e4?w=200&h=200&fit=crop&q=80`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg mb-1" style={{ fontFamily: 'Playfair Display' }}>{item.title}</h3>
                        <p className="text-stone-600 text-sm">by {item.artist}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm">
                          {item.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-stone-600 text-sm">Quantity:</span>
                        <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-stone-200 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-stone-200 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                        {item.quantity > 1 && (
                          <p className="text-stone-500 text-sm">₹{item.price.toLocaleString()} each</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-stone-200">
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="text-pink-600 hover:text-pink-700 text-sm flex items-center gap-2 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-6 sticky top-4">
              <h3 className="text-xl mb-4" style={{ fontFamily: 'Playfair Display' }}>Order Summary</h3>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm mb-2 text-stone-700">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-input-background border-stone-300"
                  />
                  <Button
                    onClick={handleApplyPromo}
                    variant="outline"
                    className="border-stone-300"
                  >
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-stone-500 mt-2">Try: ARTIST10 or FIRST20</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pb-4 border-b border-stone-200">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-600">GST ({taxRate}%)</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between py-4 border-b border-stone-200">
                <span className="text-lg" style={{ fontFamily: 'Playfair Display' }}>Total</span>
                <span className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>₹{total.toLocaleString()}</span>
              </div>

              {/* Checkout Button */}
              <Button className="w-full mt-6 bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700 h-12">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>

              {/* Additional Info */}
              <div className="mt-6 space-y-2 text-sm text-stone-600">
                <p className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Free shipping on orders above ₹10,000
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  100% secure checkout
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  7-day return policy
                </p>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-12 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-stone-300" />
          <h3 className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display' }}>Your Cart is Empty</h3>
          <p className="text-stone-600 mb-6">Add some beautiful artwork to your cart!</p>
          <Button className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700">
            Browse Artwork
          </Button>
        </Card>
      )}
    </div>
  );
}
