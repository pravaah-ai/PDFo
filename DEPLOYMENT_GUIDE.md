# PDFo VPS Deployment Guide

## Overview
This guide will help you deploy your PDFo application to a VPS server. The application is a full-stack Node.js/Express application with a React frontend.

## Prerequisites
- VPS server with Ubuntu 20.04+ or similar Linux distribution
- Domain name (pdfo.io) with DNS pointing to your VPS
- SSH access to your VPS
- Basic knowledge of Linux commands

## Step 1: Server Setup

### 1.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Required Software
```bash
# Install Node.js (version 20+)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx (web server/reverse proxy)
sudo apt install nginx -y

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Git
sudo apt install git -y

# Install build tools
sudo apt install build-essential -y

# Install system dependencies for PDF processing
sudo apt install -y \
    libpng-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libpixman-1-dev \
    libcairo2-dev \
    libpango1.0-dev \
    python3-dev \
    pkg-config
```

## Step 2: Database Setup

### 2.1 Configure PostgreSQL
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE pdfo_db;
CREATE USER pdfo_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE pdfo_db TO pdfo_user;

# Exit PostgreSQL
\q
```

### 2.2 Configure PostgreSQL for Remote Access (if needed)
```bash
# Edit PostgreSQL configuration
sudo nano /etc/postgresql/14/main/postgresql.conf
# Change: listen_addresses = 'localhost' to listen_addresses = '*'

# Edit pg_hba.conf
sudo nano /etc/postgresql/14/main/pg_hba.conf
# Add: host pdfo_db pdfo_user 0.0.0.0/0 md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

## Step 3: Application Deployment

### 3.1 Clone Repository
```bash
# Create application directory
sudo mkdir -p /var/www/pdfo
sudo chown $USER:$USER /var/www/pdfo

# Clone your repository
cd /var/www/pdfo
git clone <your-repo-url> .
```

### 3.2 Install Dependencies
```bash
# Install npm dependencies
npm install

# Install global dependencies
sudo npm install -g typescript tsx drizzle-kit
```

### 3.3 Environment Configuration
Create environment file:
```bash
nano .env
```

Add the following content:
```env
# Database Configuration
DATABASE_URL="postgresql://pdfo_user:your_secure_password@localhost:5432/pdfo_db"

# Google Analytics (optional)
VITE_GA_MEASUREMENT_ID="your_ga_id"

# Server Configuration
NODE_ENV=production
PORT=3000

# Session Secret
SESSION_SECRET="your_super_secret_session_key"

# Firebase Configuration (for admin panel)
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_firebase_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
VITE_FIREBASE_APP_ID="your_firebase_app_id"
```

### 3.4 Build Application
```bash
# Build the application
npm run build

# Run database migrations
npx drizzle-kit push:pg
```

## Step 4: Process Management with PM2

### 4.1 Create PM2 Configuration
```bash
nano ecosystem.config.js
```

Add the following content:
```javascript
module.exports = {
  apps: [{
    name: 'pdfo-app',
    script: 'tsx',
    args: 'server/index.ts',
    cwd: '/var/www/pdfo',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/pm2/pdfo-error.log',
    out_file: '/var/log/pm2/pdfo-out.log',
    log_file: '/var/log/pm2/pdfo-combined.log',
    time: true
  }]
}
```

### 4.2 Start Application with PM2
```bash
# Create log directory
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

## Step 5: Nginx Configuration

### 5.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/pdfo
```

Add the following content:
```nginx
server {
    listen 80;
    server_name pdfo.io www.pdfo.io;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    # File upload size limit
    client_max_body_size 50M;

    # Static files
    location /assets/ {
        alias /var/www/pdfo/attached_assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API endpoints
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # All other requests
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

### 5.2 Enable Site
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/pdfo /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Step 6: SSL Certificate with Let's Encrypt

### 6.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 6.2 Obtain SSL Certificate
```bash
sudo certbot --nginx -d pdfo.io -d www.pdfo.io
```

### 6.3 Auto-renewal Setup
```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Setup cron job for auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Step 7: Firewall Configuration

```bash
# Enable UFW firewall
sudo ufw enable

# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'

# Check status
sudo ufw status
```

## Step 8: Monitoring and Maintenance

### 8.1 Log Management
```bash
# View application logs
pm2 logs pdfo-app

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View system logs
sudo journalctl -u nginx
sudo journalctl -u postgresql
```

### 8.2 Application Management
```bash
# Restart application
pm2 restart pdfo-app

# Stop application
pm2 stop pdfo-app

# View application status
pm2 status

# View application monitoring
pm2 monit
```

## Step 9: Backup Strategy

### 9.1 Database Backup
```bash
# Create backup script
nano /home/$USER/backup-db.sh
```

Add the following content:
```bash
#!/bin/bash
BACKUP_DIR="/home/$USER/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Database backup
pg_dump -h localhost -U pdfo_user -d pdfo_db > $BACKUP_DIR/pdfo_db_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "pdfo_db_*.sql" -mtime +7 -delete
```

```bash
chmod +x /home/$USER/backup-db.sh

# Setup daily backup
crontab -e
# Add: 0 2 * * * /home/$USER/backup-db.sh
```

### 9.2 Application Backup
```bash
# Create application backup
tar -czf /home/$USER/backups/pdfo_app_$(date +%Y%m%d).tar.gz -C /var/www pdfo
```

## Step 10: Performance Optimization

### 10.1 Nginx Optimization
Add to `/etc/nginx/nginx.conf`:
```nginx
# Gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

# File caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 10.2 System Optimization
```bash
# Optimize file limits
echo "fs.file-max = 65536" | sudo tee -a /etc/sysctl.conf
echo "* soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65536" | sudo tee -a /etc/security/limits.conf

# Apply changes
sudo sysctl -p
```

## Step 11: Security Hardening

### 11.1 SSH Security
```bash
# Edit SSH configuration
sudo nano /etc/ssh/sshd_config

# Change default port (optional)
Port 2222

# Disable root login
PermitRootLogin no

# Use key-based authentication
PasswordAuthentication no

# Restart SSH
sudo systemctl restart sshd
```

### 11.2 Fail2Ban
```bash
# Install Fail2Ban
sudo apt install fail2ban -y

# Create configuration
sudo nano /etc/fail2ban/jail.local
```

Add the following content:
```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-req-limit]
enabled = true
filter = nginx-req-limit
logpath = /var/log/nginx/error.log
maxretry = 10
```

```bash
# Start Fail2Ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban
```

## Step 12: Domain Configuration

### 12.1 DNS Settings
Configure your domain registrar to point to your VPS:
```
A Record: pdfo.io → YOUR_VPS_IP
A Record: www.pdfo.io → YOUR_VPS_IP
```

### 12.2 Update Application URLs
Update references in your application from `pdfo.replit.app` to `pdfo.io` (already done in your code).

## Step 13: Testing and Verification

### 13.1 Health Checks
```bash
# Test application health
curl -I http://pdfo.io/api/health

# Test SSL
curl -I https://pdfo.io

# Test file upload
curl -X POST -F "files=@test.pdf" https://pdfo.io/api/pdf/process
```

### 13.2 Performance Testing
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test performance
ab -n 100 -c 10 https://pdfo.io/
```

## Step 14: Maintenance Commands

### 14.1 Regular Updates
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Update Node.js dependencies
cd /var/www/pdfo
npm update

# Rebuild application
npm run build
pm2 restart pdfo-app
```

### 14.2 Cleanup
```bash
# Clean temporary files
sudo rm -rf /var/www/pdfo/uploads/*
sudo rm -rf /var/www/pdfo/outputs/*

# Clean logs
sudo truncate -s 0 /var/log/nginx/access.log
sudo truncate -s 0 /var/log/nginx/error.log
pm2 flush
```

## Troubleshooting

### Common Issues

1. **Application won't start**: Check logs with `pm2 logs pdfo-app`
2. **Database connection issues**: Verify DATABASE_URL in .env
3. **File upload issues**: Check file permissions and disk space
4. **SSL certificate issues**: Run `sudo certbot renew`
5. **Performance issues**: Check resource usage with `htop` and `pm2 monit`

### Useful Commands
```bash
# Check application status
pm2 status

# View real-time logs
pm2 logs pdfo-app --lines 50

# Check system resources
htop
df -h
free -h

# Check network connections
sudo netstat -tlnp

# Test database connection
psql -h localhost -U pdfo_user -d pdfo_db
```

## Estimated Costs

- **VPS Server**: $5-20/month (depending on specs)
- **Domain**: $10-15/year
- **SSL Certificate**: Free (Let's Encrypt)
- **Total**: ~$60-240/year

## Next Steps

1. Set up monitoring (consider tools like Uptime Robot)
2. Configure automated backups to cloud storage
3. Set up staging environment for testing
4. Implement CI/CD pipeline for automated deployments
5. Consider CDN for static assets (CloudFlare)

This guide provides a complete production deployment setup for your PDFo application. Follow each step carefully and test thoroughly before going live.