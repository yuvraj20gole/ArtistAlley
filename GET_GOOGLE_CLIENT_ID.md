# How to Get Your Google Client ID & Secret

## Step-by-Step Guide

### 1. Go to Google Cloud Console
👉 https://console.cloud.google.com/

### 2. Create or Select Project
- Click project dropdown (top bar)
- Click "New Project"
- Name: `ArtistAlley`
- Click "Create"

### 3. Enable APIs
- Go to **APIs & Services** → **Library**
- Search for "Google+ API" or "Google Identity"
- Click **Enable**

### 4. Create OAuth Credentials
- Go to **APIs & Services** → **Credentials**
- Click **+ CREATE CREDENTIALS** → **OAuth client ID**
- If prompted, configure OAuth consent screen first (choose "External" for testing)
- Application type: **Web application**
- Name: `ArtistAlley OAuth`

### 5. Add Authorized URIs
**Authorized JavaScript origins:**
```
http://localhost:3000
http://localhost:3028
https://yuvraj20gole.github.io
```

**Authorized redirect URIs:**
```
http://localhost:8000/api/auth/google/callback/
https://artistalley-backend.onrender.com/api/auth/google/callback/
```

### 6. Click "Create"
- You'll see a popup with:
  - **Your Client ID** (copy this!)
  - **Your Client Secret** (copy this!)

### 7. Save Your Credentials
Your Client ID will look like:
```
123456789-abc123xyz.apps.googleusercontent.com
```

Your Client Secret will look like:
```
GOCSPX-abc123xyz456def789
```

### 8. Add to Render.com
Go to Render.com → Your Web Service → Environment:
- `GOOGLE_OAUTH2_CLIENT_ID` = [paste Client ID]
- `GOOGLE_OAUTH2_CLIENT_SECRET` = [paste Client Secret]

---

**Once you have these, update your Render.com environment variables!**

