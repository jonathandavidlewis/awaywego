const app = require('./server.js');
const http = require('http');
const https = require('https');
const port = process.env.PORT || 8080;
const socketio = require('socket.io');
const chatSockets = require('./sockets/group-chat-sockets.js');
const eventSockets = require('./sockets/event-sockets.js');
const fs = require('fs');

const privateKey = fs.readFileSync('myserver.key', 'utf8');
const certificate = fs.readFileSync('domain.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const server = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const io = socketio(server);
app.io = io;
chatSockets(io);
eventSockets(io);

server.listen(port, () => console.log('listening on port: ', port));
