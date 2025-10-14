import { Bell, Sparkles, Palette } from "lucide-react";
import { Button } from "./ui/button";

export function ComingSoon({ onNavigateToMore }) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Static section background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/90 via-purple-50/80 to-blue-100/90"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-100/60 via-transparent to-orange-100/50"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-200/60 to-purple-200/60 border border-pink-300/50 mb-8 hover:bg-pink-200/80 transition-colors">
            <Sparkles className="h-4 w-4 text-pink-600 mr-2" />
            <span className="text-pink-700 text-sm">Coming Soon</span>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl text-gray-800 mb-6">
            Exciting Features on the Way
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We're crafting amazing new experiences for artists and art lovers. 
            Stay tuned for revolutionary features that will transform how you discover and connect with art.
          </p>

          {/* Feature teasers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Palette, title: "AR Gallery", desc: "Experience art in your space with augmented reality", color: "pink" },
              { icon: Bell, title: "Smart Notifications", desc: "Get notified when your favorite artists release new work", color: "cyan" },
              { icon: Sparkles, title: "AI Art Matching", desc: "Discover art that matches your unique taste perfectly", color: "emerald" }
            ].map(({ icon: Icon, title, desc, color }, index) => (
              <div
                key={title}
                className="flex flex-col items-center text-center group"
              >
                <div className={`h-16 w-16 rounded-full bg-gradient-to-br from-${color}-200/60 to-${color}-200/60 flex items-center justify-center mb-4 border border-${color}-300/50 group-hover:border-${color}-400/70 transition-all duration-300 group-hover:scale-110 hover:-translate-y-2`}>
                  <Icon className={`h-8 w-8 text-${color}-600`} />
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Bell className="h-5 w-5 mr-2" />
              Notify Me
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 border-purple-400 text-purple-600 hover:bg-purple-50 hover:text-purple-700 hover:scale-105 transition-all duration-300"
              onClick={onNavigateToMore}
            >
              Learn More
            </Button>
          </div>

          {/* Stay Tuned message */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-100/80 to-pink-100/80 border border-purple-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <p className="text-lg text-gray-700">
              ✨ <span className="text-purple-600">Stay Tuned</span> - Big announcements coming this month! ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}