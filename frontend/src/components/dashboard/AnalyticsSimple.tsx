import React from 'react';

export function AnalyticsSimple() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
          <p className="text-3xl font-bold text-blue-600">$12,450</p>
          <p className="text-green-600 text-sm">+12% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-800">Artworks Sold</h3>
          <p className="text-3xl font-bold text-green-600">47</p>
          <p className="text-green-600 text-sm">+8 from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-800">Total Views</h3>
          <p className="text-3xl font-bold text-purple-600">2,847</p>
          <p className="text-green-600 text-sm">+23% from last month</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend</h3>
        <div className="h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-600">Sales chart would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
