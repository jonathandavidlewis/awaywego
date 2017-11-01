const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;

let groupSchema = new Schema({
  userId: {type: Schema.ObjectId, ref: 'User', required: true }, // group owner
  title: {type: String, required: true}, // group name
  description: String,
  imageUrl: {type: String, default: 'http://wilderness.org/sites/default/files/styles/blog_full/public/boots%20at%20lake%20photo.jpg?itok=nIFuJ6G5'},
  tags: [String],
  members: [{type: Schema.ObjectId, ref: 'User'}]
}, {timestamps: true});

var Group = mongoose.model('Group', groupSchema);
module.exports = Group;
