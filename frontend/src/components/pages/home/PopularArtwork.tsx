import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowRight, Eye, Star } from 'lucide-react';

interface ArtworkCardProps {
  id: number;
  title: string;
  artist: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  onViewDetails: () => void;
  onAddToFavorites: () => void;
  onAddToCart: () => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  id,
  title,
  artist,
  price,
  image,
  category,
  rating,
  reviews,
  onViewDetails,
  onAddToFavorites,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <motion.div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image with overlay */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
          {category}
        </div>
        
        {/* Quick actions overlay */}
        <motion.div 
          className={`absolute inset-0 bg-black/30 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToFavorites();
              setIsFavorite(!isFavorite);
            }}
            className="p-2.5 bg-white/90 rounded-full hover:scale-110 transition-transform duration-200"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-700'}`} 
              strokeWidth={isFavorite ? 2 : 1.5} 
            />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="p-2.5 bg-white/90 rounded-full hover:scale-110 transition-transform duration-200"
            aria-label="View details"
          >
            <Eye className="w-5 h-5 text-stone-700" />
          </button>
        </motion.div>
      </div>
      
      {/* Artwork info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="pr-2">
            <h3 className="text-lg font-semibold text-stone-800 line-clamp-1">{title}</h3>
            <p className="text-sm text-stone-500">by {artist}</p>
          </div>
          <span className="text-lg font-bold text-amber-600 whitespace-nowrap">{price}</span>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                className={`w-4 h-4 ${star <= rating ? 'fill-current' : 'text-stone-300'}`} 
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-xs text-stone-500 ml-2">({reviews})</span>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const PopularArtwork: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const artworks = [
    {
      id: 1,
      title: 'Whispering Mountains',
      artist: 'Alex Johnson',
      price: '$1,200',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500&q=80',
      category: 'Landscape',
      rating: 4,
      reviews: 24,
      slug: 'whispering-mountains'
    },
    {
      id: 2,
      title: 'Urban Rhythms',
      artist: 'Maria Garcia',
      price: '$850',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500&q=80',
      category: 'Street',
      rating: 5,
      reviews: 18,
      slug: 'urban-rhythms'
    },
    {
      id: 3,
      title: 'Abstract Thoughts',
      artist: 'James Wilson',
      price: '$2,300',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500&q=80',
      category: 'Abstract',
      rating: 4,
      reviews: 32,
      slug: 'abstract-thoughts'
    },
    {
      id: 4,
      title: 'Serene Waters',
      artist: 'Sarah Chen',
      price: '$1,750',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500&q=80',
      category: 'Seascape',
      rating: 5,
      reviews: 27,
      slug: 'serene-waters'
    },
  ];

  const handleViewDetails = (slug: string) => {
    // Navigate to artwork detail page
    console.log('Viewing details for:', slug);
  };

  const handleAddToFavorites = (id: number) => {
    // Add to favorites logic
    console.log('Added to favorites:', id);
  };

  const handleAddToCart = (id: number) => {
    // Add to cart logic
    console.log('Added to cart:', id);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Featured <span className="text-amber-500">Artwork</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover unique pieces from our talented community of artists
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              {...artwork}
              onViewDetails={() => handleViewDetails(artwork.slug)}
              onAddToFavorites={() => handleAddToFavorites(artwork.id)}
              onAddToCart={() => handleAddToCart(artwork.id)}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/gallery" 
            className="inline-flex items-center px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors duration-200 group"
          >
            <span>Browse All Artwork</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-100/30 rounded-full blur-2xl -z-10"></div>
    </section>
  );
};

export default PopularArtwork;
