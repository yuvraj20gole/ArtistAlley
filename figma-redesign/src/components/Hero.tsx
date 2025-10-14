import { Button } from "./ui/button";
import { ArrowRight, Palette, Users, ShoppingBag } from "lucide-react";

interface HeroProps {
  onNavigateToRegister: (defaultRole?: string) => void;
  onNavigateToGallery?: () => void;
}

export function Hero({ onNavigateToRegister, onNavigateToGallery }: HeroProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Hero-specific static background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/80 via-pink-50/70 to-blue-100/80"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-100/60 via-transparent to-yellow-100/50"></div>
        
        {/* Static brush strokes */}
        <div className="absolute inset-0">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brush1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" className="text-pink-400/40" />
                <stop offset="100%" stopColor="currentColor" className="text-purple-400/30" />
              </linearGradient>
              <linearGradient id="brush2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" className="text-cyan-400/35" />
                <stop offset="100%" stopColor="currentColor" className="text-indigo-400/30" />
              </linearGradient>
            </defs>
            
            <path 
              d="M0,100 Q300,50 600,120 T1200,80 L1200,0 L0,0 Z" 
              fill="url(#brush1)" 
              opacity="0.5"
            />
            
            <path 
              d="M0,300 Q400,250 800,320 T1200,280 L1200,400 Q800,350 400,420 T0,380 Z" 
              fill="url(#brush2)" 
              opacity="0.4"
            />
          </svg>
        </div>
        
        {/* Static floating dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className={`absolute w-${[2, 1.5, 2.5, 1.5][i % 4]} h-${[2, 1.5, 2.5, 1.5][i % 4]} rounded-full`}
            style={{
              background: ['rgb(251 191 36 / 0.8)', 'rgb(244 114 182 / 0.9)', 'rgb(56 189 248 / 0.7)', 'rgb(139 92 246 / 0.8)', 'rgb(34 197 94 / 0.6)', 'rgb(239 68 68 / 0.7)'][i],
              top: `${25 + i * 8}%`,
              left: `${20 + i * 15}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl text-gray-800 mb-6">
            Direct from Artist to You
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover unique artwork, handcrafted jewelry, elegant vases, and stunning decor pieces directly from talented artists. No middleman, just authentic art.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              onClick={onNavigateToGallery}
            >
              Explore Gallery
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 border-purple-400 text-purple-600 hover:bg-purple-50 hover:text-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => onNavigateToRegister('artist')}
            >
              Become an Artist
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Palette, title: "Authentic Art", desc: "Original pieces from verified artists worldwide", color: "pink" },
              { icon: Users, title: "Direct Connection", desc: "Connect directly with artists, no intermediaries", color: "cyan" },
              { icon: ShoppingBag, title: "Fair Prices", desc: "Better prices for buyers, better profits for artists", color: "emerald" }
            ].map(({ icon: Icon, title, desc, color }, index) => (
              <div
                key={title}
                className="flex flex-col items-center text-center group"
              >
                <div className={`h-16 w-16 rounded-full bg-gradient-to-br from-${color}-200/60 to-${color}-200/60 flex items-center justify-center mb-4 border-2 border-${color}-300/50 group-hover:border-${color}-400/70 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className={`h-8 w-8 text-${color}-600 group-hover:text-${color}-700 transition-colors duration-300`} />
                </div>
                
                <h3 className="text-gray-800 mb-2">
                  {title}
                </h3>
                
                <p className="text-sm text-gray-600">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}