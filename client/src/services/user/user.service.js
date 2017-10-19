export default class UserService {
  constructor() {
    this.isLoggedIn = true;
    this.userId = 'abc123';
    this.user = {
      id: 'abc123',
      name: 'jim'
    };
  }

  login(token) {
    this.isLoggedIn = true;
    this.setToken(token);
  }

  logout() {
    this.isLoggedIn = false;
    this.destroyToken();
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
