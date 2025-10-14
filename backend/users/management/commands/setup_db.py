from django.core.management.base import BaseCommand
from django.db import connection
from django.contrib.auth.hashers import make_password
from users.models import CustomUser
from artists.models import ArtMedium, ArtistProfile
from artworks.models import Category, Artwork


class Command(BaseCommand):
    help = 'Set up the database with initial data'

    def handle(self, *args, **options):
        self.stdout.write('Setting up database...')
        
        # Create superuser
        if not CustomUser.objects.filter(username='admin').exists():
            admin_user = CustomUser.objects.create(
                username='admin',
                email='admin@artistalley.com',
                password=make_password('admin123'),
                is_staff=True,
                is_superuser=True,
                is_active=True,
                first_name='Admin',
                last_name='User'
            )
            self.stdout.write(
                self.style.SUCCESS('Superuser created: admin / admin123')
            )
        else:
            self.stdout.write('Superuser already exists')

        # Create sample art mediums
        mediums = ['Oil Painting', 'Watercolor', 'Digital Art', 'Sculpture', 'Photography']
        for medium_name in mediums:
            medium, created = ArtMedium.objects.get_or_create(
                name=medium_name,
                defaults={'slug': medium_name.lower().replace(' ', '-')}
            )
            if created:
                self.stdout.write(f'Created art medium: {medium_name}')

        # Create sample categories
        categories = ['Portrait', 'Landscape', 'Abstract', 'Still Life', 'Fantasy']
        for category_name in categories:
            category, created = Category.objects.get_or_create(
                name=category_name,
                defaults={'slug': category_name.lower().replace(' ', '-')}
            )
            if created:
                self.stdout.write(f'Created category: {category_name}')

        # Create sample artist
        if not CustomUser.objects.filter(username='demo_artist').exists():
            artist_user = CustomUser.objects.create(
                username='demo_artist',
                email='artist@example.com',
                password=make_password('artist123'),
                is_active=True,
                is_artist=True,
                first_name='Demo',
                last_name='Artist',
                artist_name='Demo Artist'
            )
            
            # Create artist profile
            artist_profile = ArtistProfile.objects.create(
                user=artist_user,
                bio='A passionate artist who loves to create beautiful artworks.',
                location='New York, NY',
                art_style='Contemporary',
                years_of_experience=5
            )
            
            # Add art mediums
            oil_medium = ArtMedium.objects.get(name='Oil Painting')
            digital_medium = ArtMedium.objects.get(name='Digital Art')
            artist_profile.art_mediums.add(oil_medium, digital_medium)
            
            self.stdout.write(
                self.style.SUCCESS('Demo artist created: demo_artist / artist123')
            )

        self.stdout.write(
            self.style.SUCCESS('Database setup completed successfully!')
        )
