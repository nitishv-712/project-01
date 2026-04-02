# Skill Course Backend API

Express.js REST API for the Skill Course platform with MongoDB database.

## Features

- RESTful API endpoints for courses, stats, and testimonials
- MongoDB with Mongoose ODM
- CORS enabled for frontend integration
- Database seeding script
- Error handling and validation

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── Course.js          # Course schema
│   │   ├── Stats.js           # Stats schema
│   │   └── Testimonial.js     # Testimonial schema
│   ├── routes/
│   │   ├── courses.js         # Course routes
│   │   ├── stats.js           # Stats routes
│   │   └── testimonials.js    # Testimonial routes
│   ├── server.js              # Main server file
│   └── seed.js                # Database seeding script
├── .env                       # Environment variables
├── .gitignore
└── package.json
```

## Installation

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB
sudo apt-get install mongodb  # Ubuntu/Debian
brew install mongodb-community  # macOS

# Start MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file

### 3. Configure Environment

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillcourse
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillcourse
```

### 4. Seed Database

```bash
npm run seed
```

This will populate:
- 6 courses (AI, Power Query, Excel, Power BI, SQL, Python)
- 4 testimonials
- Platform statistics

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Courses

#### Get All Courses
```
GET /api/courses
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "ai-data-analysis",
      "title": "AI for Data Analysts Mastery",
      "instructor": "Satish Dhawale",
      "duration": "7 Hours",
      "lessons": 27,
      "price": 1999,
      ...
    }
  ]
}
```

#### Get Single Course
```
GET /api/courses/:id
```

#### Create Course
```
POST /api/courses
Content-Type: application/json

{
  "id": "new-course",
  "title": "New Course",
  "instructor": "Satish Dhawale",
  "duration": "10 Hours",
  "lessons": 50,
  "price": 2499,
  ...
}
```

#### Update Course
```
PUT /api/courses/:id
Content-Type: application/json

{
  "price": 1999,
  "discount": 50
}
```

#### Delete Course (Soft Delete)
```
DELETE /api/courses/:id
```

### Stats

#### Get Stats
```
GET /api/stats
```

Response:
```json
{
  "success": true,
  "data": {
    "studentsEnrolled": "230,000+",
    "videoTutorials": "1,300+",
    "expertCourses": "21+",
    "youtubeSubscribers": "2M+"
  }
}
```

#### Update Stats
```
PUT /api/stats
Content-Type: application/json

{
  "studentsEnrolled": "250,000+",
  "videoTutorials": "1,500+"
}
```

### Testimonials

#### Get All Testimonials
```
GET /api/testimonials
```

#### Create Testimonial
```
POST /api/testimonials
Content-Type: application/json

{
  "name": "John Doe",
  "role": "Data Analyst",
  "text": "Great course!",
  "rating": 5
}
```

#### Update Testimonial
```
PUT /api/testimonials/:id
```

#### Delete Testimonial
```
DELETE /api/testimonials/:id
```

### Health Check
```
GET /health
```

## Deployment

### Deploy to Heroku

1. Install Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create app:
```bash
heroku create skillcourse-api
```

4. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production
```

5. Deploy:
```bash
git push heroku main
```

6. Seed database:
```bash
heroku run npm run seed
```

### Deploy to Railway

1. Create account at https://railway.app
2. Create new project
3. Connect GitHub repository
4. Add MongoDB plugin
5. Set environment variables
6. Deploy automatically

### Deploy to Render

1. Create account at https://render.com
2. Create new Web Service
3. Connect repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

### Deploy to DigitalOcean

1. Create Droplet (Ubuntu)
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Setup PM2 for process management:
```bash
npm install -g pm2
pm2 start src/server.js --name skillcourse-api
pm2 startup
pm2 save
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/skillcourse |
| NODE_ENV | Environment (development/production) | development |

## Testing API

### Using cURL

```bash
# Get all courses
curl http://localhost:5000/api/courses

# Get single course
curl http://localhost:5000/api/courses/ai-data-analysis

# Create course
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"id":"test","title":"Test Course","price":1999}'
```

### Using Postman

1. Import collection from `postman_collection.json` (if provided)
2. Set base URL to `http://localhost:5000`
3. Test all endpoints

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Seed Script Fails
- Ensure MongoDB is running
- Check database permissions
- Clear existing data manually

## Security Best Practices

1. Never commit `.env` file
2. Use environment variables for sensitive data
3. Implement rate limiting in production
4. Add authentication/authorization for write operations
5. Validate all input data
6. Use HTTPS in production

## License

MIT
