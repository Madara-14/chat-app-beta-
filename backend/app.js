const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const UserModel = require('./models/userSchema');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for development)
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
require('dotenv').config(); // This loads values from .env into process.env

mongoose.connect(process.env.MONGODB_URI);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const registerRoute = require('./Routes/register');
const loginRoute = require('./Routes/login');
const userRoute = require('./Routes/user');
const msgRoute = require('./Routes/usermessage');

// Basic route
app.get('/', (req, res) => {
  res.send('Hello My World');
});

// Use routes
app.use(registerRoute);
app.use(loginRoute);
app.use(userRoute);
app.use(msgRoute);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('msg', async ({ userId, msg_user, message }) => {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        console.error('User not found');
        return;
      }
      const userName = user.name;
      const newMessage = { content: message, person: userName };

      // Broadcast message to all connected clients
      const data = { username: userName, message };
      io.emit('msg', data);

      // Fetch all users from the database
      const allUsers = await UserModel.find({});
      for (let eachUser of allUsers) {
        if (eachUser.name !== userName) {
          eachUser.messages.push(newMessage);
          await eachUser.save();
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
server.listen(3001, () => {
  console.log('Server running on port 3001');
});

// Error handling for server 
server.on('error', (error) => {
  console.error('Server error:', error);
});
