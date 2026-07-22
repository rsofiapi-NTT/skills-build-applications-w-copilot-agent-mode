import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  name: string;
  description: string;
  schedule: string;
  max_attendance: number;
}

const ActivitySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    schedule: { type: String, required: true },
    max_attendance: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
