const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
  userId: {type: Schema.ObjectId, ref: 'User', required: true},
  title: {type: String, required: true},
  addressName: {type: String, required: false},
  addressText: {type: String, required: false},
  addressLink: {type: String, required: false},
  description: {type: String, required: false},
  groupId: {type: Schema.ObjectId, ref: 'Group', required: true },
  startTime: {type: String, required: false},
  endTime: {type: String, required: false},
  status: {type: String, required: true},
  upVotes: [{type: Schema.ObjectId, ref: 'User'}],
  downVotes: [{type: Schema.ObjectId, ref: 'User'}],
  imageUrl: { type: String, default: 'https://i.pinimg.com/736x/fe/1f/3f/fe1f3fb578749b1ab731966d33f1104e--awkward-engagement-photos-hilarious-photos.jpg' },
  tags: [String],
}, {timestamps: true});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
