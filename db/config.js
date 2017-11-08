const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoUri = 'mongodb://localhost/awaywego';
mongoose.connect(process.env.MONGODB_URI || mongoUri, {useMongoClient: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('MongoDB connection open');
});

module.exports = db;
