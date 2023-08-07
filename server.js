// app.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 4000;

// Serve the static HTML and JS files from the "public" directory
app.use(express.static('public'));

// Event handler for new client connections
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Event handler for receiving chat messages from the client
  socket.on('chatMessage', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients, including the sender
    io.emit('chatMessage', message);
  });

  // Event handler for disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});
