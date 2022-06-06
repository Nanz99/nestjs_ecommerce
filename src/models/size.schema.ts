import * as mongoose from 'mongoose';

export const SizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});
