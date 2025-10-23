# ReLeaf - Quick Start Guide

Get the ReLeaf MERN stack app running locally in 5 minutes!

## Prerequisites Check

```bash
node --version  # Should be v18+
mongod --version  # Or have MongoDB Atlas account
```

## Installation

```bash
# 1. Clone and navigate
git clone <your-repo-url>
cd Leaf

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd server
npm install
cd ..
```

## Configuration

### Backend Environment
```bash
cd server
cp .env-example .env
```

Edit `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/releaf
JWT_SECRET=your_super_secure_random_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**Important:** Replace `JWT_SECRET` with a secure random string!

### Frontend Environment
```bash
cd ..
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

## Database Setup

### Start MongoDB
If using local MongoDB:
```bash
mongod
```

If using MongoDB Atlas, update `MONGODB_URI` in `server/.env` with your connection string.

### Seed Database
```bash
cd server
npm run seed
cd ..
```

This populates your database with:
- 13 eco-friendly challenges (daily, weekly, monthly)
- 12 rewards across 3 categories

## Run the App

Open **two separate terminals**:

**Terminal 1 - Backend API:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Access

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## First Steps

1. **Register** → Create an account at `/register`
2. **Login** → Sign in at `/login`
3. **Browse Challenges** → Visit `/challenges`
4. **Start a Challenge** → Click "Start" on any challenge
5. **Complete Challenge** → Click "Mark as Completed"
6. **Earn Points** → See your points increase
7. **Redeem Rewards** → Visit `/rewards` to spend points

## Common Issues

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Start MongoDB if local
mongod
```

### Frontend API errors
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Check .env file exists in root
cat .env
```

### Database connection failed
```bash
# Verify MongoDB is running
mongosh  # Should connect

# Or use MongoDB Atlas
# Update MONGODB_URI in server/.env with Atlas connection string
```

## API Testing (Optional)

Test the API directly with curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get challenges (replace TOKEN with JWT from login response)
curl http://localhost:5000/api/challenges \
  -H "Authorization: Bearer TOKEN"
```

## Next Steps

- Read [MERN_SETUP.md](MERN_SETUP.md) for detailed documentation
- Check [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for what's implemented
- See [README.md](README.md) for project overview

## Need Help?

Check the troubleshooting section in [MERN_SETUP.md](MERN_SETUP.md)

