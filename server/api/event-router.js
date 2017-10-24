const eventRouter = require('express').Router();
const PlanEvent = require('../../db/models/event.js');

// eventRouter.get('/:planId', (req, res) => {
//   PlanEvent.find({planId: req.params.planId}).then(events => res.status(200).json(plans))
//     .catch(err => res.status(500).send('Server error: ', err));
//
// });

eventRouter.post('/', (req, res) => {
  const newEvent = req.body;
  newEvent.status = 'idea';
  newEvent.upVotes = [];
  newEvent.downVotes = [];

  PlanEvent.create(newEvent).then((planEvent) => {
    console.log('created ', planEvent);
    res.status(201).json({_Id: planEvent._id});
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({'Server error': err});
    });
});

module.exports = eventRouter;
