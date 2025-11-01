import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Eye,
  MessageSquare,
  Download,
  Search,
  Filter
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  artworkTitle: string;
  artworkImage: string;
  price: number;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
}

export function Orders() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock orders data
  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      customerName: "Priya Sharma",
      customerEmail: "priya.sharma@email.com",
      artworkTitle: "Abstract Harmony",
      artworkImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
      price: 15000,
      orderDate: "2024-01-20",
      status: 'delivered',
      shippingAddress: "123 Art Street, Mumbai, Maharashtra 400001",
      paymentMethod: "UPI"
    },
    {
      id: "ORD-2024-002",
      customerName: "Rahul Kumar",
      customerEmail: "rahul.kumar@email.com",
      artworkTitle: "Golden Sunrise",
      artworkImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      price: 8000,
      orderDate: "2024-01-18",
      status: 'shipped',
      shippingAddress: "456 Creative Lane, Delhi, Delhi 110001",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD-2024-003",
      customerName: "Anita Desai",
      customerEmail: "anita.desai@email.com",
      artworkTitle: "Ceramic Elegance",
      artworkImage: "https://images.unsplash.com/photo-1565193298595-4a87c91ccf11",
      price: 12000,
      orderDate: "2024-01-16",
      status: 'processing',
      shippingAddress: "789 Design Avenue, Bangalore, Karnataka 560001",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "ORD-2024-004",
      customerName: "Vikram Singh",
      customerEmail: "vikram.singh@email.com",
      artworkTitle: "Ocean Dreams",
      artworkImage: "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
      price: 6000,
      orderDate: "2024-01-15",
      status: 'pending',
      shippingAddress: "321 Gallery Road, Pune, Maharashtra 411001",
      paymentMethod: "UPI"
    },
    {
      id: "ORD-2024-005",
      customerName: "Meera Patel",
      customerEmail: "meera.patel@email.com",
      artworkTitle: "Urban Sketch",
      artworkImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
      price: 4000,
      orderDate: "2024-01-12",
      status: 'cancelled',
      shippingAddress: "654 Culture Street, Ahmedabad, Gujarat 380001",
      paymentMethod: "Credit Card"
    }
  ];

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <Eye className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Orders Management
        </h2>
        <p className="text-muted-foreground mt-1">Track and manage your artwork orders</p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between bg-card/60 backdrop-blur-sm rounded-lg p-4 border">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border rounded-md bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border rounded-md px-3 py-2 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-card to-primary/5">
            <div className="flex items-start space-x-4">
              <ImageWithFallback
                src={order.artworkImage}
                alt={order.artworkTitle}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{order.artworkTitle}</h3>
                    <p className="text-muted-foreground">Order ID: {order.id}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Customer: {order.customerName} ({order.customerEmail})
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">₹{order.price.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Payment: {order.paymentMethod}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Contact Customer
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-muted-foreground">
                  <strong>Shipping Address:</strong> {order.shippingAddress}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
        <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="text-2xl font-bold text-yellow-800">{orders.filter(o => o.status === 'pending').length}</div>
          <div className="text-sm text-yellow-600">Pending</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-2xl font-bold text-blue-800">{orders.filter(o => o.status === 'processing').length}</div>
          <div className="text-sm text-blue-600">Processing</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-2xl font-bold text-purple-800">{orders.filter(o => o.status === 'shipped').length}</div>
          <div className="text-sm text-purple-600">Shipped</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-2xl font-bold text-green-800">{orders.filter(o => o.status === 'delivered').length}</div>
          <div className="text-sm text-green-600">Delivered</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="text-2xl font-bold text-red-800">{orders.filter(o => o.status === 'cancelled').length}</div>
          <div className="text-sm text-red-600">Cancelled</div>
        </Card>
      </div>
    </div>
  );
}