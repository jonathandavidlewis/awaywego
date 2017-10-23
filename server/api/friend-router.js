const friendRouter = require('express').Router();
const Friend = require('../../db/models/friend.js');
const User = require('../../db/models/user.js');
const oid = require('mongoose').Types.ObjectId;


// get friends of user - /friends
friendRouter.get('/', (req, res) => {
  Friend.find({from: oid(req.user._id)}).then(friends => {
    res.status(200).json(friends);
  });
});


// post - friend invite -

// put - accept friend request

// put - reject friend request

// put - cancel friend request


module.exports = friendRouter;
