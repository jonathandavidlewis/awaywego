const app = require('./server.js');
const http = require('http');
const port = process.env.PORT || 8080;
const socketio = require('socket.io');
const chatSockets = require('./sockets/group-chat-sockets.js');
const eventSockets = require('./sockets/event-sockets.js');
const fs = require('fs');

const server = http.createServer(app);
const io = socketio(server);
app.io = io;
chatSockets(io);
eventSockets(io);

server.listen(port, 'localhost', () => console.log('http server listening on port: ', port));
