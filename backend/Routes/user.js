// Backend API route to fetch all users
const express = require('express');
const router = express.Router();
const UserModel = require('../models/userSchema');


// GET all users
router.get('/Users', async (req, res) => {
  try {
    const users = await UserModel.find({}, 'name email'); // Fetch only necessary fields
    // console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;
