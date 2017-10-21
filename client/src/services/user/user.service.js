import decode from 'jwt-decode';

export default class UserService {
  constructor($state, $http) {
    this.$inject = ['$state', '$http'];
    this.$http = $http;
    this.$state = $state;
    this.isLoggedIn = false;
    this.user = {};
    this.processTokenAndSignIn(this.getToken());
  }

  processTokenAndSignIn(token) {
    let payload;
    try {
      payload = decode(token);
      this.setToken(token);
    } catch (err) {
      if (token) { console.log('Invalid token error: ', err); }
      return false; // only log an error if there was actually a token
    }
    this.user.name = payload.name;
    this.user.id = payload.userId;
    this.isLoggedIn = true;
    return true;
  }

  signup(newUser) {
    return this.$http.post('/auth/signup', newUser).then(resp => {
      return this.processTokenAndSignIn(resp.data.token);
    });
  }

  login(email, password) {
    return this.$http.post('/auth/login', { email, password }).then(resp => {
      return this.processTokenAndSignIn(resp.data.token);
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.destroyToken();
    this.$state.go('login');
  }

  getToken() {
    return localStorage.getItem('awg_jwt');
  }

  setToken(token) {
    localStorage.setItem('awg_jwt', token);
  }

  destroyToken() {
    localStorage.removeItem('awg_jwt');
  }
}
