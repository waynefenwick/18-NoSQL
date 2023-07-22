const { User, Thought } = require('../models');

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
        return Thought.deleteMany({ username: user.username })
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
};

module.exports = userController;
