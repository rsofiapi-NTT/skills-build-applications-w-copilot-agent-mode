import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
    exercises: [{ type: String, required: true }],
  },
  { collection: 'workouts', timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
