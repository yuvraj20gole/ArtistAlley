# 🎨 ArtistAlley

A comprehensive **art marketplace platform** that connects artists with buyers, featuring an advanced AI-powered recommendation system, multi-role user management, and a modern full-stack architecture.

![ArtistAlley Logo](https://via.placeholder.com/800x200/8B5CF6/FFFFFF?text=ArtistAlley+-+Art+Marketplace+Platform)

## 🚀 Features

### 🎯 **Core Features**
- **Multi-Role User System**: Artists, Buyers, and Admins
- **Artwork Marketplace**: Complete CRUD operations for artwork management
- **AI-Powered Recommendations**: Smart recommendation engine with behavior tracking
- **Google OAuth Integration**: Seamless authentication
- **Real-time Analytics**: Comprehensive dashboard with insights
- **Promotion System**: Discount management and campaigns
- **Media Management**: Image uploads and handling

### 🤖 **AI Recommendation Engine**
- **Content-based Filtering**: Matches user preferences to artwork attributes
- **Collaborative Filtering**: Finds users with similar tastes
- **Behavior Tracking**: Learns from user interactions (views, likes, purchases)
- **Performance Optimized**: 6-hour caching with automatic expiration
- **Smart Insights**: User preference analysis and trend detection

### 🎨 **Design System**
- **Modern UI**: Professional, artistic design with Tailwind CSS
- **Responsive**: Mobile-first design approach
- **Component Library**: 50+ reusable UI components (Radix UI based)
- **Multiple Design Iterations**: figma-design, figma-design-2, figma-final, figma-redesign

## 🏗️ Architecture

### **Backend (Django REST API)**
```
backend/
├── artistalley/          # Main Django project
├── users/               # User management & authentication
├── artworks/            # Artwork CRUD & marketplace logic
├── recommendations/     # AI recommendation engine
└── media/              # File storage for artwork images
```

### **Frontend (React + TypeScript)**
```
frontend/src/
├── components/         # 90+ React components
├── services/          # API integration layer
├── utils/            # Helper functions
└── ui/              # Reusable UI components
```

### **Design Systems**
```
figma-design/         # Original Figma implementation
figma-design-2/       # Enhanced dashboard components
figma-final/         # Production-ready design system
figma-redesign/      # Latest UI improvements
```

## 🛠️ Tech Stack

### **Backend**
- **Framework**: Django 5.2.6 with Django REST Framework
- **Database**: SQLite (development) with custom user models
- **Authentication**: JWT tokens + Google OAuth integration
- **File Storage**: Local media handling with Pillow
- **AI Engine**: Custom recommendation system

### **Frontend**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development
- **Styling**: Tailwind CSS with Radix UI components
- **Routing**: React Router for SPA navigation
- **State Management**: Local state + localStorage

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/artistalley.git
   cd artistalley
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```
   Backend will be available at: http://localhost:8000

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will be available at: http://localhost:3000

4. **Figma Design Projects** (Optional)
   ```bash
   # Each figma directory has its own package.json
   cd figma-design-2
   npm install
   npm run dev
   ```

### **Environment Variables**

Create a `.env` file in the backend directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
GOOGLE_OAUTH2_CLIENT_ID=your-google-client-id
GOOGLE_OAUTH2_CLIENT_SECRET=your-google-client-secret
GOOGLE_OAUTH2_REDIRECT_URI=http://localhost:8000/api/auth/google/callback/
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

## 📊 API Documentation

### **Authentication Endpoints**
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/profile/` - Get user profile
- `GET /api/auth/google/login/` - Google OAuth login
- `POST /api/auth/google/callback/` - Google OAuth callback

### **Artwork Endpoints**
- `GET /api/artworks/` - Get user's artworks
- `POST /api/artworks/` - Create new artwork
- `GET /api/public/artworks/` - Browse public artworks
- `GET /api/artworks/{id}/` - Get artwork details
- `PATCH /api/artworks/{id}/` - Update artwork
- `DELETE /api/artworks/{id}/` - Delete artwork

### **Recommendation Endpoints**
- `POST /api/recommendations/track-behavior/` - Track user behavior
- `GET /api/recommendations/get-recommendations/` - Get AI recommendations
- `GET /api/recommendations/user-preferences/` - Get user preferences

### **Promotion Endpoints**
- `GET /api/promotions/` - Get user's promotions
- `POST /api/promotions/` - Create new promotion
- `PATCH /api/promotions/{id}/` - Update promotion
- `DELETE /api/promotions/{id}/` - Delete promotion

## 🎯 User Roles

### **Artist**
- Upload and manage artwork
- Track sales and analytics
- Create promotional campaigns
- View performance insights

### **Buyer**
- Browse and purchase artwork
- Receive personalized recommendations
- Manage wishlist and orders
- Track purchase history

### **Admin**
- Manage all users and content
- Monitor platform analytics
- Oversee system operations
- Access admin dashboard

## 🤖 AI Recommendation System

### **Algorithm Components**
1. **Content-based Filtering**: Analyzes artwork attributes and user preferences
2. **Collaborative Filtering**: Finds users with similar behavior patterns
3. **Popularity Boost**: Includes trending and popular items
4. **Business Rules**: Prevents duplicates and ensures diversity

### **Behavior Tracking**
- User views and interactions
- Purchase history
- Search queries
- Category preferences
- Price range preferences

## 🎨 Design System

The project includes multiple design iterations:

- **figma-design/**: Original Figma-to-code implementation
- **figma-design-2/**: Enhanced dashboard components with analytics
- **figma-final/**: Production-ready design system
- **figma-redesign/**: Latest UI improvements and optimizations

## 📱 Screenshots

### Dashboard Views
![Artist Dashboard](https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Artist+Dashboard)
![Buyer Dashboard](https://via.placeholder.com/600x400/10B981/FFFFFF?text=Buyer+Dashboard)

### Analytics
![Analytics](https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Analytics+Dashboard)

## 🔧 Development

### **Running Tests**
```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
cd frontend
npm test
```

### **Code Quality**
```bash
# ESLint
npm run lint

# TypeScript check
npm run type-check

# Django code quality
python manage.py check
```

## 📦 Deployment

### **Backend Deployment**
1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations
4. Set up static file serving
5. Configure media file storage

### **Frontend Deployment**
1. Build production bundle: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Configure environment variables
4. Set up domain and SSL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Django** - Web framework
- **React** - Frontend library
- **Tailwind CSS** - Styling framework
- **Radix UI** - Component primitives
- **Lucide React** - Icon library
- **Recharts** - Chart library

## 📞 Contact

- **Project Link**: [https://github.com/yourusername/artistalley](https://github.com/yourusername/artistalley)
- **Issues**: [GitHub Issues](https://github.com/yourusername/artistalley/issues)

## 🗺️ Roadmap

### **Phase 1** ✅
- [x] Basic user authentication
- [x] Artwork management
- [x] AI recommendation system
- [x] Dashboard analytics

### **Phase 2** 🚧
- [ ] Payment integration
- [ ] Order management system
- [ ] Advanced search filters
- [ ] Email notifications

### **Phase 3** 📋
- [ ] Real-time chat system
- [ ] Mobile app development
- [ ] Social features (following, sharing)
- [ ] Advanced analytics

---

**Made with ❤️ for the art community**
