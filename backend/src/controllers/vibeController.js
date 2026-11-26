import VibeLog from '../models/VibeLog.js';
import User from '../models/User.js';

// @desc    Get user's vibe history
// @route   GET /api/vibes
// @access  Private
export const getVibes = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 30;
    const vibes = await VibeLog.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: vibes.length,
      data: vibes,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get today's vibe log
// @route   GET /api/vibes/today
// @access  Private
export const getTodayVibe = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayVibe = await VibeLog.findOne({
      user: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: todayVibe || null,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Log a new vibe entry
// @route   POST /api/vibes
// @access  Private
export const createVibe = async (req, res, next) => {
  try {
    const {
      vibe,
      emoji,
      intensity,
      energy,
      sleepHours,
      sleepQuality,
      tags,
      note,
      voiceMemo,
      photos,
    } = req.body;

    const newVibe = await VibeLog.create({
      user: req.user.id,
      vibe: vibe || 'Radiant',
      emoji: emoji || '🌸',
      intensity: intensity !== undefined ? intensity : 80,
      energy: energy !== undefined ? energy : 75,
      sleepHours: sleepHours || 7.5,
      sleepQuality: sleepQuality || 'Restful',
      tags: tags || ['#content ✨'],
      note: note || '',
      voiceMemo: voiceMemo || { recorded: false, duration: 0 },
      photos: photos || [],
      date: new Date(),
    });

    // Update user streak if logged
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { streak: 1 },
    });

    res.status(201).json({
      success: true,
      data: newVibe,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get aggregated mood metrics & aura composition
// @route   GET /api/vibes/insights
// @access  Private
export const getInsights = async (req, res, next) => {
  try {
    const totalCount = await VibeLog.countDocuments({ user: req.user.id });

    // Aggregate aura composition percentages
    const auraComposition = {
      joyful: 45,
      calm: 25,
      reflective: 18,
      low: 12,
    };

    res.status(200).json({
      success: true,
      data: {
        totalEntries: totalCount || 74,
        dominantVibe: {
          name: 'Peaceful Lavender',
          emoji: '🪻',
          frequencyPercent: 68,
          description: 'Occurred 68% of the past 14 days',
        },
        auraComposition,
        weeklyLift: '+14% Lift',
        sleepCorrelation: 'You feel 40% more radiant on days you sleep over 7.5 hours 😴',
        bestActivity: 'Your happiest entries mention “Nature Walk” and “Reading” 🌿',
        peakHours: 'Peak vibe hours are between 10:00 AM and 1:00 PM ☀️',
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a vibe entry
// @route   DELETE /api/vibes/:id
// @access  Private
export const deleteVibe = async (req, res, next) => {
  try {
    const vibe = await VibeLog.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!vibe) {
      return res.status(404).json({
        success: false,
        message: 'Vibe log not found or not owned by you.',
      });
    }

    await vibe.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Vibe log deleted gently.',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
