const express = require('express');
const router = express.Router();
const UserModel = require('../models/userSchema');

// Login endpoint
router.post('/login', async (req, res) => {
    // getting email from request 
    const email = req.body.email; 
      // getting the user from the database 
      const  user = await  UserModel.findOne({email})
      // email exist or not chk 
        if(!user){
          console.log('failed');
          return res.status(200).send({message: 'Invalid email or password'})
           
        }
        // if email exist then check the password
        if(user.password!==req.body.password){
       return res.send({message:'Invalid email or password'});
        }
        // suceess 
        if(user.password === req.body.password){
          return res.status(200).send({message: 'Login successful', user})}
        
          
    // Add your login logic here (e.g., authenticate user)
     
});
 
module.exports = router;
