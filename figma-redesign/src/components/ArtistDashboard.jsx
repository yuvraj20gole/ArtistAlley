import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Palette, 
  Upload, 
  Eye, 
  Edit, 
  Trash2, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Star,
  Settings,
  LogOut,
  Plus,
  Calendar,
  Package,
  BarChart3
} from "lucide-react";

export function ArtistDashboard({ user, onNavigateToHome, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Mock data that would come from Django API later
  const [dashboardStats] = useState({
    totalSales: 125000,
    totalOrders: 89,
    totalArtworks: 24,
    averageRating: 4.7,
    monthlyRevenue: [
      { month: "Jan", revenue: 12000 },
      { month: "Feb", revenue: 15000 },
      { month: "Mar", revenue: 18000 },
      { month: "Apr", revenue: 22000 },
      { month: "May", revenue: 25000 },
      { month: "Jun", revenue: 28000 }
    ]
  });

  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: "Abstract Harmony",
      category: "Painting",
      price: 15000,
      status: "active",
      views: 234,
      likes: 45,
      sales: 3,
      uploadDate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262"
    },
    {
      id: 2,
      title: "Golden Sunrise",
      category: "Digital Art",
      price: 8000,
      status: "active",
      views: 156,
      likes: 28,
      sales: 1,
      uploadDate: "2024-02-03",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      id: 3,
      title: "Ceramic Elegance",
      category: "Pottery",
      price: 12000,
      status: "sold",
      views: 89,
      likes: 12,
      sales: 1,
      uploadDate: "2024-01-28",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    }
  ]);

  const [orders] = useState([
    {
      id: "ORD-001",
      artwork: "Abstract Harmony",
      buyer: "Rajesh Kumar",
      amount: 15000,
      status: "completed",
      date: "2024-06-15",
      commission: 1500
    },
    {
      id: "ORD-002", 
      artwork: "Golden Sunrise",
      buyer: "Priya Sharma",
      amount: 8000,
      status: "pending",
      date: "2024-06-18",
      commission: 800
    },
    {
      id: "ORD-003",
      artwork: "Ceramic Elegance", 
      buyer: "Amit Patel",
      amount: 12000,
      status: "shipped",
      date: "2024-06-10",
      commission: 1200
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    dimensions: "",
    materials: "",
    image: null
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // This would be a Django API call later
    const newArtwork = {
      id: artworks.length + 1,
      title: uploadForm.title,
      category: uploadForm.category,
      price: parseInt(uploadForm.price),
      status: "active",
      views: 0,
      likes: 0,
      sales: 0,
      uploadDate: new Date().toISOString().split('T')[0],
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262"
    };
    
    setArtworks([...artworks, newArtwork]);
    setUploadForm({
      title: "",
      description: "",
      category: "",
      price: "",
      dimensions: "",
      materials: "",
      image: null
    });
    setIsUploadDialogOpen(false);
  };

  const handleDeleteArtwork = (artworkId) => {
    // This would be a Django API call later
    setArtworks(artworks.filter(art => art.id !== artworkId));
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: "default",
      sold: "secondary", 
      pending: "outline"
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getOrderStatusBadge = (status) => {
    const variants = {
      completed: "default",
      pending: "outline",
      shipped: "secondary"
    };
    const colors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800", 
      shipped: "bg-blue-100 text-blue-800"
    };
    return <Badge variant={variants[status]} className={colors[status]}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-neutral-100">
      {/* Dashboard Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-foreground">Artist Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name || 'Artist'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onNavigateToHome}>
                <Eye className="w-4 h-4 mr-2" />
                View Store
              </Button>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="artworks">My Artworks</TabsTrigger>
            <TabsTrigger value="orders">Orders & Sales</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">₹{dashboardStats.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{dashboardStats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Artworks</CardTitle>
                  <Package className="h-4 w-4 text-secondary-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{dashboardStats.totalArtworks}</div>
                  <p className="text-xs text-muted-foreground">3 uploaded this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-100/50 to-green-50/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{dashboardStats.averageRating}/5</div>
                  <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your artwork and profile</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Artwork
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Upload New Artwork</DialogTitle>
                      <DialogDescription>Add a new piece to your portfolio</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUploadSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={uploadForm.title}
                            onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={uploadForm.category} onValueChange={(value) => setUploadForm({...uploadForm, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="painting">Painting</SelectItem>
                              <SelectItem value="digital-art">Digital Art</SelectItem>
                              <SelectItem value="pottery">Pottery</SelectItem>
                              <SelectItem value="sculpture">Sculpture</SelectItem>
                              <SelectItem value="jewelry">Jewelry</SelectItem>
                              <SelectItem value="photography">Photography</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={uploadForm.description}
                          onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={uploadForm.price}
                            onChange={(e) => setUploadForm({...uploadForm, price: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dimensions">Dimensions</Label>
                          <Input
                            id="dimensions"
                            value={uploadForm.dimensions}
                            onChange={(e) => setUploadForm({...uploadForm, dimensions: e.target.value})}
                            placeholder="e.g., 12x16 inches"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="materials">Materials</Label>
                          <Input
                            id="materials"
                            value={uploadForm.materials}
                            onChange={(e) => setUploadForm({...uploadForm, materials: e.target.value})}
                            placeholder="e.g., Oil on canvas"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="image">Artwork Image</Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUploadForm({...uploadForm, image: e.target.files[0]})}
                          required
                        />
                      </div>
                      
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Upload Artwork</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" onClick={() => setActiveTab("profile")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("analytics")}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest purchases of your artwork</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4>{order.artwork}</h4>
                          <p className="text-sm text-muted-foreground">by {order.buyer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg">₹{order.amount.toLocaleString()}</p>
                        {getOrderStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Artworks Tab */}
          <TabsContent value="artworks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl">My Artworks</h2>
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Artwork
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <Card key={artwork.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(artwork.status)}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground">{artwork.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl">₹{artwork.price.toLocaleString()}</span>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteArtwork(artwork.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="text-center">
                        <p>{artwork.views}</p>
                        <p>Views</p>
                      </div>
                      <div className="text-center">
                        <p>{artwork.likes}</p>
                        <p>Likes</p>
                      </div>
                      <div className="text-center">
                        <p>{artwork.sales}</p>
                        <p>Sales</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders & Sales Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl">Orders & Sales</h2>
              <div className="flex space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Artwork</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono">{order.id}</TableCell>
                        <TableCell>{order.artwork}</TableCell>
                        <TableCell>{order.buyer}</TableCell>
                        <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                        <TableCell>₹{order.commission.toLocaleString()}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-3xl">Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardStats.monthlyRevenue.map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <span className="text-sm">{data.month}</span>
                        <div className="flex items-center space-x-3 flex-1 ml-4">
                          <Progress 
                            value={(data.revenue / 30000) * 100} 
                            className="flex-1"
                          />
                          <span className="text-sm w-20 text-right">₹{data.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Artworks</CardTitle>
                  <CardDescription>Based on views and sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {artworks.slice(0, 3).map((artwork) => (
                      <div key={artwork.id} className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm">{artwork.title}</h4>
                          <p className="text-xs text-muted-foreground">{artwork.views} views • {artwork.sales} sales</p>
                        </div>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-3xl">Profile Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.name || "Artist Name"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email || "artist@example.com"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 9876543210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Artist Bio</Label>
                    <Textarea id="bio" rows={4} placeholder="Tell visitors about your artistic journey..." />
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Settings</CardTitle>
                  <CardDescription>Configure your artist portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Art Specialty</Label>
                    <Select defaultValue="painting">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="digital-art">Digital Art</SelectItem>
                        <SelectItem value="pottery">Pottery</SelectItem>
                        <SelectItem value="sculpture">Sculpture</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                        <SelectItem value="mixed-media">Mixed Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" defaultValue="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Mumbai, India" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commission">Commission Rate (%)</Label>
                    <Input id="commission" type="number" defaultValue="10" />
                  </div>
                  <Button>Update Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}