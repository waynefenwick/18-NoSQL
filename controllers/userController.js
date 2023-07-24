const { User, Thoughts } = require('../models');

const userController = {
  createUser({ body }, res) {
    User.create(body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },
  
  deleteUser(req, res) {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user's associated thoughts
        return Thoughts.deleteMany({ username: user.username })
          .then(() => {
            // Now, delete the user
            return user.remove();
          })
          .then(() => {
            res.json({ message: 'User deleted successfully' });
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  getAllUsers(req, res) {
    User.find({})
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { friends: req.body.friendId } },
      { new: true }
    )
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  removeFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.id,
      { $pull: { friends: req.body.friendId } },
      { new: true }
    )
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
