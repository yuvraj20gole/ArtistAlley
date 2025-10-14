import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onNavigateToHome: () => void;
  onNavigateToAbout: () => void;
  onNavigateToGallery: () => void;
  onNavigateToLogin: () => void;
  onNavigateToRegister: (role: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToHome,
  onNavigateToAbout,
  onNavigateToGallery,
  onNavigateToLogin,
  onNavigateToRegister,
}) => {
  return (
    <header className="relative z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onNavigateToHome}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">AA</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text text-transparent">
              ArtistAlley
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onNavigateToHome}
              className="text-stone-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button 
              onClick={onNavigateToAbout}
              className="text-stone-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button 
              onClick={onNavigateToGallery}
              className="text-stone-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              Gallery
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onNavigateToLogin}
              className="px-4 py-2 text-stone-700 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              Log In
            </button>
            <button 
              onClick={() => onNavigateToRegister('')}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity duration-200 shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
