const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/ideas', require('./routes/ideas'));
app.use('/messages', require('./routes/messages'));
app.use('/opportunities', require('./routes/opportunities'));

// Socket.io: verify JWT and attach user id to socket
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('No token'));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (ideaId) => {
    socket.join(ideaId);
  });

  socket.on('sendMessage', async (data) => {
    try {
      const doc = await Message.create({
        ideaId: data.ideaId,
        sender: socket.userId,
        text: data.text,
      });
      const saved = await Message.findById(doc._id).populate('sender', 'name email');
      const payload = {
        _id: saved._id,
        ideaId: saved.ideaId,
        sender: saved.sender,
        text: saved.text,
        createdAt: saved.createdAt,
      };
      io.to(data.ideaId).emit('receiveMessage', payload);
    } catch (err) {
      console.error('Error saving message:', err);
      socket.emit('messageError', { message: 'Failed to save message' });
    }
  });

  socket.on('typing', (data) => {
    socket.to(data.ideaId).emit('typing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Connect to MongoDB
const Opportunity = require('./models/Opportunity');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pitchsap')
  .then(async () => {
    console.log('MongoDB connected');
    const count = await Opportunity.countDocuments();
    if (count === 0) {
      await Opportunity.insertMany([
        { title: 'SeedFund Accelerator 2024', description: 'Perfect opportunity for your idea! Connect with top investors and mentors.', matchScore: 94 },
        { title: 'TechStars MVP Program', description: '12-week program with funding and expert mentorship for early-stage ideas.', matchScore: 88 },
        { title: 'Y Combinator Apply', description: 'Apply with your validated idea and get feedback from the best in the industry.', matchScore: 91 },
      ]);
      console.log('Seeded demo opportunities');
    }
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));