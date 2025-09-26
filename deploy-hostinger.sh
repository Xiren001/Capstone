#!/bin/bash

# Hostinger Deployment Script for Comrade Project
# Run this script on your VPS after uploading files

echo "🚀 Starting Comrade deployment on Hostinger..."

# 1. Install dependencies
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Install Nginx
echo "🌐 Installing Nginx..."
sudo apt update
sudo apt install nginx -y

# 3. Install PM2
echo "⚡ Installing PM2..."
sudo npm install -g pm2

# 4. Setup backend
echo "🔧 Setting up backend..."
cd com-rade-backend
npm install --production

# 5. Create environment file
echo "📝 Creating environment file..."
cat > .env << EOF
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=comrade_db
JWT_SECRET=your_jwt_secret_key
EOF

# 6. Start backend with PM2
echo "🚀 Starting backend..."
pm2 start index.js --name "comrade-api"
pm2 save
pm2 startup

# 7. Setup frontend builds
echo "🏗️ Building frontend apps..."
cd ../comrade-admin
echo "VITE_API_BASE_URL=https://api.comrade.com/api" > .env.production
npm run build

cd ../Com-rade
npm run build

# 8. Create web directories
echo "📁 Creating web directories..."
sudo mkdir -p /var/www/comrade/main
sudo mkdir -p /var/www/comrade/admin

# 9. Copy builds
echo "📋 Copying builds..."
sudo cp -r ../Com-rade/dist/* /var/www/comrade/main/
sudo cp -r ../comrade-admin/dist/* /var/www/comrade/admin/

# 10. Set permissions
echo "🔐 Setting permissions..."
sudo chown -R www-data:www-data /var/www/comrade/
sudo chmod -R 755 /var/www/comrade/

echo "✅ Deployment complete!"
echo "🌐 Your apps should be available at:"
echo "   - Main: http://comrade.com"
echo "   - Admin: http://admin.comrade.com"
echo "   - API: http://api.comrade.com"
echo ""
echo "📝 Next steps:"
echo "   1. Configure your domain DNS"
echo "   2. Set up SSL certificates"
echo "   3. Configure database"
echo "   4. Test all endpoints"
