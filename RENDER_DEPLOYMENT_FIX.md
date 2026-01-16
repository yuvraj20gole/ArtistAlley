# Render.com Deployment Fix

## The Issue
Render is looking for the directory "Backend" (capital B) but the actual directory is "backend" (lowercase).

## Solution

### Option 1: Fix in Render Dashboard (Recommended)

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your web service: `artistalley-backend`
3. Go to **Settings** tab
4. Find **Root Directory** field
5. Change it from `Backend` to `backend` (lowercase)
6. Click **Save Changes**
7. Go to **Manual Deploy** → **Deploy latest commit**

### Option 2: Delete and Recreate (If Option 1 doesn't work)

1. Delete the current web service
2. Create a new one:
   - **Root Directory**: `backend` (lowercase, not Backend)
   - All other settings remain the same

## Correct Settings for Render.com

When creating/editing your web service, use these exact settings:

- **Name**: `artistalley-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend` (lowercase!)
- **Environment**: `Python 3`
- **Build Command**: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
- **Start Command**: `gunicorn artistalley.wsgi:application --bind 0.0.0.0:$PORT`

## After Fixing

Once you update the Root Directory to `backend`, Render will:
1. Clone your repository
2. Navigate to the `backend` folder
3. Install dependencies
4. Run migrations
5. Collect static files
6. Start the server

The deployment should succeed! 🚀

