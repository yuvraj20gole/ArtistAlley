// Order utility functions for managing orders in localStorage

export interface OrderItem {
  id: number;
  title: string;
  artist_name: string;
  artist_username: string;
  category: string;
  price: number;
  image_url: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
}

const ORDERS_KEY = 'artistalley_orders';

export const orderUtils = {
  // Get all orders
  getOrders(): Order[] {
    try {
      const ordersData = localStorage.getItem(ORDERS_KEY);
      return ordersData ? JSON.parse(ordersData) : [];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  },

  // Create a new order from cart items
  createOrder(
    cartItems: OrderItem[], 
    discount: number = 0,
    shippingAddress?: Order['shippingAddress']
  ): Order {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discount) / 100;
    const taxRate = 18; // GST 18%
    const taxAmount = ((subtotal - discountAmount) * taxRate) / 100;
    const total = subtotal - discountAmount + taxAmount;

    const order: Order = {
      id: `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      items: [...cartItems],
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      shippingAddress
    };

    return order;
  },

  // Save order to localStorage
  saveOrder(order: Order): boolean {
    try {
      const orders = this.getOrders();
      orders.unshift(order); // Add to beginning of array (most recent first)
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      return true;
    } catch (error) {
      console.error('Error saving order:', error);
      return false;
    }
  },

  // Get order by ID
  getOrderById(orderId: string): Order | null {
    const orders = this.getOrders();
    return orders.find(order => order.id === orderId) || null;
  },

  // Update order status
  updateOrderStatus(orderId: string, status: Order['status']): boolean {
    try {
      const orders = this.getOrders();
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex >= 0) {
        orders[orderIndex].status = status;
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  },

  // Get orders by status
  getOrdersByStatus(status: Order['status']): Order[] {
    const orders = this.getOrders();
    return orders.filter(order => order.status === status);
  },

  // Get total orders count
  getTotalOrders(): number {
    return this.getOrders().length;
  },

  // Get total spent
  getTotalSpent(): number {
    const orders = this.getOrders();
    return orders.reduce((total, order) => total + order.total, 0);
  }
};
