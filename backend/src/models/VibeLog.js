import mongoose from 'mongoose';

const vibeLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    vibe: {
      type: String,
      required: [true, 'Please select a vibe'],
      trim: true,
    },
    emoji: {
      type: String,
      default: '🌸',
    },
    intensity: {
      type: Number,
      min: 0,
      max: 100,
      default: 80,
    },
    energy: {
      type: Number,
      min: 0,
      max: 100,
      default: 75,
    },
    sleepHours: {
      type: Number,
      default: 7.5,
    },
    sleepQuality: {
      type: String,
      default: 'Restful',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    note: {
      type: String,
      maxlength: [280, 'Note cannot exceed 280 characters'],
      default: '',
    },
    voiceMemo: {
      recorded: { type: Boolean, default: false },
      duration: { type: Number, default: 0 },
    },
    photos: [
      {
        type: String,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const VibeLog = mongoose.model('VibeLog', vibeLogSchema);
export default VibeLog;
