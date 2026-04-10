# Vercel Deployment Guide

This project is ready to deploy to Vercel with **zero backend setup** — everything runs as Next.js serverless functions.

## Prerequisites

1. **MongoDB Atlas Account** (free tier works)
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string

## Deployment Steps

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Add environment variable:
   - **Key:** `MONGODB_URI`
   - **Value:** Your MongoDB Atlas connection string
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/skillcourse?retryWrites=true&w=majority
     ```
5. Click "Deploy"

### 3. Seed the Database

After deployment, visit:
```
https://your-app.vercel.app/api/seed
```

This will populate your database with courses, stats, and testimonials.

## Environment Variables

Only **one** environment variable is needed:

- `MONGODB_URI` - Your MongoDB Atlas connection string

## Architecture

- **Frontend:** Next.js 16 (App Router)
- **Backend:** Next.js API Routes (serverless functions)
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (automatic serverless deployment)

## Local Development (Optional)

If you want to run locally:

1. Install MongoDB locally or use MongoDB Atlas
2. Create `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/skillcourse
   # OR use Atlas for local dev too:
   MONGODB_URI=mongodb+srv://...
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Seed database:
   ```
   http://localhost:3000/api/seed
   ```

## No Separate Backend Needed

The `server/` folder in this repo is **legacy code** and can be deleted. All backend logic is now in:
- `app/api/` - API routes (serverless functions)
- `models/` - Mongoose schemas
- `lib/mongodb.ts` - Database connection

Vercel automatically deploys these as serverless functions.
