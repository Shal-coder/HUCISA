# Deployment Guide for Antidrug Club Website

This guide provides step-by-step instructions for deploying the Antidrug Club website to a production environment (e.g., a VPS like DigitalOcean, Linode, or AWS EC2).

## Prerequisites

- A server running Ubuntu 20.04 or later (recommended).
- Node.js (v14 or later) and npm installed.
- MySQL Server installed.
- Nginx (for reverse proxy).
- PM2 (Process Manager for Node.js).

## 1. Server Setup

### Update System
```bash
sudo apt update
sudo apt upgrade
```

### Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install MySQL
```bash
sudo apt install mysql-server
sudo mysql_secure_installation
```

## 2. Application Setup

### Clone the Repository
```bash
git clone <your-repo-url>
cd antidrug-club
```

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
nano .env
```
Update the `.env` file with your production database credentials and a strong session secret.

### Initialize Database
Run the database initialization script:
```bash
node scripts/init_db.js
```

## 3. Process Management with PM2

Install PM2 globally:
```bash
sudo npm install -g pm2
```

Start the application:
```bash
pm2 start app.js --name "antidrug-club"
```

Save the PM2 list and configure startup:
```bash
pm2 save
pm2 startup
```

## 4. Nginx Configuration

Install Nginx:
```bash
sudo apt install nginx
```

Create a new Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/antidrug-club
```

Add the following configuration (replace `your_domain.com` with your actual domain):
```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/antidrug-club /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. SSL Certificate (Optional but Recommended)

Install Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
```

Obtain an SSL certificate:
```bash
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

## 6. Maintenance

- **View Logs:** `pm2 logs antidrug-club`
- **Restart App:** `pm2 restart antidrug-club`
- **Update App:** `git pull` then `npm install` then `pm2 restart antidrug-club`
