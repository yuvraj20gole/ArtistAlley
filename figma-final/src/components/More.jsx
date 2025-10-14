import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ArrowLeft, HelpCircle, Book, Users, Shield, Truck, CreditCard, Award, FileText, Code, Heart, MessageSquare, Palette, Camera, Star, Globe, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";

export function More({ onNavigateToHome, onNavigateToRegister }) {
  const [showAllFAQs, setShowAllFAQs] = useState(false);
  const helpSections = [
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get answers to common questions and technical support",
      items: ["Frequently Asked Questions", "Contact Support", "Video Tutorials", "Getting Started Guide", "Troubleshooting"]
    },
    {
      icon: Palette,
      title: "Artist Resources",
      description: "Tools and guides to help artists succeed on ArtistAlley",
      items: ["Photography Tips", "Pricing Guidelines", "Marketing Strategies", "Portfolio Optimization", "Art Trends"]
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow artists and art enthusiasts",
      items: ["Artist Spotlight", "Success Stories", "Community Forums", "Art Challenges", "Events & Workshops"]
    },
    {
      icon: Shield,
      title: "Policies & Legal",
      description: "Important policies and legal information",
      items: ["Terms of Service", "Privacy Policy", "Return & Refund Policy", "Copyright Guidelines", "Community Guidelines"]
    }
  ];

  const serviceSections = [
    {
      icon: Truck,
      title: "Shipping & Delivery",
      description: "Everything about getting your art safely delivered",
      items: ["Shipping Information", "International Delivery", "Packaging Standards", "Order Tracking", "Delivery Insurance"]
    },
    {
      icon: CreditCard,
      title: "Payment & Security",
      description: "Secure payment options and financial information",
      items: ["Accepted Payment Methods", "Currency Information", "Security Measures", "Dispute Resolution", "Payment Processing"]
    },
    {
      icon: Award,
      title: "Verification & Quality",
      description: "Our quality assurance and verification processes",
      items: ["Artist Verification", "Quality Standards", "Authentication Process", "Verified Benefits", "Quality Guarantee"]
    },
    {
      icon: FileText,
      title: "Blog & News",
      description: "Stay updated with art trends and platform news",
      items: ["Art Industry Trends", "Platform Updates", "Artist Interviews", "Market Insights", "Art History"]
    }
  ];

  const businessSections = [
    {
      icon: Heart,
      title: "Partnerships",
      description: "Collaborate with ArtistAlley for business opportunities",
      items: ["Gallery Partnerships", "Wholesale Opportunities", "Corporate Art Programs", "Affiliate Programs", "Brand Collaborations"]
    },
    {
      icon: Code,
      title: "Developer Resources",
      description: "Technical resources for developers and integrations",
      items: ["API Documentation", "Integration Guides", "Webhook Setup", "Developer Community", "Technical Support"]
    }
  ];

  const quickActions = [
    { 
      title: "Become an Artist", 
      description: "Start selling your artwork today", 
      action: () => onNavigateToRegister('artist'),
      icon: Palette,
      color: "from-pink-500 to-purple-600"
    },
    { 
      title: "Contact Support", 
      description: "Get help from our team", 
      action: () => window.open('mailto:support@artistalley.com'),
      icon: MessageSquare,
      color: "from-blue-500 to-indigo-600"
    },
    { 
      title: "Join Community", 
      description: "Connect with other artists", 
      action: () => window.open('#community-forum'),
      icon: Users,
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-8 px-4 bg-gradient-to-br from-purple-50 to-pink-50 border-b border-purple-200/40">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={onNavigateToHome}
            className="mb-6 text-gray-600 hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl text-gray-800 flex items-center justify-center gap-3">
              <Book className="w-8 h-8 text-purple-500" />
              Help & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about ArtistAlley - from getting started to advanced features
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={action.action}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Help & Support Sections */}
        <section>
          <h2 className="text-2xl text-gray-800 mb-8 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-500" />
            Help & Support
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {helpSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800">
                    <section.icon className="w-6 h-6 text-purple-500" />
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-gray-600 hover:text-purple-600 cursor-pointer transition-colors">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Services & Features */}
        <section>
          <h2 className="text-2xl text-gray-800 mb-8 flex items-center gap-2">
            <Globe className="w-6 h-6 text-green-500" />
            Services & Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {serviceSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800">
                    <section.icon className="w-6 h-6 text-purple-500" />
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-gray-600 hover:text-purple-600 cursor-pointer transition-colors">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Business & Partnerships */}
        <section>
          <h2 className="text-2xl text-gray-800 mb-8 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Business & Partnerships
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {businessSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-800">
                    <section.icon className="w-6 h-6 text-purple-500" />
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-gray-600 hover:text-purple-600 cursor-pointer transition-colors">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
          <h2 className="text-2xl text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-500" />
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <Mail className="w-8 h-8 text-purple-500 mx-auto" />
              <h3 className="text-lg text-gray-800">Email Support</h3>
              <p className="text-gray-600">support@artistalley.com</p>
              <p className="text-sm text-gray-500">Response within 24 hours</p>
            </div>
            <div className="space-y-2">
              <Phone className="w-8 h-8 text-purple-500 mx-auto" />
              <h3 className="text-lg text-gray-800">Phone Support</h3>
              <p className="text-gray-600">+91 1800-123-4567</p>
              <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM IST</p>
            </div>
            <div className="space-y-2">
              <Users className="w-8 h-8 text-purple-500 mx-auto" />
              <h3 className="text-lg text-gray-800">Community</h3>
              <p className="text-gray-600">Join our Discord</p>
              <p className="text-sm text-gray-500">Chat with other artists</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl text-gray-800 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-500" />
            Frequently Asked Questions
          </h2>
          
          {/* Initial FAQ Preview */}
          <div className="space-y-4">
            {[
              {
                question: "How do I start selling my artwork on ArtistAlley?",
                answer: "Simply create an artist account, complete your profile, and start uploading your artwork with detailed descriptions and pricing."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All transactions are secure and encrypted."
              },
              {
                question: "How does shipping work for artwork?",
                answer: "Artists handle their own shipping or can use our recommended shipping partners. We provide packaging guidelines to ensure safe delivery."
              },
              {
                question: "Is there a commission fee for artists?",
                answer: "Yes, we charge a small commission on each sale to maintain the platform and provide support. Details are available in our pricing section."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional FAQs (shown when expanded) */}
          {showAllFAQs && (
            <div className="space-y-4 mt-4">
              {[
                {
                  question: "How do I verify my artist account?",
                  answer: "Upload a government-issued ID and provide portfolio samples. Our verification team reviews submissions within 2-3 business days."
                },
                {
                  question: "Can I edit my artwork listing after it's published?",
                  answer: "Yes, you can edit titles, descriptions, and prices anytime. However, images cannot be changed once a listing has received orders."
                },
                {
                  question: "What happens if a buyer returns artwork?",
                  answer: "Returns are accepted within 7 days if the artwork doesn't match the description. Artists cover return shipping for damaged items."
                },
                {
                  question: "How do I promote my artwork on the platform?",
                  answer: "Use high-quality photos, detailed descriptions, relevant tags, and engage with the community. Featured listings are also available for promotion."
                },
                {
                  question: "Is international shipping available?",
                  answer: "Yes, we support international shipping to over 45 countries. Shipping costs and delivery times vary by destination."
                },
                {
                  question: "How do I track my earnings and sales?",
                  answer: "Access your artist dashboard to view real-time sales data, earnings, pending payments, and detailed analytics."
                },
                {
                  question: "Can I sell digital artwork or prints?",
                  answer: "Yes, we support both original physical artwork and digital downloads. You can also offer print-on-demand services."
                },
                {
                  question: "What if I have a dispute with a buyer?",
                  answer: "Contact our support team immediately. We offer mediation services and will help resolve disputes fairly for both parties."
                },
                {
                  question: "How often are payments processed?",
                  answer: "Payments are processed weekly on Fridays. Funds are transferred to your bank account within 3-5 business days."
                },
                {
                  question: "Can I offer custom commissions through the platform?",
                  answer: "Yes, enable the commission feature in your profile. Buyers can request custom work with specific requirements and pricing."
                },
                {
                  question: "What image requirements do you have for artwork listings?",
                  answer: "Images should be at least 1200x1200 pixels, in JPEG or PNG format, under 5MB. We recommend multiple angles and detail shots."
                },
                {
                  question: "How do I handle copyright and intellectual property?",
                  answer: "You retain full copyright of your artwork. We provide guidelines and support for protecting your intellectual property rights."
                }
              ].map((faq, index) => (
                <Card key={`additional-${index}`} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg text-gray-800 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              className="border-purple-200 text-purple-600 hover:bg-purple-50 transition-all duration-300"
              onClick={() => setShowAllFAQs(!showAllFAQs)}
            >
              {showAllFAQs ? (
                <>
                  Show Less FAQs
                  <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  View All FAQs
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}