const expect = require('chai').expect;
const request = require('supertest');
const User = require('../../db/models/user');
const Event = require('../../db/models/event');
const Group = require('../../db/models/group');

require('../../server'); //gets the app started
req = request('http://localhost:8080');

const TEST_USER = {
  name: 'jim',
  email: 'test1@example.com',
  password: 'password1'
};

const TEST_USER_EMAIL = {
  email: 'test1@example.com'
};

const TEST_GROUP = {
  title: 'Test Group Ever',
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
      groupId: 'undefined',
      startTime: '2016-05-18T16:00:00Z',
      endTime: '2016-05-18T16:00:00Z',
    };

    // Makes a group and updates groupId
    before(function(done) {
      req.post('/api/group')
        .send(TEST_GROUP)
        .set(AUTH)
        .then((response) => {
          TEST_EVENT.groupId = response.body._id;
          done();
        });
    });

    after(function(done) {
      Event.remove(TEST_EVENT).then(() => Group.findByIdAndRemove(TEST_EVENT.groupId))
        .then(() => done());
    });

    describe('POST', function() {
      it('should create an event entry on a post request', function(done) {
        req.post('/api/event')
          .send(TEST_EVENT)
          .set(AUTH)
          .expect(201)
          .then((response) => {
            Event.findOne({_id: response.body._id}).then((groupEvent) => {
              expect(groupEvent).to.exist;
              done();
            });
          });
      });
    });

    describe('GET', function() {
      it('should get all events for a particular groupId', function(done) {
        req.get('/api/event/group/' + TEST_EVENT.groupId)
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
        req.get('/api/event/group/' + TEST_EVENT.groupId)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            EVENT_ID = response.body[0]._id;
            done();
          });
      });

      beforeEach(function(done) {
        Event.remove({EVENT_ID}).then(() => done());
      });

      after(function(done) {
        Event.remove({EVENT_ID}).then(() => done());
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
            Event.findOne({_id: EVENT_ID}).then((groupEvent) => {
              expect(groupEvent.title).to.equal(UPDATED_EVENT.title);
              done();
            });
          });

      });

      it('should allow promoting an idea to event', function(done) {
        req.put(`/api/event/${EVENT_ID}/promote`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.status).to.equal('event');
            Event.findOne({_id: EVENT_ID}).then((groupEvent) => {
              expect(groupEvent.status).to.equal('event');
              done();
            });
          });
      });

      it('should allow demoting an event to idea', function(done) {
        req.put(`/api/event/${EVENT_ID}/demote`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.status).to.equal('idea');
            Event.findOne({_id: EVENT_ID}).then((groupEvent) => {
              expect(groupEvent.status).to.equal('idea');
              done();
            });
          });
      });

      it('should allow upvoting', function(done) {
        req.put(`/api/event/${EVENT_ID}/upvote`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            expect(response.body.upVotes.length).to.equal(1);
            Event.findOne({_id: EVENT_ID}).then((groupEvent) => {
              expect(groupEvent.upVotes.length).to.equal(1);
              User.findOne(TEST_USER_EMAIL).then((user) => {
                expect(groupEvent.upVotes).to.contain(user._id);
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
            expect(response.body.downVotes.length).to.equal(1);
            Event.findOne({_id: EVENT_ID}).then((groupEvent) => {
              expect(groupEvent.downVotes.length).to.equal(1);
              User.findOne(TEST_USER_EMAIL).then((user) => {
                expect(groupEvent.downVotes).to.contain(user._id);
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
            expect(response.body.upVotes.length).to.equal(1);
            Event.findOne({_id: EVENT_ID}).then((groupEvent) => {
              expect(groupEvent.downVotes.length).to.equal(0);
              expect(groupEvent.upVotes.length).to.equal(1);
              User.findOne(TEST_USER_EMAIL).then((user) => {
                expect(groupEvent.downVotes).to.not.contain(user._id);
                expect(groupEvent.upVotes).to.contain(user._id);
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
            expect(response.body.downVotes.length).to.equal(1);
            Event.findOne({_id: EVENT_ID}).then((groupEvent) => {
              expect(groupEvent.upVotes.length).to.equal(0);
              expect(groupEvent.downVotes.length).to.equal(1);
              User.findOne(TEST_USER_EMAIL).then((user) => {
                expect(groupEvent.downVotes).to.contain(user._id);
                expect(groupEvent.upVotes).to.not.contain(user._id);
                done();
              });
            });
          });
      });
    }); // End of Describe PUT

    describe('DELETE', function() {
      it('should delete an event by id', function(done) {
        req.get(`/api/event/group/${TEST_EVENT.groupId}`)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            const EVENT_ID = response.body[0]._id;
            req.delete('/api/event/' + EVENT_ID)
              .set(AUTH)
              .expect(200)
              .then(() => {
                Event.findOne({_id: EVENT_ID}).then((groupEvent) => {
                  expect(groupEvent).to.not.exist;
                  done();
                });
              });
          });
      });
    });
  }); // End of Describe /event
}); // End of Describe /api
