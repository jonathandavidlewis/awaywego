const eventRouter = require('express').Router();
const Event = require('../../db/models/event.js');

// Create Events
eventRouter.post('/', (req, res) => {
  const newEvent = req.body;
  if (newEvent.imageUrl === '') {
    delete newEvent.imageUrl;
  }
  newEvent.status = 'idea';
  newEvent.upVotes = [];
  newEvent.downVotes = [];
  newEvent.userId = req.user._id;

  Event.create(newEvent).then(event => res.status(201).json(event))
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.post('/new', (req, res) => {
  const newEvent = req.body;
  if (newEvent.imageUrl === '') {
    delete newEvent.imageUrl;
  }

  newEvent.status = 'event';
  newEvent.upVotes = [];
  newEvent.downVotes = [];

  Event.create(newEvent).then(event => res.status(201).json(event))
    .catch(err => res.status(500).json({'Server error': err}));
});

// Get all events belonging to a specific group
eventRouter.get('/group/:groupId', (req, res) => {
  Event.find({groupId: req.params.groupId}).then((events) => {
    res.status(200).json(events);
  }).catch(err => res.status(500).json({'Server error': err}));
});
// get a single event
eventRouter.get('/:eventId', (req, res) => {
  Event.findById(req.params.eventId).then(event => {
    res.status(200).json(event);
  }).catch(err => res.status(500).json({'Server error': err}));
});


// Update Events
eventRouter.put('/:eventId', (req, res) => {
  Event.findByIdAndUpdate({_id: req.params.eventId}, req.body, {new: true})
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.put('/:eventId/promote', (req, res) => {
  const promotedEvent = req.body;
  promotedEvent.status = 'event';
  if (promotedEvent._id) {
    delete promotedEvent._id;
  }
  Event.findByIdAndUpdate({_id: req.params.eventId}, promotedEvent, {new: true})
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.put('/:eventId/demote', (req, res) => {
  Event.findByIdAndUpdate({_id: req.params.eventId}, {status: 'idea'}, {new: true})
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.put('/:eventId/upvote', (req, res) => {
  Event.findById({_id: req.params.eventId})
    .then((event) => {
      if (event.upVotes.every(id => id.toString() !== req.user._id.toString())) {
        event.upVotes.push(req.user._id);
      }
      event.downVotes = event.downVotes.filter((id) => id.toString() !== req.user._id.toString());
      event.save().then(event => {
        res.status(200).json(event);
      });
    })
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.put('/:eventId/downvote', (req, res) => {
  Event.findById({_id: req.params.eventId})
    .then((event) => {
      if (event.downVotes.every(id => id.toString() !== req.user._id.toString())) {
        event.downVotes.push(req.user._id);
      }
      event.upVotes = event.upVotes.filter((id) => id.toString() !== req.user._id.toString());
      event.save().then(event => {
        res.status(200).json(event);
      });
    })
    .catch(err => res.status(500).json({'Server error': err}));
});

eventRouter.delete('/:eventId', (req, res) => {
  Event.findByIdAndRemove({_id: req.params.eventId}).then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({'Server error': err}));
});

module.exports = eventRouter;
