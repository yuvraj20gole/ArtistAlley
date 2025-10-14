#!/usr/bin/env python3
"""
Setup script for Google OAuth configuration.
This script helps you configure Google OAuth credentials for the ArtistAlley backend.
"""

import os
from pathlib import Path

def create_env_file():
    """Create a .env file with Google OAuth configuration."""
    env_content = """# Django Configuration
SECRET_KEY=django-insecure-your-secret-key-here-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Google OAuth Configuration
# Replace these with your actual Google OAuth credentials from Google Cloud Console
GOOGLE_OAUTH2_CLIENT_ID=your-google-client-id
GOOGLE_OAUTH2_CLIENT_SECRET=your-google-client-secret
GOOGLE_OAUTH2_REDIRECT_URI=http://localhost:8000/api/auth/google/callback/

# Frontend Configuration
FRONTEND_URL=http://localhost:3000
"""
    
    env_file = Path('.env')
    if env_file.exists():
        print("⚠️  .env file already exists. Please edit it manually with your Google OAuth credentials.")
        return False
    
    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("✅ Created .env file with Google OAuth configuration template.")
    print("\n📝 Next steps:")
    print("1. Go to Google Cloud Console (https://console.cloud.google.com/)")
    print("2. Create a new project or select an existing one")
    print("3. Enable the Google+ API")
    print("4. Create OAuth 2.0 credentials")
    print("5. Set authorized redirect URIs to: http://localhost:8000/api/auth/google/callback/")
    print("6. Copy your Client ID and Client Secret to the .env file")
    print("\n🔧 Edit the .env file and replace:")
    print("   - your-google-client-id with your actual Client ID")
    print("   - your-google-client-secret with your actual Client Secret")
    
    return True

def check_dependencies():
    """Check if required dependencies are installed."""
    try:
        import google_auth_oauthlib
        import google.oauth2
        import google.auth.transport
        print("✅ Google OAuth dependencies are installed.")
        return True
    except ImportError as e:
        print(f"❌ Missing Google OAuth dependencies: {e}")
        print("📦 Install them with: pip install google-auth google-auth-oauthlib google-auth-httplib2")
        return False

def main():
    """Main setup function."""
    print("🚀 ArtistAlley Google OAuth Setup")
    print("=" * 40)
    
    # Check dependencies
    deps_ok = check_dependencies()
    
    # Create .env file
    env_ok = create_env_file()
    
    if deps_ok and env_ok:
        print("\n🎉 Setup complete! You can now configure your Google OAuth credentials.")
    else:
        print("\n⚠️  Setup incomplete. Please resolve the issues above.")

if __name__ == "__main__":
    main()
