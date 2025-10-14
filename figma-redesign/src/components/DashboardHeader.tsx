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
  user: User | null;
  currentTab: string;
  onNavigateToHome: () => void;
  onLogout: () => void;
  onTabChange: (tab: string) => void;
}

export function DashboardHeader({ user, currentTab, onNavigateToHome, onLogout, onTabChange }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock notifications data
  const notifications: Notification[] = [
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

  const unreadCount = notifications.filter(n => !n.read).length;

  // Get current tab display name
  const getTabDisplayName = (tab: string) => {
    const tabNames: { [key: string]: string } = {
      'dashboard': 'Dashboard Overview',
      'artworks': 'My Artworks',
      'orders': 'Orders Management',
      'analytics': 'Analytics & Insights',
      'profile': 'Profile Settings'
    };
    return tabNames[tab] || 'Dashboard';
  };

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

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Determine which tab to navigate to based on search query
      const query = searchQuery.toLowerCase();
      
      if (query.includes('order') || query.includes('customer') || query.includes('buyer')) {
        onTabChange('orders');
      } else if (query.includes('analytic') || query.includes('report') || query.includes('sale') || query.includes('revenue')) {
        onTabChange('analytics');
      } else if (query.includes('profile') || query.includes('setting') || query.includes('account')) {
        onTabChange('profile');
      } else {
        // Default to artworks for artwork searches
        onTabChange('artworks');
      }
      
      console.log(`Searching for: "${searchQuery}" - navigated to appropriate tab`);
      // Clear search after navigation
      setSearchQuery('');
    }
  };

  // Generate and download CSV data
  const generateCSVData = () => {
    const csvData = [
      ['Artwork ID', 'Title', 'Price (₹)', 'Status', 'Orders', 'Revenue (₹)', 'Date Added'],
      ['ART-001', 'Abstract Harmony', '15000', 'Active', '12', '180000', '2024-01-15'],
      ['ART-002', 'Golden Sunrise', '8000', 'Active', '8', '64000', '2024-01-20'],
      ['ART-003', 'Ocean Dreams', '12000', 'Active', '5', '60000', '2024-02-01'],
      ['ART-004', 'Mountain Vista', '10000', 'Sold Out', '15', '150000', '2024-02-10'],
      ['ART-005', 'City Lights', '6000', 'Active', '3', '18000', '2024-02-15'],
      ['ART-006', 'Flower Garden', '9000', 'Active', '7', '63000', '2024-02-20'],
      ['ART-007', 'Desert Sunset', '11000', 'Active', '4', '44000', '2024-03-01'],
      ['ART-008', 'Forest Path', '7500', 'Active', '6', '45000', '2024-03-05'],
      ['ART-009', 'Rainbow Bridge', '13000', 'Active', '2', '26000', '2024-03-10'],
      ['ART-010', 'Starry Night', '14000', 'Active', '9', '126000', '2024-03-15']
    ];
    
    return csvData.map(row => row.join(',')).join('\n');
  };

  // Quick action handlers
  const handleQuickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, WebP, or GIF)');
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error('File size must be less than 10MB');
        return;
      }

      // Simulate upload process
      setIsUploading(true);
      toast.loading('Uploading artwork...', { id: 'upload' });

      setTimeout(() => {
        setIsUploading(false);
        toast.success(`Successfully uploaded "${file.name}"!`, { 
          id: 'upload',
          description: 'Navigate to My Artworks to manage your upload.'
        });
        onTabChange('artworks');
      }, 2000);
    }
    
    // Reset file input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleNewPromotion = () => {
    toast.info('Creating promotion...', {
      description: 'Navigating to artworks tab where you can create promotions.'
    });
    onTabChange('artworks');
  };

  const handleExportData = async () => {
    setIsExporting(true);
    toast.loading('Preparing your data export...', { id: 'export' });

    try {
      // Simulate data generation delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate CSV data
      const csvContent = generateCSVData();
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `artistalley-data-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Data exported successfully!', { 
        id: 'export',
        description: 'Your artwork data has been downloaded as a CSV file.'
      });
      
    } catch (error) {
      toast.error('Failed to export data', {
        id: 'export',
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleViewReports = () => {
    toast.info('Opening analytics...', {
      description: 'View detailed reports and insights about your artwork performance.'
    });
    onTabChange('analytics');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section - Logo + Breadcrumb */}
          <div className="flex items-center space-x-6">
            {/* ArtistAlley Logo */}

            
            <Separator orientation="vertical" className="h-6" />
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm">

              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{getTabDisplayName(currentTab)}</span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search artworks, orders, customers, analytics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                  if (e.key === 'Escape') {
                    setSearchQuery('');
                  }
                }}
                className="pl-10 pr-4 bg-muted/30 border-border/50 focus:bg-background"
              />
            </form>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleQuickUpload}
                disabled={isUploading}
                className="text-muted-foreground hover:text-foreground"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-1" />
                )}
                Upload
              </Button>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                multiple={false}
              />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Share2 className="w-4 h-4 mr-1" />
                    Actions
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleNewPromotion}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Create Promotion
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportData} disabled={isExporting}>
                    {isExporting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleViewReports}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Reports
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Separator orientation="vertical" className="h-6" />

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
                      {user?.name?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.name || 'Artist'}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user?.role || 'artist'}</span>
                  </div>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name || 'Artist Name'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || 'artist@artistalley.com'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  onTabChange('profile');
                  setIsProfileOpen(false);
                }}>
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  onTabChange('analytics');
                  setIsProfileOpen(false);
                }}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
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

        {/* Quick Stats Bar */}
        <div className="mt-4 flex items-center justify-between px-4 py-2 bg-muted/20 rounded-lg">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">System Status:</span>
              <span className="font-medium text-green-600">All Good</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-muted/30 px-2 py-1 rounded transition-colors"
              onClick={() => onTabChange('analytics')}
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-muted-foreground">This Month:</span>
              <span className="font-medium">₹28,000 revenue</span>
            </div>
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-muted/30 px-2 py-1 rounded transition-colors"
              onClick={() => onTabChange('orders')}
            >
              <ShoppingCart className="w-4 h-4 text-purple-600" />
              <span className="text-muted-foreground">Pending Orders:</span>
              <span className="font-medium">3</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Last updated: just now</span>
          </div>
        </div>
      </div>
    </header>
  );
}