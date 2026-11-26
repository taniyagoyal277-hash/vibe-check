import Task from '../models/Task.js';

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const { completed, category } = req.query;
    const filter = { user: req.user.id };

    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    if (category) {
      filter.category = category;
    }

    let tasks = await Task.find(filter).sort({ createdAt: -1 });

    // Seed default gentle intentions if user has no tasks yet
    if (tasks.length === 0 && !completed && !category) {
      const defaultTasks = [
        {
          user: req.user.id,
          title: 'Drink warm lemon tea 🍵',
          completed: true,
          category: 'wellness',
          icon: 'spa',
          iconColor: 'text-tertiary',
        },
        {
          user: req.user.id,
          title: '15 min nature walk 🍃',
          completed: true,
          category: 'wellness',
          icon: 'nature_people',
          iconColor: 'text-secondary',
        },
        {
          user: req.user.id,
          title: 'No screens after 10 PM 🌙',
          completed: false,
          category: 'mindfulness',
          icon: 'bedtime',
          iconColor: 'text-on-surface-variant',
        },
      ];
      tasks = await Task.insertMany(defaultTasks);
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not owned by you.',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new task / daily intention
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      completed,
      category,
      icon,
      iconColor,
      priority,
      dueDate,
    } = req.body;

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      completed: completed || false,
      category: category || 'wellness',
      icon: icon || 'spa',
      iconColor: iconColor || 'text-primary',
      priority: priority || 'gentle',
      dueDate: dueDate || Date.now(),
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not owned by you.',
      });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle task completion status
// @route   PATCH /api/tasks/:id/toggle
// @access  Private
export const toggleTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not owned by you.',
      });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not owned by you.',
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task gently removed from your constellation.',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
