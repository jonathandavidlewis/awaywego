const eventRouter = require('express').Router();
const PlanEvent = require('../../db/models/event.js');

// Get all events belonging to a specific plan
eventRouter.get('/:planId', (req, res) => {
  PlanEvent.find({planId: req.params.planId}).then(events => res.status(200).json(events))
    .catch(err => res.status(500).send('Server error: ', err));

});

// Create Events
eventRouter.post('/', (req, res) => {
  const newEvent = req.body;
  newEvent.status = 'idea';
  newEvent.upVotes = [];
  newEvent.downVotes = [];

  PlanEvent.create(newEvent).then((planEvent) => {
    res.status(201).json({_Id: planEvent._id});
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({'Server error': err});
    });
});

eventRouter.put('/:eventId', (req, res) => {
  PlanEvent.findOneAndUpdate({_id: req.params.eventId}, req.body, {new: true}).then((planEvent) => {
    console.log('planevent ', planEvent);
    res.status(200).json(planEvent);
  })
    .catch((err) => {
      res.status(500).send('Server error: ', err);
    });
});


module.exports = eventRouter;
