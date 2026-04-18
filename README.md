# Skill Course - Frontend

Modern e-learning platform built with Next.js 16, connecting to a separate backend API.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** External REST API (Express + MongoDB)

## Project Structure

```
project-01/
├── src/
│   ├── app/              # Next.js pages
│   ├── utils/            # API helpers
│   └── types.ts          # TypeScript types
├── public/               # Static assets
└── .env.local            # Environment variables
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend API URL
   ```

3. **Start backend API first** (see backend repository)

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open:** http://localhost:3000

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Pages

- `/` - Homepage
- `/mastery-courses` - All courses
- `/course/[id]` - Course details
- `/about-skill-course` - About page
- `/blogs` - Blog listing
- `/contact` - Contact form
- `/login` - Login page
- `/our-learners` - Testimonials (login required)
- `/micro-courses/excel` - Excel micro course
- `/micro-courses/power-bi` - Power BI micro course
- `/micro-courses/sql` - SQL micro course

## API Integration

All API calls use the `apiFetch` helper from `src/utils/api.ts`:

```typescript
import { apiFetch } from '@/utils/api';
import { Course } from '@/types';

const courses = await apiFetch<Course[]>('/api/courses');
```

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add `NEXT_PUBLIC_API_URL` environment variable
4. Deploy

## License

Private and proprietary.
