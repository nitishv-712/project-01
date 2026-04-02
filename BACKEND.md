# Backend Setup Guide

## Database Architecture

This project uses **MongoDB** with Mongoose ODM for data management.

### Models

1. **Course** - Stores all course information
2. **Stats** - Platform statistics (students, videos, etc.)
3. **Testimonial** - Student reviews and testimonials

### API Endpoints

#### Courses
- `GET /api/courses` - Get all active courses
- `POST /api/courses` - Create new course
- `GET /api/courses/[id]` - Get single course by ID

#### Stats
- `GET /api/stats` - Get platform statistics

#### Testimonials
- `GET /api/testimonials` - Get all active testimonials

#### Seed
- `GET /api/seed` - Seed database with initial data

## Setup Instructions

### 1. Install MongoDB

**Option A: Local MongoDB**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `.env.local` with your connection string

### 2. Configure Environment

Update `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/skillcourse
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillcourse
```

### 3. Seed Database

Visit: `http://localhost:3000/api/seed`

This will populate:
- 6 courses (AI, Power Query, Excel, Power BI, SQL, Python)
- 4 testimonials
- Platform stats

### 4. Verify Data

Check if data is loaded:
- Courses: `http://localhost:3000/api/courses`
- Stats: `http://localhost:3000/api/stats`
- Testimonials: `http://localhost:3000/api/testimonials`

## Development

```bash
npm run dev
```

## Production

For production, use MongoDB Atlas or any managed MongoDB service.

Update `MONGODB_URI` in your production environment variables.

## Data Management

### Add New Course

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "id": "new-course",
    "title": "New Course Title",
    "instructor": "Satish Dhawale",
    "duration": "10 Hours",
    "lessons": 50,
    "language": "Hinglish",
    "discount": 50,
    "originalPrice": 5000,
    "price": 2500,
    "image": "/course.webp",
    "category": "Category",
    "description": "Course description",
    "whatYouLearn": ["Point 1", "Point 2"],
    "curriculum": [{"section": "Section 1", "lessons": 10}]
  }'
```

### Update Stats

Connect to MongoDB and update the Stats collection directly, or create an admin API endpoint.

## Troubleshooting

**Connection Error:**
- Ensure MongoDB is running: `sudo systemctl status mongodb`
- Check connection string in `.env.local`
- Verify network access (for Atlas)

**Seed Fails:**
- Clear existing data manually
- Check MongoDB logs
- Verify schema matches model definitions
