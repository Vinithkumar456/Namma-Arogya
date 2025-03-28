const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullname: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    gender: String,
    speciality: String,
    password: String
});

module.exports = mongoose.model('Doctor', doctorSchema);
