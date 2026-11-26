import Preference from '../models/Preference.js';

// @desc    Get user preferences
// @route   GET /api/preferences
// @access  Private
export const getPreferences = async (req, res, next) => {
  try {
    let preference = await Preference.findOne({ user: req.user.id });

    if (!preference) {
      preference = await Preference.create({
        user: req.user.id,
        reminders: true,
        reminderTime: '9:00 PM',
        theme: 'Cotton Candy Dream',
        faceId: true,
      });
    }

    res.status(200).json({
      success: true,
      data: preference,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user preferences
// @route   PUT /api/preferences
// @access  Private
export const updatePreferences = async (req, res, next) => {
  try {
    let preference = await Preference.findOne({ user: req.user.id });

    if (!preference) {
      preference = new Preference({ user: req.user.id });
    }

    const { reminders, reminderTime, theme, faceId } = req.body;

    if (reminders !== undefined) preference.reminders = reminders;
    if (reminderTime) preference.reminderTime = reminderTime;
    if (theme) preference.theme = theme;
    if (faceId !== undefined) preference.faceId = faceId;

    await preference.save();

    res.status(200).json({
      success: true,
      data: preference,
    });
  } catch (err) {
    next(err);
  }
};
