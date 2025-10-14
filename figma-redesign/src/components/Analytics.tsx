import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Eye, 
  Heart,
  DollarSign,
  Calendar,
  Target,
  Award,
  BarChart3
} from "lucide-react";

export function Analytics() {
  // Mock analytics data
  const monthlyStats = [
    { month: "Jan", revenue: 12000, orders: 8, views: 1200, likes: 180 },
    { month: "Feb", revenue: 15000, orders: 10, views: 1500, likes: 230 },
    { month: "Mar", revenue: 18000, orders: 12, views: 1800, likes: 280 },
    { month: "Apr", revenue: 22000, orders: 14, views: 2200, likes: 340 },
    { month: "May", revenue: 25000, orders: 16, views: 2500, likes: 420 },
    { month: "Jun", revenue: 28000, orders: 18, views: 2800, likes: 480 }
  ];

  const topPerformingArtworks = [
    { title: "Abstract Harmony", views: 234, likes: 45, revenue: 15000 },
    { title: "Golden Sunrise", views: 198, likes: 38, revenue: 12000 },
    { title: "Ceramic Elegance", views: 167, likes: 29, revenue: 10000 },
    { title: "Ocean Dreams", views: 145, likes: 25, revenue: 8000 },
    { title: "Urban Sketch", views: 123, likes: 18, revenue: 6000 }
  ];

  const audienceInsights = {
    topCities: [
      { city: "Mumbai", percentage: 28 },
      { city: "Delhi", percentage: 22 },
      { city: "Bangalore", percentage: 18 },
      { city: "Pune", percentage: 12 },
      { city: "Chennai", percentage: 10 },
      { city: "Others", percentage: 10 }
    ],
    ageGroups: [
      { group: "25-34", percentage: 35 },
      { group: "35-44", percentage: 28 },
      { group: "45-54", percentage: 20 },
      { group: "18-24", percentage: 12 },
      { group: "55+", percentage: 5 }
    ]
  };

  const currentMonth = monthlyStats[monthlyStats.length - 1];
  const previousMonth = monthlyStats[monthlyStats.length - 2];
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
  const ordersGrowth = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders) * 100;
  const viewsGrowth = ((currentMonth.views - previousMonth.views) / previousMonth.views) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Analytics & Insights
        </h2>
        <p className="text-muted-foreground mt-1">Track your artistic success and audience engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-800">₹{currentMonth.revenue.toLocaleString()}</div>
              <div className="text-sm text-green-600">Monthly Revenue</div>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+{revenueGrowth.toFixed(1)}%</span>
            </div>
          </div>
          <div className="mt-2">
            <DollarSign className="w-8 h-8 text-green-600/50" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-800">{currentMonth.orders}</div>
              <div className="text-sm text-blue-600">Orders This Month</div>
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+{ordersGrowth.toFixed(1)}%</span>
            </div>
          </div>
          <div className="mt-2">
            <Target className="w-8 h-8 text-blue-600/50" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-800">{currentMonth.views.toLocaleString()}</div>
              <div className="text-sm text-purple-600">Total Views</div>
            </div>
            <div className="flex items-center space-x-1 text-purple-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+{viewsGrowth.toFixed(1)}%</span>
            </div>
          </div>
          <div className="mt-2">
            <Eye className="w-8 h-8 text-purple-600/50" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-pink-800">{currentMonth.likes}</div>
              <div className="text-sm text-pink-600">Total Likes</div>
            </div>
            <div className="flex items-center space-x-1 text-pink-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+{((currentMonth.likes - previousMonth.likes) / previousMonth.likes * 100).toFixed(1)}%</span>
            </div>
          </div>
          <div className="mt-2">
            <Heart className="w-8 h-8 text-pink-600/50" />
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend - Line Chart */}
        <Card className="bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Revenue Trend</span>
            </CardTitle>
            <CardDescription>Monthly revenue growth over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 p-4">
              {/* Grid lines */}
              <div className="absolute inset-4 pointer-events-none">
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((fraction, index) => (
                  <div
                    key={`h-grid-${index}`}
                    className="absolute w-full border-t border-muted/30"
                    style={{ bottom: `${fraction * 100}%` }}
                  />
                ))}
                {/* Vertical grid lines */}
                {monthlyStats.map((_, index) => (
                  <div
                    key={`v-grid-${index}`}
                    className="absolute h-full border-l border-muted/20"
                    style={{ left: `${(index / (monthlyStats.length - 1)) * 100}%` }}
                  />
                ))}
              </div>

              {/* Line chart SVG */}
              <svg className="absolute inset-4 w-full h-full" style={{ zIndex: 5 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.05 }} />
                  </linearGradient>
                </defs>

                {/* Area under the line */}
                <path
                  d={`M 0,100% 
                      ${monthlyStats.map((month, index) => {
                        const x = (index / (monthlyStats.length - 1)) * 100;
                        const y = 100 - (month.revenue / Math.max(...monthlyStats.map(m => m.revenue))) * 100;
                        return `${index === 0 ? 'L' : 'L'} ${x}%,${y}%`;
                      }).join(' ')}
                      L 100%,100% Z`}
                  fill="url(#areaGradient)"
                  className="drop-shadow-sm"
                />

                {/* Main line */}
                <polyline
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={monthlyStats.map((month, index) => {
                    const x = (index / (monthlyStats.length - 1)) * 100;
                    const y = 100 - (month.revenue / Math.max(...monthlyStats.map(m => m.revenue))) * 100;
                    return `${x}%,${y}%`;
                  }).join(' ')}
                  className="drop-shadow-sm"
                />

                {/* Data points */}
                {monthlyStats.map((month, index) => {
                  const x = (index / (monthlyStats.length - 1)) * 100;
                  const y = 100 - (month.revenue / Math.max(...monthlyStats.map(m => m.revenue))) * 100;
                  return (
                    <g key={`point-${index}`}>
                      {/* Outer glow circle */}
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="8"
                        fill="url(#lineGradient)"
                        opacity="0.2"
                        className="animate-pulse"
                      />
                      {/* Main data point */}
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="4"
                        fill="url(#lineGradient)"
                        stroke="white"
                        strokeWidth="2"
                        className="drop-shadow-sm hover:r-6 transition-all duration-200 cursor-pointer"
                      />
                      {/* Tooltip on hover */}
                      <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <rect
                          x={`${x}%`}
                          y={`${y}%`}
                          width="80"
                          height="30"
                          rx="5"
                          transform="translate(-40, -45)"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-muted-foreground/20 shadow-lg"
                        />
                        <text
                          x={`${x}%`}
                          y={`${y}%`}
                          textAnchor="middle"
                          dy="-25"
                          className="text-xs font-medium fill-current"
                        >
                          ₹{month.revenue.toLocaleString()}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Month labels */}
              <div className="absolute bottom-0 left-4 right-4 flex justify-between text-xs text-muted-foreground">
                {monthlyStats.map((month) => (
                  <span key={month.month}>{month.month}</span>
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground pr-2">
                {[1, 0.75, 0.5, 0.25, 0].map((fraction) => (
                  <span key={fraction}>
                    ₹{Math.round(Math.max(...monthlyStats.map(m => m.revenue)) * fraction).toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Artworks */}
        <Card className="bg-gradient-to-br from-card to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-accent" />
              <span>Top Performing Artworks</span>
            </CardTitle>
            <CardDescription>Based on views, likes, and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingArtworks.map((artwork, index) => (
                <div key={artwork.title} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{artwork.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {artwork.views} views • {artwork.likes} likes
                      </div>
                    </div>
                  </div>
                  <div className="text-primary font-bold">₹{artwork.revenue.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Cities */}
        <Card className="bg-gradient-to-br from-card to-blue/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Audience by City</span>
            </CardTitle>
            <CardDescription>Where your customers are located</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {audienceInsights.topCities.map((city) => (
                <div key={city.city} className="flex items-center justify-between">
                  <span className="text-sm">{city.city}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        style={{ width: `${city.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{city.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Age Groups */}
        <Card className="bg-gradient-to-br from-card to-purple/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Audience by Age</span>
            </CardTitle>
            <CardDescription>Age distribution of your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {audienceInsights.ageGroups.map((group) => (
                <div key={group.group} className="flex items-center justify-between">
                  <span className="text-sm">{group.group} years</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                        style={{ width: `${group.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{group.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}