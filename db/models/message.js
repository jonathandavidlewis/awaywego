const mongoose = require('mongoose');
const db = require('../config.js');
const Schema = mongoose.Schema;

/**===== Chat model =====**\
 Each 'Plan' will have 1 Chat, therefore we won't need a standalone model
 to track Chat's, we'll just link messages directly to a Plan
 We won't keep track of members of a chat inside the chat, they are already
 tracked inside plan and that will be the source of truth
*/

const messageSchema = new Schema({
  planId: { type: Schema.ObjectId, ref: 'Plan', required: true },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  text: String
}, { timestamps: true });

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
