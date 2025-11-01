import { useState, useEffect } from "react";
import { authAPI } from "../services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera,
  Edit3,
  Save,
  X,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Award,
  Calendar,
  Palette
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer' | 'admin';
}

interface ProfileProps {
  user: User | null;
}

export function Profile({ user }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Passionate artist creating abstract and contemporary artworks. Inspired by nature and urban landscapes.',
    website: 'https://artistportfolio.com',
    instagram: '@artist_alley',
    twitter: '@artist_alley',
    facebook: 'Artist Alley',
    specialties: ['Abstract Art', 'Digital Art', 'Photography', 'Sculpture']
  });

  useEffect(() => {
    // Load saved profile data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setFormData(prevData => ({
          ...prevData,
          ...parsedProfile,
          // Keep user data from props if available
          name: user?.name || parsedProfile.name,
          email: user?.email || parsedProfile.email,
        }));
      } catch (error) {
        console.error('Error loading saved profile:', error);
      }
    }
  }, [user]);

  const handleSave = async () => {
    try {
      // Update profile via API
      const updateData = {
        first_name: formData.name.split(' ')[0] || '',
        last_name: formData.name.split(' ').slice(1).join(' ') || '',
        bio: formData.bio,
        artist_name: formData.specialties.join(', '),
        website: formData.website,
        instagram_handle: formData.instagram,
      };

      await authAPI.updateProfile(updateData);
      
      // Also save to localStorage for backup
      localStorage.setItem('userProfile', JSON.stringify(formData));
      
      // Show success message
      alert('Profile updated successfully! Your changes have been saved.');
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Fallback to localStorage
      localStorage.setItem('userProfile', JSON.stringify(formData));
      alert('Profile updated locally. Some changes may not sync with the server.');
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    // Load saved profile data or reset to default
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setFormData({
          ...parsedProfile,
          name: user?.name || parsedProfile.name,
          email: user?.email || parsedProfile.email,
        });
      } catch (error) {
        // Reset to default if parsing fails
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: '+91 98765 43210',
          location: 'Mumbai, Maharashtra',
          bio: 'Passionate artist creating abstract and contemporary artworks. Inspired by nature and urban landscapes.',
          website: 'https://artistportfolio.com',
          instagram: '@artist_alley',
          twitter: '@artist_alley',
          facebook: 'Artist Alley',
          specialties: ['Abstract Art', 'Digital Art', 'Photography', 'Sculpture']
        });
      }
    } else {
      // Reset to default
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+91 98765 43210',
        location: 'Mumbai, Maharashtra',
        bio: 'Passionate artist creating abstract and contemporary artworks. Inspired by nature and urban landscapes.',
        website: 'https://artistportfolio.com',
        instagram: '@artist_alley',
        twitter: '@artist_alley',
        facebook: 'Artist Alley',
        specialties: ['Abstract Art', 'Digital Art', 'Photography', 'Sculpture']
      });
    }
    setIsEditing(false);
  };

  const achievements = [
    { title: 'Top Seller', description: 'Achieved highest sales in Q1 2024', date: 'March 2024', icon: Award },
    { title: 'Community Favorite', description: 'Most liked artist of the month', date: 'February 2024', icon: Award },
    { title: 'Rising Star', description: 'Featured in trending artists', date: 'January 2024', icon: Award },
  ];

  const stats = {
    totalArtworks: 24,
    totalSales: 67,
    totalRevenue: 156000,
    joinDate: 'January 2023',
    rating: 4.8,
    reviews: 45
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Artist Profile
        </h2>
        <p className="text-muted-foreground mt-1">Manage your profile and personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-card to-primary/5">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-accent hover:bg-accent/90"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <h3 className="text-xl font-semibold">{formData.name}</h3>
              <p className="text-muted-foreground">{formData.email}</p>
              <Badge className="mt-2 bg-gradient-to-r from-primary to-accent text-white">
                Artist
              </Badge>
              
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {stats.joinDate}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">{stats.totalArtworks}</div>
                    <div className="text-xs text-muted-foreground">Artworks</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">{stats.totalSales}</div>
                    <div className="text-xs text-muted-foreground">Sales</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-4 bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Revenue</span>
                <span className="font-semibold">₹{stats.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Average Rating</span>
                <span className="font-semibold">{stats.rating}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Customer Reviews</span>
                <span className="font-semibold">{stats.reviews}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </div>
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.name}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.email}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.phone}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full p-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Bio</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={3}
                    className="w-full p-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <p className="text-muted-foreground">{formData.bio}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Specialties</label>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="bg-accent/10 text-accent-foreground">
                      <Palette className="w-3 h-3 mr-1" />
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle>Social Media & Links</CardTitle>
              <CardDescription>Connect your social media accounts and website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full p-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {formData.website}
                      </a>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Instagram</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                      className="w-full p-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Instagram className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.instagram}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Twitter</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.twitter}
                      onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                      className="w-full p-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Twitter className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.twitter}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Facebook</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.facebook}
                      onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                      className="w-full p-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Facebook className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.facebook}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle>Achievements & Milestones</CardTitle>
              <CardDescription>Your artistic journey and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent to-yellow-500 rounded-full flex items-center justify-center">
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}