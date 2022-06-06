import * as mongoose from 'mongoose';

export const ColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});
