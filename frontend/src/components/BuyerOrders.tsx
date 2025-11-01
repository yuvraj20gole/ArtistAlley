import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Package, Search, Download, Truck, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { orderUtils, type Order as AppOrder, type OrderItem as AppOrderItem } from "../utils/orders";

// Mock orders data removed - using real order data from localStorage

export function BuyerOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<AppOrder[]>([]);
  const [_loading, setLoading] = useState(true);

  // Load orders from localStorage
  useEffect(() => {
    const loadOrders = () => {
      try {
        const allOrders = orderUtils.getOrders();
        setOrders(allOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => 
                           item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter !== 'all' && order.status.toLowerCase() === statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: AppOrder['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Package className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: AppOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDownloadInvoice = (order: AppOrder) => {
    toast.success(`Downloading invoice for ${order.id}`);
  };

  const handleTrackOrder = (_order: AppOrder) => {
    toast.info('Tracking information will be available once your order ships.');
  };

  const handleReorder = (order: AppOrder) => {
    toast.success(`Items from ${order.id} added to cart!`);
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display' }}>My Orders</h2>
        <p className="text-stone-600">Track and manage your order history</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-stone-200/50 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input
              type="text"
              placeholder="Search by order number, artwork, or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background border-stone-300"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  statusFilter === status
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bg-white/80 backdrop-blur-sm border-stone-200/50 overflow-hidden">
              {/* Order Header */}
              <div
                onClick={() => toggleOrderExpansion(order.id)}
                className="p-6 cursor-pointer hover:bg-stone-50/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg" style={{ fontFamily: 'Playfair Display' }}>{order.id}</h3>
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                      <span>Placed on {new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                      <span>•</span>
                      <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                      {order.estimatedDelivery && (
                        <>
                          <span>•</span>
                          <span>Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>₹{order.total.toLocaleString()}</p>
                      <p className="text-sm text-stone-600">Total</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details (Expanded) */}
              {expandedOrder === order.id && (
                <div className="border-t border-stone-200 p-6 bg-stone-50/30 space-y-6">
                  {/* Order Items */}
                  <div>
                    <h4 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 bg-white p-4 rounded-lg">
                          <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={item.image_url || `https://images.unsplash.com/photo-1577083300962-7d5d4b4d41e4?w=100&h=100&fit=crop&q=80`}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="mb-1">{item.title}</h5>
                            <p className="text-sm text-stone-600">by {item.artist_name}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-stone-600">Qty: {item.quantity}</span>
                              <span className="text-sm">₹{item.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div>
                      <h4 className="mb-2" style={{ fontFamily: 'Playfair Display' }}>Shipping Address</h4>
                      <div className="text-stone-600">
                        <p>{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                        <p>Phone: {order.shippingAddress.phone}</p>
                      </div>
                    </div>
                  )}

                  {/* Price Breakdown */}
                  <div className="bg-white p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span>₹{order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>GST (18%)</span>
                      <span>₹{order.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200">
                      <span style={{ fontFamily: 'Playfair Display' }}>Total</span>
                      <span className="text-xl" style={{ fontFamily: 'Playfair Display' }}>₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    {order.status !== 'cancelled' && (
                      <>
                        <Button
                          onClick={() => handleTrackOrder(order)}
                          variant="outline"
                          className="border-stone-300"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Track Order
                        </Button>
                        <Button
                          onClick={() => handleDownloadInvoice(order)}
                          variant="outline"
                          className="border-stone-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </Button>
                      </>
                    )}
                    <Button
                      onClick={() => handleReorder(order)}
                      variant="outline"
                      className="border-stone-300"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reorder
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50 p-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-stone-300" />
          <h3 className="text-2xl mb-2" style={{ fontFamily: 'Playfair Display' }}>No Orders Found</h3>
          <p className="text-stone-600 mb-6">
            {searchQuery || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter' 
              : 'Start shopping to see your orders here!'}
          </p>
          <Button className="bg-gradient-to-r from-stone-800 to-neutral-800 hover:from-stone-700 hover:to-neutral-700">
            Browse Artwork
          </Button>
        </Card>
      )}
    </div>
  );
}
