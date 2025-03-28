const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    gender: String,
    age: Number,
    password: String
});

module.exports = mongoose.model('User', userSchema);
