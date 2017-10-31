const searchRouter = require('express').Router();

// Location routes
searchRouter.get('/:latitude/:longitude', (req, res) => {
  let src = `https://maps.googleapis.com/maps/api/staticmap?center=${req.params.latitude},${req.params.longitude}&zoom=10&size=400x400&key=AIzaSyC4JL3R71CHTNuCs3r0LzQQ9etGL-tQEi8`;

  res.status(200).json(src);
});

module.exports = searchRouter;