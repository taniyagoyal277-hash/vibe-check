import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ['wellness', 'mindfulness', 'routine', 'gratitude', 'work', 'other'],
      default: 'wellness',
    },
    icon: {
      type: String,
      default: 'spa',
    },
    iconColor: {
      type: String,
      default: 'text-primary',
    },
    priority: {
      type: String,
      enum: ['gentle', 'medium', 'high'],
      default: 'gentle',
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model('Task', taskSchema);
export default Task;
