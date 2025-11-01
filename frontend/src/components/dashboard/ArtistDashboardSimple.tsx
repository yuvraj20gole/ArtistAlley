import React from 'react';

export default function ArtistDashboardSimple() {
  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🎨 Artist Dashboard - Simple Version
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics</h3>
            <p className="text-gray-600">View your sales and performance metrics</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">My Artworks</h3>
            <p className="text-gray-600">Manage your artwork portfolio</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Orders</h3>
            <p className="text-gray-600">Track your orders and sales</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile</h3>
            <p className="text-gray-600">Update your profile settings</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Status</h2>
          <p className="text-green-600">✅ Dashboard is working correctly!</p>
          <p className="text-gray-600 mt-2">This is a simplified version to test the integration.</p>
        </div>
      </div>
    </div>
  );
}
