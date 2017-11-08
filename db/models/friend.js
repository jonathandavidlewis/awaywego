const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../config.js');
const Schema = mongoose.Schema;

/**===== Friendship model =====**\
 Request flow
 - Friendship starts in status: 'Pending' until accepted
 - A friend request to an existing user will have to: field filled in with Id
 - When accepted, status goes to 'Accepted' and the server will look for
   and ensure there is a corresponding reverse record (from: toUser, to:fromUser),
   this will enforce that 'accepted' friendships are two-way relationships

 Invite flow
 - When inviting a user to the app, it will also start a friend request to the
   email address provided in the invite,
 - Upon new user signs up - signup handler triggers a search for friend requests
   to their email
 - if any are found it will wipe out email and replace it with their new userId
 - this will support showing a pending friend request to the new user in their
   friends panel
*/

const friendSchema = new Schema({
  from: { type: Schema.ObjectId, ref: 'User', required: true },
  to: { type: Schema.ObjectId, ref: 'User' },
  toEmail: String,
  status: { type: String, required: true, default: 'Pending' }
}, { timestamps: true });

var Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;
