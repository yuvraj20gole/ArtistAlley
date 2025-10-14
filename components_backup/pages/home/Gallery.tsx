import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';

const galleryItems = [
  {
    id: 1,
    title: 'Ocean Breeze',
    artist: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500&q=80',
    category: 'Seascape',
    slug: 'ocean-breeze'
  },
  {
    id: 2,
    title: 'Urban Jungle',
    artist: 'Carlos Mendez',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600&q=80',
    category: 'Street',
    slug: 'urban-jungle'
  },
  {
    id: 3,
    title: 'Mountain Peak',
    artist: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500&q=80',
    category: 'Landscape',
    slug: 'mountain-peak'
  },
  {
    id: 4,
    title: 'Desert Dreams',
    artist: 'Ahmed Khan',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600&q=80',
    category: 'Desert',
    slug: 'desert-dreams'
  },
  {
    id: 5,
    title: 'Forest Path',
    artist: 'Lisa Wong',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500&q=80',
    category: 'Nature',
    slug: 'forest-path'
  },
  {
    id: 6,
    title: 'City Lights',
    artist: 'David Kim',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600&q=80',
    category: 'Urban',
    slug: 'city-lights'
  },
];

export const Gallery: React.FC = () => {
  const galleryRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate gallery title
            anime({
              targets: '.gallery-title',
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 800,
              easing: 'easeOutExpo'
            });

            // Animate title underline
            anime({
              targets: '.gallery-underline',
              scaleX: [0, 1],
              duration: 1000,
              easing: 'easeOutExpo',
              delay: 300
            });

            // Animate gallery description
            anime({
              targets: '.gallery-description',
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 600,
              easing: 'easeOutExpo',
              delay: 500
            });

            // Animate gallery items with stagger
            anime({
              targets: '.gallery-item',
              translateY: [100, 0],
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 800,
              easing: 'easeOutExpo',
              delay: anime.stagger(150, {start: 700})
            });

            // Animate view full gallery button
            anime({
              targets: '.gallery-button',
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

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={galleryRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="gallery-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Gallery</h2>
          <div className="gallery-underline w-20 h-1 bg-blue-600 mx-auto" style={{ transformOrigin: 'center' }}></div>
          <p className="gallery-description mt-4 text-gray-600 max-w-2xl mx-auto">
            Browse through our curated collection of stunning artwork from talented artists worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item group relative overflow-hidden rounded-lg"
              onMouseEnter={(e) => {
                anime({
                  targets: e.currentTarget,
                  scale: 1.02,
                  rotateY: 2,
                  duration: 300,
                  easing: 'easeOutQuad'
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
              }}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-200 text-sm mb-3">by {item.artist}</p>
                <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mb-3">
                  {item.category}
                </span>
                <Link 
                  to={`/artwork/${item.slug}`}
                  className="text-white font-medium text-sm flex items-center group-hover:underline"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/gallery" 
            className="gallery-button inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
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
            View Full Gallery
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
