const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let mentorSocketId = null;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Adjust the origin as needed
  credentials: true
}));

io.on('connection', (socket) => {
  console.log('A user connected');

  // If no mentor is assigned yet, assign the current socket as mentor
  if (!mentorSocketId) {
    mentorSocketId = socket.id;
    socket.emit('role', 'mentor');
    console.log('Assigned mentor role to socket:', socket.id);
  } else {
    socket.emit('role', 'student');
    console.log('Assigned student role to socket:', socket.id);
  }

  socket.on('codeChange', newCode => {
    io.emit('codeChange', newCode);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    if (socket.id === mentorSocketId) {
      mentorSocketId = null; // Reset mentor ID if mentor disconnects
      console.log('Mentor disconnected, mentor role removed');
    }
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
