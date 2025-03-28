const express = require("express");
const predictRoutes = require("./routes/predictRoutes");
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));

app.use("/api/predict", predictRoutes);
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
