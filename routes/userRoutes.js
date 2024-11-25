// routes/userRoutes.js
const express = require('express');
const { getAllUsers, createUser, getUserById, updateUserDetails, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserDetails);
router.delete('/users/:id', deleteUser);


module.exports = router;
