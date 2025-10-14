import { Separator } from "./ui/separator";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

const socialIcons = [
  { Icon: Instagram, color: "hover:text-pink-400" },
  { Icon: Twitter, color: "hover:text-blue-400" },
  { Icon: Facebook, color: "hover:text-blue-500" },
  { Icon: Mail, color: "hover:text-green-400" }
];

export function Footer({ onNavigateToMore }) {
  const handleLinkClick = (link) => {
    if (onNavigateToMore) {
      onNavigateToMore();
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(to right, #CDB4DB, #BDE0FE)' }}>
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <span className="text-xl font-serif" style={{ color: '#2C2C2C' }}>ArtistAlley</span>
            </div>
            
            <p className="text-sm" style={{ color: '#2C2C2C' }}>
              Connecting artists directly with art lovers worldwide. Discover unique pieces without the middleman.
            </p>
            
            <div className="flex space-x-3">
              {socialIcons.map(({ Icon, color }, index) => (
                <Icon 
                  key={index}
                  className={`h-5 w-5 cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-1`}
                  style={{ color: '#2C2C2C' }}
                  onMouseEnter={(e) => e.target.style.color = '#9B5DE5'}
                  onMouseLeave={(e) => e.target.style.color = '#2C2C2C'}
                />
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {[
            {
              title: "Marketplace",
              links: ["Browse Art", "Best Sellers", "New Arrivals", "Categories", "Artists"]
            },
            {
              title: "Support", 
              links: ["Help Center", "Shipping Info", "Returns", "Contact Us", "FAQ"]
            },
            {
              title: "For Artists",
              links: ["Sell Your Art", "Artist Resources", "Commission Info", "Success Stories", "Guidelines"]
            }
          ].map((section) => (
            <div key={section.title}>
              <h3 
                className="mb-4 transition-colors duration-300 cursor-pointer"
                style={{ color: '#2C2C2C' }}
                onMouseEnter={(e) => e.target.style.color = '#9B5DE5'}
                onMouseLeave={(e) => e.target.style.color = '#2C2C2C'}
                onClick={() => handleLinkClick(section.title)}
              >
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li
                    key={link}
                    className="hover:translate-x-1 transition-all duration-300 cursor-pointer"
                    style={{ color: '#2C2C2C' }}
                    onMouseEnter={(e) => e.target.style.color = '#9B5DE5'}
                    onMouseLeave={(e) => e.target.style.color = '#2C2C2C'}
                    onClick={() => handleLinkClick(link)}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" style={{ backgroundColor: '#9B5DE5', opacity: 0.3 }} />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p 
            className="transition-colors duration-300 cursor-pointer"
            style={{ color: '#2C2C2C' }}
            onMouseEnter={(e) => e.target.style.color = '#9B5DE5'}
            onMouseLeave={(e) => e.target.style.color = '#2C2C2C'}
          >
            &copy; 2024 ArtistAlley. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ color: '#2C2C2C' }}
                onMouseEnter={(e) => e.target.style.color = '#9B5DE5'}
                onMouseLeave={(e) => e.target.style.color = '#2C2C2C'}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item);
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}