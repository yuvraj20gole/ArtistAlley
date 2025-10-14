import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Palette, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Heart,
  Sparkles,
  BarChart3,
  Star,
  MessageCircle,
  Image,
  Package,
  PieChart,
  User
} from "lucide-react";

// Import the new tab components
import { MyArtworks } from "./MyArtworks";
import { Orders } from "./Orders";
import { Analytics } from "./Analytics";
import { Profile } from "./Profile";
import { DashboardHeader } from "./DashboardHeader";

// TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer';
}

interface SalesData {
  month: string;
  sales: number;
}

interface TopArtwork {
  id: number;
  title: string;
  category: string;
  price: number;
  salesCount: number;
  views: number;
  likes: number;
  image: string;
}

interface ArtistDashboardProps {
  user: User | null;
  onNavigateToHome: () => void;
  onLogout: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function ArtistDashboard({ user, onNavigateToHome, onLogout, activeTab = 'dashboard', onTabChange }: ArtistDashboardProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pauseTimeout, setPauseTimeout] = useState<NodeJS.Timeout | null>(null);

  // Update tab when activeTab prop changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Mock sales data for the chart
  const salesData: SalesData[] = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 15000 },
    { month: "Mar", sales: 18000 },
    { month: "Apr", sales: 22000 },
    { month: "May", sales: 25000 },
    { month: "Jun", sales: 28000 }
  ];

  // Mock top 5 artworks data
  const topArtworks: TopArtwork[] = [
    {
      id: 1,
      title: "Abstract Harmony",
      category: "Painting",
      price: 15000,
      salesCount: 12,
      views: 234,
      likes: 45,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262"
    },
    {
      id: 2,
      title: "Golden Sunrise",
      category: "Digital Art",
      price: 8000,
      salesCount: 8,
      views: 156,
      likes: 28,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      id: 3,
      title: "Ceramic Elegance",
      category: "Pottery",
      price: 12000,
      salesCount: 6,
      views: 89,
      likes: 12,
      image: "https://images.unsplash.com/photo-1565193298595-4a87c91ccf11"
    },
    {
      id: 4,
      title: "Ocean Dreams",
      category: "Photography",
      price: 6000,
      salesCount: 5,
      views: 178,
      likes: 32,
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000"
    },
    {
      id: 5,
      title: "Urban Sketch",
      category: "Drawing",
      price: 4000,
      salesCount: 4,
      views: 134,
      likes: 18,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0"
    }
  ];

  const maxSales = Math.max(...salesData.map(data => data.sales));

  const handleArtworkClick = () => {
    if (isScrolling) return; // Prevent multiple clicks during animation
    
    setIsScrolling(true);
    
    setTimeout(() => {
      setCurrentArtworkIndex((prevIndex) => 
        prevIndex === topArtworks.length - 1 ? 0 : prevIndex + 1
      );
      setIsScrolling(false);
    }, 500); // Duration of the scroll animation
  };

  const currentArtwork = topArtworks[currentArtworkIndex];

  // Mock reviews data for the scrolling reviews section
  const reviews = [
    {
      id: 1,
      customerName: "Priya Sharma",
      rating: 5,
      review: "Absolutely stunning artwork! The colors are vibrant and it looks amazing in my living room.",
      artworkTitle: "Abstract Harmony",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      date: "2 days ago"
    },
    {
      id: 2,
      customerName: "Rahul Kumar",
      rating: 5,
      review: "Professional packaging and fast delivery. The digital art print quality exceeded my expectations.",
      artworkTitle: "Golden Sunrise",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      date: "1 week ago"
    },
    {
      id: 3,
      customerName: "Anita Desai",
      rating: 4,
      review: "Beautiful ceramic piece with intricate details. Perfect for my home decor collection!",
      artworkTitle: "Ceramic Elegance",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      date: "3 days ago"
    },
    {
      id: 4,
      customerName: "Vikram Singh",
      rating: 5,
      review: "The photography captures nature perfectly. Great addition to my office space.",
      artworkTitle: "Ocean Dreams",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      date: "5 days ago"
    },
    {
      id: 5,
      customerName: "Meera Patel",
      rating: 5,
      review: "Love the artistic style and attention to detail. Will definitely order more pieces!",
      artworkTitle: "Urban Sketch",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      date: "1 week ago"
    },
    {
      id: 6,
      customerName: "Arjun Mehta",
      rating: 4,
      review: "Great quality artwork with beautiful framing. Customer service was excellent too.",
      artworkTitle: "Abstract Harmony",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      date: "4 days ago"
    }
  ];

  // Handle review click to pause scrolling
  const handleReviewClick = () => {
    setIsPaused(true);
    
    // Clear any existing timeout
    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
    }
    
    // Set new timeout for 30 seconds
    const timeout = setTimeout(() => {
      setIsPaused(false);
    }, 30000);
    
    setPauseTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
      }
    };
  }, [pauseTimeout]);

  // Tab configuration
  const tabs = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3,
      description: 'Overview and analytics'
    },
    { 
      id: 'artworks', 
      label: 'My Artworks', 
      icon: Image,
      description: 'Manage your creations'
    },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: Package,
      description: 'Track customer orders'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: PieChart,
      description: 'Detailed insights'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User,
      description: 'Account settings'
    }
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case 'artworks':
        return <MyArtworks />;
      case 'orders':
        return <Orders />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <>
      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart - Left Side (2/3 width) */}
        <div className="lg:col-span-2">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Monthly Sales Revenue</span>
              </CardTitle>
              <CardDescription>Track your artistic success over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Sales Chart */}
                <div className="relative h-80 p-4">
                  {/* Grid lines */}
                  <div className="absolute inset-4 pointer-events-none">
                    {/* Horizontal grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((fraction, index) => (
                      <div
                        key={`h-grid-${index}`}
                        className="absolute w-full border-t border-muted/30"
                        style={{ bottom: `${fraction * 100}%` }}
                      />
                    ))}
                    {/* Vertical grid lines */}
                    {salesData.map((_, index) => (
                      <div
                        key={`v-grid-${index}`}
                        className="absolute h-full border-l border-muted/20"
                        style={{ left: `${(index / (salesData.length - 1)) * 100}%` }}
                      />
                    ))}
                  </div>

                  <div className="flex items-end justify-between h-full space-x-4 relative z-10">
                    {salesData.map((month, index) => (
                      <div key={month.month} className="flex flex-col items-center flex-1 relative">
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden"
                          style={{ height: `${(month.sales / maxSales) * 100}%` }}
                        >
                          {/* Animated shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                          
                          {/* Sales value on hover */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                            <div className="bg-card text-card-foreground px-2 py-1 rounded text-sm shadow-lg border">
                              ₹{month.sales.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm font-medium text-muted-foreground">
                          {month.month}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Trend line connecting the bar tops */}
                  <svg className="absolute inset-4 pointer-events-none" style={{ zIndex: 5 }}>
                    <defs>
                      <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#2c3e7a', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#d4af37', stopOpacity: 0.8 }} />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="url(#trendGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={salesData.map((month, index) => {
                        const x = (index / (salesData.length - 1)) * 100;
                        const y = 100 - (month.sales / maxSales) * 100;
                        return `${x}%,${y}%`;
                      }).join(' ')}
                      className="drop-shadow-sm"
                    />
                    {/* Data points */}
                    {salesData.map((month, index) => {
                      const x = (index / (salesData.length - 1)) * 100;
                      const y = 100 - (month.sales / maxSales) * 100;
                      return (
                        <circle
                          key={`point-${index}`}
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="4"
                          fill="url(#trendGradient)"
                          stroke="white"
                          strokeWidth="2"
                          className="drop-shadow-sm hover:r-6 transition-all duration-200"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground pr-2">
                    <span>₹{maxSales.toLocaleString()}</span>
                    <span>₹{Math.round(maxSales * 0.75).toLocaleString()}</span>
                    <span>₹{Math.round(maxSales * 0.5).toLocaleString()}</span>
                    <span>₹{Math.round(maxSales * 0.25).toLocaleString()}</span>
                    <span>₹0</span>
                  </div>
                </div>

                {/* Sales Summary */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-800">₹{salesData.reduce((total, month) => total + month.sales, 0).toLocaleString()}</div>
                    <div className="text-sm text-green-600">Total Revenue</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-800">₹{Math.round(salesData.reduce((total, month) => total + month.sales, 0) / salesData.length).toLocaleString()}</div>
                    <div className="text-sm text-blue-600">Avg Monthly</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                    <div className="flex items-center justify-center mb-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-800">
                      {salesData.length > 1 ? 
                        `+${Math.round(((salesData[salesData.length - 1].sales - salesData[salesData.length - 2].sales) / salesData[salesData.length - 2].sales) * 100)}%` 
                        : '0%'
                      }
                    </div>
                    <div className="text-sm text-purple-600">Growth Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top 5 Artworks - Right Side (1/3 width) */}
        <div className="lg:col-span-1">
          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5 h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span>Top Selling Arts</span>
              </CardTitle>
              <CardDescription>Click to cycle through your bestsellers</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              {/* Main Artwork Display with Scroll Animation */}
              <div className="flex-1 flex items-center justify-center mb-6 overflow-hidden">
                <div className="relative w-64 h-80 cursor-pointer" onClick={handleArtworkClick}>
                  {/* Scrolling container */}
                  <div 
                    className={`flex transition-transform duration-500 ease-in-out ${
                      isScrolling ? '-translate-y-full' : 'translate-y-0'
                    }`}
                    style={{ height: '160%' }} // Double height to accommodate two cards
                  >
                    {/* Current artwork card */}
                    <div className="w-64 h-80 flex-shrink-0">
                      <Card className="w-full h-full overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-card to-accent/10">
                        <div className="relative h-48 overflow-hidden">
                          <ImageWithFallback
                            src={currentArtwork.image}
                            alt={currentArtwork.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gradient-to-r from-accent to-yellow-500 text-accent-foreground">
                              #{currentArtworkIndex + 1}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-card/90">
                              {currentArtwork.salesCount} sold
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg truncate">{currentArtwork.title}</h3>
                            <p className="text-sm text-muted-foreground">{currentArtwork.category}</p>
                          </div>
                          <div className="text-xl font-bold text-primary">
                            ₹{currentArtwork.price.toLocaleString()}
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{currentArtwork.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{currentArtwork.likes}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Next artwork preview card (shown during scroll animation) */}
                    <div className="w-64 h-80 flex-shrink-0">
                      <Card className="w-full h-full overflow-hidden shadow-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8 text-white animate-spin" />
                          </div>
                          <p className="text-muted-foreground">Loading next artwork...</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Scroll indicator */}
                  <div className="absolute bottom-4 right-4 pointer-events-none">
                    <div className={`w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center transition-opacity duration-300 ${
                      isScrolling ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artwork Navigation Dots */}
              <div className="flex justify-center space-x-2 mb-4">
                {topArtworks.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentArtworkIndex 
                        ? 'bg-gradient-to-r from-primary to-accent scale-125' 
                        : 'bg-muted hover:bg-muted-foreground/50'
                    }`}
                    onClick={() => {
                      if (!isScrolling && index !== currentArtworkIndex) {
                        setIsScrolling(true);
                        setTimeout(() => {
                          setCurrentArtworkIndex(index);
                          setIsScrolling(false);
                        }, 500);
                      }
                    }}
                  />
                ))}
              </div>

              {/* Click to continue indicator */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Click artwork to scroll to next bestseller</p>
                <div className="mt-2 mx-auto flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-8">
        <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-accent" />
              <span>Customer Reviews</span>
            </CardTitle>
            <CardDescription>What your customers are saying about your artwork</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-6">
            {/* Scrolling Reviews Container */}
            <div className="relative overflow-hidden">
              <div 
                className={`flex space-x-6 ${isPaused ? '' : 'animate-scroll-right'}`}
                style={{ width: `${reviews.length * 320}px` }}
              >
                {/* Duplicate the reviews array for seamless looping */}
                {[...reviews, ...reviews].map((review, index) => (
                  <div
                    key={`${review.id}-${index}`}
                    className="flex-shrink-0 w-80 cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={handleReviewClick}
                  >
                    <Card className="w-full bg-gradient-to-br from-card to-primary/5 border border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        {/* Customer Info */}
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="relative">
                            <ImageWithFallback
                              src={review.avatar}
                              alt={review.customerName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{review.customerName}</h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {review.date}
                          </div>
                        </div>
                        
                        {/* Review Content */}
                        <p className="text-muted-foreground mb-3 line-clamp-3">
                          "{review.review}"
                        </p>
                        
                        {/* Artwork Info */}
                        <div className="flex items-center justify-between pt-3 border-t border-muted/20">
                          <span className="text-sm font-medium">
                            Artwork: {review.artworkTitle}
                          </span>
                          <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                            Verified Purchase
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              
              {/* Pause indicator */}
              {isPaused && (
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-muted-foreground border">
                  Paused for 30s
                </div>
              )}
            </div>
            
            {/* Scroll instructions */}
            <div className="text-center mt-4 px-6">
              <p className="text-sm text-muted-foreground">
                Click any review to pause scrolling for 30 seconds
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div className="min-h-screen relative">
      {/* Dashboard Header */}
      <DashboardHeader
        user={user}
        currentTab={currentTab}
        onNavigateToHome={onNavigateToHome}
        onLogout={onLogout}
        onTabChange={handleTabChange}
      />

      {/* Enhanced Artistic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base artistic gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-neutral-100 to-stone-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-50/90 via-stone-100/70 to-neutral-100/80"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-stone-50/95 via-neutral-50/80 to-stone-100/85"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/60 via-transparent to-stone-50/60"></div>
        
        {/* Enhanced neutral beige color overlays */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-stone-200/20 via-neutral-200/25 to-stone-200/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-200/15 via-transparent to-stone-200/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-stone-200/20 via-transparent to-neutral-200/15"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-200/10 via-transparent to-stone-200/15"></div>
        </div>
        
        {/* Neutral watercolor blob effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
          <div className="absolute top-10 left-1/4 w-64 h-48 bg-gradient-to-br from-stone-300/40 to-neutral-300/30 rounded-full blur-3xl transform rotate-12" style={{clipPath: 'ellipse(70% 60% at 40% 50%)'}}></div>
          <div className="absolute top-40 right-1/4 w-56 h-72 bg-gradient-to-br from-neutral-300/35 to-stone-300/30 rounded-full blur-3xl transform -rotate-12" style={{clipPath: 'ellipse(60% 80% at 60% 40%)'}}></div>
          <div className="absolute bottom-32 left-1/3 w-72 h-40 bg-gradient-to-br from-stone-300/40 to-neutral-300/25 rounded-full blur-3xl transform rotate-45" style={{clipPath: 'ellipse(80% 50% at 30% 70%)'}}></div>
          <div className="absolute bottom-60 right-1/3 w-48 h-64 bg-gradient-to-br from-neutral-300/30 to-stone-300/35 rounded-full blur-3xl transform -rotate-30" style={{clipPath: 'ellipse(65% 75% at 50% 30%)'}}></div>
          <div className="absolute top-1/2 left-10 w-40 h-80 bg-gradient-to-br from-stone-300/30 to-neutral-300/25 rounded-full blur-3xl transform rotate-75" style={{clipPath: 'ellipse(40% 90% at 80% 50%)'}}></div>
          <div className="absolute top-20 right-10 w-80 h-32 bg-gradient-to-br from-neutral-300/35 to-stone-300/30 rounded-full blur-3xl transform -rotate-60" style={{clipPath: 'ellipse(85% 35% at 20% 60%)'}}></div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative">
        {/* Tab Navigation */}
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center space-x-1 mb-8 bg-card/30 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-border/40">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={currentTab === tab.id ? "default" : "ghost"}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 transition-all duration-200 ${
                    currentTab === tab.id 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="relative">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
}