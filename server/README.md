# ReLeaf Backend API

Express.js backend API for the ReLeaf sustainability gamification application.

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create environment file:**
   - Copy `.env-example` to `.env`
   - Update the values:
     ```
     MONGODB_URI=mongodb://localhost:27017/releaf
     JWT_SECRET=your_secure_secret_key
     JWT_EXPIRE=7d
     PORT=5000
     NODE_ENV=development
     ```

3. **Start MongoDB:**
   - Make sure MongoDB is running locally, or
   - Use MongoDB Atlas and update the `MONGODB_URI` with your Atlas connection string

4. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/request-reset` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Profiles
- `GET /api/profiles/:userId` - Get user profile (protected)
- `PUT /api/profiles/:userId` - Update profile (protected)

### Challenges
- `GET /api/challenges` - Get all challenges with user progress (protected)
- `GET /api/challenges/:id` - Get single challenge (protected)
- `POST /api/challenges/:id/start` - Start a challenge (protected)
- `PUT /api/challenges/:id/complete` - Complete a challenge (protected)

### Rewards
- `GET /api/rewards` - Get all active rewards (protected)
- `POST /api/rewards/:id/redeem` - Redeem a reward (protected)

### Health Check
- `GET /api/health` - Check API status

## Technology Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

