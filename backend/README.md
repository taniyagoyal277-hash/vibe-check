# VibeCheck — Backend REST API

Node.js, Express.js, and MongoDB backend supporting authentication, tasks (daily intentions), vibe check-ins, insights, and user preferences for the VibeCheck pastel wellness companion.

## 🌸 Features

- **User Authentication**: Secure signup and login with bcryptjs password hashing (10 salt rounds) and JWT authentication.
- **Task / Intention Management**: Full CRUD REST APIs for creating, viewing, updating, toggling, and deleting tasks and daily intentions (`/api/tasks` and `/api/intentions`).
- **Daily Vibe Logging**: Record vibes, intensity levels, energy levels, sleep tracking, tags, audio voice memo status, and moments.
- **Insights Aggregation**: Aggregated dominant vibe, aura composition, and sleep correlation data.
- **User Preferences**: Sync reminder toggles, themes, and biometric settings.
- **Robust Validation & Error Handling**: Strict request payload validation with `express-validator` and centralized error middleware.
- **MongoDB Persistence**: Mongoose schemas with indexed fields and automated in-memory MongoDB fallback for local development.

---

## 📂 Project Structure

```
backend/
├── server.js                    # Express application entrypoint
├── package.json                 # Dependencies & scripts
├── .env.example                 # Sample environment variables
├── .env                         # Active environment variables
├── README.md                    # Backend documentation
└── src/
    ├── config/
    │   └── db.js                # MongoDB / Mongoose connection manager with in-memory fallback
    ├── models/
    │   ├── User.js              # User schema with bcrypt password hashing
    │   ├── Task.js              # Task / Intention schema
    │   ├── VibeLog.js           # Daily vibe check-in schema
    │   └── Preference.js        # User space settings schema
    ├── middleware/
    │   ├── auth.js              # JWT Bearer token authentication guard
    │   ├── validation.js        # express-validator result formatter
    │   └── errorHandler.js      # Centralized error handler
    ├── controllers/
    │   ├── authController.js    # Register, login, me, profile update, forgot password
    │   ├── taskController.js    # Task CRUD (get, create, update, toggle, delete)
    │   ├── vibeController.js    # Vibe logging & aggregated mood metrics
    │   └── preferenceController.js # Preferences retrieval & updates
    └── routes/
        ├── authRoutes.js        # /api/auth endpoints
        ├── taskRoutes.js        # /api/tasks & /api/intentions endpoints
        ├── vibeRoutes.js        # /api/vibes endpoints
        └── preferenceRoutes.js  # /api/preferences endpoints
```

---

## 🚀 API Endpoints

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user with name, email, username, password |
| `POST` | `/api/auth/login` | Public | Log in with email or username and password |
| `POST` | `/api/auth/forgot-password` | Public | Request password recovery email |
| `GET` | `/api/auth/me` | Private | Retrieve authenticated user profile |
| `PUT` | `/api/auth/profile` | Private | Update name or avatar |

### 2. Tasks & Daily Intentions (`/api/tasks` & `/api/intentions`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/tasks` | Private | List all tasks for the user (optional `?completed=true` or `?category=wellness`) |
| `POST` | `/api/tasks` | Private | Create a new task / daily intention |
| `GET` | `/api/tasks/:id` | Private | Retrieve a single task by ID |
| `PUT` | `/api/tasks/:id` | Private | Update task details |
| `PATCH` | `/api/tasks/:id/toggle` | Private | Toggle task completion status |
| `DELETE` | `/api/tasks/:id` | Private | Delete a task |

### 3. Vibe Check-Ins & Insights (`/api/vibes`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/vibes` | Private | Get history of logged vibes |
| `GET` | `/api/vibes/today` | Private | Get today's recorded vibe |
| `POST` | `/api/vibes` | Private | Log a daily vibe with intensity, energy, tags, and notes |
| `GET` | `/api/vibes/insights` | Private | Aggregated dominant vibe, aura composition, and lift |
| `DELETE` | `/api/vibes/:id` | Private | Remove a vibe entry |

### 4. Space Preferences (`/api/preferences`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/preferences` | Private | Get user's reminder, theme, and biometric settings |
| `PUT` | `/api/preferences` | Private | Update settings |

---

## 💻 Installation and Run Commands

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Start server
npm start

# Or start in watch mode for development
npm run dev
```
Server runs on `http://localhost:5000` by default.
