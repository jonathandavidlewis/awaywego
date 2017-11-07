const app = require('./server.js');
const http = require('http');
const https = require('https');
const port = process.env.PORT || 8080;
const httpsPort = process.env.HTTPS_PORT || 8443;
const socketio = require('socket.io');
const chatSockets = require('./sockets/group-chat-sockets.js');
const eventSockets = require('./sockets/event-sockets.js');
const fs = require('fs');

const credentials = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
};

const httpsServer = https.createServer(credentials, app);
const io = socketio(httpsServer);
app.io = io;
chatSockets(io);
eventSockets(io);

const httpsRedirect = http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url }).end();
});

httpsRedirect.listen(port, () => console.log('http listening on port:', port, 'to redirect to https'));

httpsServer.listen(httpsPort, () => console.log('https listening on port:', httpsPort));