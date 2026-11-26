import express from 'express';
import { body } from 'express-validator';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
} from '../controllers/taskController.js';
import protect from '../middleware/auth.js';
import validateRequest from '../middleware/validation.js';

const router = express.Router();

// Apply auth protection to all task routes
router.use(protect);

const taskValidation = [
  body('title').trim().notEmpty().withMessage('Task / Intention title is required'),
  validateRequest,
];

router.route('/')
  .get(getTasks)
  .post(taskValidation, createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/toggle', toggleTask);

export default router;
