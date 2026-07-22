import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        age: 29,
        fitnessGoal: 'Build endurance for a spring half marathon',
        favoriteActivity: 'Trail running',
      },
      {
        name: 'Jordan Rivera',
        email: 'jordan.rivera@example.com',
        age: 34,
        fitnessGoal: 'Improve functional strength and mobility',
        favoriteActivity: 'Kettlebell circuits',
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        age: 26,
        fitnessGoal: 'Stay consistent with daily movement',
        favoriteActivity: 'Indoor cycling',
      },
      {
        name: 'Andre Brooks',
        email: 'andre.brooks@example.com',
        age: 41,
        fitnessGoal: 'Increase weekly activity minutes',
        favoriteActivity: 'Rowing',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Octo Runners',
        city: 'San Francisco',
        focus: 'Outdoor cardio challenges',
        memberIds: [users[0]._id, users[2]._id],
      },
      {
        name: 'Core Commit Crew',
        city: 'Austin',
        focus: 'Strength and mobility',
        memberIds: [users[1]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 46,
        caloriesBurned: 430,
        completedAt: new Date('2026-07-19T13:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength training',
        durationMinutes: 38,
        caloriesBurned: 310,
        completedAt: new Date('2026-07-20T22:15:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 52,
        caloriesBurned: 470,
        completedAt: new Date('2026-07-21T12:00:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'Rowing',
        durationMinutes: 44,
        caloriesBurned: 395,
        completedAt: new Date('2026-07-21T23:45:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[2]._id,
        rank: 1,
        points: 1280,
        weeklyActivityMinutes: 286,
      },
      {
        userId: users[0]._id,
        rank: 2,
        points: 1195,
        weeklyActivityMinutes: 264,
      },
      {
        userId: users[3]._id,
        rank: 3,
        points: 1090,
        weeklyActivityMinutes: 241,
      },
      {
        userId: users[1]._id,
        rank: 4,
        points: 980,
        weeklyActivityMinutes: 215,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        level: 'Beginner',
        durationMinutes: 20,
        focusArea: 'Mobility',
        exercises: ['Cat-cow flow', 'Hip airplanes', 'World greatest stretch', 'Thoracic rotations'],
      },
      {
        title: 'Lunchtime Power Ride',
        level: 'Intermediate',
        durationMinutes: 35,
        focusArea: 'Cardio',
        exercises: ['Cadence warmup', 'Hill repeats', 'Tempo blocks', 'Cooldown spin'],
      },
      {
        title: 'Full-body Strength Builder',
        level: 'Intermediate',
        durationMinutes: 45,
        focusArea: 'Strength',
        exercises: ['Goblet squats', 'Push-ups', 'Single-arm rows', 'Farmer carries'],
      },
      {
        title: 'Endurance Row Ladder',
        level: 'Advanced',
        durationMinutes: 40,
        focusArea: 'Endurance',
        exercises: ['500m row', 'Bodyweight lunges', '750m row', 'Plank hold'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
