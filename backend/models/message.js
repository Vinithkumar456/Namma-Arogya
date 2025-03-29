const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: String, ref: 'User' },
  receiverId: { type: String, ref: 'User' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
