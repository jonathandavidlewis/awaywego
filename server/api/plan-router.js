const planRouter = require('express').Router();
const Plan = require('../../db/models/plan.js');

planRouter.get('/', (req, res) => {

  Plan.find({userId: req.user._id}).then(plans => res.status(200).json(plans))
    .cath(err => res.status(500).send('Server error: ', err));
});

planRouter.post('/', (req, res) => {
   const plan = req.body.plan;
   plan.userId = req.user._id;
  //append user to the plan object
  Plan.create(req.body.plan).then(plan => res.status(201).json({_id: plan._id}))
      .cath(err => res.status(500).send('Server error: ', err));
});

planRouter.get('/:planId', (req, res) => {

  //get user from req.user
  //validate user is a member of the plan
  Plan.find({userId: req.params.planId}).then(plans => res.status(200).json(plans))
  .cath(err => res.status(500).send('Server error: ', err));
});

planRouter.delete('/:planId', (req, res) => {
  Plan.findOneAndRemove({_id: req.params.planId}).then(() => res.status(200).send('Deleted'))
    .cath(err => res.status(500).send('Server error: ', err));
});

planRouter.put('/:planId', (req, res) => {
  if (req.body.plan._id) {
    delete req.body.plan._id
  }
  Plan.findOneAndUpdate({_id: req.params.planId}, req.body.plan).then(plan => res.status(200).json(plan))
    .cath(err => res.status(500).send('Server error: ', err));
});

module.exports.planRouter = planRouter;