import express from 'express';
import { body } from 'express-validator';
import {
  getVibes,
  getTodayVibe,
  createVibe,
  getInsights,
  deleteVibe,
} from '../controllers/vibeController.js';
import protect from '../middleware/auth.js';
import validateRequest from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

const vibeValidation = [
  body('vibe').trim().notEmpty().withMessage('Vibe name is required'),
  validateRequest,
];

router.route('/')
  .get(getVibes)
  .post(vibeValidation, createVibe);

router.get('/today', getTodayVibe);
router.get('/insights', getInsights);
router.delete('/:id', deleteVibe);

export default router;
