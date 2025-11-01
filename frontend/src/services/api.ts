// API service for communicating with Django backend

const API_BASE_URL = 'http://localhost:8000/api';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = 'your-google-client-id'; // This will be set when you get your Google OAuth credentials

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_artist: boolean;
}

export interface AuthResponse {
  message: string;
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  is_artist: boolean;
  bio?: string;
  artist_name?: string;
  website?: string;
  instagram_handle?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// API functions
export const authAPI = {
  // Register a new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Include cookies for session management
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle different error response formats from Django backend
      if (errorData.error) {
        // Specific error message from backend (e.g., "A user with this email already exists.")
        throw new Error(errorData.error);
      } else if (typeof errorData === 'object' && Object.keys(errorData).length > 0) {
        // Validation errors from Django serializer (e.g., {email: ["This field is required."]})
        const errorMessages = [];
        for (const [field, errors] of Object.entries(errorData)) {
          if (Array.isArray(errors)) {
            errorMessages.push(`${field}: ${errors.join(', ')}`);
          } else {
            errorMessages.push(`${field}: ${errors}`);
          }
        }
        throw new Error(errorMessages.join('; '));
      } else {
        // Fallback error message
        throw new Error('Registration failed. Please try again.');
      }
    }

    return response.json();
  },

  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Include cookies for session management
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    return response.json();
  },

  // Get user profile
  getProfile: async (): Promise<{ user: User }> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',  // Include cookies for session management
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },

  // Update user profile
  updateProfile: async (data: {
    first_name?: string;
    last_name?: string;
    bio?: string;
    artist_name?: string;
    website?: string;
    instagram_handle?: string;
  }): Promise<{ message: string; user: User }> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',  // Include cookies for session management
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  },

  // Check if user exists
  checkUserExists: async (email: string): Promise<{ exists: boolean; email: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/check-user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to check user existence');
    }

    return response.json();
  },

  // Google OAuth login
  googleLogin: async (): Promise<{ authorization_url: string; state: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/google/login/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Include cookies for session management
    });

    if (!response.ok) {
      throw new Error('Failed to initiate Google OAuth');
    }

    return response.json();
  },

  // Google OAuth callback
  googleCallback: async (code: string, state: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/google/callback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Include cookies for session management
      body: JSON.stringify({ code, state }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Google OAuth authentication failed');
    }

    return response.json();
  },
};

// Token management
export const tokenManager = {
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  },

  getAccessToken: () => localStorage.getItem('access_token'),
  getRefreshToken: () => localStorage.getItem('refresh_token'),

  clearTokens: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  isAuthenticated: () => !!localStorage.getItem('access_token'),
};

// Artwork types
export interface Artwork {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  status: 'draft' | 'active' | 'sold' | 'inactive';
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  tags: string;
  artist_name: string;
  artist_username: string;
  discounted_price?: number;
}

export interface ArtworkCreateData {
  title: string;
  description: string;
  category: string;
  price: number;
  image: File;
  tags: string;
  status: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  artist_name: string;
  artwork_count: number;
  is_currently_active: boolean;
}

export interface PromotionCreateData {
  title: string;
  description: string;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  artwork_ids: number[];
}

// Artwork API calls
export const artworkAPI = {
  // Get all artworks for the current user
  getMyArtworks: async (): Promise<Artwork[]> => {
    const response = await fetch(`${API_BASE_URL}/artworks/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch artworks');
    }

    return response.json();
  },

  // Get public artworks (for browsing)
  getPublicArtworks: async (params?: {
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
  }): Promise<Artwork[]> => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.min_price) queryParams.append('min_price', params.min_price.toString());
    if (params?.max_price) queryParams.append('max_price', params.max_price.toString());

    const response = await fetch(`${API_BASE_URL}/public/artworks/?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch public artworks');
    }

    const data = await response.json();
    // Return just the results array from paginated response
    return data.results || data;
  },

  // Upload new artwork
  uploadArtwork: async (data: ArtworkCreateData): Promise<Artwork> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', data.price.toString());
    formData.append('image', data.image);
    formData.append('tags', data.tags);
    formData.append('status', data.status);

    const token = tokenManager.getAccessToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/artworks/`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload artwork');
    }

    return response.json();
  },

  // Update artwork
  updateArtwork: async (id: number, data: Partial<ArtworkCreateData>): Promise<Artwork> => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.category) formData.append('category', data.category);
    if (data.price) formData.append('price', data.price.toString());
    if (data.image) formData.append('image', data.image);
    if (data.tags) formData.append('tags', data.tags);
    if (data.status) formData.append('status', data.status);

    const token = tokenManager.getAccessToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/artworks/${id}/`, {
      method: 'PATCH',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update artwork');
    }

    return response.json();
  },

  // Delete artwork
  deleteArtwork: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/artworks/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete artwork');
    }
  },

  // Increment views
  incrementViews: async (id: number): Promise<{ views: number }> => {
    const response = await fetch(`${API_BASE_URL}/artworks/${id}/view/`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to increment views');
    }

    return response.json();
  },

  // Like artwork
  likeArtwork: async (id: number): Promise<{ likes: number }> => {
    const response = await fetch(`${API_BASE_URL}/artworks/${id}/like/`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to like artwork');
    }

    return response.json();
  },

  // Get artwork categories
  getCategories: async (): Promise<{ value: string; label: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/categories/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  },
};

// Promotion API calls
export const promotionAPI = {
  // Get all promotions for the current user
  getMyPromotions: async (): Promise<Promotion[]> => {
    const response = await fetch(`${API_BASE_URL}/promotions/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch promotions');
    }

    return response.json();
  },

  // Create new promotion
  createPromotion: async (data: PromotionCreateData): Promise<Promotion> => {
    const response = await fetch(`${API_BASE_URL}/promotions/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create promotion');
    }

    return response.json();
  },

  // Update promotion
  updatePromotion: async (id: number, data: Partial<PromotionCreateData>): Promise<Promotion> => {
    const response = await fetch(`${API_BASE_URL}/promotions/${id}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update promotion');
    }

    return response.json();
  },

  // Delete promotion
  deletePromotion: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/promotions/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete promotion');
    }
  },
};

// AI Recommendations API
export interface AIRecommendation {
  artwork_id: number;
  title: string;
  artist_name: string;
  category: string;
  price: number;
  image_url: string;
  match_score: number;
  reasons: string[];
  algorithm: string;
}

export interface UserPreferences {
  preferred_categories: string[];
  preferred_price_range: string;
  preferred_artists: number[];
  last_updated: string;
}

export interface UserInsights {
  total_views: number;
  total_likes: number;
  total_purchases: number;
  favorite_categories: string[];
  preferred_price_range: string;
  followed_artists_count: number;
}

export const trackUserBehavior = async (behaviorData: {
  action_type: 'view' | 'like' | 'purchase' | 'search' | 'cart_add' | 'cart_remove' | 'follow_artist';
  artwork_id?: number;
  artist_id?: number;
  category?: string;
  search_query?: string;
  price_range?: string;
  session_id?: string;
}): Promise<void> => {
  const token = localStorage.getItem('access_token');
  if (!token) return;

  try {
    await fetch(`${API_BASE_URL}/recommendations/track-behavior/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(behaviorData),
    });
  } catch (error) {
    console.error('Failed to track user behavior:', error);
  }
};

export const getAIRecommendations = async (limit: number = 12): Promise<AIRecommendation[]> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/recommendations/get-recommendations/?limit=${limit}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI recommendations');
  }

  const data = await response.json();
  return data.recommendations;
};

export const getUserPreferences = async (): Promise<{
  preferences: UserPreferences | null;
  insights: UserInsights;
}> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/recommendations/user-preferences/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user preferences');
  }

  return response.json();
};

// Simple AI Recommendation function for backward compatibility
export const AIRecommendation = async (userId: string): Promise<any[]> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/recommendations/get-recommendations/?limit=12`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI recommendations');
    }

    const data = await response.json();
    return data.recommendations || [];
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    // Return mock data if API fails
    return [
      {"artwork_id": 1, "title": "Abstract Art Vibes", "artist_name": "Mira Sen", "category": "abstract", "price": 15000, "image_url": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop&crop=center", "match_score": 85, "reasons": ["Similar to your interest in abstract art"], "algorithm": "content-based"},
      {"artwork_id": 2, "title": "Nature's Flow", "artist_name": "Arjun Desai", "category": "landscape", "price": 12000, "image_url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&crop=center", "match_score": 78, "reasons": ["From artists you like"], "algorithm": "collaborative"},
      {"artwork_id": 3, "title": "Digital Dreamscape", "artist_name": "Ananya Rao", "category": "digital", "price": 8000, "image_url": "https://images.unsplash.com/photo-1557683316-973673baf926?w=500&h=500&fit=crop&crop=center", "match_score": 92, "reasons": ["Popular choice among buyers"], "algorithm": "popularity"},
      {"artwork_id": 4, "title": "Urban Canvas", "artist_name": "Priya Sharma", "category": "street", "price": 9500, "image_url": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop&crop=center", "match_score": 88, "reasons": ["Trending in your area"], "algorithm": "content-based"},
      {"artwork_id": 5, "title": "Ocean Depths", "artist_name": "Rajesh Kumar", "category": "abstract", "price": 18000, "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center", "match_score": 76, "reasons": ["Similar to your liked artworks"], "algorithm": "collaborative"},
      {"artwork_id": 6, "title": "Geometric Harmony", "artist_name": "Sneha Patel", "category": "geometric", "price": 11000, "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&crop=center", "match_score": 91, "reasons": ["Highly rated by similar users"], "algorithm": "popularity"}
    ];
  }
};

// Admin Dashboard API
export const getAllUsers = async (search?: string, role?: string, status?: string): Promise<any> => {
  const token = localStorage.getItem('access_token');
  if (!token) throw new Error('No access token found');

  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (role) params.append('role', role);
    if (status) params.append('status', status);

    const response = await fetch(`${API_BASE_URL}/users/all/?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
