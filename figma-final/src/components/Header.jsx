import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export function Header({ onNavigateToLogin, onNavigateToRegister, onNavigateToHome, onNavigateToAbout, onNavigateToMore, onNavigateToBestSellers, onNavigateToGallery, onNavigateToArtistDashboard, currentPage, user, isAuthenticated, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavigation = (action) => {
    action();
    setIsMobileMenuOpen(false); // Close menu after navigation
  };
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <header className="w-full border-b bg-gradient-to-r from-white/90 via-purple-50/95 to-pink-50/90 backdrop-blur-md border-purple-200/40 shadow-lg relative z-50">
        <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Premium ArtistAlley Logo */}
          <div className="flex items-center cursor-pointer" onClick={onNavigateToHome}>
            <span 
              className="text-4xl md:text-5xl bg-clip-text text-transparent font-bold"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                background: 'linear-gradient(135deg, #FF6EC7 0%, #9B5DE5 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Artist
            </span>
            <span 
              className="text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                color: '#6A0DAD'
              }}
            >
              Alley
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Best Sellers', 'About', 'Gallery', 'More'].map((item, index) => (
              <a
                key={item}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (item === 'Home') {
                    onNavigateToHome();
                  } else if (item === 'Best Sellers') {
                    onNavigateToBestSellers();
                  } else if (item === 'About') {
                    onNavigateToAbout();
                  } else if (item === 'Gallery') {
                    onNavigateToGallery();
                  } else if (item === 'More') {
                    onNavigateToMore();
                  }
                }}
                className={`${
                  (index === 0 && currentPage === 'home') || 
                  (index === 1 && currentPage === 'bestsellers') || 
                  (index === 2 && currentPage === 'about') || 
                  (index === 3 && currentPage === 'gallery') ||
                  (index === 4 && currentPage === 'more')
                    ? 'text-gray-800' 
                    : 'text-gray-600'
                } hover:text-purple-600 transition-colors duration-300 relative group`}
              >
                {item}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                {user?.role === 'artist' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-gray-700 hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300"
                    onClick={onNavigateToArtistDashboard}
                  >
                    Dashboard
                  </Button>
                )}
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-700 hover:text-red-600 hover:bg-red-100/50 transition-all duration-300"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-700 hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300"
                  onClick={onNavigateToLogin}
                >
                  Login
                </Button>
                
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onNavigateToRegister}
                >
                  Register
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-gray-700 hover:text-purple-600"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-white/95 via-purple-50/95 to-pink-50/95 backdrop-blur-md border-b border-purple-200/40 shadow-xl z-50">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {['Home', 'Best Sellers', 'About', 'Gallery', 'More'].map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (item === 'Home') {
                        handleMobileNavigation(onNavigateToHome);
                      } else if (item === 'Best Sellers') {
                        handleMobileNavigation(onNavigateToBestSellers);
                      } else if (item === 'About') {
                        handleMobileNavigation(onNavigateToAbout);
                      } else if (item === 'Gallery') {
                        handleMobileNavigation(onNavigateToGallery);
                      } else if (item === 'More') {
                        handleMobileNavigation(onNavigateToMore);
                      }
                    }}
                    className={`${
                      (index === 0 && currentPage === 'home') || 
                      (index === 1 && currentPage === 'bestsellers') || 
                      (index === 2 && currentPage === 'about') || 
                      (index === 3 && currentPage === 'gallery') ||
                      (index === 4 && currentPage === 'more')
                        ? 'text-gray-800 bg-purple-100/30' 
                        : 'text-gray-600'
                    } hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300 px-4 py-3 rounded-lg relative group`}
                  >
                    {item}
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </a>
                ))}
                
                {/* Mobile Auth Buttons / User Menu */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-purple-200/30">
                  {isAuthenticated ? (
                    <>
                      {user?.role === 'artist' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-gray-700 hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300 justify-start"
                          onClick={() => handleMobileNavigation(onNavigateToArtistDashboard)}
                        >
                          Dashboard
                        </Button>
                      )}
                      <div className="text-sm text-gray-600 px-4 py-2">Welcome, {user?.name}</div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-700 hover:text-red-600 hover:bg-red-100/50 transition-all duration-300 justify-start"
                        onClick={() => handleMobileNavigation(onLogout)}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-700 hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300 justify-start"
                        onClick={() => handleMobileNavigation(onNavigateToLogin)}
                      >
                        Login
                      </Button>
                      
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 justify-start"
                        onClick={() => handleMobileNavigation(onNavigateToRegister)}
                      >
                        Register
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
        </div>
      </header>
    </>
  );
}