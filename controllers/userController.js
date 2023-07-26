const { User, Thoughts } = require('../models');

const userController = {
  async createUser({ body }, res) {
    try {
      const data = await User.create(body);
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  
  deleteUser(req, res) {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          console.log('User not found.');
          return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user's associated thoughts
        Thoughts.deleteMany({ username: user.username })
          .then(() => {
            // Now, delete the user
            return User.deleteOne({ _id: user._id });
          })
          .then(() => {
            console.log('User deleted successfully.');
            res.json({ message: 'User deleted successfully' });
          })
          .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json(err);
          });
      })
      .catch(err => {
        console.error('Error finding user:', err);
        res.status(500).json(err);
      });
  },
  

  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

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

  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { friends: req.body.friendId } },
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
