import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import anime from 'animejs';

interface ArtistCardProps {
  id: number;
  name: string;
  username: string;
  avatar: string;
  category: string;
  followers: number;
  onArtistClick?: (artist: any) => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ 
  id, name, username, avatar, category, followers, onArtistClick 
}) => {
  return (
    <motion.div 
      className="artist-card group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      whileHover={{ y: -5 }}
      onClick={() => onArtistClick?.({ id, name, username })}
      onMouseEnter={(e) => {
        anime({
          targets: e.currentTarget,
          scale: 1.03,
          rotateY: 3,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        // Animate avatar
        anime({
          targets: e.currentTarget.querySelector('.artist-avatar'),
          scale: 1.1,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        // Animate follower badge
        anime({
          targets: e.currentTarget.querySelector('.follower-badge'),
          scale: 1.2,
          duration: 200,
          easing: 'easeOutBack'
        });
      }}
      onMouseLeave={(e) => {
        anime({
          targets: e.currentTarget,
          scale: 1,
          rotateY: 0,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        // Reset avatar
        anime({
          targets: e.currentTarget.querySelector('.artist-avatar'),
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        // Reset follower badge
        anime({
          targets: e.currentTarget.querySelector('.follower-badge'),
          scale: 1,
          duration: 200,
          easing: 'easeOutQuad'
        });
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img 
            src={avatar} 
            alt={name}
            className="artist-avatar w-24 h-24 rounded-full object-cover border-4 border-amber-100 group-hover:border-amber-200 transition-colors duration-300"
          />
          <div className="follower-badge absolute -bottom-1 -right-1 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {(followers / 1000).toFixed(1)}k
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-stone-800">{name}</h3>
        <p className="text-sm text-amber-600 mb-2">@{username}</p>
        <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full mb-4">
          {category}
        </span>
        
        <button 
          className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1 group/button"
          onClick={(e) => {
            e.stopPropagation();
            onArtistClick?.({ id, name, username });
          }}
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/button:translate-x-0.5 transition-transform" />
        </button>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-amber-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </motion.div>
  );
};

interface PopularArtistsProps {
  onArtistClick?: (artist: any) => void;
}

export const PopularArtists: React.FC<PopularArtistsProps> = ({ onArtistClick }) => {
  const artistsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate section title
            anime({
              targets: '.artists-title',
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 800,
              easing: 'easeOutExpo'
            });

            // Animate section description
            anime({
              targets: '.artists-description',
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 600,
              easing: 'easeOutExpo',
              delay: 300
            });

            // Animate artist cards with stagger
            anime({
              targets: '.artist-card',
              translateY: [80, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 800,
              easing: 'easeOutExpo',
              delay: anime.stagger(200, {start: 500})
            });

            // Animate view all button
            anime({
              targets: '.view-all-button',
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 600,
              easing: 'easeOutExpo',
              delay: 1200
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (artistsRef.current) {
      observer.observe(artistsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mock data - replace with actual data from your backend
  const artists = [
    { 
      id: 1, 
      username: 'alexjohnson',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80', 
      category: 'Abstract',
      followers: 1243 
    },
    { 
      id: 2, 
      username: 'mariagarcia', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80', 
      category: 'Portrait',
      followers: 982 
    },
    { 
      id: 3, 
      username: 'jameswilson', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80', 
      category: 'Digital',
      followers: 1567 
    },
    { 
      id: 4, 
      username: 'sarahchen', 
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80', 
      category: 'Watercolor',
      followers: 875 
    },
  ];

  return (
    <section ref={artistsRef} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-white to-stone-50/30"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="artists-title text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Featured <span className="text-amber-500">Artists</span>
          </h2>
          <p className="artists-description text-lg text-stone-600 max-w-2xl mx-auto">
            Discover and connect with talented independent artists from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist) => (
            <ArtistCard 
              key={artist.id}
              {...artist}
              onArtistClick={onArtistClick}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/artists" 
            className="view-all-button inline-flex items-center px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors duration-200 group"
            onMouseEnter={(e) => {
              anime({
                targets: e.currentTarget,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
              });
            }}
            onMouseLeave={(e) => {
              anime({
                targets: e.currentTarget,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
              });
            }}
          >
            <span>View All Artists</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl -z-10"></div>
    </section>
  );
};

export default PopularArtists;
