const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const { thoughtText, username, userId } = req.body;

      // Create the thought
      const thought = await Thought.create({ thoughtText, username });

      // Update the associated user's thoughts array with the new thought's _id
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      // Remove the thought's _id from the associated user's thoughts array
      await User.findByIdAndUpdate(
        thought.username,
        { $pull: { thoughts: thought._id } },
        { new: true }
      );

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought's reactions array
  async createReaction(req, res) {
    try {
      // Implement the logic to create a new reaction and add it to the thought's reactions array
      // ...
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a thought's reactions array by reactionId
  async removeReaction(req, res) {
    try {
      // Implement the logic to remove a reaction from the thought's reactions array by reactionId
      // ...
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friends array
  async addFriend(req, res) {
    try {
      // Implement the logic to add a friend to a user's friends array
      // ...
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friends array by friendId
  async removeFriend(req, res) {
    try {
      // Implement the logic to remove a friend from a user's friends array by friendId
      // ...
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
