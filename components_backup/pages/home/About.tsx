import React from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About ArtistAlley</h2>
            <div className="w-20 h-1 bg-blue-500 mb-6"></div>
            <p className="text-gray-300 mb-6">
              ArtistAlley is a vibrant community where artists and art lovers come together to discover, share, and celebrate creativity. 
              Our platform connects talented artists with art enthusiasts from around the world.
            </p>
            <p className="text-gray-300 mb-8">
              Whether you're an artist looking to showcase your work or an art lover searching for that perfect piece, 
              ArtistAlley provides the perfect space to explore, connect, and be inspired.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/about" 
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-gray-900 transition-colors duration-300 text-center"
              >
                Learn More
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Art Studio"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-full z-0"></div>
            </div>
            
            <div className="hidden md:block absolute -top-8 -left-8 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="hidden md:block absolute -bottom-8 -right-8 w-20 h-20 bg-pink-500 rounded-full opacity-20"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-800">
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover Art</h3>
            <p className="text-gray-400">Explore thousands of unique artworks from talented artists around the world.</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect with Artists</h3>
            <p className="text-gray-400">Connect directly with artists, commission custom work, or follow your favorites.</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sell Your Work</h3>
            <p className="text-gray-400">Showcase and sell your artwork to a global audience of art lovers.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
