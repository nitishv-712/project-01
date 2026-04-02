# Deployment Guide - Skill Course Platform

Complete guide to deploy frontend (Next.js) and backend (Express.js) separately.

## Architecture

```
Frontend (Next.js)          Backend (Express.js)
Port 3000                   Port 5000
├── Static pages            ├── REST API
├── Server components       ├── MongoDB
└── Fetches from API        └── Business logic
```

## Prerequisites

- Node.js 18+ installed
- MongoDB installed or MongoDB Atlas account
- Git installed
- Domain names (optional)

---

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   cd server
   git init
   git add .
   git commit -m "Initial backend"
   ```

3. **On Railway Dashboard**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `server` folder as root

4. **Add MongoDB**
   - Click "New" → "Database" → "MongoDB"
   - Copy connection string

5. **Set Environment Variables**
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   NODE_ENV=production
   ```

6. **Deploy & Seed**
   - Railway will auto-deploy
   - Run seed command in Railway terminal:
   ```bash
   npm run seed
   ```

7. **Get Backend URL**
   - Copy the generated URL (e.g., `https://skillcourse-api.up.railway.app`)

### Option 2: Render

1. **Create Account** at https://render.com

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   NODE_ENV=production
   ```

4. **Deploy & Seed**
   - Wait for deployment
   - Use Render shell to run: `npm run seed`

### Option 3: Heroku

```bash
cd server
heroku login
heroku create skillcourse-api
heroku config:set MONGODB_URI=<your-uri>
heroku config:set NODE_ENV=production
git push heroku main
heroku run npm run seed
```

### Option 4: DigitalOcean Droplet

```bash
# SSH into droplet
ssh root@your-droplet-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install mongodb

# Clone and setup
git clone <your-repo>
cd server
npm install
npm run seed

# Install PM2
npm install -g pm2
pm2 start src/server.js --name skillcourse-api
pm2 startup
pm2 save

# Setup Nginx reverse proxy
sudo apt-get install nginx
# Configure nginx to proxy port 5000
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd /path/to/philecode-fixed
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```

4. **Redeploy**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Environment Variables**
   - Netlify Dashboard → Site Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL`

### Option 3: Railway

1. **Create New Project** on Railway
2. **Deploy from GitHub**
   - Select repository
   - Root directory: `/` (project root)
3. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url
   ```
4. **Auto-deploy** on push

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create Account** at https://www.mongodb.com/cloud/atlas

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your backend

3. **Create Database User**
   - Database Access → Add New User
   - Username: `skillcourse`
   - Password: Generate secure password

4. **Whitelist IP**
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0` (for development)
   - Or add specific IPs for production

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password

6. **Connection String Format**
   ```
   mongodb+srv://skillcourse:<password>@cluster0.xxxxx.mongodb.net/skillcourse?retryWrites=true&w=majority
   ```

### Option 2: MongoDB on VPS

```bash
# Install MongoDB on Ubuntu
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Connection string
mongodb://localhost:27017/skillcourse
```

---

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillcourse
NODE_ENV=production
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.railway.app
```

---

## Testing Deployment

### Test Backend
```bash
# Health check
curl https://your-backend-url/health

# Get courses
curl https://your-backend-url/api/courses

# Get stats
curl https://your-backend-url/api/stats
```

### Test Frontend
1. Visit your frontend URL
2. Check if courses load on homepage
3. Navigate to `/mastery-courses`
4. Open a course detail page
5. Check browser console for errors

---

## Custom Domain Setup

### Backend Domain (api.skillcourse.com)

**On Railway/Render:**
1. Go to Settings → Domains
2. Add custom domain: `api.skillcourse.com`
3. Add CNAME record in your DNS:
   ```
   CNAME api.skillcourse.com → your-app.railway.app
   ```

### Frontend Domain (skillcourse.com)

**On Vercel:**
1. Go to Settings → Domains
2. Add domain: `skillcourse.com`
3. Add DNS records:
   ```
   A @ 76.76.21.21
   CNAME www cname.vercel-dns.com
   ```

---

## CI/CD Setup

### GitHub Actions (Auto-deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          # Railway auto-deploys on push

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Monitoring & Logs

### Backend Logs
- **Railway**: Dashboard → Deployments → View Logs
- **Render**: Dashboard → Logs tab
- **Heroku**: `heroku logs --tail`

### Frontend Logs
- **Vercel**: Dashboard → Deployments → Function Logs
- **Netlify**: Dashboard → Deploys → Function Logs

---

## Troubleshooting

### CORS Errors
Ensure backend has CORS enabled for your frontend domain:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000']
}));
```

### API Not Responding
- Check backend logs
- Verify MONGODB_URI is correct
- Test health endpoint: `/health`

### Frontend Not Loading Data
- Check NEXT_PUBLIC_API_URL in environment variables
- Verify backend is running
- Check browser console for errors

---

## Cost Estimate

### Free Tier (Development)
- **Backend**: Railway/Render Free Tier
- **Frontend**: Vercel Free Tier
- **Database**: MongoDB Atlas Free (M0)
- **Total**: $0/month

### Production (Recommended)
- **Backend**: Railway Pro ($5/month) or DigitalOcean Droplet ($6/month)
- **Frontend**: Vercel Pro ($20/month) or Free tier
- **Database**: MongoDB Atlas M10 ($57/month) or M2 ($9/month)
- **Total**: ~$15-80/month depending on scale

---

## Security Checklist

- [ ] Use HTTPS for all endpoints
- [ ] Set strong MongoDB password
- [ ] Whitelist specific IPs for MongoDB
- [ ] Add rate limiting to API
- [ ] Enable CORS only for your domain
- [ ] Never commit .env files
- [ ] Use environment variables for secrets
- [ ] Regular security updates

---

## Support

For issues:
1. Check logs first
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB connection
