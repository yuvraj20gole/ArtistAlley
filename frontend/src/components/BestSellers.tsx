import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, TrendingUp, Star, Crown, Flame, Award, Users, ShoppingCart, Palette } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BestSellersProps {
  onNavigateToHome: () => void;
  onNavigateToRegister: (defaultRole?: string) => void;
}

export function BestSellers({ onNavigateToHome, onNavigateToRegister }: BestSellersProps) {
  const bestSellingArtwork = [
    {
      id: 1,
      title: "Ethereal Dreams",
      artist: "Priya Sharma",
      price: "₹45,000",
      originalPrice: "₹52,000",
      sales: 127,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1691849721970-e2e3ba443ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwYmVzdHNlbGxlcnxlbnwxfHx8fDE3NTY1Mzg1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Abstract Painting",
      badge: "Best Seller",
      trend: "+142%"
    },
    {
      id: 2,
      title: "Modern Serenity",
      artist: "Rahul Mehta",
      price: "₹89,000",
      originalPrice: "₹95,000",
      sales: 98,
      rating: 4.8,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1564387964788-573370385f7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzY3VscHR1cmUlMjBhcnR8ZW58MXx8fHwxNzU2NDc1NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Sculpture",
      badge: "Top Rated",
      trend: "+89%"
    },
    {
      id: 3,
      title: "Golden Harmony",
      artist: "Asha Patel",
      price: "₹12,500",
      originalPrice: "₹15,000",
      sales: 234,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1648176504950-c26dd4867443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBhcnR8ZW58MXx8fHwxNzU2NTM4NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Jewelry",
      badge: "Trending",
      trend: "+205%"
    },
    {
      id: 4,
      title: "Earth's Embrace",
      artist: "Vikram Singh",
      price: "₹28,500",
      originalPrice: "₹32,000",
      sales: 156,
      rating: 4.8,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1675604587136-f91dc1a4473b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMHZhc2V8ZW58MXx8fHwxNzU2NDcyNzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Pottery",
      badge: "Editor's Pick",
      trend: "+78%"
    }
  ];

  const salesStats = [
    { icon: ShoppingCart, label: "Total Sales", value: "₹2.4M", change: "+23%" },
    { icon: Users, label: "Happy Customers", value: "1,200+", change: "+18%" },
    { icon: TrendingUp, label: "Growth Rate", value: "89%", change: "+12%" },
    { icon: Award, label: "Top Artists", value: "45", change: "+8%" }
  ];

  const topCategories = [
    { name: "Abstract Paintings", sales: "₹850K", growth: "+45%", icon: "🎨" },
    { name: "Sculptures", sales: "₹620K", growth: "+32%", icon: "🗿" },
    { name: "Jewelry", sales: "₹490K", growth: "+67%", icon: "💎" },
    { name: "Pottery", sales: "₹380K", growth: "+28%", icon: "🏺" }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-8 px-4 bg-gradient-to-br from-purple-50 to-pink-50 border-b border-purple-200/40">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={onNavigateToHome}
            className="mb-6 text-gray-600 hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl text-gray-800 flex items-center justify-center gap-3">
              <Crown className="w-8 h-8 text-yellow-500" />
              Best Sellers
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highest-selling artwork from talented artists across India
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-red-500" />
                <span>Trending Now</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>High Demand</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Customer Favorites</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Sales Statistics */}
        <section>
          <h2 className="text-2xl text-gray-800 mb-8 text-center">Platform Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {salesStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600 mb-2">{stat.label}</div>
                  <div className="text-green-600 text-sm flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Categories */}
        <section>
          <h2 className="text-2xl text-gray-800 mb-8 text-center">Top-Selling Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg text-gray-800 mb-2">{category.name}</h3>
                  <div className="text-xl text-purple-600 mb-2">{category.sales}</div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {category.growth}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Selling Artwork */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl text-gray-800">Top Selling Artwork</h2>
            <div className="flex items-center gap-4">
              <select className="px-4 py-2 border border-purple-200 rounded-lg focus:border-purple-400 focus:ring-purple-400/20">
                <option>Sort by Sales</option>
                <option>Sort by Rating</option>
                <option>Sort by Price</option>
                <option>Sort by Recent</option>
              </select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellingArtwork.map((artwork) => (
              <Card key={artwork.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge 
                      className={`${
                        artwork.badge === 'Best Seller' ? 'bg-red-500' :
                        artwork.badge === 'Top Rated' ? 'bg-yellow-500' :
                        artwork.badge === 'Trending' ? 'bg-green-500' :
                        'bg-purple-500'
                      } text-white border-0`}
                    >
                      {artwork.badge === 'Best Seller' && <Flame className="w-3 h-3 mr-1" />}
                      {artwork.badge === 'Top Rated' && <Crown className="w-3 h-3 mr-1" />}
                      {artwork.badge === 'Trending' && <TrendingUp className="w-3 h-3 mr-1" />}
                      {artwork.badge === 'Editor\'s Pick' && <Award className="w-3 h-3 mr-1" />}
                      {artwork.badge}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-green-700">
                      {artwork.trend}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-3">
                    <Badge variant="outline" className="text-xs">
                      {artwork.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg text-gray-800 mb-2">{artwork.title}</h3>
                  <p className="text-gray-600 mb-3">by {artwork.artist}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{artwork.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{artwork.reviews} reviews</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <div className="text-xl text-purple-600">{artwork.price}</div>
                      <div className="text-sm text-gray-400 line-through">{artwork.originalPrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{artwork.sales} sold</div>
                      <div className="text-xs text-green-600">High demand</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    onClick={() => onNavigateToRegister('buyer')}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action for Artists */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl text-gray-800 mb-4">Want to Join Our Best Sellers?</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Become an artist on ArtistAlley and showcase your work to thousands of art lovers. Our top artists earn up to ₹2L+ per month!
          </p>
          <div className="flex items-center justify-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              <span>Premium exposure</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Growing market</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span>Active community</span>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => onNavigateToRegister('artist')}
          >
            <Palette className="w-5 h-5 mr-2" />
            Become an Artist
          </Button>
        </section>
      </div>
    </div>
  );
}
