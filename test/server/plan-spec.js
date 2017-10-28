const expect = require('chai').expect;
const axios = require('axios');
const request = require('supertest');
const User = require('../../db/models/user');
const PlanEvent = require('../../db/models/event');

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

  xdescribe('/plan', function() {
    after(function(done) {
      User.remove(TEST_PLAN).then(() => done());
    });

    it('should create a plan on a post request', function(done) {

    });
  });


}); // End of Describe /api
