import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PopularArtists } from "./components/PopularArtists";
import { PopularArtwork } from "./components/PopularArtwork";
import { ComingSoon } from "./components/ComingSoon";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { About } from "./components/About";
import { More } from "./components/More";
import { BestSellers } from "./components/BestSellers";
import { Gallery } from "./components/Gallery";
import { ArtistDashboard } from "./components/ArtistDashboard";
import { BuyerDashboard } from "./components/BuyerDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { GoogleCallback } from "./components/GoogleCallback";
import { RoleSelection } from "./components/RoleSelection";
import { Toaster } from "./components/ui/sonner";

// TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer' | 'admin';
}

type PageType = 'home' | 'login' | 'register' | 'about' | 'more' | 'bestsellers' | 'gallery' | 'artist-dashboard' | 'buyer-dashboard' | 'admin-dashboard' | 'google-callback' | 'role-selection';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [registerDefaultRole, setRegisterDefaultRole] = useState<string>('');
  const [dashboardTab, setDashboardTab] = useState<string>('dashboard');
  
  // Authentication state - will be replaced with Django authentication later
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAccessToken = localStorage.getItem('access_token');
    
    if (storedUser && storedAccessToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
  }, []);

  // Get current page from location
  const getCurrentPage = (): PageType => {
    const path = location.pathname;
    if (path === '/login') return 'login';
    if (path === '/register') return 'register';
    if (path === '/about') return 'about';
    if (path === '/more') return 'more';
    if (path === '/bestsellers') return 'bestsellers';
    if (path === '/gallery') return 'gallery';
    if (path === '/artist-dashboard') return 'artist-dashboard';
    if (path === '/buyer-dashboard') return 'buyer-dashboard';
    if (path === '/admin-dashboard') return 'admin-dashboard';
    if (path === '/callback') return 'google-callback';
    if (path === '/role-selection') return 'role-selection';
    return 'home';
  };

  const navigateToLogin = () => navigate('/login');
  const navigateToRegister = (defaultRole?: string) => {
    setRegisterDefaultRole(defaultRole || '');
    navigate('/register');
  };
  const navigateToHome = () => navigate('/');
  const navigateToAbout = () => navigate('/about');
  const navigateToMore = () => navigate('/more');
  const navigateToBestSellers = () => navigate('/bestsellers');
  const navigateToGallery = () => navigate('/gallery');
  const navigateToArtistDashboard = (tab?: string) => {
    if (tab) {
      setDashboardTab(tab);
    }
    navigate('/artist-dashboard');
  };

  // Authentication functions - will be replaced with Django API calls later
  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Navigation is handled by the calling component (GoogleCallback, etc.)
    // No need to navigate here as components handle role-based redirection
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
    setDashboardTab('dashboard'); // Reset dashboard tab on logout
  };

  const handleRegister = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Navigation is handled by the Register component itself
    // No need to navigate here as Register.tsx handles role-based redirection
  };

  // Home page component that combines Hero, PopularArtists, PopularArtwork, and ComingSoon
  const HomePage = () => (
    <>
      <Hero onNavigateToRegister={navigateToRegister} onNavigateToGallery={navigateToGallery} />
      <PopularArtists />
      <PopularArtwork onNavigateToGallery={navigateToGallery} />
      <ComingSoon onNavigateToMore={navigateToMore} />
    </>
  );


  return (
    <div className="min-h-screen relative">
      {/* Enhanced Beige Artistic Background Layers */}
      <div className="fixed inset-0 -z-10">
        {/* Base neutral beige gradient backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-neutral-100 to-stone-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-50/80 via-stone-100/60 to-neutral-100/70"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-stone-50/90 via-neutral-50/70 to-stone-100/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/50 via-transparent to-stone-50/50"></div>
        
        {/* Enhanced neutral beige color overlays */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-stone-200/20 via-neutral-200/25 to-stone-200/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-200/15 via-transparent to-stone-200/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-stone-200/20 via-transparent to-neutral-200/15"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-200/10 via-transparent to-stone-200/15"></div>
        </div>
        
        {/* Neutral watercolor blob effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
          <div className="absolute top-10 left-1/4 w-64 h-48 bg-gradient-to-br from-stone-300/40 to-neutral-300/30 rounded-full blur-3xl transform rotate-12" style={{clipPath: 'ellipse(70% 60% at 40% 50%)'}}></div>
          <div className="absolute top-40 right-1/4 w-56 h-72 bg-gradient-to-br from-neutral-300/35 to-stone-300/30 rounded-full blur-3xl transform -rotate-12" style={{clipPath: 'ellipse(60% 80% at 60% 40%)'}}></div>
          <div className="absolute bottom-32 left-1/3 w-72 h-40 bg-gradient-to-br from-stone-300/40 to-neutral-300/25 rounded-full blur-3xl transform rotate-45" style={{clipPath: 'ellipse(80% 50% at 30% 70%)'}}></div>
          <div className="absolute bottom-60 right-1/3 w-48 h-64 bg-gradient-to-br from-neutral-300/30 to-stone-300/35 rounded-full blur-3xl transform -rotate-30" style={{clipPath: 'ellipse(65% 75% at 50% 30%)'}}></div>
          <div className="absolute top-1/2 left-10 w-40 h-80 bg-gradient-to-br from-stone-300/30 to-neutral-300/25 rounded-full blur-3xl transform rotate-75" style={{clipPath: 'ellipse(40% 90% at 80% 50%)'}}></div>
          <div className="absolute top-20 right-10 w-80 h-32 bg-gradient-to-br from-neutral-300/35 to-stone-300/30 rounded-full blur-3xl transform -rotate-60" style={{clipPath: 'ellipse(85% 35% at 20% 60%)'}}></div>
        </div>
        
        {/* Enhanced static artistic patterns and textures */}
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Artistic Grid Pattern */}
              <pattern id="artistic-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="currentColor" className="text-stone-600/50" />
                <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-neutral-600/45" />
                <circle cx="80" cy="30" r="1.2" fill="currentColor" className="text-stone-600/40" />
                <circle cx="30" cy="80" r="1.8" fill="currentColor" className="text-neutral-600/35" />
                <circle cx="70" cy="70" r="1" fill="currentColor" className="text-stone-600/45" />
              </pattern>
              
              {/* Paint Strokes Pattern */}
              <pattern id="paint-strokes" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q50,30 100,50 T200,50" stroke="currentColor" strokeWidth="1" className="text-neutral-600/25" fill="none" />
                <path d="M50,0 Q70,50 50,100 T50,200" stroke="currentColor" strokeWidth="0.8" className="text-stone-600/20" fill="none" />
                <path d="M100,25 Q150,45 200,25" stroke="currentColor" strokeWidth="0.6" className="text-neutral-600/15" fill="none" />
              </pattern>
            </defs>
            
            {/* Apply all patterns */}
            <rect width="100%" height="100%" fill="url(#artistic-grid)" />
            <rect width="100%" height="100%" fill="url(#paint-strokes)" />
          </svg>
        </div>
        
        {/* Static floating artistic elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Original floating circles with neutral beige tones */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-stone-300/30 to-neutral-300/25 rounded-full blur-2xl"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-br from-neutral-300/35 to-stone-300/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-60 left-1/4 w-36 h-36 bg-gradient-to-br from-stone-300/25 to-neutral-300/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 right-1/3 w-44 h-44 bg-gradient-to-br from-neutral-300/20 to-stone-300/25 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-gradient-to-br from-stone-300/30 to-neutral-300/25 rounded-full blur-xl"></div>
          <div className="absolute top-40 left-2/3 w-24 h-24 bg-gradient-to-br from-neutral-300/35 to-stone-300/30 rounded-full blur-lg"></div>
        </div>
        
        {/* Enhanced neutral beige overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50/8 via-transparent to-neutral-50/4"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-stone-50/2 to-transparent"></div>
      </div>

      {/* Main content with light backdrop blur */}
      <div className="relative backdrop-blur-[0.5px]">
        {/* Header - shown on all pages except dashboards */}
        {getCurrentPage() !== 'artist-dashboard' && getCurrentPage() !== 'buyer-dashboard' && getCurrentPage() !== 'admin-dashboard' && (
          <Header 
            onNavigateToLogin={navigateToLogin} 
            onNavigateToRegister={navigateToRegister}
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToMore={navigateToMore}
            onNavigateToBestSellers={navigateToBestSellers}
            onNavigateToGallery={navigateToGallery}
            onNavigateToArtistDashboard={navigateToArtistDashboard}
            currentPage={getCurrentPage()}
            user={user}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        )}

        {/* React Router Routes */}
        <Routes>
          {/* Home route - renders Hero, PopularArtists, PopularArtwork, and ComingSoon together */}
          <Route path="/" element={<HomePage />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={
            <Login 
              onLogin={handleLogin} 
              onNavigateToRegister={() => navigateToRegister()} 
              onNavigateToHome={navigateToHome} 
            />
          } />
          
          <Route path="/register" element={
            <Register 
              onRegister={handleRegister} 
              defaultRole={registerDefaultRole} 
              onNavigateToLogin={navigateToLogin} 
              onNavigateToHome={navigateToHome} 
            />
          } />
          
          {/* Page routes */}
          <Route path="/about" element={
            <About 
              onNavigateToHome={navigateToHome} 
              onNavigateToRegister={navigateToRegister} 
              onNavigateToGallery={navigateToGallery} 
              onNavigateToMore={navigateToMore} 
            />
          } />
          
          <Route path="/more" element={
            <More 
              onNavigateToHome={navigateToHome} 
              onNavigateToRegister={navigateToRegister} 
            />
          } />
          
          <Route path="/bestsellers" element={
            <BestSellers 
              onNavigateToHome={navigateToHome} 
              onNavigateToRegister={navigateToRegister} 
            />
          } />
          
          <Route path="/gallery" element={
            <Gallery 
              onNavigateToHome={navigateToHome} 
              onNavigateToRegister={navigateToRegister} 
            />
          } />
          
          {/* Dashboard routes */}
          <Route path="/artist-dashboard" element={
            <ArtistDashboard
              user={user}
              onNavigateToHome={navigateToHome}
              onLogout={handleLogout}
              activeTab={dashboardTab}
              onTabChange={setDashboardTab}
            />
          } />
          
          <Route path="/buyer-dashboard" element={
            <BuyerDashboard 
              user={user}
              onNavigateToHome={navigateToHome}
              onLogout={handleLogout}
              activeTab={dashboardTab}
              onTabChange={setDashboardTab}
            />
          } />
          
          <Route path="/admin-dashboard" element={
            <AdminDashboard 
              user={user}
              onNavigateToHome={navigateToHome}
              onLogout={handleLogout}
              activeTab={dashboardTab}
              onTabChange={setDashboardTab}
            />
          } />
          
          {/* Dashboard route - redirects based on user role */}
          <Route path="/dashboard" element={
            user?.role === 'artist' ? (
              <ArtistDashboard
                user={user}
                onNavigateToHome={navigateToHome}
                onLogout={handleLogout}
                activeTab={dashboardTab}
                onTabChange={setDashboardTab}
              />
            ) : user?.role === 'admin' ? (
              <AdminDashboard
                user={user}
                onNavigateToHome={navigateToHome}
                onLogout={handleLogout}
                activeTab={dashboardTab}
                onTabChange={setDashboardTab}
              />
            ) : (
              <BuyerDashboard 
                user={user}
                onNavigateToHome={navigateToHome}
                onLogout={handleLogout}
                activeTab={dashboardTab}
                onTabChange={setDashboardTab}
              />
            )
          } />
          
          {/* OAuth callback routes */}
          <Route path="/callback" element={
            <GoogleCallback 
              onLogin={handleLogin}
            />
          } />
          
          <Route path="/google-callback" element={
            <GoogleCallback 
              onLogin={handleLogin}
            />
          } />
          
          <Route path="/role-selection" element={
            user ? (
              <RoleSelection 
                user={user}
                onRoleSelected={(role) => {
                  const updatedUser = { ...user, role };
                  setUser(updatedUser);
                  if (role === 'artist') {
                    navigate('/artist-dashboard');
                  } else {
                    navigate('/buyer-dashboard');
                  }
                }}
              />
            ) : (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">No user data available</h2>
                  <button 
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            )
          } />
        </Routes>

        {/* Footer - shown on all pages except dashboards */}
        {getCurrentPage() !== 'artist-dashboard' && getCurrentPage() !== 'buyer-dashboard' && getCurrentPage() !== 'admin-dashboard' && (
          <Footer 
            onNavigateToMore={navigateToMore}
            onNavigateToGallery={navigateToGallery}
            onNavigateToBestSellers={navigateToBestSellers}
            onNavigateToAbout={navigateToAbout}
          />
        )}
      </div>
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}