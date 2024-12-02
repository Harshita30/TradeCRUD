// controllers/userController.js
const User = require('../models/userModel');
const logger = require('../utils/logger')

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = '' } = req.query;
    const skip = (page - 1) * limit;
    const query = search ? { name: {$regex: search, $options: 'i'} } : {}

    const data = await User.find(query).skip(skip).limit(Number(limit));
    
    const totalUsers = await User.countDocuments();

    if (data) {
      logger.info('All fetched users.');
      res.status(200).json({ message: 'All fetched users.', data, totalUsers, totalPages: Math.ceil(totalUsers / limit), currentPage: Number(page) });
    } else {
      logger.error('No user found. Something went wrong.');
      res.status(404).send('No user found. Something went wrong.');
    }
  } catch (error) {
    logger.error(`Get: Error fetching users. ${error.stack}`);
    res.status(500).json({ message: 'Get: Error in fetching users' });
  }
};

const createUser = async (req, res) => {
  try {
    console.log('Save user API')
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    // console.log(data)
    const user = new User(userData);
    const data = await user.save();
    if (data) {
      res.status(200).json({ message: 'Successfully user added' });
    } else {
      res.status(500).send('No user added. Something went wrong.');
    }
  } catch (error) {
    res.status(500).json({ message: 'Create: Error in saving users' });
  }
};

const getUserById = async (req, res) => {
  // console.log(req.params)
  try {
    const data = await User.findById(req.params.id);
    // console.log(data)
    if (data) {
      res.status(200).json({ message: 'Successfully users fetched', data });
    } else {
      res.status(404).send('No user found with the ObjectId');
    }
  } catch (error) {
    res.status(500).json({ message: 'Get By Id: Error in fetching user by id' });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (data) {
      res.status(200).json({ message: 'User updated.', data });
    } else {
      res.status(404).send('No user found with the ObjectId to update');
    }
  } catch (error) {
    res.status(500).json({ message: 'Update: Error in updating users' });
  }
};


const deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    if (data) {
      res.status(200).json({ message: 'User deleted.' });
    } else {
      res.status(404).send('No user found with the ObjectId to detete');
    }
  } catch (error) {
    res.status(500).json({ message: 'Delete: Error in deleting users' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserDetails,
  deleteUser
};
