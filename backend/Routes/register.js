const express = require('express');
const router = express.Router();
const UserModel = require('../models/userSchema');

// Register endpoint
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.json({ message: 'User already exists' });
        }

        const existingUserName = await UserModel.findOne({ name });
        if (existingUserName) {
            return res.status(200).json({ message: 'Choose another username' });
        }
 
        // Create a new user
        const newUser = new UserModel({ name, email, password });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
