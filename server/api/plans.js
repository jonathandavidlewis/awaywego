const plansRouter = require('express').Router();




plansRouter.get('/plan', (req, res) => {
  res.JSON(require('./testPlans.JSON'));
});

plansRouter.post('/plan', (req, res) => {
  res.send('received');
});






{
  "planId": "v3456yv456v46",
  "label": "Weekend getaway",
  "description": "This is an opportunity to...",
  "imageUrl": "http://awaywego-app.com/img/me.jpg",
  "tags": ["hiking", "outdoors", "food"],
  "members": ["563gv456", "345f6", "fo3cf453bv54od"]
}




module.exports.plansRouter = plansRouter;