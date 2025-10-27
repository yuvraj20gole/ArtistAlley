#!/bin/bash

# ArtistAlley - Complete Startup Script
# This script sets up and runs the entire project

echo "🎨 Starting ArtistAlley Project Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "${BLUE}Checking prerequisites...${NC}"

if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Prerequisites check passed!"
echo ""

# Setup Backend
echo "${BLUE}Setting up Backend...${NC}"
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Running database migrations..."
python manage.py migrate

echo "✅ Backend setup complete!"
echo ""
cd ..

# Setup Frontend
echo "${BLUE}Setting up Frontend...${NC}"
cd frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

echo "✅ Frontend setup complete!"
echo ""
cd ..

echo ""
echo "${GREEN}════════════════════════════════════════${NC}"
echo "${GREEN}✅ Setup Complete!${NC}"
echo "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "🚀 To run the project:"
echo ""
echo "  Terminal 1 - Backend:"
echo "    ${YELLOW}cd backend${NC}"
echo "    ${YELLOW}source venv/bin/activate${NC}"
echo "    ${YELLOW}python manage.py runserver${NC}"
echo ""
echo "  Terminal 2 - Frontend:"
echo "    ${YELLOW}cd frontend${NC}"
echo "    ${YELLOW}npm run dev${NC}"
echo ""
echo "📍 Backend will run at: http://localhost:8000"
echo "📍 Frontend will run at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop any running server"
echo "${GREEN}════════════════════════════════════════${NC}"
