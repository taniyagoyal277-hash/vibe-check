import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getMe,
  updateProfile,
  forgotPassword,
} from '../controllers/authController.js';
import protect from '../middleware/auth.js';
import validateRequest from '../middleware/validation.js';

const router = express.Router();

// Validation chains
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validateRequest,
];

const loginValidation = [
  body('identity').trim().notEmpty().withMessage('Email or username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest,
];

const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  validateRequest,
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
