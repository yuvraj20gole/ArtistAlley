import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, Bot, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      text: "👋 Hello! I'm your ArtistAlley assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses for common questions
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Artwork related
    if (message.includes('artwork') || message.includes('art') || message.includes('painting')) {
      return "🎨 You can browse artworks by clicking on 'Browse Artwork' tab. Use filters to find specific categories, price ranges, or search by artist name!";
    }
    if (message.includes('search') || message.includes('find')) {
      return "🔍 Use the search bar at the top of your dashboard to find specific artworks, artists, or categories. You can also use advanced filters in the Browse Artwork section!";
    }

    // Cart and purchase related
    if (message.includes('cart') || message.includes('add to cart')) {
      return "🛒 To add items to your cart, go to Browse Artwork, find an artwork you like, and click the 'Add to Cart' button. You can view your cart anytime by clicking the Cart tab!";
    }
    if (message.includes('purchase') || message.includes('buy') || message.includes('checkout')) {
      return "💳 To purchase artworks: Add items to cart → Go to Cart tab → Click 'Proceed to Checkout' → Fill shipping details → Choose payment method. We support UPI, Cards, Net Banking, and Digital Wallets!";
    }
    if (message.includes('payment') || message.includes('pay')) {
      return "💰 We accept multiple payment methods: UPI, Credit/Debit Cards, Net Banking, and Digital Wallets. All payments are 100% secure and encrypted!";
    }

    // Order related
    if (message.includes('order') || message.includes('track')) {
      return "📦 You can view and track all your orders in the 'My Orders' tab. Each order shows its current status and estimated delivery date!";
    }

    // Wishlist related
    if (message.includes('wishlist') || message.includes('favorite') || message.includes('save')) {
      return "❤️ Found an artwork you love? Click the heart icon to add it to your wishlist! Access your saved items anytime from the Wishlist tab.";
    }

    // AI Recommendations
    if (message.includes('recommendation') || message.includes('suggest') || message.includes('ai')) {
      return "✨ Our AI Recommendations feature learns from your preferences! The more you browse, like, and purchase, the better recommendations you'll get. Check out the AI Recommendations tab!";
    }

    // Artist related
    if (message.includes('artist') || message.includes('follow')) {
      return "👨‍🎨 You can follow your favorite artists to get updates on their new artworks. Click the 'Follow' button on any artist's profile or in the AI Recommendations section!";
    }

    // Account related
    if (message.includes('profile') || message.includes('account') || message.includes('settings')) {
      return "👤 Manage your profile and settings in the 'Profile' tab. You can update your personal information, address, and preferences there!";
    }

    // Help and support
    if (message.includes('help') || message.includes('support') || message.includes('contact')) {
      return "🆘 Need more help? Click the Help icon (?) in the header for documentation, guides, and contact support options. You can also email us at support@artistalley.com!";
    }

    // Greetings
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      return "Hello! 😊 I'm here to help you navigate ArtistAlley. Feel free to ask me about browsing artworks, making purchases, tracking orders, or anything else!";
    }
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! 🌟 Is there anything else I can help you with?";
    }

    // Default response
    return "I'd be happy to help! You can ask me about:\n\n• Browsing and searching artworks\n• Adding items to cart and checkout\n• Tracking your orders\n• Managing your wishlist\n• AI recommendations\n• Following artists\n• Account settings\n\nWhat would you like to know more about?";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      text: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        role: 'bot',
        text: getBotResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Quick action buttons
  const quickActions = [
    { label: "Browse Artwork", message: "How do I browse artworks?" },
    { label: "Track Orders", message: "How do I track my orders?" },
    { label: "Payment Help", message: "What payment methods do you accept?" },
    { label: "Contact Support", message: "How do I contact support?" }
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50 animate-bounce hover:animate-none group"
        title="Chat with us"
      >
        <MessageSquare className="w-7 h-7 text-white" />
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          1
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`bg-white rounded-2xl shadow-2xl transition-all ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      } flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">ArtistAlley Assistant</h3>
              <p className="text-xs opacity-90">Online • Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 w-8 h-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-purple-100' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-5 h-5 text-purple-600" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="p-3 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => {
                        setInput(action.message);
                        setTimeout(() => sendMessage(), 100);
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-50 border-gray-200 focus:border-purple-600"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Powered by ArtistAlley AI
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

