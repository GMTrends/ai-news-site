#!/bin/bash

# AI Buzz Media - Deployment Script
# This script prepares the site for production deployment

echo "🤖 AI Buzz Media - Deployment Script"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Starting deployment preparation..."

# Step 1: Check if all dependencies are installed
print_status "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_success "Dependencies already installed"
fi

# Step 2: Run linting and type checking
print_status "Running code quality checks..."
npm run lint 2>/dev/null || print_warning "Linting not configured or failed"

# Step 3: Build the project
print_status "Building the project..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi
print_success "Build completed successfully"

# Step 4: Check for critical files
print_status "Checking critical files..."
critical_files=(
    "dist/index.html"
    "dist/sitemap-index.xml"
    "dist/robots.txt"
    "public/admin/index.html"
    "public/admin/config.yml"
    "netlify.toml"
    "env.example"
)

for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ $file exists"
    else
        print_error "✗ $file missing"
        exit 1
    fi
done

# Step 5: Check environment variables
print_status "Checking environment configuration..."
if [ -f ".env" ]; then
    print_warning "Local .env file found. Make sure to set environment variables in Netlify."
else
    print_status "No local .env file found. Using env.example as template."
fi

# Step 6: Check Git status
print_status "Checking Git status..."
if command -v git &> /dev/null; then
    if git rev-parse --git-dir > /dev/null 2>&1; then
        git_status=$(git status --porcelain)
        if [ -z "$git_status" ]; then
            print_success "Working directory is clean"
        else
            print_warning "Uncommitted changes detected:"
            echo "$git_status"
            echo ""
            read -p "Do you want to commit these changes? (y/n): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                git add .
                git commit -m "Pre-deployment commit: $(date)"
                print_success "Changes committed"
            fi
        fi
    else
        print_warning "Not in a Git repository"
    fi
else
    print_warning "Git not found"
fi

# Step 7: Check for common issues
print_status "Running pre-deployment checks..."

# Check for placeholder content
placeholder_patterns=(
    "your-domain.com"
    "your-email@gmail.com"
    "your-app-password"
    "G-XXXXXXXXXX"
    "XXXXXXXXXX"
)

for pattern in "${placeholder_patterns[@]}"; do
    if grep -r "$pattern" src/ public/ netlify/ 2>/dev/null; then
        print_warning "Found placeholder content: $pattern"
    fi
done

# Check for broken links (basic check)
print_status "Checking for obvious broken links..."
if grep -r "localhost:4321" dist/ 2>/dev/null; then
    print_warning "Found localhost URLs in build output"
fi

# Step 8: Performance check
print_status "Checking build size..."
build_size=$(du -sh dist/ | cut -f1)
print_success "Build size: $build_size"

# Step 9: Security check
print_status "Checking security configuration..."
if [ -f "netlify.toml" ]; then
    if grep -q "Content-Security-Policy" netlify.toml; then
        print_success "✓ CSP headers configured"
    else
        print_warning "CSP headers not found in netlify.toml"
    fi
    
    if grep -q "X-Frame-Options" netlify.toml; then
        print_success "✓ Security headers configured"
    else
        print_warning "Security headers not found in netlify.toml"
    fi
fi

# Step 10: Final summary
echo ""
echo "🎉 Deployment Preparation Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Deploy to Netlify:"
echo "   - Connect your repository to Netlify"
echo "   - Set environment variables from env.example"
echo "   - Enable Git Gateway and Identity"
echo ""
echo "3. Configure your domain (optional):"
echo "   - Add custom domain in Netlify"
echo "   - Update DNS settings"
echo ""
echo "4. Test the live site:"
echo "   - Check all pages load correctly"
echo "   - Test forms and admin interface"
echo "   - Verify email functionality"
echo ""
echo "📚 Documentation:"
echo "- Deployment Guide: DEPLOYMENT_GUIDE.md"
echo "- Testing Checklist: TESTING_CHECKLIST.md"
echo "- Environment Variables: env.example"
echo ""

# Optional: Open deployment guide
read -p "Do you want to open the deployment guide? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v xdg-open &> /dev/null; then
        xdg-open DEPLOYMENT_GUIDE.md
    elif command -v open &> /dev/null; then
        open DEPLOYMENT_GUIDE.md
    else
        print_status "Please open DEPLOYMENT_GUIDE.md manually"
    fi
fi

print_success "Deployment preparation completed successfully! 🚀" 