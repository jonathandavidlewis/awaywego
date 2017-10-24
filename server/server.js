const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const authRouter = require('./auth/auth-router.js');
const apiRouter = require('./api/api-router.js');
const { jwtAuth } = require('./auth/auth-config.js');

const User = require('../db/models/user');

app.use(morgan('[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer"'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/api', jwtAuth, apiRouter);

// //todo: set to api routes
// app.post('/testAuth', jwtAuth, (req, res) => {
//   res.json('Access granted');
// });

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
