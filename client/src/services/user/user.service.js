import decode from 'jwt-decode';

export default class UserService {
  constructor($state, $http) {
    this.$inject = ['$state', '$http'];
    this.$http = $http;
    this.$state = $state;
    this.isLoggedIn = false;
    this.user = {};
    this.processToken();
  }

  processToken() {
    this.token = this.getToken();
    if (this.token) {
      let payload = decode(this.token);
      this.user.name = payload.name;
      this.user.id = payload.userId;
      this.isLoggedIn = true;
    }
  }

  login(email, password) {
    this.$http.post('/auth/login', { email, password })
      .then(resp => {
        console.log('Resp: ', resp.data);
      }).catch(err => console.log('Error: ', err));

    // this.isLoggedIn = true;
    // this.setToken();
    // this.processToken(); // update user data from token
  }

  logout() {
    console.log('logging out user');
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
