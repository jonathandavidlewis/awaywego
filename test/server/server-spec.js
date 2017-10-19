var expect = require('chai').expect;
var axios = require('axios');

describe('Server tests', function() {

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

  describe('/login', function() {
    it('should return a response on a post request', function(done) {
      axios.post('http://localhost:8080/login')
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
      axios.post('http://localhost:8080/signup')
        .then(function (response) {
          expect(response.data.token).to.exist;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });
  });

  describe('/signup', function() {
    it('should return a response on a post request', function(done) {
      axios.post('http://localhost:8080/signup')
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
      axios.post('http://localhost:8080/signup')
        .then(function (response) {
          expect(response.data.token).to.exist;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });
  });

});