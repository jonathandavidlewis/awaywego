const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../config.js');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
  eventId: {type: Schema.ObjectId, ref: 'Event', required: true},
  user: {type: Schema.ObjectId, ref: 'User', required: true},
  text: {type: String, required: false}
}, {timestamps: true});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
