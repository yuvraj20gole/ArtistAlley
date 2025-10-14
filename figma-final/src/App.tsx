import { useState } from "react";
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
import { Toaster } from "./components/ui/sonner";

// TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer' | 'admin';
}

type PageType = 'home' | 'login' | 'register' | 'about' | 'more' | 'bestsellers' | 'gallery' | 'artist-dashboard' | 'buyer-dashboard' | 'admin-dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [registerDefaultRole, setRegisterDefaultRole] = useState<string>('');
  const [dashboardTab, setDashboardTab] = useState<string>('dashboard');
  
  // Authentication state - will be replaced with Django authentication later
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigateToLogin = () => setCurrentPage('login');
  const navigateToRegister = (defaultRole?: string) => {
    setRegisterDefaultRole(defaultRole || '');
    setCurrentPage('register');
  };
  const navigateToHome = () => setCurrentPage('home');
  const navigateToAbout = () => setCurrentPage('about');
  const navigateToMore = () => setCurrentPage('more');
  const navigateToBestSellers = () => setCurrentPage('bestsellers');
  const navigateToGallery = () => setCurrentPage('gallery');
  const navigateToArtistDashboard = (tab?: string) => {
    setCurrentPage('artist-dashboard');
    if (tab) {
      setDashboardTab(tab);
    }
  };
  const navigateToBuyerDashboard = (tab?: string) => {
    setCurrentPage('buyer-dashboard');
    if (tab) {
      setDashboardTab(tab);
    }
  };
  const navigateToAdminDashboard = (tab?: string) => {
    setCurrentPage('admin-dashboard');
    if (tab) {
      setDashboardTab(tab);
    }
  };

  // Authentication functions - will be replaced with Django API calls later
  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (userData.role === 'artist') {
      setCurrentPage('artist-dashboard');
    } else if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('buyer-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('home');
    setDashboardTab('dashboard'); // Reset dashboard tab on logout
  };

  const handleRegister = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (userData.role === 'artist') {
      setCurrentPage('artist-dashboard');
    } else if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('buyer-dashboard');
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigateToRegister={() => navigateToRegister()} />;
      
      case 'register':
        return <Register onRegister={handleRegister} defaultRole={registerDefaultRole} onNavigateToLogin={navigateToLogin} />;
      
      case 'about':
        return <About />;
      
      case 'more':
        return <More />;
      
      case 'bestsellers':
        return <BestSellers />;
      
      case 'gallery':
        return <Gallery />;
      
      case 'artist-dashboard':
        return (
          <ArtistDashboard
            user={user}
            onNavigateToHome={navigateToHome}
            onLogout={handleLogout}
            activeTab={dashboardTab}
            onTabChange={setDashboardTab}
          />
        );
      
      case 'buyer-dashboard':
        return (
          <BuyerDashboard
            user={user}
            onNavigateToHome={navigateToHome}
            onLogout={handleLogout}
            activeTab={dashboardTab}
            onTabChange={setDashboardTab}
          />
        );
      
      case 'admin-dashboard':
        return (
          <AdminDashboard
            user={user}
            onNavigateToHome={navigateToHome}
            onLogout={handleLogout}
            activeTab={dashboardTab}
            onTabChange={setDashboardTab}
          />
        );
      
      case 'home':
      default:
        return (
          <>
            <Hero onNavigateToRegister={navigateToRegister} />
            <PopularArtists />
            <PopularArtwork />
            <ComingSoon />
          </>
        );
    }
  };

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
        <Header 
          onNavigateToLogin={navigateToLogin} 
          onNavigateToRegister={navigateToRegister}
          onNavigateToHome={navigateToHome}
          onNavigateToAbout={navigateToAbout}
          onNavigateToMore={navigateToMore}
          onNavigateToBestSellers={navigateToBestSellers}
          onNavigateToGallery={navigateToGallery}
          onNavigateToArtistDashboard={navigateToArtistDashboard}
          onNavigateToBuyerDashboard={navigateToBuyerDashboard}
          onNavigateToAdminDashboard={navigateToAdminDashboard}
          currentPage={currentPage}
          user={user}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />

        {/* Render current page content */}
        {renderPageContent()}

        {/* Footer - shown on all pages except dashboards */}
        {currentPage !== 'artist-dashboard' && currentPage !== 'buyer-dashboard' && currentPage !== 'admin-dashboard' && <Footer />}
      </div>
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}