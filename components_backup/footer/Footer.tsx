import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">AA</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                ArtistAlley
              </span>
            </div>
            <p className="text-stone-600 text-sm">
              Connecting artists and art lovers in a vibrant creative community.
              Discover unique artwork and support independent creators.
            </p>
            <div className="flex space-x-4 pt-2">
              {['instagram', 'twitter', 'facebook', 'pinterest'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-amber-500 transition-colors duration-200"
                >
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-stone-800 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Artists', path: '/artists' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-stone-600 hover:text-amber-600 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-stone-800 font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                'Paintings', 'Digital Art', 'Sculptures', 
                'Photography', 'Illustrations', 'Mixed Media'
              ].map((category) => (
                <li key={category}>
                  <a 
                    href={`/gallery?category=${category.toLowerCase()}`}
                    className="text-stone-600 hover:text-amber-600 transition-colors duration-200 text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-stone-800 font-semibold mb-4">Newsletter</h3>
            <p className="text-stone-600 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and featured artists.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-6 rounded-full font-medium hover:opacity-90 transition-opacity duration-200 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-500 text-sm">
            &copy; {new Date().getFullYear()} ArtistAlley. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-stone-500 hover:text-amber-600 text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="text-stone-500 hover:text-amber-600 text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="/cookies" className="text-stone-500 hover:text-amber-600 text-sm transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
