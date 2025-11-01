# Backend Deployment Guide

## Deploy to Render.com (Recommended - Free Tier Available)

### Step 1: Push backend to GitHub
The backend code is already in your repository at `/backend`.

### Step 2: Create Render.com Account
1. Go to https://render.com
2. Sign up with your GitHub account
3. Connect your GitHub account

### Step 3: Deploy Web Service
1. Click "New +" → "Web Service"
2. Connect your repository: `yuvraj20gole/ArtistAlley`
3. Configure:
   - **Name**: `artistalley-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
   - **Start Command**: `gunicorn artistalley.wsgi:application --bind 0.0.0.0:$PORT`

### Step 4: Add PostgreSQL Database (Free Tier)
1. Click "New +" → "PostgreSQL"
2. Name: `artistalley-db`
3. Plan: Free
4. Create database
5. Note the **Internal Database URL** and **External Database URL**

### Step 5: Configure Environment Variables
In your Web Service settings, go to "Environment" and add:

```
SECRET_KEY=your-secret-key-here (generate a random string)
DEBUG=False
ALLOWED_HOSTS=artistalley-backend.onrender.com
DATABASE_URL=<Internal Database URL from PostgreSQL service>
CORS_ALLOWED_ORIGINS=https://yuvraj20gole.github.io
FRONTEND_URL=https://yuvraj20gole.github.io/ArtistAlley
CSRF_TRUSTED_ORIGINS=https://artistalley-backend.onrender.com,https://yuvraj20gole.github.io
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
GOOGLE_OAUTH2_CLIENT_ID=<your-google-client-id>
GOOGLE_OAUTH2_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_OAUTH2_REDIRECT_URI=https://artistalley-backend.onrender.com/api/auth/google/callback/
```

### Step 6: Create Persistent Disk (Optional - for media files)
1. In Web Service → Settings → Persistent Disk
2. Add disk with 1GB size
3. Mount path: `/opt/render/project/src/media`

### Step 7: Update Google OAuth Settings
1. Go to Google Cloud Console: https://console.cloud.google.com
2. Update OAuth redirect URI to: `https://artistalley-backend.onrender.com/api/auth/google/callback/`

### Step 8: Get Your Backend URL
After deployment, you'll get a URL like:
`https://artistalley-backend.onrender.com`

Your API will be at: `https://artistalley-backend.onrender.com/api`

### Step 9: Update Frontend API URL
1. Go to: https://github.com/yuvraj20gole/ArtistAlley/settings/secrets/actions
2. Click "New repository secret"
3. Name: `VITE_API_BASE_URL`
4. Value: `https://artistalley-backend.onrender.com/api`
5. Save

Then rebuild and redeploy the frontend, or wait for GitHub Actions to automatically deploy.

## Alternative: Deploy to Railway.app

1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select `ArtistAlley` repository
5. Root Directory: `backend`
6. Railway will auto-detect Python and deploy
7. Add PostgreSQL database from Railway dashboard
8. Set environment variables (same as Render above)
9. Get your Railway URL (e.g., `artistalley-production.up.railway.app`)

## Alternative: Deploy to Heroku

1. Install Heroku CLI
2. `heroku login`
3. `cd backend`
4. `heroku create artistalley-backend`
5. `heroku addons:create heroku-postgresql:mini`
6. `heroku config:set SECRET_KEY=your-secret-key`
7. `git push heroku main`

---

## After Deployment

Once your backend is deployed:

1. **Get your backend URL** (e.g., `https://artistalley-backend.onrender.com`)
2. **Update GitHub Secrets**:
   - Go to: https://github.com/yuvraj20gole/ArtistAlley/settings/secrets/actions
   - Add/Update: `VITE_API_BASE_URL` = `https://your-backend-url.com/api`
3. **Rebuild Frontend**:
   - The GitHub Actions workflow will auto-deploy
   - Or manually run: `cd frontend && npm run build && npm run deploy`

Your full stack will be live! 🚀

