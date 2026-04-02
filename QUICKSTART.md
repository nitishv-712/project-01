# Quick Start Guide

## Running Locally

### 1. Start MongoDB
```bash
# Make sure MongoDB is running
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

### 2. Start Backend (Terminal 1)
```bash
cd server
npm install
npm run seed    # Seed database (first time only)
npm run dev     # Start backend on port 5000
```

Backend will be available at: `http://localhost:5000`

### 3. Start Frontend (Terminal 2)
```bash
cd ..  # Back to project root
npm run dev  # Start frontend on port 3000
```

Frontend will be available at: `http://localhost:3000`

### 4. Verify Everything Works

**Test Backend:**
- Health: http://localhost:5000/health
- Courses: http://localhost:5000/api/courses
- Stats: http://localhost:5000/api/stats

**Test Frontend:**
- Homepage: http://localhost:3000
- Courses: http://localhost:3000/mastery-courses
- Single Course: http://localhost:3000/course/ai-data-analysis

## Project Structure

```
philecode-fixed/
├── app/                    # Next.js frontend
│   ├── api/               # (Old API routes - can be removed)
│   ├── components/        # React components
│   ├── course/[id]/       # Dynamic course pages
│   ├── data-analytics/    # Data Analytics 3.0 page
│   ├── login/             # Login page
│   ├── mastery-courses/   # All courses page
│   └── page.tsx           # Homepage
├── server/                # Express.js backend
│   └── src/
│       ├── config/        # Database config
│       ├── models/        # Mongoose models
│       ├── routes/        # API routes
│       ├── server.js      # Main server
│       └── seed.js        # Database seeder
├── .env.local            # Frontend environment variables
└── server/.env           # Backend environment variables
```

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Stats
- `GET /api/stats` - Get platform stats
- `PUT /api/stats` - Update stats

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (server/.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillcourse
NODE_ENV=development
```

## Common Commands

### Backend
```bash
cd server
npm run dev      # Development with auto-reload
npm start        # Production mode
npm run seed     # Seed database
```

### Frontend
```bash
npm run dev      # Development mode
npm run build    # Build for production
npm start        # Run production build
```

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify port 5000 is not in use
- Check server/.env file exists

### Frontend shows no data
- Verify backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env.local
- Open browser console for errors

### Database is empty
- Run `npm run seed` in server directory
- Check MongoDB connection string

## Next Steps

1. ✅ Run locally and test all features
2. 📝 Customize course data in `server/src/seed.js`
3. 🎨 Modify frontend styling as needed
4. 🚀 Deploy backend (see DEPLOYMENT.md)
5. 🌐 Deploy frontend (see DEPLOYMENT.md)
6. 🔒 Add authentication (optional)
7. 💳 Integrate payment gateway (optional)
