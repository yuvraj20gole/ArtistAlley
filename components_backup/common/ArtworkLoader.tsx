import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface ArtworkLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const ArtworkLoader: React.FC<ArtworkLoaderProps> = ({ 
  size = 'md', 
  message = 'Loading artwork...' 
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const paintBrushRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderRef.current && paintBrushRef.current) {
      // Animate the paint brush rotation
      anime({
        targets: paintBrushRef.current,
        rotate: [0, 360],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
      });

      // Animate the paint drops
      anime({
        targets: '.paint-drop',
        translateY: [0, -20, 0],
        opacity: [0.7, 1, 0.7],
        duration: 1500,
        easing: 'easeInOutSine',
        loop: true,
        delay: anime.stagger(200)
      });

      // Animate the loading text
      anime({
        targets: '.loading-text',
        opacity: [0.5, 1, 0.5],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
      });
    }
  }, []);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        ref={loaderRef}
        className={`${sizeClasses[size]} relative flex items-center justify-center`}
      >
        {/* Paint brush */}
        <div 
          ref={paintBrushRef}
          className="absolute w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center"
        >
          <div className="w-2 h-6 bg-amber-600 rounded-full"></div>
        </div>
        
        {/* Paint drops */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="paint-drop absolute w-2 h-2 bg-amber-400 rounded-full"
            style={{
              top: `${30 + i * 8}%`,
              left: `${20 + i * 12}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
        
        {/* Canvas background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border-2 border-amber-200"></div>
      </div>
      
      <p className={`loading-text mt-4 text-amber-600 font-medium ${textSizeClasses[size]}`}>
        {message}
      </p>
    </div>
  );
};

// Paint palette loader variant
export const PaintPaletteLoader: React.FC<ArtworkLoaderProps> = ({ 
  size = 'md', 
  message = 'Loading...' 
}) => {
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paletteRef.current) {
      // Animate palette rotation
      anime({
        targets: paletteRef.current,
        rotate: [0, 360],
        duration: 3000,
        easing: 'easeInOutSine',
        loop: true
      });

      // Animate color dots
      anime({
        targets: '.color-dot',
        scale: [1, 1.2, 1],
        duration: 1000,
        easing: 'easeInOutSine',
        loop: true,
        delay: anime.stagger(100)
      });
    }
  }, []);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        ref={paletteRef}
        className={`${sizeClasses[size]} relative flex items-center justify-center`}
      >
        {/* Palette base */}
        <div className="absolute w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-full border-2 border-amber-300"></div>
        
        {/* Color dots */}
        {[
          { color: 'bg-red-400', position: 'top-2 left-1/2' },
          { color: 'bg-blue-400', position: 'top-1/2 right-2' },
          { color: 'bg-green-400', position: 'bottom-2 left-1/2' },
          { color: 'bg-yellow-400', position: 'top-1/2 left-2' },
          { color: 'bg-purple-400', position: 'top-1/3 left-1/3' },
          { color: 'bg-pink-400', position: 'top-1/3 right-1/3' }
        ].map((dot, i) => (
          <div
            key={i}
            className={`color-dot absolute w-3 h-3 ${dot.color} rounded-full ${dot.position} transform -translate-x-1/2 -translate-y-1/2`}
          />
        ))}
      </div>
      
      <p className="loading-text mt-4 text-amber-600 font-medium">
        {message}
      </p>
    </div>
  );
};

export default ArtworkLoader;
