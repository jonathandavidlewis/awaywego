const expect = require('chai').expect;
const axios = require('axios');
const request = require('supertest');
const app = require('../../server/server.js'); //gets the app started
req = request('http://localhost:8080');
const User = require('../../db/models/user');
const PlanEvent = require('../../db/models/event');

const TEST_USER = {
  name: 'jim',
  email: 'test1@example.com',
  password: 'password1'
};

const TEST_USER_EMAIL = {
  email: 'test1@example.com'
};

const TEST_PLAN = {
  title: 'Test Plan Ever',
};


describe('/api', function() {
  // For access to protected routes
  let AUTH;
  // Create a user and set token before api calls
  before(function(done) {
    User.create(TEST_USER).then(() => {
      req.post('/auth/login')
        .send(TEST_USER)
        .then(function (response) {
          AUTH = {Authorization: 'bearer ' + response.body.token};
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });
  });

  after(function(done) {
    User.remove(TEST_USER_EMAIL).then(() => done());
  });

  describe('/event', function() {
    const TEST_EVENT = {
      title: 'John"s best BBQ',
      description: 'We will have a ton of fun at this park...',
      planId: 'undefined',
      startTime: '2016-05-18T16:00:00Z',
      endTime: '2016-05-18T16:00:00Z',
    };

    // Makes a plan and updates planId
    before(function(done) {
      req.post('/api/plan')
        .send(TEST_PLAN)
        .set(AUTH)
        .then((response) => {
          TEST_EVENT.planId = response.body._id;
          done();
        });
    });

    after(function(done) {
      PlanEvent.remove(TEST_EVENT).then(() => done());
    });

    describe('POST', function() {
      it('should create an event entry on a post request', function(done) {
        req.post('/api/event')
          .send(TEST_EVENT)
          .set(AUTH)
          .expect(201)
          .then((response) => {
            PlanEvent.findOne({_id: response.body.eventId}).then((planEvent) => {
              expect(planEvent).to.exist;
              done();
            });
          });
      });
    });

    describe('GET', function() {
      it('should get all events for a particular planId', function(done) {
        req.get('/api/event/' + TEST_EVENT.planId)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body[0].title).to.equal(TEST_EVENT.title);
            done();
          });
      });
    });

    describe('PUT', function() {
      let EVENT_ID;

      before(function(done) {
        req.get('/api/event/' + TEST_EVENT.planId)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            EVENT_ID = response.body[0]._id;
            done();
          });
      });

      beforeEach(function(done) {
        PlanEvent.remove({EVENT_ID}).then(() => done());
      });

      after(function(done) {
        PlanEvent.remove({EVENT_ID}).then(() => done());
      });

      it('should allow updating by eventId', function(done) {
        let UPDATED_EVENT = Object.assign({}, TEST_EVENT);
        UPDATED_EVENT.title = 'Updated title';
        req.put('/api/event/' + EVENT_ID)
          .send(UPDATED_EVENT)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.title).to.equal(UPDATED_EVENT.title);
            PlanEvent.findOne({_id: EVENT_ID}).then((planEvent) => {
              expect(planEvent.title).to.equal(UPDATED_EVENT.title);
              done();
            });
          });

      });

      it('should allow promoting an idea to itinerary', function(done) {
        req.put(`/api/event/${EVENT_ID}/promote`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.status).to.equal('itinerary');
            PlanEvent.findOne({_id: EVENT_ID}).then((planEvent) => {
              expect(planEvent.status).to.equal('itinerary');
              done();
            });
          });
      });

      it('should allow demoting an itinerary to idea', function(done) {
        req.put(`/api/event/${EVENT_ID}/demote`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.status).to.equal('idea');
            PlanEvent.findOne({_id: EVENT_ID}).then((planEvent) => {
              expect(planEvent.status).to.equal('idea');
              done();
            });
          });
      });

      it('should allow upvoting', function(done) {
        req.put(`/api/event/${EVENT_ID}/upvote`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.length).to.equal(1);
            PlanEvent.findOne({_id: EVENT_ID}).then((planEvent) => {
              expect(planEvent.upVotes.length).to.equal(1);
              User.findOne(TEST_USER_EMAIL).then((user) => {
                expect(planEvent.upVotes).to.contain(user._id);
                done();
              });
            });
          });
      });

      it('should allow downvoting', function(done) {
        req.put(`/api/event/${EVENT_ID}/downvote`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.length).to.equal(1);
            PlanEvent.findOne({_id: EVENT_ID}).then((planEvent) => {
              expect(planEvent.downVotes.length).to.equal(1);
              User.findOne(TEST_USER_EMAIL).then((user) => {
                expect(planEvent.downVotes).to.contain(user._id);
                done();
              });
            });
          });
      });

      it('should remove user from downvotes when upvoting', function(done) {
        req.put(`/api/event/${EVENT_ID}/upvote`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.length).to.equal(1);
            PlanEvent.findOne({_id: EVENT_ID}).then((planEvent) => {
              expect(planEvent.downVotes.length).to.equal(0);
              expect(planEvent.upVotes.length).to.equal(1);
              User.findOne(TEST_USER_EMAIL).then((user) => {
                expect(planEvent.downVotes).to.not.contain(user._id);
                expect(planEvent.upVotes).to.contain(user._id);
                done();
              });
            });
          });
      });

      it('should remove user from upvotes when downvoting', function(done) {
        req.put(`/api/event/${EVENT_ID}/downvote`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.length).to.equal(1);
            PlanEvent.findOne({_id: EVENT_ID}).then((planEvent) => {
              expect(planEvent.upVotes.length).to.equal(0);
              expect(planEvent.downVotes.length).to.equal(1);
              User.findOne(TEST_USER_EMAIL).then((user) => {
                expect(planEvent.downVotes).to.contain(user._id);
                expect(planEvent.upVotes).to.not.contain(user._id);
                done();
              });
            });
          });
      });
    }); // End of Describe PUT

    describe('DELETE', function() {
      it('should delete an event by id', function(done) {
        req.get(`/api/event/${TEST_EVENT.planId}`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            const EVENT_ID = response.body[0]._id;
            req.delete('/api/event/' + EVENT_ID)
              .set(AUTH)
              .expect(200)
              .then(() => {
                PlanEvent.findOne({_id: EVENT_ID}).then((planEvent) => {
                  expect(planEvent).to.not.exist;
                  done();
                });
              });
          });
      });
    });
  }); // End of Describe /event
}); // End of Describe /api
