import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { artworkAPI, type Artwork } from "../services/api";
import { toast } from "sonner";
import { 
  Plus, 
  Eye, 
  Heart, 
  Edit3, 
  Trash2,
  Search,
  Filter,
  Grid3X3,
  List
} from "lucide-react";

interface MyArtworksProps {
  initialSearchQuery?: string;
}

export function MyArtworks({ initialSearchQuery = "" }: MyArtworksProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'painting',
    price: '',
    tags: '',
    status: 'draft',
    image: null as File | null
  });

  // Update search term when prop changes
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchTerm(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Helper function to ensure artworks is always an array with fallback
  const ensureArtworksArray = (data: unknown): Artwork[] => {
    // If data is already an array, return it
    if (Array.isArray(data)) {
      return data;
    }
    
    // If data is paginated (has results property), return results
    if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
      return (data as any).results;
    }
    
    // If data is empty or invalid, return empty array
    console.warn("No artworks data received, returning empty array");
    return [];
  };

  // Helper function to safely filter artworks
  const safeFilterArtworks = (filterFn: (artwork: Artwork) => boolean): Artwork[] => {
    return Array.isArray(artworks) ? artworks.filter(filterFn) : [];
  };

  // Helper function to safely reduce artworks
  const safeReduceArtworks = (reduceFn: (acc: number, artwork: Artwork) => number, initialValue: number): number => {
    return Array.isArray(artworks) ? artworks.reduce(reduceFn, initialValue) : initialValue;
  };

  // Load artworks on component mount
  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      const data = await artworkAPI.getMyArtworks();
      // Ensure the response is always an array
      const artworksArray = ensureArtworksArray(data);
      setArtworks(artworksArray);
      console.log('Loaded artworks:', artworksArray);
    } catch (error) {
      console.error('Failed to load artworks:', error);
      // Set empty array on error instead of fallback
      setArtworks([]);
      toast.error('Failed to load your artworks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadArtwork = () => {
    setShowUploadModal(true);
  };

  const handleSubmitUpload = async () => {
    if (!uploadForm.title || !uploadForm.price || !uploadForm.image) {
      toast.error('Please fill in all required fields (title, price, and image)');
      return;
    }

    try {
      setUploading(true);
      const artworkData = {
        title: uploadForm.title,
        description: uploadForm.description,
        category: uploadForm.category,
        price: parseFloat(uploadForm.price),
        image: uploadForm.image,
        tags: uploadForm.tags,
        status: uploadForm.status,
      };

      await artworkAPI.uploadArtwork(artworkData);
      toast.success('🎨 Artwork uploaded successfully!');
      
      // Reset form and close modal
      setUploadForm({
        title: '',
        description: '',
        category: 'painting',
        price: '',
        tags: '',
        status: 'draft',
        image: null
      });
      setShowUploadModal(false);
      
      // Reload artworks
      loadArtworks();
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload artwork. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteArtwork = async (id: number) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      try {
        await artworkAPI.deleteArtwork(id);
        toast.success('🗑️ Artwork deleted successfully!');
        loadArtworks();
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error('Failed to delete artwork. Please try again.');
      }
    }
  };

  const categories = ['all', 'painting', 'digital-art', 'sculpture', 'photography', 'jewelry', 'pottery', 'textile', 'mixed-media', 'illustration', 'printmaking', 'other'];
  
  const filteredArtworks = safeFilterArtworks(artwork => {
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.tags.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <Button 
          onClick={handleUploadArtwork}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading artworks...</p>
          </div>
        </div>
      ) : filteredArtworks.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No artworks yet</h3>
            <p className="text-gray-600 mb-4">Start building your portfolio by uploading your first artwork!</p>
          </div>
          <Button 
            onClick={handleUploadArtwork}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload Your First Artwork
          </Button>
        </div>
      ) : (
        <>
      {/* Artworks Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-card to-primary/5">
              <div className="relative">
                <ImageWithFallback
                  src={artwork.image_url}
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
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="bg-red-500/90 backdrop-blur-sm"
                    onClick={() => handleDeleteArtwork(artwork.id)}
                  >
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
                      src={artwork.image_url}
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
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteArtwork(artwork.id)}
                      >
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
        </>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-2xl font-bold text-green-800">{safeFilterArtworks(a => a.status === 'active').length}</div>
          <div className="text-sm text-green-600">Active Artworks</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-2xl font-bold text-blue-800">{safeFilterArtworks(a => a.status === 'sold').length}</div>
          <div className="text-sm text-blue-600">Sold Artworks</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="text-2xl font-bold text-yellow-800">{safeFilterArtworks(a => a.status === 'draft').length}</div>
          <div className="text-sm text-yellow-600">Draft Artworks</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-2xl font-bold text-purple-800">{safeReduceArtworks((sum, a) => sum + a.views, 0)}</div>
          <div className="text-sm text-purple-600">Total Views</div>
        </Card>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Upload New Artwork</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmitUpload(); }} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Artwork Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadForm({ ...uploadForm, image: file });
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
                {uploadForm.image && (
                  <p className="text-sm text-green-600 mt-1">✓ {uploadForm.image.name} selected</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter artwork title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary h-24"
                  placeholder="Describe your artwork..."
                />
              </div>

              {/* Category and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="painting">Painting</option>
                    <option value="digital-art">Digital Art</option>
                    <option value="sculpture">Sculpture</option>
                    <option value="photography">Photography</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="pottery">Pottery</option>
                    <option value="textile">Textile</option>
                    <option value="mixed-media">Mixed Media</option>
                    <option value="illustration">Illustration</option>
                    <option value="printmaking">Printmaking</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={uploadForm.price}
                    onChange={(e) => setUploadForm({ ...uploadForm, price: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., abstract, modern, colorful (comma-separated)"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={uploadForm.status}
                  onChange={(e) => setUploadForm({ ...uploadForm, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active (Available for sale)</option>
                  <option value="sold">Sold</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUploadModal(false)}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={uploading}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Artwork
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}