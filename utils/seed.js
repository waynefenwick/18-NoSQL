const connection = require('../config/connection');
const { User, Thought } = require('../models');

const seedData = async () => {
  try {
    await connection.once('open', async () => {
      // Seeding logic for users
      const usersData = [
        {
          username: 'user1',
          email: 'user1@example.com',
          // other user properties
        },
        {
          username: 'user2',
          email: 'user2@example.com',
          // other user properties
        },
        // Add more users as needed
      ];

      const users = await User.create(usersData);

      // Seeding logic for thoughts
      const thoughtsData = [
        {
          thoughtText: 'Thought 1 by user1',
          username: 'user1', // The username of the user who created this thought
          // other thought properties
        },
        {
          thoughtText: 'Thought 2 by user1',
          username: 'user1',
          // other thought properties
        },
        {
          thoughtText: 'Thought 1 by user2',
          username: 'user2',
          // other thought properties
        },
        // Add more thoughts as needed
      ];

      const thoughts = await Thought.create(thoughtsData);

      console.info('Seeding complete! 🌱');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedData();
