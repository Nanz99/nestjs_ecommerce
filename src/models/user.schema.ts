import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date, default: null },
    numberPhone: { type: String, default: null },
    gender: { type: String, default: null },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    salt: { type: String },
    resetPasswordLink: { type: String, default: '' },
    isActive: { type: Boolean, default: false },
    address: { type: String, default: null },
    status: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);
