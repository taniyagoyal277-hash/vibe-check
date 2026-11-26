import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    reminders: {
      type: Boolean,
      default: true,
    },
    reminderTime: {
      type: String,
      default: '9:00 PM',
    },
    theme: {
      type: String,
      default: 'Cotton Candy Dream',
    },
    faceId: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Preference = mongoose.model('Preference', preferenceSchema);
export default Preference;
