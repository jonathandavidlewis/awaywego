const expect = require('chai').expect;
const axios = require('axios');
const request = require('supertest');
const app = require('../../server/server.js'); //gets the app started
req = request('http://localhost:8080');

const User = require('../../db/models/user');

describe('Server tests', function() {

  beforeEach(function(done) {
    // Log out currently signed in user
    // request(app)
    //   .get('/logout')
    //   .end(function(err, res) {

    //     // Delete objects from db so they can be created later for the test

    //     User.remove({email: 'test2@gmail.com'}).exec();

    //     done();
    //   });
    User.remove({email: 'test1@gmail.com'}).exec(done);
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
    it('should return a response on a post request', function(done) {
      axios.post('http://localhost:8080/auth/login')
        .then(function (response) {
          expect(response.data).to.exist;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });

    it('should return a json web token', function(done) {
      req.post('/auth/signup')
        .send({
          'email': 'test1@gmail.com',
          'password': 'password1'
        })
        .expect(200)
        .end(done);
    });
  });

  describe('/signup', function() {
    it('should return a response on a post request', function(done) {
      axios.post('http://localhost:8080/auth/signup')
        .then(function (response) {
          expect(response.data).to.exist;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });

    it('should return a json web token', function(done) {
      axios.post('http://localhost:8080/auth/signup')
        .then(function (response) {
          expect(response.data.token).to.exist;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });

    it('should create a database entry on sign up', function(done) {
      req.post('/auth/signup')
        .send({
          'email': 'test1@gmail.com',
          'password': 'password1'
        })
        .expect(200)
        .end(function(res) {
          User.findOne({'email': 'test1@gmail.com'})
            .exec(function(err, user) {
              if (err) { console.log(err); }
              console.log('user ======>', user);
              expect(user.email).to.equal('test1@gmail.com');
              done();
            });
        });
    });
  });

  describe('authentication', function() {

    describe('json web token', function() {
      it('should reject access', function(done) {
        req.post('/testAuth')
          .expect(401, done);
      });

      it('should grant access', function(done) {
        let token;

        req.post('/auth/login')
          .then(function (response) {
            expect(response.body.token).to.exist;
            req.post('/testAuth')
              .set('Authorization', `Bearer ${response.body.token}`)
              .expect(200, done);
          });
      });
    });
  });
});
