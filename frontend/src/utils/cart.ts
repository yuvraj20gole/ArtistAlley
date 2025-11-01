// Cart utility functions for managing shopping cart in localStorage

export interface CartItem {
  id: number;
  title: string;
  artist_name: string;
  artist_username: string;
  category: string;
  price: number;
  image_url: string;
  quantity: number;
  addedAt: string;
}

const CART_KEY = 'artistalley_cart';

export const cartUtils = {
  // Get all cart items
  getCartItems(): CartItem[] {
    try {
      const cartData = localStorage.getItem(CART_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  },

  // Add item to cart
  addToCart(item: Omit<CartItem, 'quantity' | 'addedAt'>): boolean {
    try {
      const cartItems = this.getCartItems();
      
      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Increase quantity if item already exists
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart
        cartItems.push({
          ...item,
          quantity: 1,
          addedAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  },

  // Remove item from cart
  removeFromCart(itemId: number): boolean {
    try {
      const cartItems = this.getCartItems();
      const filteredItems = cartItems.filter(item => item.id !== itemId);
      localStorage.setItem(CART_KEY, JSON.stringify(filteredItems));
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  },

  // Update item quantity
  updateQuantity(itemId: number, quantity: number): boolean {
    try {
      const cartItems = this.getCartItems();
      const itemIndex = cartItems.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity = quantity;
        }
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  },

  // Clear entire cart
  clearCart(): boolean {
    try {
      localStorage.removeItem(CART_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  },

  // Get cart item count
  getCartItemCount(): number {
    const cartItems = this.getCartItems();
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  // Get cart total
  getCartTotal(): number {
    const cartItems = this.getCartItems();
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return total + (price * item.quantity);
    }, 0);
  }
};
