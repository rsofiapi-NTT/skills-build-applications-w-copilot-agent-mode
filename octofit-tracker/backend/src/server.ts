import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database.js';
import { Activity } from './models/activity.js';
import { LeaderboardEntry } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ name: 1 }).lean();
    res.json({ data: users, resource: 'users' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().populate('memberIds', 'name email').sort({ name: 1 }).lean();
    res.json({ data: teams, resource: 'teams' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().populate('userId', 'name email').sort({ completedAt: -1 }).lean();
    res.json({ data: activities, resource: 'activities' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('userId', 'name email').sort({ rank: 1 }).lean();
    res.json({ data: leaderboard, resource: 'leaderboard' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ level: 1, title: 1 }).lean();
    res.json({ data: workouts, resource: 'workouts' });
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit backend running on port ${port}`);
  console.log(`API available at ${baseUrl}`);
});
