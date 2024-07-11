const express = require('express');
const router = express.Router();
const UserModel = require('../models/userSchema');

// Existing user route code...

// Add the new /messages route
router.post('/messages', async (req, res) => {
  const { userId, content } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (user) {
      console.log('user:', user.name);
      const newMessage = { content , person:user.name  };
      user.messages.push(newMessage);
      await user.save();
      return res.status(200).json(user); // Return the updated list of user which contain both name=>user.name and msgs=> user.messages
      console.log('usermsg-19');
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Existing usermessage route code...

// Add a new route to get messages for a specific user
router.get('/messages/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (user) {
      return res.status(200).json(user.messages);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


module.exports = router;
