const eventRouter = require('express').Router();
const PlanEvent = require('../../db/models/event.js');

// Get all events belonging to a specific plan
eventRouter.get('/:planId', (req, res) => {
  PlanEvent.find({planId: req.params.planId}).then((events) => {
    res.status(200).json(events);
  }).catch(err => res.status(500).json({'Server error': err}));
});

// Create Events
eventRouter.post('/', (req, res) => {
  const newEvent = req.body;
  console.log(newEvent);
  if (newEvent.imageUrl === '') {
    delete newEvent.imageUrl;
  }
  newEvent.status = 'idea';
  newEvent.upVotes = [];
  newEvent.downVotes = [];
  console.log(newEvent);

  PlanEvent.create(newEvent).then(planEvent => res.status(201).json({eventId: planEvent._id}))
    .catch(err => res.status(500).json({'Server error': err}));
});

// Update Events
eventRouter.put('/:eventId', (req, res) => {
  PlanEvent.findByIdAndUpdate({_id: req.params.eventId}, req.body, {new: true})
    .then(planEvent => res.status(200).json(planEvent))
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.put('/:eventId/promote', (req, res) => {
  PlanEvent.findByIdAndUpdate({_id: req.params.eventId}, {status: 'itinerary'}, {new: true})
    .then(planEvent => res.status(200).json(planEvent))
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.put('/:eventId/demote', (req, res) => {
  PlanEvent.findByIdAndUpdate({_id: req.params.eventId}, {status: 'idea'}, {new: true})
    .then(planEvent => res.status(200).json(planEvent))
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.put('/:eventId/upvote', (req, res) => {
  PlanEvent.findById({_id: req.params.eventId})
    .then((planEvent) => {
      if (planEvent.upVotes.every(id => id.toString() !== req.user._id.toString())) {
        planEvent.upVotes.push(req.user._id);
      }
      planEvent.downVotes = planEvent.downVotes.filter((id) => id.toString() !== req.user._id.toString());
      planEvent.save().then(planEvent => res.status(200).json(planEvent));
    })
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.put('/:eventId/downvote', (req, res) => {
  PlanEvent.findById({_id: req.params.eventId})
    .then((planEvent) => {
      if (planEvent.downVotes.every(id => id.toString() !== req.user._id.toString())) {
        planEvent.downVotes.push(req.user._id);
      }
      planEvent.upVotes = planEvent.upVotes.filter((id) => id.toString() !== req.user._id.toString());
      planEvent.save().then(planEvent => res.status(200).json(planEvent));
    })
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.delete('/:eventId', (req, res) => {
  PlanEvent.findByIdAndRemove({_id: req.params.eventId}).then(() => res.status(200).send('Deleted'))
    .catch(err => res.status(500).json({'Server error': err}));
});

module.exports = eventRouter;
