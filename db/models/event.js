const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  planId: {type: Schema.ObjectId, ref: 'Plan', required: true },
  status: {type: String, required: true},
  imageUrl: String,
  tags: [String],
  upVotes: [{type: Schema.ObjectId, ref: 'User'}],
  downVotes: [{type: Schema.ObjectId, ref: 'User'}]
}, {timestamps: true});

var PlanEvent = mongoose.model('PlanEvent', eventSchema);
module.exports = PlanEvent;
