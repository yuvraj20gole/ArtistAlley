import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'artist' | 'buyer' | 'admin';
}

interface RoleSelectionProps {
  user: User;
  onRoleSelected: (role: 'artist' | 'buyer') => void;
}

export function RoleSelection({ user, onRoleSelected }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<'artist' | 'buyer' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = async (role: 'artist' | 'buyer') => {
    try {
      setIsLoading(true);
      
      // Update user role in backend
      const response = await fetch('http://localhost:8000/api/auth/profile/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          is_artist: role === 'artist'
        }),
      });

      if (response.ok) {
        // Update the user object
        const updatedUser = { ...user, role };
        onRoleSelected(role);
        
        // Redirect to appropriate dashboard
        if (role === 'artist') {
          navigate('/artist-dashboard');
        } else {
          navigate('/buyer-dashboard');
        }
      } else {
        throw new Error('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="w-full max-w-2xl">
        <Card className="p-8 bg-white/80 backdrop-blur-md shadow-2xl border border-purple-200/40">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome to ArtistAlley, {user.name}!
            </h1>
            <p className="text-gray-600">
              Please choose your role to get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Artist Role */}
            <Card 
              className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                selectedRole === 'artist' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
              }`}
              onClick={() => setSelectedRole('artist')}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Artist</h3>
                <p className="text-gray-600 mb-4">
                  Create and sell your artwork, manage your portfolio, and connect with buyers
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Upload and manage artwork</li>
                  <li>• Track sales and analytics</li>
                  <li>• Create promotions</li>
                  <li>• Artist dashboard</li>
                </ul>
              </div>
            </Card>

            {/* Buyer Role */}
            <Card 
              className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                selectedRole === 'buyer' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
              }`}
              onClick={() => setSelectedRole('buyer')}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Buyer</h3>
                <p className="text-gray-600 mb-4">
                  Discover and purchase unique artwork from talented artists
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Browse and search artwork</li>
                  <li>• Save favorites</li>
                  <li>• Purchase artwork</li>
                  <li>• Buyer dashboard</li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => selectedRole && handleRoleSelect(selectedRole)}
              disabled={!selectedRole || isLoading}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Setting up your account...' : 'Continue'}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              You can change your role later in your profile settings
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
