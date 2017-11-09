const commentRouter = require('express').Router();
const Group = require('../../db/models/group.js');
const Event = require('../../db/models/event.js');
const Comment = require('../../db/models/comment.js');
const oid = require('mongoose').Types.ObjectId;
const debug = process.env.DEBUG || true;

commentRouter.all('/event/:eventId', (req, res, next) => {
  eventPermissionsCheck(req.user._id, req.params.eventId)
    .then(() => next())
    .catch(err => handleError(req, res, err));
});

commentRouter.get('/event/:eventId', (req, res) => {
  Comment.find({eventId: oid(req.params.eventId)})
    .sort('-createdAt').limit(10)
    .populate('user', '-password').exec()
    .then(comments => res.status(200).json(comments))
    .catch(err => handleError(req, res, err));
});

commentRouter.post('/event/:eventId', (req, res) => {
  if (debug) { console.log('Comment post received for event: ', req.params.eventId, ', body: ', req.body); }
  let newComment = {
    eventId: req.params.eventId,
    user: req.user._id,
    text: req.body.text
  };
  Comment.create(newComment)
    .then(newComment => newComment.populate('user', '-password').execPopulate())
    .then(newComment => res.status(201).json({message: 'created', newComment}))
    .catch(err => handleError(req, res, err));
});

commentRouter.all('/:commentId', (req, res, next) => {
  commentPermissionsCheck(req.user._id, req.params.commentId)
    .then(() => next())
    .catch(err => handleError(req, res, err));
});

commentRouter.put('/:commentId', (req, res) => {
  if (debug) { console.log('Comment update received for event: ', req.params.eventId, ' comment: ', req.params.commentId, ', body: ', req.body); }
  Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text})
    .then(updatedComment => {
      if (!updatedComment) { throw new Error('comment_not_found'); }
      res.status(200).json({message: 'updated', updatedComment});
    }).catch(err => handleError(req, res, err));
});

commentRouter.delete('/:commentId', (req, res) => {
  if (debug) { console.log('Comment delete received for event: ', req.params.eventId, ' comment: ', req.params.commentId); }
  Comment.findByIdAndRemove(req.params.commentId).then(removedComment => {
    res.status(200).json({message: 'removed', removedComment});
  }).catch(err => handleError(req, res, err));
});

// check if user is part of the group the event is in
// if no, throw an error, if yes let it through
const eventPermissionsCheck = (userId, eventId) => {
  return Event.findById(eventId).then(event => {
    if (!event) { throw new Error('event_not_found'); }
    return Group.findById(event.groupId).then(group => {
      if (!group) { throw new Error('group_not_found'); }
      if (group.members.indexOf(userId) === -1) { throw new Error('not_member'); }
    });
  });
};

const commentPermissionsCheck = (userId, commentId) => {
  let comment;
  return Comment.findById(commentId).then(foundComment => {
    comment = foundComment;
    if (!comment) { throw new Error('comment_not_found'); }
    if (!comment.user.equals(userId)) {
      Event.findById(comment.eventId)
        .then(e => Group.findById(e.groupId))
        .then(group => {
          if (!comment.user.equals(group.userId)) {
            throw new Error('not_users_comment');
          }
        });
    }
  });
};

const handleError = (req, res, err) => {
  if (err.message === 'event_not_found' ||
      err.message === 'group_not_found' ||
      err.message === 'comment_not_found') {
    res.status(404).send();
  } else if (err.message === 'not_member' ||
             err.message === 'not_users_comment') {
    res.status(401).send();
  } else if (err.message === 'bad_request') {
    res.status(400).send('bad request');
  } else {
    res.status(500).send('Server error: ', err);
  }
};

module.exports = commentRouter;
