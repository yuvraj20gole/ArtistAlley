from django.utils.deprecation import MiddlewareMixin
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


class CSRFExemptAPIEndpointsMiddleware(MiddlewareMixin):
    """
    Middleware to exempt API endpoints from CSRF protection.
    This allows JWT-based API calls without requiring CSRF tokens.
    """
    
    def process_view(self, request, view_func, view_args, view_kwargs):
        # Exempt all API endpoints from CSRF protection since we use JWT authentication
        if request.path.startswith('/api/'):
            return csrf_exempt(view_func)(request, *view_args, **view_kwargs)
        return None
