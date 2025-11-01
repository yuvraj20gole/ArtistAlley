import React, { useState } from 'react';

interface DashboardHeaderSimpleProps {
  user?: any;
  currentTab?: string;
  onNavigateToHome?: () => void;
  onLogout?: () => void;
  onTabChange?: (tab: string) => void;
}

export function DashboardHeaderSimple({ 
  user = { name: 'John Doe', email: 'john@example.com' }, 
  currentTab = 'analytics',
  onNavigateToHome = () => {},
  onLogout = () => {},
  onTabChange = () => {}
}: DashboardHeaderSimpleProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={onNavigateToHome}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎨</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Artist Dashboard</h1>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search artworks, orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* Right side - User menu and notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Help */}
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <span className="text-xl">❓</span>
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0)}
              </div>
              <button 
                onClick={onLogout}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="text-xl">⚙️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
