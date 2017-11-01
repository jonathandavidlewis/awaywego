const messageRouter = require('express').Router();
const Message = require('../../db/models/message.js');
const Group = require('../../db/models/group.js');
const oid = require('mongoose').Types.ObjectId;

messageRouter.get('/group/:groupId', (req, res) => {
  const userId = req.user._id;
  const groupId = req.params.groupId;

  Plan.findById(groupId).then(group => {
    if (!group) { throw new Error('group_not_found'); }
    if (group.members.indexOf(userId) === -1) { throw new Error('not_member'); }
    return group;
  }).then(group => {
    let msgs = Message.find({groupId: oid(req.params.groupId)});
    if (req.query.before) { msgs = msgs.where('createdAt').lt(req.query.before); }
    if (req.query.after) { msgs = msgs.where('createdAt').gt(req.query.after); }
    return msgs.sort('-createdAt').limit(30).populate('user', '-password').exec();
  }).then(msgs => res.status(200).json(msgs))
    .catch(err => {
      if (err.message === 'group_not_found') {
        res.status(404).send();
      } else if (err.message === 'not_member') {
        res.status(401).send('not member of this group');
      } else {
        res.status(500).send('Server error: ', err);
      }
    });
});

messageRouter.post('/group/:groupId', (req, res) => {
  const userId = req.user._id;
  const groupId = req.params.groupId;

  Plan.findById(groupId).then(group => {
    if (!group) { throw new Error('group_not_found'); }
    if (group.members.indexOf(userId) === -1) { throw new Error('not_member'); }
    return group;
  }).then(group => {
    let newMsg = {groupId: groupId, user: userId, text: req.body.text};
    return Message.create(newMsg);
  }).then(newMsg => res.status(200).json({message: 'created', newMsg: newMsg}))
    .catch(err => {
      if (err.message === 'group_not_found') {
        res.status(404).send();
      } else if (err.message === 'not_member') {
        res.status(401).send('not member of this group');
      } else {
        res.status(500).send('Server error: ', err);
      }
    });

});
module.exports = messageRouter;
