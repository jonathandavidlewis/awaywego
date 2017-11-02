const groupRouter = require('express').Router();
const Group = require('../../db/models/group.js');

groupRouter.get('/', (req, res) => {
  Group.find({members: req.user._id})
    .populate('members', '-password').exec().then(groups => {
      res.status(200).json(groups);
    }).catch(err => res.status(500).send('Server error: ', err));
});

groupRouter.post('/', (req, res) => {
  const newGroup = req.body;
  if (newGroup.imageUrl === '') {
    delete newGroup.imageUrl;
  }
  newGroup.userId = req.user._id;
  newGroup.members = [req.user._id];
  Group.create(newGroup)
    .then(group => group.populate('members', '-password').execPopulate())
    .then(group => res.status(201).json(group))
    .catch(err => res.status(500).send('Server error: ', err));
});

groupRouter.get('/:groupId', (req, res) => {
  //TODO: get user from req.user and validate user is a member of the group
  Group.findById(req.params.groupId).populate('members', '-password')
    .then(groups => res.status(200).json(groups))
    .catch(err => res.status(500).send('Server error: ', err));
});

groupRouter.delete('/:groupId', (req, res) => {
  Group.findOneAndRemove({_id: req.params.groupId}).then(() => res.status(200).send('Deleted'))
    .catch(err => res.status(500).send('Server error: ', err));
});

groupRouter.put('/:groupId', (req, res) => {
  Group.findOneAndUpdate({_id: req.params.groupId}, req.body.group).then(group => res.status(200).json(group))
    .catch(err => res.status(500).send('Server error: ', err));
});

groupRouter.put('/:groupId/members/add', (req, res) => {
  Group.findById(req.params.groupId).then(group => {
    req.body.members.forEach(m => group.members.addToSet(m));
    return group.save().then(group => group.populate('members', '-password').execPopulate());
  }).then(group => res.status(200).json(group))
    .catch(err => res.status(500).send('Server error: ', err));
});

groupRouter.put('/:groupId/members/remove/:userId', (req, res) => {
  Group.findById(req.params.groupId).then(group => {
    if (group.userId.equals(req.params.userId)) { throw new Error('rem_owner'); }
    group.members.pull(req.params.userId);
    return group.save().then(group => group.populate('members', '-password').execPopulate());
  }).then(group => res.status(200).json(group))
    .catch(err => {
      if (err.message === 'rem_owner') {
        res.status(400).send('Cannot remove owner of group');
      } else {
        res.status(500).send('Server error: ', err);
      }
    });
});

module.exports = groupRouter;
