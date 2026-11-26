import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to generate JWT Token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'vibecheck_super_secret_jwt_key_cozy_pastel_2026';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id }, secret, { expiresIn });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, username, password, avatar } = req.body;

    // Check if email or username already taken
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'An account with that email already exists.',
      });
    }

    const existingUsername = await User.findOne({ username: username.toLowerCase() });
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: 'That username is already taken. Please choose another cozy handle.',
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      avatar: avatar || undefined,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        streak: user.streak,
        memberDays: user.memberDays,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { identity, password } = req.body;

    if (!identity || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both an email/username and password.',
      });
    }

    // Support logging in via either email or username (with or without @ prefix)
    const cleanedIdentity = identity.trim().toLowerCase().replace(/^@/, '');
    const user = await User.findOne({
      $or: [{ email: cleanedIdentity }, { username: cleanedIdentity }],
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your details.',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your password.',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        streak: user.streak,
        memberDays: user.memberDays,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        streak: user.streak,
        memberDays: user.memberDays,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        streak: user.streak,
        memberDays: user.memberDays,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Request password reset link
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    // Don't disclose if user exists for security
    res.status(200).json({
      success: true,
      message: 'If that email exists in our records, a magical recovery link has been dispatched.',
    });
  } catch (err) {
    next(err);
  }
};
