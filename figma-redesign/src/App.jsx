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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [registerDefaultRole, setRegisterDefaultRole] = useState('');
  
  // Authentication state - will be replaced with Django authentication later
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigateToLogin = () => setCurrentPage('login');
  const navigateToRegister = (defaultRole) => {
    setRegisterDefaultRole(defaultRole || '');
    setCurrentPage('register');
  };
  const navigateToHome = () => setCurrentPage('home');
  const navigateToAbout = () => setCurrentPage('about');
  const navigateToMore = () => setCurrentPage('more');
  const navigateToBestSellers = () => setCurrentPage('bestsellers');
  const navigateToGallery = () => setCurrentPage('gallery');
  const navigateToArtistDashboard = () => setCurrentPage('artist-dashboard');

  // Authentication functions - will be replaced with Django API calls later
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (userData.role === 'artist') {
      setCurrentPage('artist-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (userData.role === 'artist') {
      setCurrentPage('artist-dashboard');
    } else {
      setCurrentPage('home');
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
              
              {/* Geometric Triangles Pattern */}
              <pattern id="triangles" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <polygon points="60,20 80,50 40,50" fill="currentColor" className="text-stone-500/25" />
                <polygon points="20,80 35,100 5,100" fill="currentColor" className="text-neutral-500/20" />
                <polygon points="100,90 115,110 85,110" fill="currentColor" className="text-stone-500/15" />
                <polygon points="90,30 105,50 75,50" fill="currentColor" className="text-neutral-500/20" />
              </pattern>
              
              {/* Art Brush Pattern */}
              <pattern id="brushes" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                <rect x="70" y="20" width="2" height="30" fill="currentColor" className="text-stone-600/35" />
                <ellipse cx="71" cy="15" rx="4" ry="8" fill="currentColor" className="text-neutral-600/25" />
                <rect x="25" y="80" width="2" height="25" fill="currentColor" className="text-stone-600/30" />
                <ellipse cx="26" cy="75" rx="3" ry="6" fill="currentColor" className="text-neutral-600/20" />
                <rect x="120" y="40" width="1.5" height="20" fill="currentColor" className="text-stone-600/25" />
                <ellipse cx="120.5" cy="36" rx="2.5" ry="5" fill="currentColor" className="text-neutral-600/20" />
              </pattern>
              
              {/* Paint Splatter Pattern */}
              <pattern id="splatters" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="3" fill="currentColor" className="text-stone-500/30" />
                <ellipse cx="42" cy="38" rx="1" ry="2" fill="currentColor" className="text-stone-500/20" />
                <circle cx="120" cy="80" r="2.5" fill="currentColor" className="text-neutral-500/25" />
                <ellipse cx="118" cy="82" rx="1.5" ry="1" fill="currentColor" className="text-neutral-500/15" />
                <circle cx="80" cy="140" r="2" fill="currentColor" className="text-stone-500/35" />
                <ellipse cx="82" cy="138" rx="1" ry="1.5" fill="currentColor" className="text-stone-500/20" />
                <circle cx="160" cy="160" r="1.8" fill="currentColor" className="text-neutral-500/30" />
                <ellipse cx="158" cy="162" rx="0.8" ry="1.2" fill="currentColor" className="text-neutral-500/15" />
              </pattern>
              
              {/* Artistic Frames Pattern */}
              <pattern id="frames" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <rect x="20" y="30" width="40" height="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-stone-500/20" />
                <rect x="140" y="120" width="35" height="25" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-neutral-500/15" />
                <rect x="80" y="80" width="30" height="40" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-stone-500/25" />
                <rect x="160" y="40" width="25" height="35" fill="none" stroke="currentColor" strokeWidth="0.7" className="text-neutral-500/20" />
              </pattern>
              
              {/* Art Easel Pattern */}
              <pattern id="easels" x="0" y="0" width="250" height="250" patternUnits="userSpaceOnUse">
                <g className="text-stone-600/15" fill="currentColor" stroke="currentColor">
                  <path d="M100,200 L80,50 M100,200 L120,50 M70,150 L130,150" strokeWidth="1.5" fill="none" />
                  <rect x="85" y="80" width="30" height="40" fill="none" strokeWidth="1" />
                </g>
                <g className="text-neutral-600/10" fill="currentColor" stroke="currentColor" transform="translate(150,150)">
                  <path d="M50,100 L35,25 M50,100 L65,25 M30,75 L70,75" strokeWidth="1" fill="none" />
                  <rect x="40" y="40" width="20" height="25" fill="none" strokeWidth="0.8" />
                </g>
              </pattern>
              
              {/* Art Palette Pattern */}
              <pattern id="palettes" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
                <g className="text-stone-500/20" fill="currentColor">
                  <ellipse cx="100" cy="100" rx="25" ry="15" />
                  <circle cx="85" cy="90" r="3" className="text-neutral-500/25" />
                  <circle cx="95" cy="85" r="2.5" className="text-stone-500/25" />
                  <circle cx="105" cy="90" r="2" className="text-neutral-500/25" />
                  <circle cx="115" cy="95" r="2.5" className="text-stone-500/25" />
                </g>
                <g className="text-neutral-500/15" fill="currentColor" transform="translate(200,200)">
                  <ellipse cx="50" cy="50" rx="20" ry="12" />
                  <circle cx="40" cy="45" r="2" className="text-stone-500/20" />
                  <circle cx="50" cy="42" r="1.5" className="text-neutral-500/20" />
                  <circle cx="60" cy="48" r="2" className="text-stone-500/20" />
                </g>
              </pattern>
              
              {/* Canvas Pattern */}
              <pattern id="canvases" x="0" y="0" width="220" height="220" patternUnits="userSpaceOnUse">
                <rect x="50" y="60" width="40" height="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-stone-500/15" />
                <rect x="52" y="62" width="36" height="46" fill="currentColor" className="text-stone-100/25" />
                <rect x="140" y="140" width="30" height="40" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-neutral-500/15" />
                <rect x="142" y="142" width="26" height="36" fill="currentColor" className="text-neutral-100/25" />
              </pattern>
              
              {/* Pencil Pattern */}
              <pattern id="pencils" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
                <g className="text-neutral-600/25">
                  <rect x="40" y="30" width="3" height="40" fill="currentColor" />
                  <polygon points="40,25 43,25 41.5,20" fill="currentColor" />
                  <rect x="41" y="70" width="1" height="10" fill="currentColor" className="text-stone-500/35" />
                </g>
                <g className="text-stone-600/20" transform="translate(100,100) rotate(45)">
                  <rect x="20" y="15" width="2.5" height="35" fill="currentColor" />
                  <polygon points="20,12 22.5,12 21.25,8" fill="currentColor" />
                  <rect x="20.5" y="50" width="1.5" height="8" fill="currentColor" className="text-neutral-500/25" />
                </g>
              </pattern>
              
              {/* Ink Drops Pattern */}
              <pattern id="ink-drops" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="8" fill="currentColor" className="text-stone-500/20" />
                <ellipse cx="42" cy="35" rx="2" ry="4" fill="currentColor" className="text-stone-500/15" />
                <circle cx="120" cy="120" r="6" fill="currentColor" className="text-neutral-500/20" />
                <ellipse cx="118" cy="116" rx="1.5" ry="3" fill="currentColor" className="text-neutral-500/10" />
                <circle cx="80" cy="80" r="4" fill="currentColor" className="text-stone-600/25" />
                <ellipse cx="82" cy="77" rx="1" ry="2" fill="currentColor" className="text-stone-600/15" />
              </pattern>
              
              {/* Color Swatches Pattern */}
              <pattern id="swatches" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <rect x="30" y="30" width="15" height="10" fill="currentColor" className="text-neutral-500/20" />
                <rect x="50" y="30" width="15" height="10" fill="currentColor" className="text-stone-500/20" />
                <rect x="70" y="30" width="15" height="10" fill="currentColor" className="text-neutral-500/20" />
                <rect x="30" y="45" width="15" height="10" fill="currentColor" className="text-stone-500/20" />
                <rect x="50" y="45" width="15" height="10" fill="currentColor" className="text-neutral-600/20" />
                <rect x="70" y="45" width="15" height="10" fill="currentColor" className="text-stone-600/20" />
                
                <rect x="130" y="130" width="12" height="8" fill="currentColor" className="text-neutral-500/15" />
                <rect x="145" y="130" width="12" height="8" fill="currentColor" className="text-stone-500/15" />
                <rect x="160" y="130" width="12" height="8" fill="currentColor" className="text-neutral-500/15" />
                <rect x="130" y="142" width="12" height="8" fill="currentColor" className="text-stone-500/15" />
                <rect x="145" y="142" width="12" height="8" fill="currentColor" className="text-neutral-600/15" />
              </pattern>
            </defs>
            
            {/* Apply all patterns */}
            <rect width="100%" height="100%" fill="url(#artistic-grid)" />
            <rect width="100%" height="100%" fill="url(#paint-strokes)" />
            <rect width="100%" height="100%" fill="url(#triangles)" />
            <rect width="100%" height="100%" fill="url(#brushes)" />
            <rect width="100%" height="100%" fill="url(#splatters)" />
            <rect width="100%" height="100%" fill="url(#frames)" />
            <rect width="100%" height="100%" fill="url(#easels)" />
            <rect width="100%" height="100%" fill="url(#palettes)" />
            <rect width="100%" height="100%" fill="url(#canvases)" />
            <rect width="100%" height="100%" fill="url(#pencils)" />
            <rect width="100%" height="100%" fill="url(#ink-drops)" />
            <rect width="100%" height="100%" fill="url(#swatches)" />
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
          
          {/* More geometric floating shapes */}
          <div className="absolute top-32 right-1/4 w-20 h-20 bg-gradient-to-br from-stone-300/25 to-neutral-300/20 rotate-45 blur-lg"></div>
          <div className="absolute bottom-40 left-1/3 w-16 h-16 bg-gradient-to-br from-neutral-300/30 to-stone-300/25 rotate-12 blur-md"></div>
          <div className="absolute top-3/4 right-1/2 w-12 h-24 bg-gradient-to-br from-stone-300/20 to-neutral-300/15 rotate-45 blur-lg"></div>
          
          {/* New organic shapes */}
          <div className="absolute top-1/3 left-1/5 w-32 h-18 bg-gradient-to-br from-stone-300/25 to-neutral-300/20 rotate-30 blur-xl" style={{clipPath: 'ellipse(80% 40% at 50% 50%)'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-24 h-36 bg-gradient-to-br from-neutral-300/30 to-stone-300/25 rotate-60 blur-lg" style={{clipPath: 'ellipse(60% 90% at 50% 50%)'}}></div>
          <div className="absolute top-2/3 left-3/4 w-28 h-20 bg-gradient-to-br from-neutral-300/25 to-stone-300/20 rotate-75 blur-md" style={{clipPath: 'ellipse(70% 50% at 50% 50%)'}}></div>
          
          {/* Artistic hexagons and octagons */}
          <div className="absolute top-16 left-1/3 w-14 h-14 bg-gradient-to-br from-neutral-300/30 to-stone-300/25 rotate-30 blur-sm" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'}}></div>
          <div className="absolute bottom-16 right-1/2 w-18 h-18 bg-gradient-to-br from-stone-300/25 to-neutral-300/20 rotate-45 blur-sm" style={{clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'}}></div>
          
          {/* More star shapes */}
          <div className="absolute top-1/4 left-1/2 w-8 h-8 bg-gradient-to-br from-stone-400/40 to-neutral-400/30 blur-sm" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-gradient-to-br from-neutral-400/35 to-stone-400/25 blur-sm" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div>
          <div className="absolute top-1/6 right-1/3 w-10 h-10 bg-gradient-to-br from-neutral-400/30 to-stone-400/25 blur-sm" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div>
          
          {/* Paint palette shapes */}
          <div className="absolute top-2/3 left-20 w-16 h-12 bg-gradient-to-br from-stone-300/25 to-neutral-300/20 rounded-full blur-md"></div>
          <div className="absolute top-1/3 right-32 w-12 h-8 bg-gradient-to-br from-neutral-300/30 to-stone-300/25 rounded-full blur-md"></div>
          <div className="absolute bottom-1/2 left-1/4 w-20 h-14 bg-gradient-to-br from-neutral-300/25 to-stone-300/20 rounded-full blur-lg"></div>
          
          {/* Diamond shapes */}
          <div className="absolute top-5/6 right-1/6 w-12 h-12 bg-gradient-to-br from-neutral-300/30 to-stone-300/25 rotate-45 blur-md"></div>
          <div className="absolute top-1/6 left-5/6 w-8 h-8 bg-gradient-to-br from-stone-300/35 to-neutral-300/30 rotate-45 blur-sm"></div>
          
          {/* Triangular prisms */}
          <div className="absolute bottom-5/6 left-1/6 w-16 h-14 bg-gradient-to-br from-stone-300/25 to-neutral-300/20 blur-lg" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
          <div className="absolute top-5/6 left-2/3 w-12 h-10 bg-gradient-to-br from-neutral-300/30 to-stone-300/25 blur-md" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
        </div>
        
        {/* Static SVG Elements */}
        <div className="absolute inset-0 opacity-4">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* More paint brush strokes across the canvas */}
            <path d="M100,200 Q200,150 300,180 Q400,210 500,160 Q600,110 700,140" stroke="#78716c" strokeWidth="8" fill="none" opacity="0.2" />
            <path d="M150,400 Q250,350 350,380 Q450,410 550,360" stroke="#6b7280" strokeWidth="6" fill="none" opacity="0.15" />
            <path d="M50,600 Q180,550 280,580 Q380,610 480,560 Q580,510 650,540" stroke="#737373" strokeWidth="7" fill="none" opacity="0.1" />
            <path d="M200,100 Q300,80 400,110 Q500,140 600,120 Q700,100 800,130" stroke="#57534e" strokeWidth="5" fill="none" opacity="0.15" />
            <path d="M80,300 Q180,280 280,310 Q380,340 480,320" stroke="#6b7280" strokeWidth="6" fill="none" opacity="0.1" />
            <path d="M300,700 Q400,680 500,710 Q600,740 700,720" stroke="#78716c" strokeWidth="4" fill="none" opacity="0.2" />
            
            {/* More artistic geometric shapes */}
            <polygon points="800,100 820,80 840,100 830,120" fill="#6b7280" opacity="0.15" />
            <polygon points="900,300 925,275 950,300 937.5,325" fill="#78716c" opacity="0.1" />
            <polygon points="200,800 230,770 260,800 245,830" fill="#737373" opacity="0.2" />
            <polygon points="150,150 170,130 190,150 180,170" fill="#6b7280" opacity="0.15" />
            <polygon points="700,700 720,680 740,700 730,720" fill="#57534e" opacity="0.1" />
            <polygon points="400,50 420,30 440,50 430,70" fill="#78716c" opacity="0.2" />
            
            {/* More abstract art frames */}
            <rect x="700" y="500" width="80" height="60" fill="none" stroke="#78716c" strokeWidth="2" opacity="0.08" rx="5" />
            <rect x="100" y="100" width="60" height="80" fill="none" stroke="#6b7280" strokeWidth="2" opacity="0.1" rx="3" />
            <rect x="400" y="700" width="70" height="50" fill="none" stroke="#737373" strokeWidth="2" opacity="0.09" rx="4" />
            <rect x="600" y="200" width="50" height="70" fill="none" stroke="#57534e" strokeWidth="1.8" opacity="0.08" rx="3" />
            <rect x="200" y="400" width="45" height="60" fill="none" stroke="#6b7280" strokeWidth="1.5" opacity="0.12" rx="2" />
            <rect x="800" y="600" width="60" height="40" fill="none" stroke="#78716c" strokeWidth="2.2" opacity="0.1" rx="4" />
            
            {/* Enhanced paint splatter effects */}
            <circle cx="300" cy="300" r="15" fill="#78716c" opacity="0.1" />
            <circle cx="305" cy="295" r="5" fill="#78716c" opacity="0.08" />
            <circle cx="295" cy="308" r="3" fill="#78716c" opacity="0.05" />
            
            <circle cx="600" cy="600" r="12" fill="#6b7280" opacity="0.15" />
            <circle cx="608" cy="592" r="4" fill="#6b7280" opacity="0.1" />
            <circle cx="592" cy="610" r="6" fill="#6b7280" opacity="0.08" />
            
            <circle cx="150" cy="450" r="10" fill="#737373" opacity="0.12" />
            <circle cx="155" cy="445" r="3" fill="#737373" opacity="0.09" />
            <circle cx="145" cy="455" r="4" fill="#737373" opacity="0.06" />
            
            <circle cx="750" cy="150" r="8" fill="#57534e" opacity="0.16" />
            <circle cx="753" cy="147" r="2.5" fill="#57534e" opacity="0.11" />
            <circle cx="747" cy="153" r="3.5" fill="#57534e" opacity="0.08" />
            
            {/* More artistic spirals and curves */}
            <path d="M500,400 Q520,380 540,400 Q560,420 540,440 Q520,460 500,440 Q480,420 500,400" stroke="#78716c" strokeWidth="2" fill="none" opacity="0.1" />
            <path d="M800,200 Q815,185 830,200 Q845,215 830,230 Q815,245 800,230 Q785,215 800,200" stroke="#6b7280" strokeWidth="2" fill="none" opacity="0.15" />
            <path d="M200,600 Q215,585 230,600 Q245,615 230,630 Q215,645 200,630 Q185,615 200,600" stroke="#737373" strokeWidth="1.8" fill="none" opacity="0.12" />
            <path d="M600,100 Q615,85 630,100 Q645,115 630,130 Q615,145 600,130 Q585,115 600,100" stroke="#57534e" strokeWidth="2.2" fill="none" opacity="0.09" />
          </svg>
        </div>
        
        {/* Static Art Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-3">
          <svg className="absolute top-16 left-1/4 w-8 h-8 text-stone-500/35" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.15-.59-1.56-.36-.42-.59-.95-.59-1.56 0-1.38 1.12-2.5 2.5-2.5H16c3.31 0 6-2.69 6-6 0-5.51-4.49-10-10-10zM7.5 14c-.83 0-1.5-.67-1.5-1.5S6.67 11 7.5 11s1.5.67 1.5 1.5S8.33 14 7.5 14zm2-5C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9zm5 0C13.67 9 13 8.33 13 7.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zm2.5 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
          
          <svg className="absolute bottom-20 right-1/3 w-6 h-6 text-neutral-500/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/>
          </svg>
          
          <svg className="absolute top-1/3 left-1/6 w-7 h-7 text-stone-600/35" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/>
          </svg>
          
          <svg className="absolute top-40 right-1/4 w-7 h-7 text-neutral-500/35" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2C6.49,2 2,6.49 2,12C2,17.51 6.49,22 12,22C17.51,22 22,17.51 22,12C22,6.49 17.51,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z"/>
          </svg>
          
          <svg className="absolute bottom-32 left-1/3 w-5 h-5 text-stone-600/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.15-.59-1.56-.36-.42-.59-.95-.59-1.56 0-1.38 1.12-2.5 2.5-2.5H16c3.31 0 6-2.69 6-6 0-5.51-4.49-10-10-10z"/>
          </svg>
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
          currentPage={currentPage}
          user={user}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        
        {currentPage === 'home' ? (
          <>
            <Hero onNavigateToRegister={navigateToRegister} onNavigateToGallery={navigateToGallery} />
            <PopularArtists />
            <PopularArtwork onNavigateToGallery={navigateToGallery} />
            <ComingSoon onNavigateToMore={navigateToMore} />
            <Footer onNavigateToMore={navigateToMore} />
          </>
        ) : currentPage === 'login' ? (
          <Login 
            onNavigateToHome={navigateToHome} 
            onNavigateToRegister={navigateToRegister}
            onLogin={handleLogin}
          />
        ) : currentPage === 'register' ? (
          <Register 
            onNavigateToHome={navigateToHome} 
            onNavigateToLogin={navigateToLogin} 
            defaultRole={registerDefaultRole}
            onRegister={handleRegister}
          />
        ) : currentPage === 'about' ? (
          <About onNavigateToHome={navigateToHome} onNavigateToRegister={navigateToRegister} onNavigateToGallery={navigateToGallery} onNavigateToMore={navigateToMore} />
        ) : currentPage === 'bestsellers' ? (
          <BestSellers onNavigateToHome={navigateToHome} onNavigateToRegister={navigateToRegister} />
        ) : currentPage === 'gallery' ? (
          <Gallery onNavigateToHome={navigateToHome} onNavigateToRegister={navigateToRegister} />
        ) : currentPage === 'artist-dashboard' ? (
          <ArtistDashboard 
            user={user}
            onNavigateToHome={navigateToHome}
            onLogout={handleLogout}
          />
        ) : (
          <More onNavigateToHome={navigateToHome} onNavigateToRegister={navigateToRegister} />
        )}
      </div>
    </div>
  );
}