import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import vibeRoutes from './src/routes/vibeRoutes.js';
import preferenceRoutes from './src/routes/preferenceRoutes.js';
import errorHandler from './src/middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration supporting single or comma-separated origins & development flexibility
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile tools, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: This origin is not permitted'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🌸 VibeCheck REST API backend is flourishing.',
    timestamp: new Date().toISOString(),
  });
});

// Mount REST Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/intentions', taskRoutes); // Domain alias for tasks
app.use('/api/vibes', vibeRoutes);
app.use('/api/preferences', preferenceRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}. Route not found.`,
  });
});

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✨ VibeCheck backend server running on http://localhost:${PORT}`);
  console.log(`💌 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
