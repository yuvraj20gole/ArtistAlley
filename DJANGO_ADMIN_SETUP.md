# Django Admin Setup Instructions

## 🔐 Admin Credentials

- **Username**: `admin`
- **Email**: `admin@artistalley.com`
- **Password**: `admin123`
- **Admin URL**: `http://localhost:8000/admin/`

## 🚀 How to Create Admin User

### Method 1: Django Shell (Recommended)

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Open Django shell**:
   ```bash
   python manage.py shell
   ```

3. **Run this code in the shell** (copy and paste):
   ```python
   from django.contrib.auth import get_user_model
   User = get_user_model()

   # Create superuser with your specifications
   admin_user = User.objects.create_user(
       username='admin',
       email='admin@artistalley.com',
       password='admin123',
       is_staff=True,
       is_superuser=True,
       is_active=True,
       first_name='Admin',
       last_name='User'
   )

   print("Superuser created successfully!")
   print("Username: admin")
   print("Email: admin@artistalley.com")
   print("Password: admin123")
   ```

4. **Exit the shell**:
   ```python
   exit()
   ```

### Method 2: Django Command

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create superuser**:
   ```bash
   python manage.py createsuperuser
   ```

3. **Enter details when prompted**:
   - Username: `admin`
   - Email address: `admin@artistalley.com`
   - Password: `admin123`
   - Password (again): `admin123`

## 🔑 Login to Admin Panel

1. **Start Django server**:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Open browser** and go to: `http://localhost:8000/admin/`

3. **Login with**:
   - Username: `admin`
   - Password: `admin123`

## 📋 What You Can Do in Admin Panel

- ✅ Manage users and their roles
- ✅ View and manage artworks
- ✅ Monitor Google OAuth registrations
- ✅ Access all database records
- ✅ Configure application settings
- ✅ View user profiles and permissions

## 🔧 Additional Demo Account

The setup also creates a demo artist account:
- **Username**: `demo_artist`
- **Password**: `artist123`
- **Email**: `artist@example.com`

## 🆘 Troubleshooting

### If Admin User Already Exists
```python
# In Django shell
from django.contrib.auth import get_user_model
User = get_user_model()
admin_user = User.objects.get(username='admin')
admin_user.set_password('admin123')
admin_user.save()
print("Password updated successfully!")
```

### If You Forget Password
```python
# In Django shell
from django.contrib.auth import get_user_model
User = get_user_model()
admin_user = User.objects.get(username='admin')
admin_user.set_password('your_new_password')
admin_user.save()
print("Password reset successfully!")
```

## 📝 Notes

- The admin panel is only accessible when the Django server is running
- Make sure to use the correct port (8000) for the backend
- Keep these credentials secure and don't share them publicly
- You can change the password anytime through the admin panel or Django shell
