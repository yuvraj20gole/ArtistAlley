from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.conf import settings
from django.db import models
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from google.auth.transport import requests
from google.oauth2 import id_token
import json
import urllib.parse
import logging
from .models import CustomUser
from .serializers import UserRegistrationSerializer, UserLoginSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register_user(request):
    """
    Register a new user account.
    """
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        # Create the user
        user_data = serializer.validated_data
        
        # Check if user already exists
        if CustomUser.objects.filter(email=user_data['email']).exists():
            return Response(
                {'error': 'A user with this email already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if CustomUser.objects.filter(username=user_data['username']).exists():
            return Response(
                {'error': 'A user with this username already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create user
        user = CustomUser.objects.create(
            username=user_data['username'],
            email=user_data['email'],
            first_name=user_data.get('first_name', ''),
            last_name=user_data.get('last_name', ''),
            password=make_password(user_data['password']),
            is_artist=user_data.get('is_artist', False),
            bio=user_data.get('bio', ''),
            artist_name=user_data.get('artist_name', ''),
            website=user_data.get('website', ''),
            instagram_handle=user_data.get('instagram_handle', ''),
        )
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        return Response({
            'message': 'User registered successfully!',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'full_name': user.full_name,
                'is_artist': user.is_artist,
            },
            'tokens': {
                'access': str(access_token),
                'refresh': str(refresh),
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def login_user(request):
    """
    Login an existing user.
    """
    serializer = UserLoginSerializer(data=request.data)
    
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        # Authenticate user
        user = authenticate(username=email, password=password)
        
        if user:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            
            return Response({
                'message': 'Login successful!',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'full_name': user.full_name,
                    'is_artist': user.is_artist,
                    'is_staff': user.is_staff,
                    'is_superuser': user.is_superuser,
                },
                'tokens': {
                    'access': str(access_token),
                    'refresh': str(refresh),
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH'])
def get_user_profile(request):
    """
    Get or update current user's profile.
    """
    user = request.user
    
    if request.method in ['PUT', 'PATCH']:
        # Update user profile
        data = request.data
        
        # Update basic fields
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'bio' in data:
            user.bio = data['bio']
        if 'artist_name' in data:
            user.artist_name = data['artist_name']
        if 'website' in data:
            user.website = data['website']
        if 'instagram_handle' in data:
            user.instagram_handle = data['instagram_handle']
        if 'is_artist' in data:
            user.is_artist = data['is_artist']
        
        user.save()
        
        return Response({
            'message': 'Profile updated successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'full_name': user.full_name,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'bio': user.bio,
                'is_artist': user.is_artist,
                'artist_name': user.artist_name,
                'website': user.website,
                'instagram_handle': user.instagram_handle,
                'profile_picture': user.profile_picture.url if user.profile_picture else None,
                'date_joined': user.date_joined,
            }
        }, status=status.HTTP_200_OK)
    
    # GET request
    return Response({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'full_name': user.full_name,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'bio': user.bio,
            'is_artist': user.is_artist,
            'artist_name': user.artist_name,
            'website': user.website,
            'instagram_handle': user.instagram_handle,
            'profile_picture': user.profile_picture.url if user.profile_picture else None,
            'date_joined': user.date_joined,
        }
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def check_user_exists(request):
    """
    Check if a user with the given email already exists.
    Used to prevent duplicate registrations.
    """
    try:
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_exists = CustomUser.objects.filter(email=email).exists()
        
        return Response({
            'exists': user_exists,
            'email': email
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
def google_oauth_login(request):
    """
    Initiate Google OAuth login flow.
    """
    import logging
    logger = logging.getLogger(__name__)
    
    try:
        # Check if Google OAuth credentials are configured
        if not settings.GOOGLE_OAUTH2_CLIENT_ID or settings.GOOGLE_OAUTH2_CLIENT_ID == 'your-google-client-id':
            logger.error("Google OAuth credentials not configured")
            return Response({
                'success': False,
                'message': 'Google OAuth is not configured. Please set GOOGLE_OAUTH2_CLIENT_ID in environment variables.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        if not settings.GOOGLE_OAUTH2_CLIENT_SECRET or settings.GOOGLE_OAUTH2_CLIENT_SECRET == 'your-google-client-secret':
            logger.error("Google OAuth client secret not configured")
            return Response({
                'success': False,
                'message': 'Google OAuth is not configured. Please set GOOGLE_OAUTH2_CLIENT_SECRET in environment variables.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        from google_auth_oauthlib.flow import Flow
        
        # Create flow instance
        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": settings.GOOGLE_OAUTH2_CLIENT_ID,
                    "client_secret": settings.GOOGLE_OAUTH2_CLIENT_SECRET,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "redirect_uris": [settings.GOOGLE_OAUTH2_REDIRECT_URI]
                }
            },
            scopes=settings.GOOGLE_OAUTH_SCOPES
        )
    
        # Configure OAuth2Session to ignore scope validation
        flow.oauth2session.auto_refresh_kwargs = {
            'client_id': settings.GOOGLE_OAUTH2_CLIENT_ID,
            'client_secret': settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        }
        
        # Set redirect URI to frontend callback
        flow.redirect_uri = settings.GOOGLE_OAUTH2_REDIRECT_URI
        
        # Generate authorization URL
        authorization_url, state = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true',
            prompt='select_account'  # Force account selection popup
        )
        
        # Store state in session for security
        request.session['oauth_state'] = state
        logger.info(f"Generated Google OAuth authorization URL for state: {state}")
        
        return Response({
            'success': True,
            'authorization_url': authorization_url,
            'state': state
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Google OAuth login initiation failed: {str(e)}", exc_info=True)
        return Response({
            'success': False,
            'message': 'Failed to initiate Google OAuth. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
def google_oauth_callback(request):
    """
    Handle Google OAuth callback and redirect to frontend with tokens.
    """
    import logging
    logger = logging.getLogger(__name__)

    try:
        # Check if Google OAuth credentials are configured
        if not settings.GOOGLE_OAUTH2_CLIENT_ID or settings.GOOGLE_OAUTH2_CLIENT_ID == 'your-google-client-id':
            logger.error("Google OAuth credentials not configured")
            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            redirect_url = (
                f"{frontend_url}/google-callback?"
                f"success=false&"
                f"message={urllib.parse.quote('Google OAuth is not configured. Please set GOOGLE_OAUTH2_CLIENT_ID in environment variables.')}"
            )
            return redirect(redirect_url)
        
        if not settings.GOOGLE_OAUTH2_CLIENT_SECRET or settings.GOOGLE_OAUTH2_CLIENT_SECRET == 'your-google-client-secret':
            logger.error("Google OAuth client secret not configured")
            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            redirect_url = (
                f"{frontend_url}/google-callback?"
                f"success=false&"
                f"message={urllib.parse.quote('Google OAuth is not configured. Please set GOOGLE_OAUTH2_CLIENT_SECRET in environment variables.')}"
            )
            return redirect(redirect_url)
        
        from google_auth_oauthlib.flow import Flow
        
        # Get authorization code and state from URL parameters
        auth_code = request.GET.get('code')
        state = request.GET.get('state')
        error = request.GET.get('error')
        
        logger.info(f"Google OAuth callback received - Code: {auth_code[:10] if auth_code else 'None'}..., State: {state}, Error: {error}")
        
        if error:
            logger.error(f"Google OAuth error: {error}")
            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            redirect_url = (
                f"{frontend_url}/google-callback?"
                f"success=false&"
                f"message={urllib.parse.quote(f'Google OAuth error: {error}')}"
            )
            return redirect(redirect_url)
        
        if not auth_code:
            logger.error("No authorization code received")
            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            redirect_url = (
                f"{frontend_url}/google-callback?"
                f"success=false&"
                f"message={urllib.parse.quote('No authorization code received from Google')}"
            )
            return redirect(redirect_url)
        
        # Verify state parameter
        session_state = request.session.get('oauth_state')
        logger.info(f"State verification - Received: {state}, Session: {session_state}")
        
        if state != session_state:
            logger.error(f"State mismatch - Received: {state}, Expected: {session_state}")
            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            redirect_url = (
                f"{frontend_url}/google-callback?"
                f"success=false&"
                f"message={urllib.parse.quote('Invalid state parameter - possible CSRF attack')}"
            )
            return redirect(redirect_url)
        
        # Create flow instance
        logger.info("Creating Google OAuth flow...")
        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": settings.GOOGLE_OAUTH2_CLIENT_ID,
                    "client_secret": settings.GOOGLE_OAUTH2_CLIENT_SECRET,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "redirect_uris": [settings.GOOGLE_OAUTH2_REDIRECT_URI]
                }
            },
            scopes=settings.GOOGLE_OAUTH_SCOPES
        )
        
        # Configure OAuth2Session to ignore scope validation
        flow.oauth2session.auto_refresh_kwargs = {
            'client_id': settings.GOOGLE_OAUTH2_CLIENT_ID,
            'client_secret': settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        }
        
        flow.redirect_uri = settings.GOOGLE_OAUTH2_REDIRECT_URI
        logger.info(f"Flow redirect URI set to: {flow.redirect_uri}")
        
        # Exchange authorization code for tokens
        logger.info("Exchanging authorization code for tokens...")
        try:
            flow.fetch_token(code=auth_code)
            logger.info("Successfully exchanged code for tokens")
        except Warning as w:
            # Handle scope mismatch warning - Google returns both old and new formats
            if "Scope has changed" in str(w):
                logger.warning(f"Scope mismatch warning (this is expected): {w}")
                # Continue with the flow despite the warning
                pass
            else:
                raise w
        except Exception as token_error:
            logger.error(f"Token exchange failed: {str(token_error)}", exc_info=True)
            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            redirect_url = (
                f"{frontend_url}/google-callback?"
                f"success=false&"
                f"message={urllib.parse.quote('Failed to exchange authorization code for tokens. Please try again.')}"
            )
            return redirect(redirect_url)
        
        # Get user info from Google
        logger.info("Verifying ID token and getting user info...")
        try:
            credentials = flow.credentials
            user_info = id_token.verify_oauth2_token(
                credentials.id_token,
                requests.Request(),
                settings.GOOGLE_OAUTH2_CLIENT_ID
            )
        except Exception as token_verify_error:
            logger.error(f"Token verification failed: {str(token_verify_error)}", exc_info=True)
            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            redirect_url = (
                f"{frontend_url}/google-callback?"
                f"success=false&"
                f"message={urllib.parse.quote('Failed to verify Google token. Please try again.')}"
            )
            return redirect(redirect_url)
        
        email = user_info.get('email')
        first_name = user_info.get('given_name', '')
        last_name = user_info.get('family_name', '')
        
        logger.info(f"User info received - Email: {email}, Name: {first_name} {last_name}")
        
        if not email:
            logger.error("No email received from Google")
            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            redirect_url = (
                f"{frontend_url}/google-callback?"
                f"success=false&"
                f"message={urllib.parse.quote('No email received from Google')}"
            )
            return redirect(redirect_url)
        
        try:
            # Try to find existing user
            logger.info(f"Looking for existing user with email: {email}")
            user = CustomUser.objects.get(email=email)
            logger.info(f"Found existing user: {user.username} (is_artist: {user.is_artist})")
            
            # Generate JWT tokens for existing user
            try:
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token
                logger.info(f"Generated tokens for existing user - User ID: {user.id}")
            except Exception as jwt_error:
                logger.error(f"JWT token generation failed: {str(jwt_error)}", exc_info=True)
                frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
                redirect_url = (
                    f"{frontend_url}/google-callback?"
                    f"success=false&"
                    f"message={urllib.parse.quote('Failed to generate authentication tokens. Please try again.')}"
                )
                return redirect(redirect_url)
            
            # Determine role from is_artist field
            role = 'artist' if user.is_artist else 'buyer'
            
            # Redirect to frontend with success data
            logger.info(f"Redirecting to frontend for existing user: {user.username}")
            data = {
                "success": True,
                "access": str(access_token),
                "refresh": str(refresh),
                "role": role,
                "isNewUser": False,
                "userId": user.id,
                "username": user.username,
                "email": user.email,
                "fullName": user.full_name,
            }
            
            frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
            redirect_url = (
                f"{frontend_url}/google-callback?"
                f"success={data['success']}&"
                f"access={urllib.parse.quote(data['access'])}&"
                f"refresh={urllib.parse.quote(data['refresh'])}&"
                f"role={data['role']}&"
                f"isNewUser={str(data['isNewUser']).lower()}&"
                f"userId={data['userId']}&"
                f"username={urllib.parse.quote(data['username'])}&"
                f"email={urllib.parse.quote(data['email'])}&"
                f"fullName={urllib.parse.quote(data['fullName'])}"
            )
            return redirect(redirect_url)
            
        except CustomUser.DoesNotExist:
            # User doesn't exist, create new account
            logger.info(f"User not found, creating new account for: {email}")
            try:
                username = email.split('@')[0]
                
                # Ensure username is unique
                base_username = username
                counter = 1
                while CustomUser.objects.filter(username=username).exists():
                    username = f"{base_username}_{counter}"
                    counter += 1
                
                logger.info(f"Creating user with username: {username}")
                
                # Create new user (role will be set later via RoleSelection)
                user = CustomUser.objects.create(
                    username=username,
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    is_active=True,
                    is_artist=False,  # Default to buyer, will be updated by role selection
                )
                
                logger.info(f"Successfully created new user: {user.username} (ID: {user.id})")
                
                # Generate JWT tokens
                try:
                    refresh = RefreshToken.for_user(user)
                    access_token = refresh.access_token
                    logger.info(f"Generated tokens for new user - User ID: {user.id}")
                except Exception as jwt_error:
                    logger.error(f"JWT token generation failed for new user: {str(jwt_error)}", exc_info=True)
                    frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
                    redirect_url = (
                        f"{frontend_url}/google-callback?"
                        f"success=false&"
                        f"message={urllib.parse.quote('User created but failed to generate authentication tokens. Please try logging in again.')}"
                    )
                    return redirect(redirect_url)
                
                # Redirect to frontend with success data
                logger.info(f"Redirecting to frontend for new user: {user.username}")
                data = {
                    "success": True,
                    "access": str(access_token),
                    "refresh": str(refresh),
                    "role": "buyer",  # Default role for new users
                    "isNewUser": True,
                    "userId": user.id,
                    "username": user.username,
                    "email": user.email,
                    "fullName": user.full_name,
                }
                
                frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
                redirect_url = (
                    f"{frontend_url}/google-callback?"
                    f"success={data['success']}&"
                    f"access={urllib.parse.quote(data['access'])}&"
                    f"refresh={urllib.parse.quote(data['refresh'])}&"
                    f"role={data['role']}&"
                    f"isNewUser={str(data['isNewUser']).lower()}&"
                    f"userId={data['userId']}&"
                    f"username={urllib.parse.quote(data['username'])}&"
                    f"email={urllib.parse.quote(data['email'])}&"
                    f"fullName={urllib.parse.quote(data['fullName'])}"
                )
                return redirect(redirect_url)
                
            except Exception as user_creation_error:
                logger.error(f"User creation failed: {str(user_creation_error)}", exc_info=True)
                frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
                redirect_url = (
                    f"{frontend_url}/google-callback?"
                    f"success=false&"
                    f"message={urllib.parse.quote('Failed to create user account. Please try again.')}"
                )
                return redirect(redirect_url)
            
    except Exception as e:
        logger.error(f"Google OAuth callback error: {str(e)}", exc_info=True)
        
        frontend_url = getattr(settings, "FRONTEND_URL", "http://localhost:3000")
        redirect_url = (
            f"{frontend_url}/google-callback?"
            f"success=false&"
            f"message={urllib.parse.quote('OAuth authentication failed. Please try again.')}"
        )
        return redirect(redirect_url)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def get_all_users(request):
    """
    Get all users for admin dashboard.
    Only accessible by authenticated users (admin check will be done in frontend).
    """
    try:
        # Get query parameters for filtering
        search = request.GET.get('search', '')
        role = request.GET.get('role', '')
        status_filter = request.GET.get('status', '')
        
        # Start with all users
        users = CustomUser.objects.all()
        
        # Apply filters
        if search:
            users = users.filter(
                models.Q(username__icontains=search) |
                models.Q(email__icontains=search) |
                models.Q(first_name__icontains=search) |
                models.Q(last_name__icontains=search)
            )
        
        if role == 'artist':
            users = users.filter(is_artist=True)
        elif role == 'buyer':
            users = users.filter(is_artist=False)
        
        if status_filter == 'active':
            users = users.filter(is_active=True)
        elif status_filter == 'inactive':
            users = users.filter(is_active=False)
        elif status_filter == 'staff':
            users = users.filter(is_staff=True)
        
        # Order by date joined (newest first)
        users = users.order_by('-date_joined')
        
        # Serialize users
        user_data = []
        for user in users:
            # Calculate additional stats
            artwork_count = 0
            total_earned = 0
            total_spent = 0
            
            # Get artwork count and earnings for artists
            if user.is_artist:
                from artworks.models import Artwork
                artworks = Artwork.objects.filter(artist=user)
                artwork_count = artworks.count()
                # Calculate total earnings (simplified - you might want to add actual order tracking)
                total_earned = artworks.aggregate(total=models.Sum('price'))['total'] or 0
            
            # For buyers, you might want to calculate total spent from orders
            # This would require an Order model - for now we'll use 0
            
            # Determine role: admin takes priority over artist/buyer
            if user.is_superuser:
                role = 'admin'
            elif user.is_artist:
                role = 'artist'
            else:
                role = 'buyer'
            
            user_data.append({
                'id': user.id,
                'name': user.full_name or user.username,
                'email': user.email,
                'username': user.username,
                'role': role,
                'status': 'active' if user.is_active else 'inactive',
                'joinedDate': user.date_joined.strftime('%Y-%m-%d'),
                'artworkCount': artwork_count,
                'totalEarned': total_earned,
                'totalSpent': total_spent,
                'isStaff': user.is_staff,
                'isSuperuser': user.is_superuser,
                'lastLogin': user.last_login.strftime('%Y-%m-%d') if user.last_login else None,
            })
        
        return Response({
            'success': True,
            'users': user_data,
            'total': len(user_data)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
