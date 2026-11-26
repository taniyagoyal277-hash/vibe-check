import express from 'express';
import {
  getPreferences,
  updatePreferences,
} from '../controllers/preferenceController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getPreferences)
  .put(updatePreferences);

export default router;
