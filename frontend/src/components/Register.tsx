import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Palette, Brush, UserCheck, MapPin, Phone, Calendar, Globe, Camera } from "lucide-react";
import { authAPI, tokenManager, type RegisterData } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer';
}

interface RegisterProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  defaultRole?: string;
  onRegister: (userData: User) => void;
}

export function Register({ onNavigateToHome, onNavigateToLogin, defaultRole, onRegister }: RegisterProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    userType: "",
    // Address fields
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    // Artist-specific fields
    artistSpecialization: "",
    bio: "",
    websiteUrl: "",
    instagramHandle: "",
    // Business fields
    businessName: "",
    // Agreement
    agreeToTerms: false
  });

  // Set default role when component mounts or defaultRole changes
  useEffect(() => {
    if (defaultRole) {
      setFormData(prev => ({ ...prev, userType: defaultRole }));
    }
  }, [defaultRole]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    if (!formData.phone.trim()) {
      alert("Please enter your phone number");
      return;
    }
    
    if (!formData.dateOfBirth) {
      alert("Please enter your date of birth");
      return;
    }
    
    if (!formData.userType) {
      alert("Please select your role");
      return;
    }
    
    // Address validation
    if (!formData.streetAddress.trim()) {
      alert("Please enter your street address");
      return;
    }
    
    if (!formData.city.trim()) {
      alert("Please enter your city");
      return;
    }
    
    if (!formData.country.trim()) {
      alert("Please select your country");
      return;
    }
    
    // Artist-specific validation
    if (formData.userType === 'artist' && !formData.artistSpecialization.trim()) {
      alert("Please enter your artistic specialization");
      return;
    }
    
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    
    if (!isPasswordStrong(formData.password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    try {
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Create username from email (before @)
      const username = formData.email.split('@')[0];
      
      // Prepare registration data for Django API
      const registrationData: RegisterData = {
        username: username,
        email: formData.email,
        password: formData.password,
        first_name: firstName,
        last_name: lastName,
        is_artist: formData.userType === 'artist',
        bio: formData.bio,
        artist_name: formData.userType === 'artist' ? formData.artistSpecialization : '',
        website: formData.websiteUrl || '',
        instagram_handle: formData.instagramHandle || '',
      };
      
      // Call Django API
      const response = await authAPI.register(registrationData);
      
      // Store tokens
      tokenManager.setTokens(response.tokens.access, response.tokens.refresh);
      
      // Determine user role
      const userRole = response.user.is_artist ? 'artist' : 'buyer';
      
      // Store role in localStorage for consistent routing
      localStorage.setItem('user_role', userRole);
      
      // Create user object for the frontend
      const user: User = {
        id: response.user.id,
        name: response.user.full_name,
        email: response.user.email,
        role: userRole
      };
      
      console.log("Registration successful! User saved to database:", response.user);
      console.log("User role (is_artist):", response.user.is_artist);
      console.log("Frontend user object:", user);
      console.log("Frontend user role:", user.role);
      
      onRegister(user);
      
      // Redirect based on user role
      if (userRole === 'artist') {
        console.log("Redirecting to artist dashboard");
        navigate("/artist-dashboard");
      } else if (userRole === 'buyer') {
        console.log("Redirecting to buyer dashboard");
        navigate("/buyer-dashboard");
      } else {
        console.warn("Unknown role, redirecting to homepage");
        navigate("/");
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Parse error message from backend response
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error instanceof Error) {
        // The authAPI.register function already extracts errorData.error from backend
        // and throws it as the error message
        const backendError = error.message;
        
        // Log full error for debugging
        console.error('Full error response:', error);
        
        // Use the specific error message from backend if available
        if (backendError && backendError !== 'Registration failed') {
          errorMessage = backendError;
        }
      } else if (typeof error === 'object' && error !== null) {
        // Handle case where error might be a response object
        console.error('Full error object:', error);
        
        // Try to extract error message from various possible structures
        const errorObj = error as any;
        if (errorObj.error) {
          errorMessage = errorObj.error;
        } else if (errorObj.message) {
          errorMessage = errorObj.message;
        } else if (errorObj.detail) {
          errorMessage = errorObj.detail;
        }
      }
      
      alert(errorMessage);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      // First, check if the user is already registered by trying to get Google OAuth URL
      // The backend will handle whether it's a login or registration based on user existence
      const response = await authAPI.googleLogin();
      
      if (response.authorization_url.includes('your-google-client-id')) {
        alert('Google OAuth is not configured yet. Please follow the setup guide in GOOGLE_OAUTH_SETUP.md to configure Google OAuth credentials.');
        return;
      }
      
      // Redirect to Google OAuth URL
      // The backend will determine if this is a new user (show role selection) or existing user (direct login)
      window.location.href = response.authorization_url;
      
    } catch (error) {
      console.error('Google OAuth error:', error);
      if (error instanceof Error && error.message.includes('400')) {
        alert('Google OAuth configuration error. Please check your Google OAuth credentials in the backend configuration.');
      } else {
        alert('Google registration failed. Please try again.');
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordStrong = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber;
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-2xl relative">
        {/* Artistic floating elements around the form */}
        <div className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-br from-stone-300/25 to-neutral-300/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-28 h-28 bg-gradient-to-br from-neutral-300/20 to-stone-300/25 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-12 w-16 h-16 bg-gradient-to-br from-stone-300/30 to-neutral-300/25 rounded-full blur-lg pointer-events-none"></div>

        {/* Back to Home Button */}
        <Button
          variant="ghost"
          onClick={onNavigateToHome}
          className="mb-6 text-gray-600 hover:text-purple-600 hover:bg-purple-100/50 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Main Register Card */}
        <Card className="backdrop-blur-md bg-white/80 border-purple-200/40 shadow-2xl relative overflow-hidden">
          {/* Artistic header decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
          
          <CardHeader className="text-center space-y-6 pb-6">
            {/* Logo in header */}
            <div className="flex items-center justify-center space-x-2">
              <div className="flex items-center">
                <span 
                  className="text-3xl bg-clip-text text-transparent font-bold"
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
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    color: '#6A0DAD'
                  }}
                >
                  Alley
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
                <UserCheck className="w-6 h-6 text-purple-500" />
                Join ArtistAlley
              </CardTitle>
              <CardDescription className="text-gray-600">
                {defaultRole === 'artist' 
                  ? "Welcome future artist! Create your account to start selling your art" 
                  : "Create your account and start your artistic journey"
                }
              </CardDescription>
            </div>

            {/* Artistic icons */}
            <div className="flex justify-center space-x-4 opacity-60">
              <Brush className="w-4 h-4 text-pink-400" />
              <div className="w-1 h-1 bg-purple-400 rounded-full mt-1.5"></div>
              <Palette className="w-4 h-4 text-blue-400" />
              <div className="w-1 h-1 bg-pink-400 rounded-full mt-1.5"></div>
              <Brush className="w-4 h-4 text-purple-400" />
            </div>
          </CardHeader>

          <CardContent className="space-y-5 max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-500" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-500" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-500" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                  required
                />
              </div>

              {/* User Type Selection */}
              <div className="space-y-2">
                <Label className="text-gray-700 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-500" />
                  I am a...
                </Label>
                <Select onValueChange={(value) => handleInputChange('userType', value)} value={formData.userType} required>
                  <SelectTrigger className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artist">🎨 Artist - I create and sell art</SelectItem>
                    <SelectItem value="buyer">🛍️ Art Lover - I buy and collect art</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Address Section */}
              <div className="space-y-4 pt-2">
                <Label className="text-gray-700 flex items-center gap-2 text-base">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  Address Information
                </Label>
                
                {/* Street Address */}
                <div className="space-y-2">
                  <Label htmlFor="streetAddress" className="text-gray-600 text-sm">
                    Street Address
                  </Label>
                  <Input
                    id="streetAddress"
                    type="text"
                    placeholder="123 Main Street, Apartment 4B"
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                    required
                  />
                </div>

                {/* City and State */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-gray-600 text-sm">
                      City
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-gray-600 text-sm">
                      State/Province
                    </Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="Maharashtra"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Postal Code and Country */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-gray-600 text-sm">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      type="text"
                      placeholder="400001"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-gray-600 text-sm">
                      Country
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('country', value)} value={formData.country} required>
                      <SelectTrigger className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IN">🇮🇳 India</SelectItem>
                        <SelectItem value="US">🇺🇸 United States</SelectItem>
                        <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                        <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                        <SelectItem value="AU">🇦🇺 Australia</SelectItem>
                        <SelectItem value="DE">🇩🇪 Germany</SelectItem>
                        <SelectItem value="FR">🇫🇷 France</SelectItem>
                        <SelectItem value="IT">🇮🇹 Italy</SelectItem>
                        <SelectItem value="JP">🇯🇵 Japan</SelectItem>
                        <SelectItem value="SG">🇸🇬 Singapore</SelectItem>
                        <SelectItem value="other">🌍 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Artist-Specific Fields */}
              {formData.userType === 'artist' && (
                <div className="space-y-4 pt-2 border-t border-purple-200/40">
                  <Label className="text-gray-700 flex items-center gap-2 text-base">
                    <Palette className="w-4 h-4 text-purple-500" />
                    Artist Information
                  </Label>
                  
                  {/* Artist Specialization */}
                  <div className="space-y-2">
                    <Label htmlFor="artistSpecialization" className="text-gray-600 text-sm">
                      Artistic Specialization *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('artistSpecialization', value)} value={formData.artistSpecialization}>
                      <SelectTrigger className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300">
                        <SelectValue placeholder="Select your primary art form" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="painting">🎨 Painting</SelectItem>
                        <SelectItem value="digital-art">💻 Digital Art</SelectItem>
                        <SelectItem value="sculpture">🗿 Sculpture</SelectItem>
                        <SelectItem value="photography">📸 Photography</SelectItem>
                        <SelectItem value="jewelry">💎 Jewelry</SelectItem>
                        <SelectItem value="pottery">🏺 Pottery & Ceramics</SelectItem>
                        <SelectItem value="textile">🧵 Textile Art</SelectItem>
                        <SelectItem value="mixed-media">🎭 Mixed Media</SelectItem>
                        <SelectItem value="illustration">✏️ Illustration</SelectItem>
                        <SelectItem value="printmaking">🖨️ Printmaking</SelectItem>
                        <SelectItem value="other">✨ Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-gray-600 text-sm">
                      Artist Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your artistic journey, style, and inspirations..."
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 min-h-[80px]"
                      rows={3}
                    />
                  </div>

                  {/* Business Name */}
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-gray-600 text-sm">
                      Business/Studio Name (Optional)
                    </Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Your art studio or business name"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                    />
                  </div>

                  {/* Website URL */}
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl" className="text-gray-600 text-sm flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      Website/Portfolio URL (Optional)
                    </Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={formData.websiteUrl}
                      onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                      className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                    />
                  </div>

                  {/* Instagram Handle */}
                  <div className="space-y-2">
                    <Label htmlFor="instagramHandle" className="text-gray-600 text-sm flex items-center gap-2">
                      <Camera className="w-3 h-3" />
                      Instagram Handle (Optional)
                    </Label>
                    <Input
                      id="instagramHandle"
                      type="text"
                      placeholder="@yourarthandle"
                      value={formData.instagramHandle}
                      onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
                      className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-500" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password (8+ chars, uppercase, lowercase, number)"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-500" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="rounded border-purple-300 text-purple-500 focus:ring-purple-400/20 mt-0.5"
                  required
                />
                <label htmlFor="terms" className="text-gray-600 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700 transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Register Button */}
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12"
              >
                Create Account
              </Button>
            </form>

            <div className="space-y-4">
              <Separator className="bg-purple-200/50" />

                     {/* Social Registration Options */}
                     <div className="space-y-3">
                       <Button 
                         variant="outline" 
                         onClick={handleGoogleRegister}
                         className="w-full border-purple-200/60 hover:bg-purple-50/50 hover:border-purple-300 transition-all duration-300"
                       >
                         <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                           <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                           <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                           <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                           <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                         </svg>
                         Sign up with Google
                       </Button>

              </div>

              <Separator className="bg-purple-200/50" />

              {/* Sign in link */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button 
                  onClick={onNavigateToLogin}
                  className="text-purple-600 hover:text-purple-700 transition-colors font-medium cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artistic bottom decoration */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-2 text-gray-500 text-sm">
            <Brush className="w-3 h-3" />
            <span>Join thousands of artists and art lovers</span>
            <Palette className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
