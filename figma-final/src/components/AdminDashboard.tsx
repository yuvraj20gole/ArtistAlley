import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Users, 
  Palette, 
  ShoppingBag, 
  TrendingUp, 
  UserCheck, 
  ImageIcon,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  Star,
  DollarSign,
  Calendar,
  Activity,
  Percent,
  Award,
  Flag,
  MessageSquare,
  PieChart,
  BarChart3
} from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";

// TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer' | 'admin';
}

interface AdminDashboardProps {
  user: User | null;
  onNavigateToHome: () => void;
  onLogout: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

// Mock data interfaces
interface PlatformUser {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer';
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
  totalSpent?: number;
  totalEarned?: number;
  artworkCount?: number;
}

interface ArtworkModeration {
  id: number;
  title: string;
  artist: string;
  category: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

interface PlatformOrder {
  id: string;
  buyer: string;
  artist: string;
  artwork: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
}

interface DisputeTicket {
  id: number;
  title: string;
  user: string;
  type: 'order' | 'artwork' | 'payment' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdDate: string;
}

export function AdminDashboard({ user, onNavigateToHome, onLogout, activeTab = 'dashboard', onTabChange }: AdminDashboardProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  // Mock platform statistics
  const platformStats = {
    totalUsers: 2847,
    totalArtists: 856,
    totalBuyers: 1991,
    totalArtwork: 4523,
    totalOrders: 1876,
    totalRevenue: 8547000,
    pendingApprovals: 23,
    activeDisputes: 7,
    growthRate: 18.5,
    conversionRate: 12.3
  };

  // Mock users data
  const mockUsers: PlatformUser[] = [
    { id: 1, name: "Priya Sharma", email: "priya@example.com", role: "artist", status: "active", joinedDate: "2024-01-15", totalEarned: 245000, artworkCount: 24 },
    { id: 2, name: "Rahul Kumar", email: "rahul@example.com", role: "buyer", status: "active", joinedDate: "2024-02-01", totalSpent: 85000 },
    { id: 3, name: "Anjali Verma", email: "anjali@example.com", role: "artist", status: "pending", joinedDate: "2024-10-01", totalEarned: 0, artworkCount: 5 },
    { id: 4, name: "Vikram Singh", email: "vikram@example.com", role: "buyer", status: "active", joinedDate: "2024-03-10", totalSpent: 125000 },
    { id: 5, name: "Meera Patel", email: "meera@example.com", role: "artist", status: "suspended", joinedDate: "2024-01-20", totalEarned: 45000, artworkCount: 8 },
  ];

  // Mock artwork moderation data
  const mockArtworkModeration: ArtworkModeration[] = [
    { id: 1, title: "Abstract Dreams", artist: "Anjali Verma", category: "Painting", price: 15000, status: "pending", submittedDate: "2024-10-02" },
    { id: 2, title: "Ceramic Vase Collection", artist: "Ravi Chopra", category: "Vases", price: 8000, status: "pending", submittedDate: "2024-10-02" },
    { id: 3, title: "Modern Wall Decor", artist: "Sunita Rao", category: "Decor", price: 12000, status: "pending", submittedDate: "2024-10-01" },
    { id: 4, title: "Handcrafted Jewelry Set", artist: "Kavita Desai", category: "Jewelry", price: 6000, status: "approved", submittedDate: "2024-09-28" },
  ];

  // Mock orders data
  const mockOrders: PlatformOrder[] = [
    { id: "ORD-2024-1234", buyer: "Rahul Kumar", artist: "Priya Sharma", artwork: "Ocean Waves", amount: 15000, status: "completed", date: "2024-10-01" },
    { id: "ORD-2024-1235", buyer: "Vikram Singh", artist: "Priya Sharma", artwork: "Mountain Vista", amount: 12000, status: "processing", date: "2024-10-02" },
    { id: "ORD-2024-1236", buyer: "Anita Joshi", artist: "Ravi Chopra", artwork: "Ceramic Elegance", amount: 8000, status: "pending", date: "2024-10-03" },
  ];

  // Mock dispute tickets
  const mockDisputes: DisputeTicket[] = [
    { id: 1, title: "Order not delivered", user: "Rahul Kumar", type: "order", priority: "high", status: "in-progress", createdDate: "2024-10-01" },
    { id: 2, title: "Payment not received", user: "Priya Sharma", type: "payment", priority: "high", status: "open", createdDate: "2024-10-02" },
    { id: 3, title: "Artwork copyright issue", user: "Anonymous", type: "artwork", priority: "medium", status: "in-progress", createdDate: "2024-09-30" },
  ];

  // Tab configuration
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'artists', label: 'Artist Verification', icon: UserCheck },
    { id: 'artwork', label: 'Artwork Moderation', icon: ImageIcon },
    { id: 'orders', label: 'Order Monitoring', icon: ShoppingBag },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
    { id: 'featured', label: 'Featured Content', icon: Star },
    { id: 'disputes', label: 'Support & Disputes', icon: MessageSquare },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case 'users':
        return <UserManagement users={mockUsers} />;
      case 'artists':
        return <ArtistVerification users={mockUsers.filter(u => u.role === 'artist')} />;
      case 'artwork':
        return <ArtworkModeration artworks={mockArtworkModeration} />;
      case 'orders':
        return <OrderMonitoring orders={mockOrders} />;
      case 'analytics':
        return <PlatformAnalytics stats={platformStats} />;
      case 'featured':
        return <FeaturedContent />;
      case 'disputes':
        return <DisputeManagement disputes={mockDisputes} />;
      case 'settings':
        return <PlatformSettings />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 backdrop-blur-sm rounded-lg p-8 border border-purple-200/50">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>Admin Dashboard</h2>
              </div>
              <p className="text-stone-600">Manage and monitor the ArtistAlley platform</p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-600 mb-1">Total Users</p>
                    <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>{platformStats.totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-1">+{platformStats.growthRate}% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-600 mb-1">Total Artwork</p>
                    <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>{platformStats.totalArtwork.toLocaleString()}</p>
                    <p className="text-sm text-stone-500 mt-1">{platformStats.totalArtists} artists</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-600 mb-1">Total Revenue</p>
                    <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>₹{(platformStats.totalRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-stone-500 mt-1">{platformStats.totalOrders} orders</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-600 mb-1">Pending Actions</p>
                    <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>{platformStats.pendingApprovals}</p>
                    <p className="text-sm text-orange-600 mt-1">Requires attention</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontFamily: 'Playfair Display' }}>User Distribution</h3>
                  <PieChart className="w-5 h-5 text-stone-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-stone-600">Artists</span>
                      <span className="text-sm">{platformStats.totalArtists}</span>
                    </div>
                    <Progress value={(platformStats.totalArtists / platformStats.totalUsers) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-stone-600">Buyers</span>
                      <span className="text-sm">{platformStats.totalBuyers}</span>
                    </div>
                    <Progress value={(platformStats.totalBuyers / platformStats.totalUsers) * 100} className="h-2" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontFamily: 'Playfair Display' }}>Conversion Rate</h3>
                  <Percent className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-4xl mb-2" style={{ fontFamily: 'Playfair Display' }}>{platformStats.conversionRate}%</p>
                <p className="text-sm text-stone-600">Buyer to order conversion</p>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontFamily: 'Playfair Display' }}>Active Disputes</h3>
                  <Flag className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-4xl mb-2" style={{ fontFamily: 'Playfair Display' }}>{platformStats.activeDisputes}</p>
                <p className="text-sm text-stone-600">Requires resolution</p>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => handleTabChange('artists')}
                className="p-6 bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-lg hover:shadow-lg transition-all text-left group"
              >
                <UserCheck className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="mb-2" style={{ fontFamily: 'Playfair Display' }}>Verify Artists</h4>
                <p className="text-stone-600 text-sm">Review and approve pending artist applications</p>
              </button>

              <button
                onClick={() => handleTabChange('artwork')}
                className="p-6 bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-lg hover:shadow-lg transition-all text-left group"
              >
                <ImageIcon className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="mb-2" style={{ fontFamily: 'Playfair Display' }}>Moderate Artwork</h4>
                <p className="text-stone-600 text-sm">Review artwork submissions and quality</p>
              </button>

              <button
                onClick={() => handleTabChange('disputes')}
                className="p-6 bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-lg hover:shadow-lg transition-all text-left group"
              >
                <MessageSquare className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="mb-2" style={{ fontFamily: 'Playfair Display' }}>Resolve Disputes</h4>
                <p className="text-stone-600 text-sm">Handle support tickets and user issues</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/30">
      <DashboardHeader
        userName={user?.name || 'Admin'}
        userRole="admin"
        onNavigateToHome={onNavigateToHome}
        onLogout={onLogout}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-stone-200/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    currentTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}

// User Management Component
function UserManagement({ users }: { users: PlatformUser[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>User Management</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border border-stone-200 rounded-lg bg-white"
        >
          <option value="all">All Roles</option>
          <option value="artist">Artists</option>
          <option value="buyer">Buyers</option>
        </select>
      </div>

      {/* Users Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-stone-500">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === 'artist' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      user.status === 'active' ? 'default' : 
                      user.status === 'pending' ? 'secondary' : 
                      'destructive'
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-stone-600">{user.joinedDate}</TableCell>
                <TableCell className="text-sm">
                  {user.role === 'artist' ? (
                    <div>
                      <p>{user.artworkCount} artworks</p>
                      <p className="text-stone-500">₹{user.totalEarned?.toLocaleString()} earned</p>
                    </div>
                  ) : (
                    <p>₹{user.totalSpent?.toLocaleString()} spent</p>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {user.status === 'suspended' ? (
                        <DropdownMenuItem>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Activate User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="w-4 h-4 mr-2" />
                          Suspend User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// Artist Verification Component
function ArtistVerification({ users }: { users: PlatformUser[] }) {
  const pendingArtists = users.filter(u => u.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>Artist Verification</h2>
        <Badge variant="secondary">{pendingArtists.length} pending</Badge>
      </div>

      <div className="grid gap-6">
        {pendingArtists.map((artist) => (
          <Card key={artist.id} className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                    {artist.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl mb-1" style={{ fontFamily: 'Playfair Display' }}>{artist.name}</h3>
                  <p className="text-stone-600 mb-2">{artist.email}</p>
                  <div className="flex gap-4 text-sm text-stone-500">
                    <span>Applied: {artist.joinedDate}</span>
                    <span>{artist.artworkCount} artworks submitted</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Review
                </Button>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button variant="destructive" size="sm">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {pendingArtists.length === 0 && (
          <Card className="p-12 bg-white/80 backdrop-blur-sm border-stone-200/50 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <p className="text-stone-600">No pending artist verifications</p>
          </Card>
        )}
      </div>
    </div>
  );
}

// Artwork Moderation Component
function ArtworkModeration({ artworks }: { artworks: ArtworkModeration[] }) {
  const pendingArtworks = artworks.filter(a => a.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>Artwork Moderation</h2>
        <Badge variant="secondary">{pendingArtworks.length} pending review</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingArtworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-stone-200/50">
            <div className="aspect-video bg-gradient-to-br from-stone-200 to-neutral-200 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-stone-400" />
            </div>
            <div className="p-6">
              <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display' }}>{artwork.title}</h3>
              <p className="text-stone-600 mb-3">by {artwork.artist}</p>
              <div className="flex items-center gap-4 mb-4 text-sm text-stone-500">
                <Badge variant="outline">{artwork.category}</Badge>
                <span>₹{artwork.price.toLocaleString()}</span>
                <span>{artwork.submittedDate}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button variant="destructive" size="sm" className="flex-1">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {pendingArtworks.length === 0 && (
        <Card className="p-12 bg-white/80 backdrop-blur-sm border-stone-200/50 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <p className="text-stone-600">No pending artwork reviews</p>
        </Card>
      )}
    </div>
  );
}

// Order Monitoring Component
function OrderMonitoring({ orders }: { orders: PlatformOrder[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>Order Monitoring</h2>

      <Card className="bg-white/80 backdrop-blur-sm border-stone-200/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Artwork</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-sm">{order.id}</TableCell>
                <TableCell>{order.buyer}</TableCell>
                <TableCell>{order.artist}</TableCell>
                <TableCell>{order.artwork}</TableCell>
                <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      order.status === 'completed' ? 'default' : 
                      order.status === 'processing' ? 'secondary' : 
                      order.status === 'cancelled' ? 'destructive' :
                      'outline'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-stone-600">{order.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// Platform Analytics Component
function PlatformAnalytics({ stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>Platform Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
          <h3 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-stone-50 to-neutral-50 rounded-lg">
            <BarChart3 className="w-16 h-16 text-stone-300" />
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
          <h3 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>User Growth</h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-stone-50 to-neutral-50 rounded-lg">
            <TrendingUp className="w-16 h-16 text-stone-300" />
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
          <h3 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Category Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Paintings</span>
                <span className="text-sm text-stone-600">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Vases</span>
                <span className="text-sm text-stone-600">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Decor</span>
                <span className="text-sm text-stone-600">20%</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Jewelry</span>
                <span className="text-sm text-stone-600">10%</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
          <h3 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Top Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-amber-600" />
                <span>Top Artist Revenue</span>
              </div>
              <span className="font-medium">₹2.4L</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-purple-600" />
                <span>Highest Order Value</span>
              </div>
              <span className="font-medium">₹85,000</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Percent className="w-5 h-5 text-green-600" />
                <span>Avg. Commission</span>
              </div>
              <span className="font-medium">12%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Featured Content Component
function FeaturedContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>Featured Content Management</h2>

      <div className="grid gap-6">
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
          <h3 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Featured Artists</h3>
          <p className="text-stone-600 mb-4">Select artists to feature on the homepage</p>
          <Button>
            <Star className="w-4 h-4 mr-2" />
            Manage Featured Artists
          </Button>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
          <h3 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Featured Artwork</h3>
          <p className="text-stone-600 mb-4">Curate artwork to showcase on the homepage</p>
          <Button>
            <ImageIcon className="w-4 h-4 mr-2" />
            Manage Featured Artwork
          </Button>
        </Card>
      </div>
    </div>
  );
}

// Dispute Management Component
function DisputeManagement({ disputes }: { disputes: DisputeTicket[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>Support & Disputes</h2>
        <Badge variant="destructive">{disputes.filter(d => d.status === 'open').length} open</Badge>
      </div>

      <div className="grid gap-4">
        {disputes.map((dispute) => (
          <Card key={dispute.id} className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ fontFamily: 'Playfair Display' }}>{dispute.title}</h3>
                  <Badge 
                    variant={
                      dispute.priority === 'high' ? 'destructive' : 
                      dispute.priority === 'medium' ? 'secondary' : 
                      'outline'
                    }
                  >
                    {dispute.priority}
                  </Badge>
                  <Badge variant="outline">{dispute.type}</Badge>
                </div>
                <p className="text-stone-600 mb-2">Reporter: {dispute.user}</p>
                <p className="text-sm text-stone-500">Created: {dispute.createdDate}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                {dispute.status !== 'resolved' && (
                  <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Platform Settings Component
function PlatformSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl" style={{ fontFamily: 'Playfair Display' }}>Platform Settings</h2>

      <div className="grid gap-6">
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
          <h3 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Commission Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Platform Commission (%)</label>
              <Input type="number" defaultValue="12" className="max-w-xs" />
            </div>
            <Button>Save Changes</Button>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
          <h3 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Payment Gateway</h3>
          <p className="text-stone-600 mb-4">Configure payment processing settings</p>
          <Button variant="outline">Configure</Button>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50">
          <h3 className="mb-4" style={{ fontFamily: 'Playfair Display' }}>Email Notifications</h3>
          <p className="text-stone-600 mb-4">Manage automated email templates and settings</p>
          <Button variant="outline">Configure</Button>
        </Card>
      </div>
    </div>
  );
}
