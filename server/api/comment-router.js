const commentRouter = require('express').Router();
const Plan = require('../../db/models/plan.js');
const PlanEvent = require('../../db/models/event.js');
const Comment = require('../../db/models/comment.js');
const oid = require('mongoose').Types.ObjectId;
const debug = process.env.DEBUG || true;

commentRouter.all('/:planEventId', (req, res, next) => {
  permissionsCheck(req.user._id, req.params.planEventId)
    .then(() => next())
    .catch(err => handleError(req, res, err));
});

commentRouter.get('/:planEventId', (req, res) => {
  Comment.find({eventId: oid(req.params.planEventId)})
    .sort('-createdAt').limit(10)
    .populate('user', '-password').exec()
    .then(comments => res.status(200).json(comments))
    .catch(err => handleError(req, res, err));
});

commentRouter.post('/:planEventId', (req, res) => {
  if (debug) { console.log('Comment post received for event: ', req.params.planEventId, ', body: ', req.body); }
  let newComment = {
    eventId: req.params.planEventId,
    user: req.user._id,
    text: req.body.text
  };
  Comment.create(newComment)
    .then(newComment => res.status(201).json({message: 'created', newComment}))
    .catch(err => handleError(req, res, err));
});

commentRouter.put('/:planEventId/:commentId', (req, res) => {
  if (debug) { console.log('Comment update received for event: ', req.params.planEventId, ' comment: ', req.params.commentId, ', body: ', req.body); }
  Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text})
    .then(updatedComment => {
      if (!updatedComment) { throw new Error('comment_not_found'); }
      res.status(200).json({message: 'updated', updatedComment});
    }).catch(err => handleError(req, res, err));
});

commentRouter.delete('/:planEventId/:commentId', (req, res) => {
  if (debug) { console.log('Comment delete received for event: ', req.params.planEventId, ' comment: ', req.params.commentId); }
  Comment.findByIdAndRemove(req.params.commentId).then(removedComment => {
    res.status(200).json({message: 'removed', removedComment});
  }).catch(err => handleError(req, res, err));
});

// check if user is part of the group the event is in
// if no, throw an error, if yes let it through
const permissionsCheck = (userId, eventId) => {
  return PlanEvent.findById(eventId).then(event => {
    if (!event) { throw new Error('event_not_found'); }
    return Plan.findById(event.planId).then(plan => {
      if (!plan) { throw new Error('plan_not_found'); }
      if (plan.members.indexOf(userId) === -1) { throw new Error('not_member'); }
    });
  });
};

const handleError = (req, res, err) => {
  if (err.message === 'event_not_found' ||
      err.message === 'plan_not_found' ||
      err.message === 'comment_not_found') {
    res.status(404).send();
  } else if (err.message === 'not_member') {
    res.status(401).send();
  } else if (err.message === 'bad_request') {
    res.status(400).send('bad request');
  } else {
    res.status(500).send('Server error: ', err);
  }
};

module.exports = commentRouter;
