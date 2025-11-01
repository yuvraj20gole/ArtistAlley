import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, MapPin } from "lucide-react";

const artists = [
  {
    id: 1,
    name: "Sarah Chen",
    specialty: "Abstract Paintings",
    location: "San Francisco, CA",
    rating: 4.9,
    artworks: 47,
    image: "https://images.unsplash.com/photo-1589081711003-9b5382b65980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwb3J0cmFpdCUyMGNyZWF0aXZlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1NTE5ODY2M3ww&ixlib=rb-4.1.0&q=80&w=400",
    featured: true
  },
  {
    id: 2,
    name: "Marcus Rivera",
    specialty: "Ceramic Art",
    location: "Austin, TX",
    rating: 4.8,
    artworks: 32,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    featured: false
  },
  {
    id: 3,
    name: "Elena Kozlova",
    specialty: "Handmade Jewelry",
    location: "Portland, OR",
    rating: 4.9,
    artworks: 89,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    featured: true
  },
  {
    id: 4,
    name: "David Kim",
    specialty: "Sculptures",
    location: "New York, NY",
    rating: 4.7,
    artworks: 28,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    featured: false
  }
];

export const PopularArtists: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Section static background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-purple-50/80 to-pink-50/90"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-rose-100/60 via-transparent to-cyan-100/50"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-800 mb-4">
            Popular Artists
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover talented artists from around the world creating exceptional pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist, index) => (
            <div
              key={artist.id}
              className="group"
            >
              <Card className="hover:shadow-2xl transition-all duration-500 cursor-pointer border-purple-200/50 hover:border-pink-300/70 bg-white/70 backdrop-blur-sm hover:bg-white/80 group-hover:-translate-y-2 group-hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300">
                      <ImageWithFallback
                        src={artist.image}
                        alt={artist.name}
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-pink-300/40 group-hover:ring-pink-400/60 transition-all duration-300"
                      />
                      {artist.featured && (
                        <Badge 
                          variant="secondary" 
                          className="absolute -top-2 -right-2 text-xs px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-gray-800 mb-1">
                      {artist.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {artist.specialty}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      {artist.location}
                    </div>
                    
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm text-gray-700">{artist.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {artist.artworks} artworks
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularArtists;