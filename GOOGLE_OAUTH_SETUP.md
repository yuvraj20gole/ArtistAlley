# Google OAuth Setup Guide for ArtistAlley

## 🚀 Overview

This guide will help you set up Google OAuth authentication for your ArtistAlley application, allowing users to sign in and register using their Google accounts.

## 📋 Prerequisites

- Google account
- Access to Google Cloud Console
- Django backend running on `http://localhost:8000`
- React frontend running on `http://localhost:3028`

## 🔧 Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new project or select an existing one

### 1.2 Enable Google+ API
1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google+ API" and enable it

### 1.3 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Give it a name (e.g., "ArtistAlley OAuth")

### 1.4 Configure Authorized URIs
Add these URIs to your OAuth client:

**Authorized JavaScript origins:**
```
http://localhost:3028
http://localhost:3000
```

**Authorized redirect URIs:**
```
http://localhost:8000/api/auth/google/callback/
```

## 🔑 Step 2: Configure Environment Variables

### 2.1 Update your .env file
Add these variables to your `backend/.env` file:

```env
# Google OAuth Configuration
GOOGLE_OAUTH2_CLIENT_ID=your-actual-client-id-here
GOOGLE_OAUTH2_CLIENT_SECRET=your-actual-client-secret-here
GOOGLE_OAUTH2_REDIRECT_URI=http://localhost:8000/api/auth/google/callback/
```

### 2.2 Get Your Credentials
1. Copy the **Client ID** from Google Cloud Console
2. Copy the **Client Secret** from Google Cloud Console
3. Replace the placeholder values in your .env file

## 🚀 Step 3: Test the Integration

### 3.1 Start the Backend Server
```bash
cd backend
python manage.py runserver
```

### 3.2 Start the Frontend Server
```bash
cd frontend
npm run dev -- --port 3028
```

### 3.3 Test Google OAuth
1. Go to `http://localhost:3028`
2. Click "Login" or "Register"
3. Click "Continue with Google" or "Sign up with Google"
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you'll be redirected back to your app

## 🔍 Step 4: Verify Everything Works

### 4.1 Check Database
After successful Google authentication, check your database:

```bash
cd backend
python manage.py shell -c "
from users.models import CustomUser
users = CustomUser.objects.all()
for user in users:
    print(f'ID: {user.id}, Email: {user.email}, Username: {user.username}, Is Artist: {user.is_artist}')
"
```

### 4.2 Check API Endpoints
Test the Google OAuth endpoints:

```bash
# Test Google OAuth initiation
curl -X GET http://localhost:8000/api/auth/google/login/

# The response should contain an authorization_url
```

## 🛠️ Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**
   - Make sure the redirect URI in Google Console exactly matches: `http://localhost:8000/api/auth/google/callback/`

2. **"invalid_client" error**
   - Verify your Client ID and Client Secret are correct in the .env file
   - Make sure there are no extra spaces or quotes

3. **CORS errors**
   - Ensure your frontend URL is in the authorized origins: `http://localhost:3028`

4. **"access_denied" error**
   - User cancelled the OAuth flow - this is normal behavior

### Debug Steps:

1. Check Django logs for detailed error messages
2. Verify environment variables are loaded correctly
3. Test the OAuth flow step by step
4. Check browser console for JavaScript errors

## 📚 API Endpoints

Your Google OAuth integration provides these endpoints:

- `GET /api/auth/google/login/` - Initiate Google OAuth flow
- `POST /api/auth/google/callback/` - Handle OAuth callback

## 🔐 Security Notes

1. **Never commit your .env file** with real credentials
2. **Use environment variables** in production
3. **Enable HTTPS** for production deployment
4. **Regularly rotate** your OAuth credentials

## 🎉 Success!

Once configured, users can:
- ✅ Sign in with Google (if they already have an account)
- ✅ Register with Google (creates new account automatically)
- ✅ Access all features with their Google-authenticated account
- ✅ Have their data saved to your Django database

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Django logs for error messages
3. Verify all environment variables are set correctly
4. Test with a fresh browser session (clear cookies/cache)

---

**Happy coding! 🚀**
