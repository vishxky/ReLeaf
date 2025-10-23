# MERN Stack Setup Guide

This project has been migrated to a full MERN stack (MongoDB, Express, React, Node.js) architecture.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or Bun package manager

## Backend Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cp .env-example .env
```

Edit the `.env` file with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/releaf
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/releaf

JWT_SECRET=your_very_secure_secret_key_change_this
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a strong, random string in production!

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running on your system
mongod
```

**Option B: MongoDB Atlas**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string and update `MONGODB_URI` in `.env`

### 4. Seed the Database (Optional but Recommended)

```bash
cd server
npm run seed
```

This will populate your database with:
- 13 eco-friendly challenges (daily, weekly, monthly)
- 12 rewards across different categories

### 5. Start the Backend Server

```bash
# Development mode (with auto-reload)
cd server
npm run dev

# Or from project root
npm run server
```

The API will be available at `http://localhost:5000`

## Frontend Setup

### 1. Install Frontend Dependencies

```bash
# From project root
npm install
# or
bun install
```

### 2. Configure Frontend Environment

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start the Frontend Development Server

```bash
npm run dev
# or
bun run dev
```

The frontend will be available at `http://localhost:5173`

## Running the Full Stack

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)
- `POST /api/auth/request-reset` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Profiles
- `GET /api/profiles/:userId` - Get user profile
- `PUT /api/profiles/:userId` - Update user profile

### Challenges
- `GET /api/challenges` - Get all challenges with user progress
- `GET /api/challenges/:id` - Get single challenge
- `POST /api/challenges/:id/start` - Start a challenge
- `PUT /api/challenges/:id/complete` - Complete a challenge

### Rewards
- `GET /api/rewards` - Get all active rewards
- `POST /api/rewards/:id/redeem` - Redeem a reward

## Features

### Implemented MERN Features

✅ **MongoDB Database**
- User authentication with hashed passwords
- User profiles with points and login streaks
- Challenges (daily, weekly, monthly)
- Rewards system
- User challenge tracking

✅ **Express.js Backend**
- RESTful API architecture
- JWT-based authentication
- Protected routes middleware
- Centralized error handling
- CORS enabled for frontend communication

✅ **React Frontend**
- Modern React with TypeScript
- Axios API client with interceptors
- Context-based authentication
- Protected routes
- Real-time points tracking

✅ **Node.js Server**
- Environment-based configuration
- Async/await patterns
- Mongoose ODM for MongoDB
- bcryptjs for password hashing
- JWT token generation and verification

### Key Differences from Supabase Version

1. **Authentication:** Uses JWT tokens instead of Supabase Auth
2. **Database:** MongoDB with Mongoose instead of PostgreSQL
3. **API Calls:** Direct HTTP requests to Express backend instead of Supabase client
4. **Login Streaks:** Calculated on backend during login
5. **Points System:** Managed entirely through backend API

## Testing the Application

1. **Register a new user:**
   - Navigate to `/register`
   - Fill in name, age, email, and password
   - User and profile created in MongoDB

2. **Login:**
   - Navigate to `/login`
   - Login with email and password
   - JWT token stored in localStorage
   - Login streak updated automatically

3. **View Challenges:**
   - Navigate to `/challenges`
   - See daily, weekly, and monthly challenges
   - Start a challenge to track progress

4. **Complete Challenges:**
   - Click on a started challenge
   - Complete it to earn points
   - Points automatically added to profile

5. **Browse Rewards:**
   - Navigate to `/rewards`
   - View marketplace, donations, and exclusive items
   - Redeem rewards using earned points

6. **Update Profile:**
   - Navigate to `/profile`
   - Update name and age
   - View total points and login streak

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `.env` configuration
- Check port 5000 is not in use

### Frontend API errors
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

### Database connection issues
- Verify MongoDB URI in server `.env`
- For Atlas, check IP whitelist settings
- Ensure database user has proper permissions

### Authentication issues
- Clear localStorage in browser
- Check JWT_SECRET is set in server `.env`
- Verify token expiration settings

## Production Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Push your code to GitHub
2. Create a new web service
3. Set environment variables:
   - `MONGODB_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET` (strong random string)
   - `NODE_ENV=production`
   - `PORT` (usually auto-assigned)
4. Set build command: `cd server && npm install`
5. Set start command: `cd server && npm start`

### Frontend Deployment (Netlify)

1. Keep existing Netlify configuration
2. Update environment variable:
   - `VITE_API_URL=https://your-backend-url.com/api`
3. Deploy as usual

## Migration from Supabase

If you have existing Supabase data:

1. Export user data from Supabase
2. Transform to MongoDB schema
3. Import using custom migration script
4. Update user passwords (require reset)

Note: This is a complete replacement of Supabase with custom MERN backend. The two systems run independently.

## Support

For issues or questions:
- Check the API is running: `http://localhost:5000/api/health`
- Review browser console for frontend errors
- Check server logs for backend errors
- Verify database connection in MongoDB Compass

## License

MIT

