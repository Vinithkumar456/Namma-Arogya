const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const chatRoutes = require('./routes/chatRoutes');
const predictRoutes = require('./routes/predictRoutes');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require("http");
const Message = require('./models/message'); // ✅ Message model

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// ----------------- Middlewares -----------------
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));

// ----------------- API Routes -----------------
app.use('/api/user', userRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/chatbot', chatRoutes);
app.use('/api/predict', predictRoutes);

// ----------------- SOCKET -----------------
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = {}; // To store connected users

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Join personal room using userId or doctorId
  socket.on('join', (userId) => {
    socket.join(userId);
    users[userId] = socket.id;
    console.log(`📥 User joined personal room: ${userId}`);
  });

  // Join group room
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    users[userId] = socket.id;
    socket.broadcast.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      console.log(`❗️ User disconnected: ${socket.id}`);
      delete users[userId];
      socket.broadcast.to(roomId).emit('user-disconnected', userId);
    });
  });

  // Handle sending message
  socket.on('send_message', async (data) => {
    try {
      const { senderId, receiverId, message } = data;

      const newMessage = new Message({
        senderId,
        receiverId,
        message,
        timestamp: new Date()
      });
      const savedMessage = await newMessage.save();

      // Emit message to both sender and receiver
      io.to(senderId).emit('receive_message', savedMessage);
      io.to(receiverId).emit('receive_message', savedMessage);
    } catch (err) {
      console.error('❗️ Error in send_message:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log(`❗️ User disconnected: ${socket.id}`);
  });
});

// ----------------- API to Fetch Old Messages -----------------
app.get('/messages/:userId/:doctorId', async (req, res) => {
  const { userId, doctorId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: doctorId },
        { senderId: doctorId, receiverId: userId }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});
app.post('/predict', (req, res) => {
  const { symptoms } = req.body;
  const prediction = predictDisease(symptoms);
  res.json({ prediction });
});

// ----------------- START SERVER -----------------
const PORT = 3001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
