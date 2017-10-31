export default class AddressService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
  }

  findLocation(callback) {
    return navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      this.$http.get(`api/search/${latitude}/${longitude}`).then((response) => {
        callback(response.data);
      });
    });
  }
}