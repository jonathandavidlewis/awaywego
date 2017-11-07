const app = require('./server.js');
const http = require('http');
const https = require('https');
const port = process.env.PORT || 8080;
const httpsPort = process.env.HTTPS_PORT || 8443;
const socketio = require('socket.io');
const chatSockets = require('./sockets/group-chat-sockets.js');
const eventSockets = require('./sockets/event-sockets.js');
const fs = require('fs');

const credentials = {};

if (process.env.HTTPS_CERT) {
  credentials.key = process.env.HTTPS_KEY;
  credentials.cert = process.env.HTTPS_CERT;
} else {
  credentials.key = fs.readFileSync('privkey.pem');
  cerdentials.cert = fs.readFileSync('fullchain.pem');
}
console.log(process.env.HTTPS_CERT);
console.log(process.env.HTTPS_KEY);

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