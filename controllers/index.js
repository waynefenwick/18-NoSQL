const { createUser } = require('./userController');
const { createThought, getThought, updateThought, deleteThought } = require('./thoughtsController');

module.exports = { createUser, createThought, getThought, updateThought, deleteThought };
