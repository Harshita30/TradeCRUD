// controllers/userController.js
const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const createUser = async (req, res) => {
    console.log('Save user API')
    const data = {
        name:"Harshita",
        email:'harshita1709195@gmail.com',
        password:'Harshit'
    }
    const user = new User(data);
    await user.save();
    res.send({message:"Success"})
};

module.exports = {
  getAllUsers,
  createUser
};
