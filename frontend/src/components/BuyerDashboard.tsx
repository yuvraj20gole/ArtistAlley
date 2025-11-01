import { useState, useEffect } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { useLocation } from "react-router-dom";
import { Card } from "./ui/card";
import { ShoppingCart, Heart, Package, User, Grid3x3, Sparkles } from "lucide-react";
import { BrowseArtwork } from "./BrowseArtwork";
import { Wishlist } from "./Wishlist";
import { ShoppingCartComponent } from "./ShoppingCart";
import { BuyerOrders } from "./BuyerOrders";
import { BuyerProfile } from "./BuyerProfile";
import { AIRecommendations } from "./AIRecommendations";
import { ChatBot } from "./ChatBot";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer' | 'admin';
}

interface BuyerDashboardProps {
  user: User | null;
  onNavigateToHome: () => void;
  onLogout: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

// Mock data for buyer stats
const getBuyerStats = () => ({
  totalOrders: 12,
  activeOrders: 3,
  wishlistItems: 8,
  totalSpent: 45800, // in INR
});

export function BuyerDashboard({ 
  user, 
  onNavigateToHome, 
  onLogout,
  activeTab = 'dashboard',
  onTabChange
}: BuyerDashboardProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const stats = getBuyerStats();

  // Handle URL search parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
      // Switch to browse artwork tab when searching
      setCurrentTab('browse');
    }
  }, [location.search]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Grid3x3 },
    { id: 'browse', label: 'Browse Artwork', icon: Grid3x3 },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: Sparkles },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case 'browse':
        return <BrowseArtwork initialSearchQuery={searchQuery} />;
      case 'ai-recommendations':
        return <AIRecommendations />;
      case 'wishlist':
        return <Wishlist />;
      case 'cart':
        return <ShoppingCartComponent />;
      case 'orders':
        return <BuyerOrders />;
      case 'profile':
        return <BuyerProfile user={user} />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-stone-100/80 to-neutral-100/80 backdrop-blur-sm rounded-lg p-8 border border-stone-200/50">
              <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display' }}>Welcome back, {user?.name || 'Art Lover'}!</h2>
              <p className="text-stone-600">Discover unique artwork and connect with talented artists</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-600 mb-1">Total Orders</p>
                    <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>{stats.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-600 mb-1">Active Orders</p>
                    <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>{stats.activeOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-600 mb-1">Wishlist Items</p>
                    <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>{stats.wishlistItems}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-stone-200/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-600 mb-1">Total Spent</p>
                    <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>₹{stats.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* AI Recommendations Preview */}
            <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-lg p-6 border border-purple-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl" style={{ fontFamily: 'Playfair Display' }}>AI-Powered Recommendations</h3>
                </div>
                <button
                  onClick={() => handleTabChange('ai-recommendations')}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  View All →
                </button>
              </div>
              <p className="text-stone-600">
                Discover artists similar to your favorites based on your following and purchase history
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => handleTabChange('browse')}
                className="p-6 bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-lg hover:shadow-lg transition-all text-left group"
              >
                <Grid3x3 className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="mb-2" style={{ fontFamily: 'Playfair Display' }}>Browse Artwork</h4>
                <p className="text-stone-600 text-sm">Explore our collection of paintings, vases, decor & jewelry</p>
              </button>

              <button
                onClick={() => handleTabChange('wishlist')}
                className="p-6 bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-lg hover:shadow-lg transition-all text-left group"
              >
                <Heart className="w-8 h-8 text-pink-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="mb-2" style={{ fontFamily: 'Playfair Display' }}>My Wishlist</h4>
                <p className="text-stone-600 text-sm">View your saved items and make them yours</p>
              </button>

              <button
                onClick={() => handleTabChange('orders')}
                className="p-6 bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-lg hover:shadow-lg transition-all text-left group"
              >
                <Package className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="mb-2" style={{ fontFamily: 'Playfair Display' }}>Track Orders</h4>
                <p className="text-stone-600 text-sm">View order status and delivery details</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/30">
      <DashboardHeader
        userName={user?.name || 'Buyer'}
        userRole="buyer"
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
                  className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                    currentTab === tab.id
                      ? 'bg-gradient-to-r from-stone-800 to-neutral-800 text-white shadow-md'
                      : 'text-stone-600 hover:bg-stone-100/80'
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
        <div className="animate-in fade-in duration-300">
          {renderTabContent()}
        </div>
      </div>

      {/* ChatBot Widget */}
      <ChatBot />
    </div>
  );
}

export default BuyerDashboard;