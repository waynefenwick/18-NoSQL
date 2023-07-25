const { User, Thoughts } = require('../models');

const thoughtsController = {
    async createThought(req, res) {
      try {
        const { thoughtText, username, userId } = req.body;
        const thought = await Thoughts.create({ thoughtText, username });
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

  // Delete a thought by its _id
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thoughts.findByIdAndDelete(req.params.id);
  
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
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


    // Add a reaction to a thought's reactions array
    async createReaction(req, res) {
      try {
        const { reactionBody, username } = req.body;
        const { thoughtId } = req.params;
  
        // Find the thought by its _id
        const thought = await Thoughts.findById(thoughtId);
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        // Add the new reaction to the thought's reactions array
        thought.reactions.push({ reactionBody, username });
  
        // Save the updated thought with the new reaction
        const updatedThought = await thought.save();
  
        res.json(updatedThought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    // Remove a reaction from a thought's reactions array by reactionId
    async removeReaction(req, res) {
      try {
        const { thoughtId, reactionId } = req.params;
  
        // Find the thought by its _id
        const thought = await Thoughts.findById(thoughtId);
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        // Filter out the reaction to be removed from the reactions array
        thought.reactions = thought.reactions.filter(
          (reaction) => reaction._id.toString() !== reactionId
        );
  
        // Save the updated thought after removing the reaction
        const updatedThought = await thought.save();
  
        res.json(updatedThought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    // Add a friend to a user's friends array
    async addFriend(req, res) {
      try {
        const { userId } = req.params;
        const { friendId } = req.body;
  
        // Find the user and the friend by their _id
        const [user, friend] = await Promise.all([
          User.findById(userId),
          User.findById(friendId),
        ]);
  
        if (!user || !friend) {
          return res
            .status(404)
            .json({ message: 'User or friend with this id not found!' });
        }
  
        // Add the friend to the user's friends array (avoid duplicates)
        if (!user.friends.includes(friend._id)) {
          user.friends.push(friend._id);
        }
  
        // Save the updated user with the new friend
        const updatedUser = await user.save();
  
        res.json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    // Remove a friend from a user's friends array by friendId
    async removeFriend(req, res) {
      try {
        const { userId } = req.params;
        const { friendId } = req.body;
  
        // Find the user and the friend by their _id
        const [user, friend] = await Promise.all([
          User.findById(userId),
          User.findById(friendId),
        ]);
  
        if (!user || !friend) {
          return res
            .status(404)
            .json({ message: 'User or friend with this id not found!' });
        }
  
        // Filter out the friend to be removed from the friends array
        user.friends = user.friends.filter(
          (friendId) => friendId.toString() !== friend._id.toString()
        );
  
        // Save the updated user after removing the friend
        const updatedUser = await user.save();
  
        res.json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };

  module.exports = thoughtsController;