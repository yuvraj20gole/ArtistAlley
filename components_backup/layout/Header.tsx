import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          ArtistAlley
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/artists" className="text-gray-700 hover:text-gray-900">Artists</Link>
          <Link to="/gallery" className="text-gray-700 hover:text-gray-900">Gallery</Link>
          <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link 
            to="/login" 
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
