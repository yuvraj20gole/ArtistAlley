#!/usr/bin/env python3
"""
Test script for Google OAuth endpoints.
This script tests the Google OAuth login and callback endpoints.
"""

import os
import sys
import django
from django.test import RequestFactory, Client
from django.contrib.sessions.middleware import SessionMiddleware

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artistalley.settings')
django.setup()

from users.views import google_oauth_login, google_oauth_callback

def test_google_oauth_login():
    """Test the Google OAuth login endpoint."""
    print("🧪 Testing Google OAuth Login Endpoint...")
    
    factory = RequestFactory()
    request = factory.get('/api/auth/google/login/')
    
    # Add session middleware
    middleware = SessionMiddleware(lambda req: None)
    middleware.process_request(request)
    request.session.save()
    
    try:
        response = google_oauth_login(request)
        print(f"✅ Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.data
            if data.get('success'):
                print("✅ Login endpoint working correctly")
                print(f"   - Authorization URL generated: {data.get('authorization_url', 'N/A')[:50]}...")
                print(f"   - State parameter: {data.get('state', 'N/A')}")
            else:
                print(f"❌ Login endpoint returned error: {data.get('message', 'Unknown error')}")
        else:
            print(f"❌ Login endpoint returned status {response.status_code}")
            print(f"   Response: {response.data}")
            
    except Exception as e:
        print(f"❌ Login endpoint failed with exception: {e}")

def test_google_oauth_callback():
    """Test the Google OAuth callback endpoint."""
    print("\n🧪 Testing Google OAuth Callback Endpoint...")
    
    factory = RequestFactory()
    request = factory.get('/api/auth/google/callback/?code=test_code&state=test_state')
    
    # Add session middleware
    middleware = SessionMiddleware(lambda req: None)
    middleware.process_request(request)
    request.session['oauth_state'] = 'test_state'  # Set matching state
    request.session.save()
    
    try:
        response = google_oauth_callback(request)
        print(f"✅ Status Code: {response.status_code}")
        
        data = response.data
        if data.get('success'):
            print("✅ Callback endpoint working correctly")
        else:
            print(f"❌ Callback endpoint returned error: {data.get('message', 'Unknown error')}")
            print("   (This is expected if Google OAuth credentials are not configured)")
            
    except Exception as e:
        print(f"❌ Callback endpoint failed with exception: {e}")

def check_environment():
    """Check if environment variables are set."""
    print("🔍 Checking Environment Configuration...")
    
    from django.conf import settings
    
    client_id = getattr(settings, 'GOOGLE_OAUTH2_CLIENT_ID', None)
    client_secret = getattr(settings, 'GOOGLE_OAUTH2_CLIENT_SECRET', None)
    redirect_uri = getattr(settings, 'GOOGLE_OAUTH2_REDIRECT_URI', None)
    
    print(f"   - Client ID: {'✅ Set' if client_id and client_id != 'your-google-client-id' else '❌ Not configured'}")
    print(f"   - Client Secret: {'✅ Set' if client_secret and client_secret != 'your-google-client-secret' else '❌ Not configured'}")
    print(f"   - Redirect URI: {'✅ Set' if redirect_uri else '❌ Not configured'}")
    
    if redirect_uri:
        print(f"     Redirect URI: {redirect_uri}")

def main():
    """Main test function."""
    print("🚀 ArtistAlley Google OAuth Endpoint Test")
    print("=" * 50)
    
    check_environment()
    test_google_oauth_login()
    test_google_oauth_callback()
    
    print("\n📝 Notes:")
    print("- If you see 'Not configured' errors, run: python setup_google_oauth.py")
    print("- Then edit the .env file with your actual Google OAuth credentials")
    print("- The callback test will fail with invalid credentials (this is expected)")

if __name__ == "__main__":
    main()
