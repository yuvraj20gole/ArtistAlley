import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { ArtworkLoader, PaintPaletteLoader } from './common/ArtworkLoader';

const TestComponent: React.FC = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animate the container on mount
    if (containerRef.current) {
      anime({
        targets: containerRef.current,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
      });
    }

    // Animate the title
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 200
      });
    }

    // Animate the description
    anime({
      targets: '.description',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutExpo',
      delay: 400
    });

    // Animate buttons with stagger
    anime({
      targets: '.animated-button',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutExpo',
      delay: anime.stagger(100, {start: 600})
    });
  }, []);

  const handleButtonHover = (e: React.MouseEvent) => {
    anime({
      targets: e.currentTarget,
      scale: 1.05,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonLeave = (e: React.MouseEvent) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const toggleLoader = () => {
    setShowLoader(!showLoader);
    if (!showLoader) {
      // Animate loader entrance
      setTimeout(() => {
        anime({
          targets: '.artwork-loader',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutBack'
        });
      }, 100);
    }
  };

  const togglePalette = () => {
    setShowPalette(!showPalette);
    if (!showPalette) {
      // Animate palette entrance
      setTimeout(() => {
        anime({
          targets: '.palette-loader',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutBack'
        });
      }, 100);
    }
  };

  const animateBounce = () => {
    anime({
      targets: '.bounce-target',
      translateY: [0, -20, 0],
      duration: 600,
      easing: 'easeOutBounce'
    });
  };

  const animateShake = () => {
    anime({
      targets: '.shake-target',
      translateX: [0, -10, 10, -10, 10, 0],
      duration: 500,
      easing: 'easeInOutSine'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div 
        ref={containerRef}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-purple-50/30"></div>
        
        <div className="relative z-10">
          <h1 
            ref={titleRef}
            className="text-3xl font-bold text-gray-800 mb-4 text-center"
          >
            🎨 ArtistAlley with Anime.js
          </h1>
          
          <p className="description text-gray-600 mb-8 text-center">
            Experience beautiful animations powered by Anime.js! Click the buttons below to see different animation effects.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              className="animated-button bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={toggleLoader}
            >
              {showLoader ? 'Hide' : 'Show'} Artwork Loader
            </button>
            
            <button 
              className="animated-button bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={togglePalette}
            >
              {showPalette ? 'Hide' : 'Show'} Palette Loader
            </button>
            
            <button 
              className="animated-button bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={animateBounce}
            >
              <span className="bounce-target">Bounce Animation</span>
            </button>
            
            <button 
              className="animated-button bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={animateShake}
            >
              <span className="shake-target">Shake Animation</span>
            </button>
          </div>

          {/* Loader demonstrations */}
          {showLoader && (
            <div className="artwork-loader mb-6">
              <ArtworkLoader size="md" message="Loading beautiful artwork..." />
            </div>
          )}

          {showPalette && (
            <div className="palette-loader mb-6">
              <PaintPaletteLoader size="lg" message="Preparing your palette..." />
            </div>
          )}

          {/* Floating elements demo */}
          <div className="flex justify-center space-x-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full floating-dot"
                style={{
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
