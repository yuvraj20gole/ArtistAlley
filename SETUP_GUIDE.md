# 🚀 ArtistAlley - Complete Setup Guide

## 📋 Prerequisites

### Required Software
- **Python 3.8+** - [Download here](https://www.python.org/downloads/)
- **Node.js 16+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/downloads)

### Verify Installation
```bash
# Check Python
python3 --version
# Should output: Python 3.8.x or higher

# Check Node.js
node --version
# Should output: v16.x.x or higher

# Check npm
npm --version
# Should output: 8.x.x or higher

# Check Git
git --version
# Should output: git version 2.x.x or higher
```

---

## 📥 Step 1: Clone the Repository

### Option A: Clone from GitHub (Recommended)
```bash
git clone https://github.com/yuvraj20gole/ArtistAlley.git
cd ArtistAlley
```

### Option B: If you already have the project locally
```bash
cd /Users/yuvrajgole/Documents/PycharmProjects/ArtistAlley
```

---

## 🐍 Step 2: Setup Backend (Django)

### Navigate to backend directory
```bash
cd backend
```

### Create virtual environment
```bash
# macOS/Linux
python3 -m venv venv

# Windows
python -m venv venv
```

### Activate virtual environment
```bash
# macOS/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### Install Python dependencies
```bash
pip install -r requirements.txt
```

**This will install:**
- Django 5.2.6
- Django REST Framework
- django-cors-headers
- python-dotenv
- Pillow (for image handling)
- Google OAuth libraries
- And other dependencies

### Run database migrations
```bash
python manage.py migrate
```

### Create superuser (for admin access)
```bash
python manage.py createsuperuser
```
Follow the prompts to create an admin account.

### Start Django server
```bash
python manage.py runserver
```

✅ **Backend is now running at: http://localhost:8000**
- API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

**Press `Ctrl + C` to stop the server**

---

## ⚛️ Step 3: Setup Frontend (React)

### Open a NEW terminal window

**Important:** Keep the backend terminal running and open a new terminal.

### Navigate to frontend directory
```bash
cd frontend
# If you're in the project root
# cd /Users/yuvrajgole/Documents/PycharmProjects/ArtistAlley/frontend
```

### Install Node.js dependencies
```bash
npm install
```

**This will install:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI components
- Lucide React (icons)
- And 90+ other dependencies

### Start React development server
```bash
npm run dev
```

✅ **Frontend is now running at: http://localhost:3000**

**Press `Ctrl + C` to stop the server**

---

## 🎯 Step 4: Access the Application

### Open in Browser
- **Frontend (Main App)**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

### Test the Setup
1. Visit http://localhost:3000
2. You should see the ArtistAlley homepage
3. Try logging in or registering a new account
4. Check backend logs in the terminal for any errors

---

## 📝 Complete Command Summary

### For a fresh start in VS Code:

```bash
# 1. Clone repository
git clone https://github.com/yuvraj20gole/ArtistAlley.git
cd ArtistAlley

# 2. Setup Backend (Terminal 1)
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# 3. Setup Frontend (Terminal 2 - OPEN NEW TERMINAL)
cd frontend
npm install
npm run dev

# 4. Open browser
# Visit http://localhost:3000
```

---

## 🛠️ Using the Automated Script

### Quick Setup (macOS/Linux)
```bash
# Make script executable
chmod +x START_PROJECT.sh

# Run setup
./START_PROJECT.sh

# Then in two separate terminals:
cd backend && source venv/bin/activate && python manage.py runserver
cd frontend && npm run dev
```

---

## 🐛 Troubleshooting

### Backend Issues

**Issue: ModuleNotFoundError**
```bash
# Solution: Make sure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

**Issue: Port 8000 already in use**
```bash
# Kill existing Django process
# Find process
lsof -i :8000
# Kill it
kill -9 <PID>

# Or use a different port
python manage.py runserver 8001
```

**Issue: Migration errors**
```bash
# Solution: Reset database
rm db.sqlite3
python manage.py migrate
```

### Frontend Issues

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**Issue: Port 3000 already in use**
```bash
# Use a different port
npm run dev -- --port 3001
```

**Issue: Can't find module errors**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Common Issues

**Issue: CORS errors**
- Make sure backend is running on port 8000
- Check that CORS_ALLOWED_ORIGINS in settings.py includes http://localhost:3000

**Issue: Images not loading**
- Make sure media files are in backend/media/
- Check MEDIA_URL and MEDIA_ROOT in settings.py

**Issue: API calls failing**
- Verify backend is running
- Check browser console for error messages
- Verify access token in localStorage

---

## 📚 Next Steps

1. **Explore the Application**
   - Visit http://localhost:3000
   - Create an account
   - Browse the artist dashboard
   - Try uploading artwork

2. **Access Admin Panel**
   - Visit http://localhost:8000/admin
   - Login with superuser credentials
   - Manage users, artworks, and content

3. **Development**
   - Edit files in VS Code
   - Changes auto-reload in browser
   - Check terminal for build output

4. **Contribute**
   - Read CONTRIBUTING.md
   - Create feature branches
   - Submit pull requests

---

## 🎉 Success!

Your ArtistAlley platform is now running! 🎨

- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000
- **Documentation**: See README.md for more details

Happy Coding! 🚀
