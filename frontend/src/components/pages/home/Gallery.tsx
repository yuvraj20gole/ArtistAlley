import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ArrowRight, Heart, Eye, Palette, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

const galleryItems = [
  {
    id: 1,
    title: "Flowing Waters",
    artist: "Meera Krishnan",
    category: "paintings",
    medium: "Watercolor",
    price: "₹18,500",
    dimensions: "16\" x 20\"",
    year: 2024,
    image: "https://images.unsplash.com/photo-1703587820463-31df3ad2d39b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBhcnR8ZW58MXx8fHwxNzU2NDg2MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    views: 892,
    likes: 67,
    featured: false,
    description: "A serene watercolor painting capturing the gentle flow of water through natural landscapes."
  },
  {
    id: 2,
    title: "Digital Dreams",
    artist: "Arjun Tech",
    category: "digital",
    medium: "Digital Illustration",
    price: "₹25,000",
    dimensions: "24\" x 36\"",
    year: 2024,
    image: "https://images.unsplash.com/photo-1634035302742-91206968e455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1NjQzNzEzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    views: 1456,
    likes: 134,
    featured: true,
    description: "A vibrant digital artwork exploring futuristic themes and imaginative landscapes."
  },
  {
    id: 3,
    title: "Classical Beauty",
    artist: "Ravi Saxena",
    category: "paintings",
    medium: "Oil on Canvas",
    price: "₹65,000",
    dimensions: "30\" x 40\"",
    year: 2023,
    image: "https://images.unsplash.com/photo-1681235853785-abd5838a71ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBwYWludGluZyUyMGNhbnZhc3xlbnwxfHx8fDE3NTY0ODQxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    views: 743,
    likes: 52,
    featured: false,
    description: "A masterful oil painting showcasing traditional techniques with contemporary appeal."
  },
  {
    id: 4,
    title: "Urban Symphony",
    artist: "Lisa Park",
    category: "digital",
    medium: "Digital Art",
    price: "₹32,000",
    dimensions: "20\" x 28\"",
    year: 2024,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFydCUyMGRpZ2l0YWx8ZW58MXx8fHwxNzU2NDg2MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    views: 1124,
    likes: 89,
    featured: true,
    description: "A dynamic digital piece capturing the energy and rhythm of city life."
  },
  {
    id: 5,
    title: "Nature's Canvas",
    artist: "Amit Sharma",
    category: "paintings",
    medium: "Acrylic",
    price: "₹22,000",
    dimensions: "18\" x 24\"",
    year: 2024,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBwYWludGluZ3xlbnwxfHx8fDE3NTY0ODQxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    views: 678,
    likes: 43,
    featured: false,
    description: "An acrylic painting celebrating the beauty and serenity of natural landscapes."
  },
  {
    id: 6,
    title: "Abstract Emotions",
    artist: "Priya Singh",
    category: "paintings",
    medium: "Mixed Media",
    price: "₹28,500",
    dimensions: "22\" x 30\"",
    year: 2024,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGVtb3Rpb25zfGVufDF8fHx8MTc1NjQ4NDEzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    views: 945,
    likes: 71,
    featured: true,
    description: "A mixed media exploration of human emotions through abstract forms and colors."
  }
];

export const Gallery: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Palette className="w-8 h-8 text-blue-500" />
            Explore Our Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our curated collection of stunning artwork from talented artists worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-500 text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button size="sm" variant="secondary" className="p-2 bg-white/90 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-4 text-white text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <Badge variant="outline" className="text-xs">
                    {item.medium}
                  </Badge>
                </div>
                
                <h3 className="text-lg text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {item.artist}</p>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{item.dimensions}</span>
                  <span>{item.year}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg text-blue-600">{item.price}</div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/gallery" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            View Full Gallery
            <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;