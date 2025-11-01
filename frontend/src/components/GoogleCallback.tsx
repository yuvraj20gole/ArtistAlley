import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { tokenManager } from "../services/api";
import { RoleSelection } from "./RoleSelection";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer';
  artist_name?: string;
  bio?: string;
}

interface GoogleCallbackProps {
  onLogin: (userData: User) => void;
}

export function GoogleCallback({ onLogin }: GoogleCallbackProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'role-selection'>('loading');
  const [message, setMessage] = useState('Processing Google login...');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleGoogleCallback = () => {
      try {
        // Get parameters from URL using useLocation
        const urlParams = new URLSearchParams(location.search);
        const success = urlParams.get('success');
        const accessToken = urlParams.get('access');
        const refreshToken = urlParams.get('refresh');
        const role = urlParams.get('role');
        const isNewUser = urlParams.get('isNewUser');
        const userId = urlParams.get('userId');
        const username = urlParams.get('username');
        const email = urlParams.get('email');
        const fullName = urlParams.get('fullName');
        const errorMessage = urlParams.get('message');

        console.log('GoogleCallback - URL params:', {
          success,
          accessToken: accessToken ? accessToken.substring(0, 20) + '...' : 'None',
          refreshToken: refreshToken ? refreshToken.substring(0, 20) + '...' : 'None',
          role,
          isNewUser,
          userId,
          username,
          email,
          fullName,
          errorMessage,
          pathname: location.pathname,
          search: location.search
        });

        // Check if this is an error response
        if (success === 'false' || !success) {
          console.error('OAuth error from backend:', errorMessage);
          // Redirect to login with error
          navigate('/login?error=oauth_failed');
          return;
        }

        // Verify we have the required data for success
        if (!accessToken || !refreshToken || !userId || !email) {
          console.error('Missing required data in URL parameters');
          navigate('/login?error=oauth_failed');
          return;
        }

        console.log('OAuth success - processing response...');
        console.log('Backend role from URL:', role);
        console.log('isNewUser flag:', isNewUser);

        // Determine user role
        const userRole = (role === 'artist') ? 'artist' : 'buyer';
        console.log('Determined user role:', userRole);

        // Save tokens and user data to localStorage
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('user_role', userRole);
        localStorage.setItem('username', username || '');
        localStorage.setItem('email', email);

        // Also use tokenManager for compatibility
        tokenManager.setTokens(accessToken, refreshToken);

        // Create user data for the frontend
        const userData: User = {
          id: parseInt(userId),
          name: fullName || email,
          email: email,
          role: userRole,
          artist_name: '',
          bio: ''
        };

        console.log('User data created:', userData);
        setUser(userData);

        // Handle navigation based on isNewUser flag
        const isNewUserBool = isNewUser === 'true';
        if (isNewUserBool) {
          console.log('New user - redirecting to role selection');
          navigate('/role-selection');
        } else {
          console.log('Existing user - logging in and redirecting to dashboard');
          onLogin(userData);
          
          // Navigate directly to role-specific dashboard
          if (userRole === 'artist') {
            console.log('Redirecting existing user to artist dashboard');
            navigate('/artist-dashboard');
          } else if (userRole === 'buyer') {
            console.log('Redirecting existing user to buyer dashboard');
            navigate('/buyer-dashboard');
          } else {
            // Fallback if role is not provided
            console.warn('Role not provided, redirecting to homepage');
            navigate('/');
          }
        }

      } catch (error) {
        console.error('Google OAuth callback error:', error);
        navigate('/login?error=oauth_failed');
      }
    };

    handleGoogleCallback();
  }, [onLogin, navigate, location]);

  // Handle role selection
  const handleRoleSelected = (role: 'artist' | 'buyer') => {
    if (user) {
      const updatedUser = { ...user, role };
      onLogin(updatedUser);
      
      // Navigate to appropriate dashboard
      if (role === 'artist') {
        navigate('/artist-dashboard');
      } else if (role === 'buyer') {
        navigate('/buyer-dashboard');
      }
    }
  };

  // Show role selection for new users
  if (status === 'role-selection' && user) {
    return <RoleSelection user={user} onRoleSelected={handleRoleSelected} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-purple-200/40">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-500"></div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing...</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Success!</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Failed</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
