import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Plus, 
  Eye, 
  Heart, 
  Edit3, 
  Trash2,
  Search,
  Filter,
  Grid3X3,
  List,
  Upload
} from "lucide-react";

interface Artwork {
  id: number;
  title: string;
  category: string;
  price: number;
  views: number;
  likes: number;
  status: 'active' | 'sold' | 'draft';
  image: string;
  dateCreated: string;
}

export function MyArtworks() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock artworks data
  const artworks: Artwork[] = [
    {
      id: 1,
      title: "Abstract Harmony",
      category: "Painting",
      price: 15000,
      views: 234,
      likes: 45,
      status: 'active',
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
      dateCreated: "2024-01-15"
    },
    {
      id: 2,
      title: "Golden Sunrise",
      category: "Digital Art",
      price: 8000,
      views: 156,
      likes: 28,
      status: 'sold',
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      dateCreated: "2024-01-10"
    },
    {
      id: 3,
      title: "Ceramic Elegance",
      category: "Pottery",
      price: 12000,
      views: 89,
      likes: 12,
      status: 'active',
      image: "https://images.unsplash.com/photo-1565193298595-4a87c91ccf11",
      dateCreated: "2024-01-08"
    },
    {
      id: 4,
      title: "Ocean Dreams",
      category: "Photography",
      price: 6000,
      views: 178,
      likes: 32,
      status: 'active',
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
      dateCreated: "2024-01-05"
    },
    {
      id: 5,
      title: "Urban Sketch",
      category: "Drawing",
      price: 4000,
      views: 134,
      likes: 18,
      status: 'draft',
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
      dateCreated: "2024-01-02"
    },
    {
      id: 6,
      title: "Nature's Palette",
      category: "Painting",
      price: 18000,
      views: 298,
      likes: 67,
      status: 'active',
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853",
      dateCreated: "2023-12-28"
    }
  ];

  const categories = ['all', 'Painting', 'Digital Art', 'Pottery', 'Photography', 'Drawing'];
  const filteredArtworks = selectedCategory === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'sold': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            My Artworks
          </h2>
          <p className="text-muted-foreground mt-1">Manage your artistic creations</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          Upload New Artwork
        </Button>
      </div>

      {/* Filters and View Controls */}
      <div className="flex items-center justify-between bg-card/60 backdrop-blur-sm rounded-lg p-4 border">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search artworks..."
              className="pl-10 pr-4 py-2 border rounded-md bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-md px-3 py-2 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-muted/50 rounded-md p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Artworks Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-card to-primary/5">
              <div className="relative">
                <ImageWithFallback
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={getStatusColor(artwork.status)}>
                    {artwork.status}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button variant="secondary" size="sm" className="bg-card/90 backdrop-blur-sm">
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button variant="destructive" size="sm" className="bg-red-500/90 backdrop-blur-sm">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold truncate">{artwork.title}</h3>
                <p className="text-sm text-muted-foreground">{artwork.category}</p>
                <div className="text-lg font-bold text-primary mt-2">
                  ₹{artwork.price.toLocaleString()}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-3">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{artwork.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{artwork.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="p-4 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-card to-primary/5">
              <div className="flex items-center space-x-4">
                <ImageWithFallback
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{artwork.title}</h3>
                      <p className="text-sm text-muted-foreground">{artwork.category}</p>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      ₹{artwork.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{artwork.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{artwork.likes}</span>
                      </div>
                      <Badge className={getStatusColor(artwork.status)}>
                        {artwork.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit3 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-2xl font-bold text-green-800">{artworks.filter(a => a.status === 'active').length}</div>
          <div className="text-sm text-green-600">Active Artworks</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-2xl font-bold text-blue-800">{artworks.filter(a => a.status === 'sold').length}</div>
          <div className="text-sm text-blue-600">Sold Artworks</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="text-2xl font-bold text-yellow-800">{artworks.filter(a => a.status === 'draft').length}</div>
          <div className="text-sm text-yellow-600">Draft Artworks</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-2xl font-bold text-purple-800">{artworks.reduce((sum, a) => sum + a.views, 0)}</div>
          <div className="text-sm text-purple-600">Total Views</div>
        </Card>
      </div>
    </div>
  );
}