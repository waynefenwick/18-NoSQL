const { User, Thoughts } = require('../models');

const userController = {
  // Create a user
  async createUser({ body }, res) {
    try {
      const data = await User.create(body);
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        console.log('User not found.');
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete the user's associated thoughts
      await Thoughts.deleteMany({ username: user.username });
  
      // Now, delete the user
      await User.deleteOne({ _id: user._id });
  
      console.log('User deleted successfully.');
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json(err);
    }
  },
  
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend
  async addFriend(req, res) {
    try {
      const { friendId } = req.body;
      
      // Check if the user with the given userId exists
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the friend with the given friendId exists
      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({ message: 'Friend not found' });
      }
  
      // Add the friend to the user's friends list
      user.friends.push(friendId);
      await user.save();
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a friend
  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId, // Use "userId" from the route
        { $pull: { friends: req.params.friendId } }, // Use "friendId" from the route
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
