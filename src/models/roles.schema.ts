import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});
