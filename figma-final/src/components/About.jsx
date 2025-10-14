import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Palette, Users, Heart, Award, Globe, Brush, Sparkles, Mail, Send } from "lucide-react";

export function About({ onNavigateToHome, onNavigateToRegister, onNavigateToGallery, onNavigateToMore }) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.subject.trim() || !contactForm.message.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    // Simulate sending email
    console.log("Contact form submitted:", contactForm);
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleContactInputChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back to Home Button */}
        <Button
          variant="ghost"
          onClick={onNavigateToHome}
          className="mb-8 text-gray-600 hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <span 
              className="text-5xl md:text-6xl bg-clip-text text-transparent font-bold"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                background: 'linear-gradient(135deg, #FF6EC7 0%, #9B5DE5 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              About Artist
            </span>
            <span 
              className="text-5xl md:text-6xl font-bold"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                color: '#6A0DAD'
              }}
            >
              Alley
            </span>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            ArtistAlley is a revolutionary marketplace that connects talented artists directly with art enthusiasts, 
            eliminating middlemen and fostering authentic relationships between creators and collectors.
          </p>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <h2 className="text-2xl mb-4 text-gray-800 flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-purple-500" />
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To democratize the art world by providing a platform where artists can showcase their work, 
              connect with buyers directly, and earn fair compensation for their creativity while art lovers 
              discover unique, authentic pieces at reasonable prices.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="backdrop-blur-sm bg-white/70 border-purple-200/40 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-800">Direct Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center leading-relaxed">
                Connect directly with artists without intermediaries. Build relationships, 
                commission custom works, and support creators personally.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/70 border-purple-200/40 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-800">Fair Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center leading-relaxed">
                Artists set their own prices and keep more of their earnings. 
                Buyers get authentic art at fair prices without gallery markups.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/70 border-purple-200/40 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-800">Quality Assured</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center leading-relaxed">
                All artists are verified and their works authenticated. 
                We maintain high standards to ensure quality and originality.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h2 className="text-3xl text-center mb-12 text-gray-800 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-500" />
            What We Offer
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brush className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-800">Original Artwork</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Paintings, digital art, sculptures, and mixed media pieces from talented artists worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-800">Handcrafted Jewelry</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Unique jewelry pieces crafted by skilled artisans using premium materials and traditional techniques.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-800">Home Decor</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Elegant vases, decorative items, and functional art pieces to beautify your living spaces.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-800">Global Community</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Artists and buyers from around the world, creating a diverse and vibrant artistic ecosystem.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl mb-6 text-gray-800 text-center">Why Choose ArtistAlley?</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">No commission fees for the first 3 months</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Secure payment processing and buyer protection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Easy-to-use platform for both artists and buyers</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Comprehensive artist verification process</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">24/7 customer support and dispute resolution</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Marketing tools to help artists grow their business</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-50/60 to-pink-50/60 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <h2 className="text-3xl text-center mb-8 text-gray-800">Our Growing Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl text-purple-600 mb-2">2,500+</div>
              <div className="text-gray-700">Verified Artists</div>
            </div>
            <div>
              <div className="text-3xl text-pink-600 mb-2">15,000+</div>
              <div className="text-gray-700">Art Pieces</div>
            </div>
            <div>
              <div className="text-3xl text-purple-600 mb-2">8,000+</div>
              <div className="text-gray-700">Happy Buyers</div>
            </div>
            <div>
              <div className="text-3xl text-pink-600 mb-2">45+</div>
              <div className="text-gray-700">Countries</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl mb-6 text-gray-800">Ready to Explore Art?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're an artist looking to showcase your work or an art lover seeking unique pieces, 
            ArtistAlley is your gateway to the world of authentic art.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onNavigateToGallery}
            >
              Explore Gallery
              <Palette className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 border-purple-400 text-purple-600 hover:bg-purple-50 hover:text-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => onNavigateToRegister('artist')}
            >
              Start Selling
              <Brush className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="mt-20 mb-16">
          <h2 className="text-3xl text-center mb-12 text-gray-800 flex items-center justify-center gap-3">
            <Mail className="w-8 h-8 text-purple-500" />
            Contact Us
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <Card className="backdrop-blur-sm bg-white/80 border-purple-200/40 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-800">Get in Touch</CardTitle>
                <p className="text-gray-600">
                  Have questions about ArtistAlley? We'd love to hear from you!
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName" className="text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        id="contactName"
                        type="text"
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={(e) => handleContactInputChange('name', e.target.value)}
                        className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-500" />
                        Email Address
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="your.email@example.com"
                        value={contactForm.email}
                        onChange={(e) => handleContactInputChange('email', e.target.value)}
                        className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactSubject" className="text-gray-700">
                      Subject
                    </Label>
                    <Input
                      id="contactSubject"
                      type="text"
                      placeholder="What is this regarding?"
                      value={contactForm.subject}
                      onChange={(e) => handleContactInputChange('subject', e.target.value)}
                      className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactMessage" className="text-gray-700">
                      Message
                    </Label>
                    <Textarea
                      id="contactMessage"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => handleContactInputChange('message', e.target.value)}
                      className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-purple-200/40">
                  <div className="text-center space-y-3">
                    <p className="text-gray-600">
                      <strong>Business Inquiries:</strong> business@artistalley.com
                    </p>
                    <p className="text-gray-600">
                      <strong>Artist Support:</strong> artists@artistalley.com
                    </p>
                    <p className="text-gray-600">
                      <strong>Customer Support:</strong> support@artistalley.com
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      We typically respond within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}