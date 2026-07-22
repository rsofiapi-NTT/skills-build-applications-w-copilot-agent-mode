import mongoose from 'mongoose';
import Activity from '../models/Activity';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Seed activities
    await Activity.deleteMany({});
    await Activity.insertMany([
      {
        name: 'Manga Maniacs',
        description:
          'Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).',
        schedule: 'Tuesdays at 7pm',
        maxAttendance: 15,
      },
    ]);
    console.log('Activities seeded');

    // TODO: Add seed data for users, teams, leaderboard, and workouts

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
