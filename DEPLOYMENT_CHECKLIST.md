# PDFo VPS Deployment Checklist

## Pre-Deployment Preparation

### 1. VPS Requirements
- [ ] Ubuntu 20.04+ VPS with at least 2GB RAM, 20GB storage
- [ ] Root/sudo access to the server
- [ ] Domain name (pdfo.io) configured to point to VPS IP
- [ ] SSH key pair for secure access

### 2. Required Accounts/Services
- [ ] Firebase project setup for admin authentication
- [ ] Google Analytics account (optional)
- [ ] Email service for contact forms (Gmail/SMTP)

## Server Setup Phase

### 3. Initial Server Configuration
- [ ] Update system: `sudo apt update && sudo apt upgrade -y`
- [ ] Install Node.js 20+: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -`
- [ ] Install PostgreSQL: `sudo apt install postgresql postgresql-contrib -y`
- [ ] Install Nginx: `sudo apt install nginx -y`
- [ ] Install PM2: `sudo npm install -g pm2`
- [ ] Install build tools: `sudo apt install build-essential -y`
- [ ] Install system dependencies for PDF processing

### 4. Database Setup
- [ ] Create PostgreSQL database and user
- [ ] Configure PostgreSQL for application access
- [ ] Test database connection

### 5. Application Deployment
- [ ] Create application directory: `/var/www/pdfo`
- [ ] Clone repository to server
- [ ] Install dependencies: `npm install`
- [ ] Create production environment file (.env)
- [ ] Build application: `npm run build`
- [ ] Run database migrations: `npm run db:push`

## Production Configuration

### 6. Process Management
- [ ] Copy `ecosystem.config.js` to server
- [ ] Start application with PM2: `pm2 start ecosystem.config.js`
- [ ] Save PM2 configuration: `pm2 save`
- [ ] Setup PM2 auto-start: `pm2 startup`

### 7. Web Server Setup
- [ ] Copy nginx configuration to `/etc/nginx/sites-available/pdfo`
- [ ] Enable site: `sudo ln -s /etc/nginx/sites-available/pdfo /etc/nginx/sites-enabled/`
- [ ] Remove default site: `sudo rm /etc/nginx/sites-enabled/default`
- [ ] Test nginx config: `sudo nginx -t`
- [ ] Restart nginx: `sudo systemctl restart nginx`

### 8. SSL Certificate
- [ ] Install Certbot: `sudo apt install certbot python3-certbot-nginx -y`
- [ ] Obtain SSL certificate: `sudo certbot --nginx -d pdfo.io -d www.pdfo.io`
- [ ] Test auto-renewal: `sudo certbot renew --dry-run`
- [ ] Setup cron job for auto-renewal

### 9. Security Configuration
- [ ] Configure UFW firewall
- [ ] Allow SSH, HTTP, HTTPS ports
- [ ] Install and configure Fail2Ban
- [ ] Harden SSH configuration (change port, disable root login)

## Environment Variables Checklist

### 10. Required Environment Variables
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `SESSION_SECRET` - Random secure string for sessions
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`

### 11. Optional Environment Variables
- [ ] `VITE_GA_MEASUREMENT_ID` - Google Analytics ID
- [ ] `VITE_FIREBASE_API_KEY` - Firebase API key
- [ ] `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- [ ] `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- [ ] `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- [ ] `VITE_FIREBASE_APP_ID` - Firebase app ID
- [ ] `SMTP_*` variables for email functionality

## Testing Phase

### 12. Application Testing
- [ ] Test health endpoint: `curl -I https://pdfo.io/api/health`
- [ ] Test all PDF tools functionality
- [ ] Test contact form submission
- [ ] Test admin panel access
- [ ] Test file upload/download
- [ ] Test mobile responsiveness

### 13. Performance Testing
- [ ] Run load tests with Apache Bench
- [ ] Monitor memory usage with `pm2 monit`
- [ ] Check server resources with `htop`
- [ ] Test SSL certificate: `curl -I https://pdfo.io`

## Monitoring and Maintenance

### 14. Backup Setup
- [ ] Create database backup script
- [ ] Setup daily automated backups
- [ ] Test backup restoration process
- [ ] Create application backup routine

### 15. Monitoring
- [ ] Setup uptime monitoring (Uptime Robot)
- [ ] Configure log rotation
- [ ] Setup PM2 monitoring
- [ ] Monitor disk space usage

### 16. Performance Optimization
- [ ] Enable Nginx gzip compression
- [ ] Configure static file caching
- [ ] Optimize database queries
- [ ] Monitor application performance

## Post-Deployment Tasks

### 17. DNS and Domain
- [ ] Verify A records point to VPS IP
- [ ] Test www subdomain redirect
- [ ] Update any hardcoded URLs in application
- [ ] Submit sitemap to search engines

### 18. Final Verification
- [ ] Test all features end-to-end
- [ ] Verify contact form emails are received
- [ ] Check admin panel functionality
- [ ] Test file uploads and processing
- [ ] Verify SSL certificate is valid

## Emergency Procedures

### 19. Rollback Plan
- [ ] Document current working state
- [ ] Keep previous version available
- [ ] Test rollback procedure
- [ ] Document recovery steps

### 20. Troubleshooting
- [ ] Document common issues and solutions
- [ ] Create monitoring alerts
- [ ] Setup notification system for critical errors
- [ ] Document support contacts

## Estimated Timeline
- **Server Setup**: 1-2 hours
- **Application Deployment**: 1-2 hours
- **SSL and Security**: 1 hour
- **Testing**: 1-2 hours
- **Total**: 4-7 hours

## Cost Estimate
- **VPS (2GB RAM)**: $10-20/month
- **Domain**: $10-15/year
- **SSL Certificate**: Free (Let's Encrypt)
- **Monitoring**: Free (basic) or $5-10/month (advanced)

## Next Steps After Deployment
1. Monitor application performance for first 48 hours
2. Setup automated health checks
3. Configure log monitoring and alerts
4. Plan regular maintenance schedule
5. Document operational procedures
6. Consider CDN for static assets
7. Plan disaster recovery procedures

## Support and Maintenance
- Regular updates: Monthly
- Security patches: As needed
- Backup verification: Weekly
- Performance monitoring: Daily
- Log review: Weekly