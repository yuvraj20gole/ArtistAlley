import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Palette, Brush } from "lucide-react";
import { authAPI, tokenManager } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer' | 'admin';
}

interface LoginProps {
  onNavigateToHome: () => void;
  onNavigateToRegister: () => void;
  onLogin: (userData: User) => void;
}

export function Login({ onNavigateToHome, onNavigateToRegister, onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Load remembered email if available
    const remembered = localStorage.getItem('rememberMe');
    const rememberedEmail = localStorage.getItem('userEmail');
    
    if (remembered === 'true' && rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    
    if (!password.trim()) {
      alert("Please enter your password");
      return;
    }
    
    try {
      // Call Django API for login
      const response = await authAPI.login({
        email: email,
        password: password,
      });
      
      // Store tokens
      tokenManager.setTokens(response.tokens.access, response.tokens.refresh);

      // Determine user role
      let userRole: 'artist' | 'buyer' | 'admin' = 'buyer'; // default
      
      if (response.user.is_artist) {
        userRole = 'artist';
      } else if ((response.user as any).is_staff || (response.user as any).is_superuser) {
        userRole = 'admin';
      } else {
        userRole = 'buyer';
      }
      
      // Store role in localStorage for consistent routing
      localStorage.setItem('user_role', userRole);

      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
      }

      // Create user object for the frontend
      const user: User = {
        id: response.user.id,
        name: response.user.full_name,
        email: response.user.email,
        role: userRole
      };

      console.log("Login success", response);
      console.log("User role:", userRole);
      onLogin(user);
      
      // Redirect based on user role
      if (userRole === 'artist') {
        console.log("Redirecting to artist dashboard");
        navigate("/artist-dashboard");
      } else if (userRole === 'buyer') {
        console.log("Redirecting to buyer dashboard");
        navigate("/buyer-dashboard");
      } else if (userRole === 'admin') {
        console.log("Redirecting to admin dashboard");
        navigate("/admin-dashboard");
      } else {
        console.warn("Unknown role, redirecting to homepage");
        navigate("/");
      }
      
    } catch (error) {
      console.error('Login error:', error);
      alert(error instanceof Error ? error.message : 'Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Call backend to get Google OAuth authorization URL
      const response = await authAPI.googleLogin();
      
      if (response.authorization_url.includes('your-google-client-id')) {
        alert('Google OAuth is not configured yet. Please follow the setup guide in GOOGLE_OAUTH_SETUP.md to configure Google OAuth credentials.');
        return;
      }
      
      // Redirect to Google OAuth URL
      window.location.href = response.authorization_url;
      
    } catch (error) {
      console.error('Google OAuth error:', error);
      if (error instanceof Error && error.message.includes('400')) {
        alert('Google OAuth configuration error. Please check your Google OAuth credentials in the backend configuration.');
      } else {
        alert('Google login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md relative">
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

        {/* Main Login Card */}
        <Card className="backdrop-blur-md bg-white/80 border-purple-200/40 shadow-2xl relative overflow-hidden">
          {/* Artistic header decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
          
          <CardHeader className="text-center space-y-6 pb-8">
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
                <Palette className="w-6 h-6 text-purple-500" />
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your artistic journey
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

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-500" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="artist@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/70 border-purple-200/60 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                  required
                />
              </div>

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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                     {/* Remember me and Forgot password */}
                     <div className="flex items-center justify-between text-sm">
                       <label className="flex items-center space-x-2 cursor-pointer">
                         <input 
                           type="checkbox" 
                           checked={rememberMe}
                           onChange={(e) => setRememberMe(e.target.checked)}
                           className="rounded border-purple-300 text-purple-500 focus:ring-purple-400/20"
                         />
                         <span className="text-gray-600">Remember me</span>
                       </label>
                <a href="#" className="text-purple-600 hover:text-purple-700 transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12"
              >
                Sign In
              </Button>
            </form>

            <div className="space-y-4">
              <Separator className="bg-purple-200/50" />

                     {/* Social Login Options */}
                     <div className="space-y-3">
                       <Button 
                         variant="outline" 
                         onClick={handleGoogleLogin}
                         className="w-full border-purple-200/60 hover:bg-purple-50/50 hover:border-purple-300 transition-all duration-300"
                       >
                         <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                           <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                           <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                           <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                           <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                         </svg>
                         Continue with Google
                       </Button>

              </div>

              <Separator className="bg-purple-200/50" />

              {/* Sign up link */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button 
                  onClick={onNavigateToRegister}
                  className="text-purple-600 hover:text-purple-700 transition-colors font-medium cursor-pointer"
                >
                  Sign up for free
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artistic bottom decoration */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-2 text-gray-500 text-sm">
            <Brush className="w-3 h-3" />
            <span>Connecting artists with art lovers</span>
            <Palette className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
