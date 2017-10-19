const expect = require('chai').expect;
const axios = require('axios');
const request = require('supertest');
const app = require('../../server/server.js');  //gets the app started
req = request('http://localhost:8080');

const db = require('../../db/config');
const User = require('../../db/models/user');

describe('Database tests', function() {

  beforeEach(function(done) {
    // Log out currently signed in user
    request(app)
      .get('/logout')
      .end(function(err, res) {

        // Delete objects from db so they can be created later for the test
        User.remove({email: 'test1@gmail.com'}).exec();
        User.remove({email: 'test2@gmail.com'}).exec();

        done();
      });
  });

  describe('', function() {
    it('sign up creates a database entry', function(done) {
      request(app)
        .post('/signup')
        .send({
          'email': 'test1@gmail.com',
          'password': 'password1'
        })
        .expect(200)
        .expect(function(res) {
          User.findOne({'email': 'test1@gmail.com'})
            .exec(function(err, user) {
              if (err) { console.log(err); }
              expect(user.email).to.equal('test1@gmail.com');
            });
        })
        .end(done);
    });
  });
});