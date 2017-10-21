const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;

let planSchema = new Schema({
  userId: {type: Schema.ObjectId, ref: 'User' },
  title: {type: String, required: true},
  description: String,
  imageUrl: String,
  tags: [String],
  members: [{type: Schema.ObjectId, ref: 'User'}]
}, {timestamps: true});

var Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;
