const friendRouter = require('express').Router();
const Friend = require('../../db/models/friend.js');
const User = require('../../db/models/user.js');
const oid = require('mongoose').Types.ObjectId;


// get friends of user - /friends
friendRouter.get('/', (req, res) => {
  Friend.find({from: oid(req.user._id)})
    .populate('from', '-password').populate('to', '-password').exec()
    .then(friends => {
      res.status(200).json(friends);
    });
});

// get pending requests to me
friendRouter.get('/pending', (req, res) => {
  Friend.find({to: oid(req.user._id), status: 'pending'})
    .populate('from', '-password').populate('to', '-password').exec()
    .then(friends => {
      res.status(200).json(friends);
    });
});

// find user by email
// TODO: handle case sensitivity here
friendRouter.get('/find/:email', (req, res) => {
  console.log('Searching for user: ', decodeURI(req.params.email));
  User.findOne({email: decodeURI(req.params.email)}).select('-password').then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('user_not_found');
    }
  });
});

// post - new friend request to existing user
friendRouter.post('/new/:friendId', (req, res) => {
  const fromId = oid(req.user._id);
  const toId = oid(req.params.friendId);
  Friend.findOne({from: fromId, to: toId}).then(fr => {
    if (fr) { throw new Error('fr_exists'); }
    const newFr = { from: fromId, to: toId, status: 'pending' };
    return Friend.create(newFr);
  }).then(newFr => res.status(201).json({message: 'created', frId: newFr._id}))
    .catch(err => {
      if (err.message === 'fr_exists') {
        res.status(422).json('Friend request already exists');
      } else {
        res.status(500).json({message: 'Server error.', err});
      }
    });
});

// post - friend invite -
// TODO: send email to the invited friend
friendRouter.post('/invite', (req, res) => {
  const fromId = oid(req.user._id);
  const toEmail = req.params.toEmail;
  Friend.findOne({from: fromId, toEmail: toEmail}).then(fr => {
    if (fr) { throw new Error('fr_exists'); }
    const newFr = { from: fromId, toEmail: toEmail, status: 'pending' };
    return Friend.create(newFr);
  }).then(newFr => res.status(200).json({message: 'created', frId: newFr._id}))
    .catch(err => {
      if (err.message === 'fr_exists') {
        res.status(422).json('Friend request already exists');
      } else {
        res.status(500).json({message: 'Server error.', err});
      }
    });
});

// put - accept friend request
friendRouter.put('/accept/:frId', (req, res) => {
  const toId = oid(req.user._id);
  let fromId;
  Friend.findOneAndUpdate(
    {_id: oid(req.params.frId), to: toId}, // confirm this request is to me!
    {status: 'accepted'}
  ).then(fr => {
    if (!fr) { throw new Error('fr_not_found'); }
    // look for the inverse record, if not there create it
    fromId = oid(fr.from);
    return Friend.findOneAndUpdate({from: toId, to: fromId }, {status: 'accepted'}).exec();
  }).then(invFr => {
    if (!invFr) {
      const newFr = { from: toId, to: fromId, status: 'accepted' };
      return Friend.create(newFr).then(newFr => {
        res.status(200).json({message: 'friendship accepted', frId: newFr._id});
      });
    } else {
      res.status(200).json({message: 'friendship accepted', frId: invFr._id});
    }
  }).catch(err => {
    if (err.message === 'fr_not_found') {
      res.status(404).send();
    } else {
      res.status(500).json({message: 'Server error.', err});
    }
  });
});
/*** NOTE At the moment reject and cancel both delete the friend request
 and can only act on pending requests:
 reject from the side of the receiver, cancel from the side of the asker
 B/c in the future we plan to have other functionality built on reject/cancel
 where these routes will set status to REJECTED or CANCELLED
 these are implemented as PUT routes, not DELETE routes, for the time being
*/
// put - reject friend request
friendRouter.put('/reject/:frId', (req, res) => {
  const toId = oid(req.user._id);
  Friend.findOneAndRemove(
    {_id: oid(req.params.frId), to: toId, status: 'pending'}
  ).then(fr => {
    if (!fr) { throw new Error('fr_not_found'); }
    res.status(200).json({message: 'rejected-request-deleted', frId: fr._id});
  }).catch(err => {
    if (err.message === 'fr_not_found') {
      res.status(404).send();
    } else {
      res.status(500).json({message: 'Server error.', err});
    }
  });
});

// delete - cancel friend request
friendRouter.put('/cancel/:frId', (req, res) => {
  const fromId = oid(req.user._id);
  Friend.findOneAndRemove(
    {_id: oid(req.params.frId), from: fromId, status: 'pending'}
  ).then(fr => {
    if (!fr) { throw new Error('fr_not_found'); }
    res.status(200).json({message: 'updated', frId: fr._id});
  }).catch(err => {
    if (err.message === 'fr_not_found') {
      res.status(404).send();
    } else {
      res.status(500).json({message: 'Server error.', err});
    }
  });
});

// delete - unfriend TODO: implement this

module.exports = friendRouter;
