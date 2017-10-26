const planRouter = require('express').Router();
const Plan = require('../../db/models/plan.js');

planRouter.get('/', (req, res) => {
  Plan.find({members: req.user._id})
    .populate('members', '-password').exec().then(plans => {
      res.status(200).json(plans);
    }).catch(err => res.status(500).send('Server error: ', err));
});

planRouter.post('/', (req, res) => {
  const newPlan = req.body;
  if (newPlan.imageUrl === '') {
    delete newPlan.imageUrl;
  }
  newPlan.userId = req.user._id;
  newPlan.members = [req.user._id];
  Plan.create(newPlan).then(plan => res.status(201).json({_id: plan._id}))
    .catch(err => res.status(500).send('Server error: ', err));
});

planRouter.get('/:planId', (req, res) => {
  //TODO: get user from req.user and validate user is a member of the plan
  Plan.findById(req.params.planId).populate('members', '-password')
    .then(plans => res.status(200).json(plans))
    .catch(err => res.status(500).send('Server error: ', err));
});

planRouter.delete('/:planId', (req, res) => {
  Plan.findOneAndRemove({_id: req.params.planId}).then(() => res.status(200).send('Deleted'))
    .catch(err => res.status(500).send('Server error: ', err));
});

planRouter.put('/:planId', (req, res) => {
  Plan.findOneAndUpdate({_id: req.params.planId}, req.body.plan).then(plan => res.status(200).json(plan))
    .catch(err => res.status(500).send('Server error: ', err));
});

planRouter.put('/:planId/members/add', (req, res) => {
  Plan.findById(req.params.planId).then(plan => {
    req.body.members.forEach(m => plan.members.addToSet(m));
    return plan.save().then(plan => plan.populate('members', '-password').execPopulate());
  }).then(plan => res.status(200).json(plan))
    .catch(err => res.status(500).send('Server error: ', err));
});

planRouter.put('/:planId/members/remove/:userId', (req, res) => {
  Plan.findById(req.params.planId).then(plan => {
    if (plan.userId.equals(req.params.userId)) { throw new Error('rem_owner'); }
    plan.members.pull(req.params.userId);
    return plan.save().then(plan => plan.populate('members', '-password').execPopulate());
  }).then(plan => res.status(200).json(plan))
    .catch(err => {
      if (err.message === 'rem_owner') {
        res.status(400).send('Cannot remove owner of plan');
      } else {
        res.status(500).send('Server error: ', err);
      }
    });
});

module.exports = planRouter;
