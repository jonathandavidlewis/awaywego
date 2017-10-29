const app = require('./server.js');
const http = require('http');
const port = process.env.PORT || 8080;
const socketio = require('socket.io');
const chatSockets = require('./sockets/plan-chat-sockets.js');

const server = http.createServer(app);
const io = socketio(server);
app.io = io;
chatSockets(io);

server.listen(port, () => console.log('listening on port: ', port));
