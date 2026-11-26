import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    username: {
      type: String,
      required: [true, 'Please choose a username'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBeLBn0mDwYnvaEagjwjqUfpEtpVFQo1c0lf8REPnTkqkVx7XThXvUL4D4_KaqQkYKkMnrfG-3vJkSlvZjbbtzziBaH4IO5auSj1hQDQCRD8rF3DYa-2wZgTZnKvMB06VLde028mWJjZcRx43yjYEcJKZrgTy4XTj_8H0LrG428K04HJ-Fe_IEXrAUaBFt9FplzJM4EVqatMnCNT0azd2l2J3l4JdyfujoSoCUqRrI',
    },
    streak: {
      type: Number,
      default: 7,
    },
    memberDays: {
      type: Number,
      default: 142,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
export default User;
