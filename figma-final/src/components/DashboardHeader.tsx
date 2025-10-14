import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Plus, 
  Home, 
  Settings, 
  LogOut, 
  MessageSquare, 
  FileText, 
  Upload, 
  Share2, 
  Download,
  ChevronDown,
  BookOpen,
  LifeBuoy,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  ShoppingCart,
  Star,
  TrendingUp,
  DollarSign,
  Loader2,
  CheckCircle2,
  Image
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { toast } from "sonner@2.0.3";

// TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer';
}

interface Notification {
  id: number;
  type: 'order' | 'message' | 'system' | 'achievement';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface DashboardHeaderProps {
  userName?: string;
  userRole?: 'artist' | 'buyer';
  onNavigateToHome: () => void;
  onLogout: () => void;
}

export function DashboardHeader({ userName = 'User', userRole = 'buyer', onNavigateToHome, onLogout }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const isArtist = userRole === 'artist';

  // Mock notifications data - different for artist vs buyer
  const artistNotifications: Notification[] = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Priya Sharma ordered "Abstract Harmony" for ₹15,000',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      title: 'Customer Message',
      message: 'Rahul Kumar: "When will my order be shipped?"',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Milestone Reached!',
      message: 'Congratulations! You\'ve sold 50 artworks this month',
      time: '1 hour ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'system',
      title: 'Payment Processed',
      message: 'Payment of ₹8,000 for "Golden Sunrise" has been processed',
      time: '3 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Update',
      message: 'Order #A-2024-0156 has been marked as delivered',
      time: '5 hours ago',
      read: true,
      priority: 'low'
    }
  ];

  const buyerNotifications: Notification[] = [
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order "Ocean Waves" has been shipped and is on the way!',
      time: '30 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'system',
      title: 'New Artist Alert',
      message: 'Priya Sharma uploaded new artwork you might like',
      time: '2 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Special Offer',
      message: '20% off on all ceramic vases this weekend!',
      time: '1 day ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order "Ceramic Elegance" has been delivered',
      time: '2 days ago',
      read: true,
      priority: 'low'
    }
  ];

  const notifications = isArtist ? artistNotifications : buyerNotifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  // Get notification icon based on type
  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-yellow-500' : 'text-blue-500';
    
    switch (type) {
      case 'order':
        return <ShoppingCart className={`w-4 h-4 ${iconClass}`} />;
      case 'message':
        return <MessageSquare className={`w-4 h-4 ${iconClass}`} />;
      case 'achievement':
        return <Star className={`w-4 h-4 ${iconClass}`} />;
      case 'system':
        return <Info className={`w-4 h-4 ${iconClass}`} />;
      default:
        return <Bell className={`w-4 h-4 ${iconClass}`} />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-6">
            {/* ArtistAlley Logo */}
            <button 
              onClick={onNavigateToHome}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span 
                className="text-2xl bg-clip-text text-transparent"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  background: 'linear-gradient(135deg, #FF6EC7 0%, #9B5DE5 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Artist
              </span>
              <span 
                className="text-2xl"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  color: '#6A0DAD'
                }}
              >
                Alley
              </span>
            </button>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder={isArtist ? "Search artworks, orders, analytics..." : "Search artwork, orders, artists..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-muted/30 border-border/50 focus:bg-background"
              />
            </div>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center space-x-2">

            {/* Support & Help */}
            <Popover open={isHelpOpen} onOpenChange={setIsHelpOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Support & Help</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get help with your ArtistAlley dashboard
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      size="sm"
                      onClick={() => window.open('https://docs.artistalley.com', '_blank')}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Help Documentation
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      size="sm"
                      onClick={() => window.open('https://docs.artistalley.com/getting-started', '_blank')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Getting Started Guide
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      size="sm"
                      onClick={() => window.open('mailto:support@artistalley.com', '_blank')}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">support@artistalley.com</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg cursor-pointer hover:bg-muted/40 transition-colors"
                       onClick={() => {
                         // In a real app, this would open live chat
                         console.log('Live chat opened');
                         setIsHelpOpen(false);
                       }}>
                    <div className="flex items-center space-x-2 mb-1">
                      <LifeBuoy className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Live Chat</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Available 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Notifications */}
            <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative text-muted-foreground hover:text-foreground"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Notifications</h4>
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <Card 
                        key={notification.id} 
                        className={`p-3 cursor-pointer transition-colors hover:bg-muted/30 ${!notification.read ? 'border-primary/20 bg-primary/5' : ''}`}
                        onClick={() => {
                          // Handle notification click based on type
                          if (notification.type === 'order') {
                            onTabChange('orders');
                          } else if (notification.type === 'message') {
                            onTabChange('orders'); // Messages might be in orders tab
                          } else if (notification.type === 'achievement') {
                            onTabChange('analytics');
                          }
                          setIsNotificationsOpen(false);
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type, notification.priority)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium truncate">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2"></div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-center" 
                    size="sm"
                    onClick={() => {
                      // In a real app, this would open a dedicated notifications page
                      console.log('View all notifications');
                      setIsNotificationsOpen(false);
                    }}
                  >
                    View All Notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Profile Dropdown */}
            <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                  </div>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  onNavigateToHome();
                  setIsProfileOpen(false);
                }}>
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  onLogout();
                  setIsProfileOpen(false);
                }} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>


      </div>
    </header>
  );
}