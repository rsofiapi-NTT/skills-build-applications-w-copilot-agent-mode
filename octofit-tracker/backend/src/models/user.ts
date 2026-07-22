import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    favoriteActivity: { type: String, required: true },
  },
  { collection: 'users', timestamps: true },
);

export const User = model('User', userSchema);
