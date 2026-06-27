# 🌸 Bloom — Tasks & Habits Tracker

A playful, colorful task + habit tracker with user accounts, built with **Node.js + Express + MongoDB Atlas** and a vanilla HTML/CSS/JS frontend.

## 📁 Project structure

```
bloom/
├── backend/          Node.js + Express + Mongoose API
│   ├── models/       User, Task, Habit schemas
│   ├── routes/       auth, tasks, habits endpoints
│   ├── middleware/   JWT auth check
│   ├── server.js
│   └── .env          (you create this)
└── frontend/
    └── index.html    Single-page app
```

## 🚀 Local setup

### 1. MongoDB Atlas (free)
1. Go to https://www.mongodb.com/cloud/atlas and create a free account
2. Create a free **M0 cluster** (any region)
3. Database Access → Add user with password
4. Network Access → Add IP `0.0.0.0/0` (allow from anywhere — fine for dev)
5. Connect → Drivers → copy the connection string. Replace `<password>` with your real password.

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
```
Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/bloom?retryWrites=true&w=majority
JWT_SECRET=any-long-random-string-here-make-it-strong
FRONTEND_URL=http://localhost:3000
```
Then:
```bash
npm start
```
You should see `✓ MongoDB connected` and `✓ Server on port 5000`.

### 3. Frontend
Just open `frontend/index.html` in your browser, OR serve it:
```bash
cd frontend
npx serve .
```
The API URL in `index.html` is set to `http://localhost:5000/api` when running on localhost — works out of the box.

## 🌐 Deploy to production (free)

### Backend → Render.com (free)
1. Push the `backend/` folder to a GitHub repo
2. Go to https://render.com → New Web Service → connect your repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env vars: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL` (set after frontend deploys)
6. Note your backend URL (e.g. `https://bloom-api.onrender.com`)

### Frontend → Vercel or Netlify (free)
1. In `frontend/index.html`, update the `API` constant:
   ```js
   const API = window.location.hostname === 'localhost'
     ? 'http://localhost:5000/api'
     : 'https://bloom-api.onrender.com/api'; // ← your Render URL
   ```
2. Drag the `frontend/` folder onto https://app.netlify.com/drop, OR push to GitHub and import on Vercel
3. Copy the deployed URL, go back to Render, and set `FRONTEND_URL` to it

Done. You now have a live, deployed full-stack app with user auth and a real database. ✨

## 🔌 API endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | ❌ | Create account → returns JWT |
| POST | `/api/auth/login` | ❌ | Log in → returns JWT |
| GET | `/api/tasks` | ✅ | List user's tasks |
| POST | `/api/tasks` | ✅ | Create task `{ text }` |
| PATCH | `/api/tasks/:id` | ✅ | Update `{ done, text }` |
| DELETE | `/api/tasks/:id` | ✅ | Delete task |
| GET | `/api/habits` | ✅ | List habits |
| POST | `/api/habits` | ✅ | Create habit `{ name }` |
| PATCH | `/api/habits/:id/toggle` | ✅ | Toggle a date `{ date: 'YYYY-MM-DD' }` |
| DELETE | `/api/habits/:id` | ✅ | Delete habit |

Auth: send `Authorization: Bearer <token>` header.

## 🧪 Test the API with Postman
Great practice for your QA prep! Try:
1. POST `/api/auth/signup` with `{ "email": "test@test.com", "password": "secret123" }`
2. Copy the `token` from the response
3. In Postman, set Authorization → Bearer Token → paste it
4. GET `/api/tasks` → should return `[]`
5. POST `/api/tasks` with `{ "text": "Try the API" }`
6. GET `/api/tasks` again → your task is there 🎉
