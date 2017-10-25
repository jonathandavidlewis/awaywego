// Seed Database with mock events
const mongoose = require('mongoose');
const PlanEvent = require('../../db/models/event');

// Replace with your plan Id
const TEST_PLAN_ID = '59efbfa238c40c110f7a80c0'
// seed data
const TEST_DATA = [
  {
    planId: TEST_PLAN_ID,
    title: 'John\'s best BBQ',
    startTime: '2016-05-18T16:00:00Z',
    endTime: '2016-05-18T16:00:00Z',
    description: 'We will have a ton of fun at this park...',
    imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
    status: 'itinerary',
    upVotes: [],
    downVotes: [],
    tags: ['Food', 'BBQ']
  },
  {
    planId: TEST_PLAN_ID,
    title: 'John\'s second best BBQ',
    startTime: '2016-05-18T16:00:00Z',
    description: 'We will have a ton of fun at this park...',
    imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
    status: 'itinerary',
    upVotes: [],
    downVotes: [],
    tags: ['Food', 'BBQ']
  },
  {
    planId: TEST_PLAN_ID,
    title: 'John\'s third best BBQ',
    startTime: '2016-05-18T16:00:00Z',
    endTime: '2016-05-18T16:00:00Z',
    description: 'We will have a ton of fun at this park...',
    imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
    status: 'idea',
    upVotes: [],
    downVotes: [],
    upVotes: [],
    downVotes: [],
    tags: ['Food', 'BBQ']
  },
  {
    planId: TEST_PLAN_ID,
    title: 'John\'s fourth best BBQ',
    startTime: '2016-05-18T16:00:00Z',
    endTime: '2016-05-18T16:00:00Z',
    description: 'We will have a ton of fun at this park...',
    imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
    status: 'idea',
    upVotes: [],
    downVotes: [],
    tags: ['Food', 'BBQ']
  },
  {
    planId: TEST_PLAN_ID,
    title: 'John\'s fifth best BBQ',
    startTime: '2016-05-18T16:00:00Z',
    endTime: '2016-05-18T16:00:00Z',
    description: 'We will have a ton of fun at this park...',
    imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
    status: 'idea',
    upVotes: [],
    downVotes: [],
    tags: ['Food', 'BBQ']
  },
  {
    planId: TEST_PLAN_ID,
    title: 'John\'s sixth best BBQ',
    startTime: '2016-05-18T16:00:00Z',
    endTime: '2016-05-18T16:00:00Z',
    description: 'We will have a ton of fun at this park...',
    imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
    status: 'itinerary',
    upVotes: [],
    downVotes: [],
    tags: ['Food', 'BBQ']
  },
  {
    planId: TEST_PLAN_ID,
    title: 'John\'s sixth best BBQ',
    startTime: '2016-05-18T16:00:00Z',
    endTime: '2016-05-18T16:00:00Z',
    description: 'We will have a ton of fun at this park...',
    imageUrl: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/08/Smith-Rock-940x595.jpg',
    status: 'itinerary',
    upVotes: [],
    downVotes: [],
    tags: ['Food', 'BBQ']
  }
];

// function to clean events from database and seed with above mockData
const seedEventDB = () => {
  PlanEvent.remove({planId: TEST_PLAN_ID}).then(() => {
    console.log('All events cleared under: ' + TEST_PLAN_ID);

    PlanEvent.create(TEST_DATA).then(() => {
      console.log('MOCK EVENTS CREATED');
    });
  });
};

module.exports = seedEventDB;
