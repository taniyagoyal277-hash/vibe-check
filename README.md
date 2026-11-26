# VibeCheck — Full-Stack Pastel Wellness Companion

A full-stack wellness and mindful self-reflection web application converted from Google Stitch UI designs into a modern **React + Vite** frontend and an **Express.js + MongoDB** backend.

---

## 📂 Project Architecture

```
stitch_vibecheck_pastel_auth_flow/
├── package.json                 # Root convenience scripts to manage frontend & backend
├── README.md                    # Root project guide & database setup
│
├── frontend/                    # React 18 + Tailwind CSS + Vite
│   ├── .env                     # Frontend environment variables
│   ├── .env.example             # Example environment template
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   ├── README.md
│   └── src/
│       ├── main.jsx
│       ├── App.jsx              # React Router (Home, Login, Signup, Vibe Log, Insights, Space)
│       ├── index.css
│       ├── services/
│       │   └── api.js           # REST API client connecting frontend to backend
│       ├── context/
│       │   └── VibeContext.jsx  # Global state manager with backend synchronization
│       ├── components/          # Reusable UI components (AppHeader, BottomNav, Toast, etc.)
│       └── pages/               # AuthPage, HomePage, DailyVibePage, InsightsPage, PersonalSpacePage
│
├── backend/                     # Node.js + Express.js + MongoDB REST API
│   ├── .env                     # Backend environment variables
│   ├── .env.example             # Backend environment template (no secrets)
│   ├── package.json
│   ├── server.js                # Express app entrypoint & CORS setup
│   ├── README.md
│   └── src/
│       ├── config/
│       │   └── db.js            # MongoDB / Mongoose connection manager with in-memory fallback
│       ├── models/              # User, Task, VibeLog, Preference schemas
│       ├── middleware/          # JWT auth guard, express-validator, error handler
│       ├── controllers/         # Auth, Task CRUD, VibeLog, Preference controllers
│       └── routes/              # Express REST routes
│
└── stitch_vibecheck_pastel_auth_flow/ # Original Google Stitch design files (preserved untouched)
```

---

## ⚙️ Environment Variables Configuration

Both directories contain `.env.example` templates without real secrets:

### 1. Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/vibecheck
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
```

### 2. Frontend (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗄️ Database Configuration & Credentials

The backend uses **MongoDB** with **Mongoose**.

### Options to run MongoDB:

1. **Automatic Development In-Memory Mode (Zero Config)**:
   - If no local MongoDB server or credentials are provided, the backend automatically launches an embedded **in-memory MongoDB instance** (`mongodb-memory-server`) so you can run and test the application immediately without installing MongoDB.

2. **Local MongoDB Daemon**:
   - If MongoDB is installed locally on your system, start the MongoDB service:
     - **Windows**: `net start MongoDB` or run `mongod`
     - **macOS**: `brew services start mongodb-community`
     - **Linux**: `sudo systemctl start mongod`
   - Set in `backend/.env`:
     ```env
     MONGODB_URI=mongodb://127.0.0.1:27017/vibecheck
     ```

3. **MongoDB Atlas (Cloud Managed Database)**:
   - Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com/).
   - Create a database user (e.g., `vibeuser`) and strong password.
   - Whitelist your IP address (or `0.0.0.0/0` for development).
   - Copy the connection string and paste it into `backend/.env`:
     ```env
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/vibecheck?retryWrites=true&w=majority
     ```

---

## 🌐 CORS Configuration

The backend is configured with Cross-Origin Resource Sharing (`cors`) in `backend/server.js`:
- Allowed origins: `http://localhost:5173`, `http://127.0.0.1:5173` (configured via `CORS_ORIGIN`).
- Supported HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`.
- Supported headers: `Content-Type`, `Authorization`, `X-Requested-With`.
- Credentials enabled: `credentials: true`.

---

## 🚀 Installation and Run Commands

### First-Time Installation
From the root directory:
```bash
npm run install:all
```
Or install in each directory individually:
```bash
# In backend/
cd backend
npm install

# In frontend/
cd ../frontend
npm install
```

### Starting the Application

#### 1. Start the Backend API
```bash
cd backend
npm start
# Server listens on http://localhost:5000
```

#### 2. Start the Frontend App
```bash
cd frontend
npm run dev
# Vite runs on http://localhost:5173
```

---

## 🧪 Testing the APIs

You can test the backend REST APIs using the test script or curl/PowerShell:
```bash
# Test health check
curl http://localhost:5000/api/health

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Mia Sterling\",\"email\":\"mia@vibecheck.app\",\"username\":\"vibingmia\",\"password\":\"cozy12345\"}"
```
