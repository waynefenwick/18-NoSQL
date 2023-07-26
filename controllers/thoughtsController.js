const { User, Thoughts } = require('../models');

const thoughtsController = {
    // Create a thought
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

    // Delete a thought
    async deleteThought(req, res) {
      try {
        const deletedThought = await Thoughts.findByIdAndDelete(req.params.id);
    
        if (!deletedThought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
    
        res.json({ message: 'Thought deleted successfully' });
      } catch (err) {
        console.error('Error deleting thought:', err);
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
  
    // Delete a reaction from a thought's reactions array by reactionId
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
  };

  module.exports = thoughtsController;