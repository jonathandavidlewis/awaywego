const messageRouter = require('express').Router();
const Message = require('../../db/models/message.js');
const Plan = require('../../db/models/plan.js');
const oid = require('mongoose').Types.ObjectId;

messageRouter.get('/:planId', (req, res) => {
  const userId = req.user._id;
  const planId = req.params.planId;

  Plan.findById(req.query.planId).then(plan => {
    if (!plan) { throw new Error('plan_not_found'); }
    if (plan.members.indexOf(userId) === -1) { throw new Error('not_member'); }
    return plan;
  }).then(plan => {
    let msgs = Message.find({planId: oid(req.params.planId)});
    if (req.query.before) { msgs = msgs.where('createdAt').lt(req.query.before); }
    if (req.query.after) { msgs = msgs.where('createdAt').lt(req.query.after); }
    return msgs.sort('-createdAt').limit(30).populate('user', '-password').exec();
  }).then(msgs => res.status(200).json(msgs))
    .catch(err => {
      if (err.message === 'plan_not_found') {
        res.status(404).send();
      } else if (err.message === 'not_member') {
        res.status(401).send('not member of this plan');
      } else {
        res.status(500).send('Server error: ', err);
      }
    });
});

messageRouter.post('/:planId', (req, res) => {
  const userId = req.user._id;
  const planId = req.params.planId;

  Plan.findById(req.query.planId).then(plan => {
    if (!plan) { throw new Error('plan_not_found'); }
    if (plan.members.indexOf(userId) === -1) { throw new Error('not_member'); }
    return plan;
  }).then(plan => {
    let newMsg = {planId: planId, user: userId, text: req.body.text};
    return newMsg.save();
  }).then(newMsg => res.status(200).json({message: 'created', newMsg: newMsg}))
    .catch(err => {
      if (err.message === 'plan_not_found') {
        res.status(404).send();
      } else if (err.message === 'not_member') {
        res.status(401).send('not member of this plan');
      } else {
        res.status(500).send('Server error: ', err);
      }
    });

});
module.exports = messageRouter;
