export default class ImageSearchService {
  constructor($http) {
    this.$inject = ['$http'];
    this.$http = $http;
    this.host = 'https://api.cognitive.microsoft.com';
    this.path = '/bing/v7.0/images/search';
    this.subKey = 'e8ae475ded96446c8641f0aa607e623b';
    this.images = [];
  }

  imageSearch(query) {
    return this.$http({
      method: 'GET',
      url: this.host + this.path + '?q=' + encodeURIComponent(query),
      headers: {
        'Ocp-Apim-Subscription-Key': this.subKey
      }
    }).then((resp) => {
      let imageArray = resp.data.value;
      let images = [];
      for (let i = 0; i < 6; i++) {
        images.push(imageArray[i].thumbnailUrl);
      }
      return images;
    });
  }
}