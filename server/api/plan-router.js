const planRouter = require('express').Router();
const Plan = require('../../db/models/plan.js');

planRouter.get('/', (req, res) => {

  Plan.find({userId: req.user._id}).then(plans => {
    res.status(200).json(plans)
  })
    .catch(err => res.status(500).send('Server error: ', err));
});

planRouter.post('/', (req, res) => {
   const newPlan = req.body;
   console.log(req.user);
  newPlan.userId = req.user._id;
  Plan.create(newPlan).then(plan => res.status(201).json({_id: plan._id}))
      .catch(err => res.status(500).send('Server error: ', err));
});

planRouter.get('/:planId', (req, res) => {

  //todo: get user from req.user and validate user is a member of the plan
  Plan.find({_id: req.params.planId}).then(plans => res.status(200).json(plans))
  .catch(err => res.status(500).send('Server error: ', err));
});

planRouter.delete('/:planId', (req, res) => {
  Plan.findOneAndRemove({_id: req.params.planId}).then(() => res.status(200).send('Deleted'))
    .catch(err => res.status(500).send('Server error: ', err));
});

planRouter.put('/:planId', (req, res) => {
  if (req.body.plan._id) {
    delete req.body.plan._id
  }
  Plan.findOneAndUpdate({_id: req.params.planId}, req.body.plan).then(plan => res.status(200).json(plan))
    .catch(err => res.status(500).send('Server error: ', err));
});

module.exports.planRouter = planRouter;