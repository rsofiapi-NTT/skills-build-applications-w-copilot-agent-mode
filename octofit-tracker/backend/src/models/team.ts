import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    focus: { type: String, required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { collection: 'teams', timestamps: true },
);

export const Team = model('Team', teamSchema);
