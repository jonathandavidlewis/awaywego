const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  planId: {type: Schema.ObjectId, ref: 'Plan', required: true },
  startTime: {type: String, required: true},
  endTime: {type: String, required: false},
  status: {type: String, required: true},
  upVotes: [{type: Schema.ObjectId, ref: 'User'}],
  downVotes: [{type: Schema.ObjectId, ref: 'User'}],
  imageUrl: String,
  tags: [String],
}, {timestamps: true});

var PlanEvent = mongoose.model('PlanEvent', eventSchema);
module.exports = PlanEvent;
