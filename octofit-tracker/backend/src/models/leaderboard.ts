import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    weeklyActivityMinutes: { type: Number, required: true },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
