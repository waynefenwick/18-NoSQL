const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName } = require('./data');

const seedData = async () => {
  try {
    await connection;

    // Delete the collections if they exist
    await User.deleteMany();
    await Thought.deleteMany();

    // Seed users
    const users = [];
    for (let i = 0; i < 20; i++) {
      const username = getRandomName();
      const email = `${username.replace(/\s+/g, '').toLowerCase()}@example.com`;

      users.push({ username, email });
    }

    const seededUsers = await User.create(users);

    // Seed thoughts
    const thoughts = [];
    for (let i = 0; i < 50; i++) {
      const randomUser = seededUsers[Math.floor(Math.random() * seededUsers.length)];
      const thoughtText = `This is thought ${i + 1} created by ${randomUser.username}`;

      thoughts.push({
        thoughtText,
        username: randomUser.username,
      });
    }

    await Thought.create(thoughts);

    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedData();
