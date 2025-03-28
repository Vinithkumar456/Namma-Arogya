const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
    const { fullname, username, email, gender, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const user = new User({ fullname, username, email, gender, age, password: hashedPassword });
        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: "Error Registering User" });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }

    req.session.user = user;
    res.json({ message: "Login successful" });
};

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logout successful" });
    });
};
