// To get some data seeded to DB
const connectToDatabase = require('../config/connection');
const { User, Thoughts } = require('../models');

const seedData = async () => {
  try {
    await connectToDatabase(); // Establish the database connection

    // Seeding logic for users
    const usersData = [
      {
        username: 'user1',
        email: 'user1@example.com',
        // other user properties
      },
    ];

    const users = await User.create(usersData);

    // Seeding logic for thoughts
    const thoughtsData = [
      {
        thoughtText: 'Thought 1 by user1',
        username: 'user1', // The username of the user who created this thought
        // other thought properties
      },
    ];

    const thoughts = await Thoughts.create(thoughtsData);

    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedData();
