var express = require('express');
var path = require('path');
var morgan = require('morgan');
let app = express();
var { authRouter, jwtAuth } = require('./auth.js');

const User = require('../db/models/user');

app.use(morgan('[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer"'));

app.use('/auth', authRouter);

//todo: set to api routes
app.post('/testAuth', jwtAuth, (req, res) => {
  res.json('Access granted');
});

// Serve up static files
app.use(express.static(path.join(__dirname, '../client/public/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/dist/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Running on ' + port);
});

module.exports.app = app;