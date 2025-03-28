const bcrypt = require('bcryptjs');
const Doctor = require('../models/doctorModel');

exports.registerDoctor = async (req, res) => {
    const { fullname, username, email, gender, speciality, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const doctor = new Doctor({ fullname, username, email, gender, speciality, password: hashedPassword });
        await doctor.save();
        res.json({ message: "Doctor registered successfully" });
    } catch (error) {
        res.status(400).json({ error: "Error Registering Doctor" });
    }
};

exports.loginDoctor = async (req, res) => {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }

    req.session.doctor = doctor;
    res.json({ message: "Login successful" });
};

exports.logoutDoctor = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logout successful" });
    });
};
