const expect = require('chai').expect;
const axios = require('axios');
const request = require('supertest');
const app = require('../../server/server.js'); //gets the app started
req = request('http://localhost:8080');
const jwt = require('jsonwebtoken');
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
describe('Server tests', function() {

  before(function(done) {
    User.remove(TEST_USER_EMAIL).then(() => done());
  });

  describe('/', function() {
    it('should return index.html on a get request', function(done) {
      axios.get('http://localhost:8080/')
        .then(function (response) {
          expect(response.data).to.contain('ng-app');
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });
  });

  describe('/auth/login', function() {

    before(function(done) {
      User.create(TEST_USER).then(() => { done(); });
    });

    after(function(done) {
      User.remove(TEST_USER_EMAIL).then(() => done());
    });

    it('should not grant access for invalid email', function(done) {
      req.post('/auth/login')
        .send({
          'email': 'invalid@example.com',
          'password': 'password1'
        })
        .then(function (response) {
          expect(response.body.token).to.not.exist;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });

    it('should not grant access for invalid password', function(done) {
      req.post('/auth/login')
        .send({
          'email': 'test1@example.com',
          'password': 'invalidpassword'
        })
        .then(function (response) {
          expect(response.body).to.exist;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });

    it('should grant access for valid credentials', function(done) {
      req.post('/auth/login')
        .send(TEST_USER)
        .then(function (response) {
          expect(response.body.token).to.exist;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });

  });

  describe('/signup', function() {

    beforeEach(function(done) {
      User.remove(TEST_USER_EMAIL).then(() => done());
    });

    after(function(done) {
      User.remove(TEST_USER_EMAIL).then(() => done());
    });


    it('should return a json web token on a successful signup', function(done) {
      req.post('/auth/signup')
        .send(TEST_USER)
        .then(function (response) {
          expect(response.body.token).to.exist;
          expect(response.statusCode).to.equal(201);
          done();
        });
    });

    it('should not return a token if the user exists', function(done) {
      req.post('/auth/signup')
        .send(TEST_USER)
        .then(() => {
          req.post('/auth/signup')
            .send(TEST_USER)
            .then((response) => {
              expect(response.body.token).to.not.exist;
              expect(response.statusCode).to.equal(422);
              done();
            });
        });
    });

    it('should create a database entry on sign up', function(done) {
      req.post('/auth/signup')
        .send(TEST_USER)
        .expect(201)
        .then((response) => {
          User.findOne({'email': 'test1@example.com'})
            .exec((err, user) => {
              if (err) { console.log(err); }
              expect(user.email).to.equal('test1@example.com');
              done();
            });
        });
    });
  });

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

    xdescribe('/plan', function() {

      after(function(done) {
        User.remove(TEST_EVENT).then(() => done());
      });

      it('should create an event entry on a post request', function(done) {
        req.post('/api/event')
          .send(TEST_EVENT)
          .set('Authorization', 'bearer ' + token)
          .expect(201)
          .then((response) => {
            console.log('In protected route');
            PlanEvent.find({_id: response._Id}).then((plan) => {
              console.log(plan);
              expect(plan).to.exist;
              done();
            });
          });
      });
    });


    describe('/events', function() {

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
        User.remove(TEST_EVENT).then(() => done());
      });

      it('should create an event entry on a post request', function(done) {
        req.post('/api/event')
          .send(TEST_EVENT)
          .set(AUTH)
          .expect(201)
          .then((response) => {
            PlanEvent.findOne({_id: response.body._Id}).then((planEvent) => {
              console.log(planEvent);
              expect(planEvent).to.exist;
              done();
            });
          });
      });

      it('should get all events for a particular planId', function(done) {
        req.get('/api/event/' + TEST_EVENT.planId)
          .set(AUTH)
          .expect(200)
          .then((response) => {
            console.log(response.body);
            expect(response.body[0].title).to.equal(TEST_EVENT.title);
            done();
          });
      });

    });



  });
});
