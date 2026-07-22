import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  name: string;
  description: string;
  schedule: string;
  maxAttendance: number;
}

const ActivitySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    schedule: { type: String, required: true },
    maxAttendance: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
