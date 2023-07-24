const connection = require('../config/connection');
const { User, Thought } = require('../models');

const seedData = async () => {
  try {
    await connection.once('open', async () => {
      // Your seeding logic for users and thoughts here...

      console.info('Seeding complete! 🌱');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedData();
