const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  person: {type:String ,},
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  messages: [messageSchema] // Embedding the messages schema
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
 