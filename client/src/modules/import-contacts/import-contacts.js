import angular from 'angular';
import _ from 'lodash';

// imports for this component
import template from './import-contacts.html';
import './people-add.css';

class ImportContactsController {
  constructor(FriendService, $state, $http) {
    this.googleAccessToken = localStorage.getItem('awg_google_access_token');
    this.search = '';
    this.$state = $state;
    this.friends = FriendService.friendships.map(fr => fr.to);
    this.availableFriends = [];

    this.toggleSelect = this.toggleSelect.bind(this);
    this.filterFriends = this.filterFriends.bind(this);
    this.addToPlan = this.addToPlan.bind(this);
  }

  getGoogleContacts() {
    googleAccessToken = localStorage.getItem('awg_google_access_token');

    console.log("ACCESS:", accessToken);
    console.log("REFRESH:", refreshToken);
    console.log("PROFILE:___:", profile);

    var req = {
      method: 'GET',
      url: 'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses&pageSize=2000',
      headers: {
        'Authorization': 'Bearer ' + this.googleAccessToken,
        'Content-Type': 'application/json'
      },
      data: { test: 'test' }
    }

    $http(req).then(function(){...}, function(){...});



    $http.get({
      url: 'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses&pageSize=2000',
      headers: {
        'Authorization': 'Bearer ' + refreshToken.access_token,
        'Content-Type': 'application/json'
      },
      //qs: qs,//Optional to get limit, max results etc
      method: 'GET'
    }, function (err, response, body) {
      if (err) {
        console.log(err);
      }
      console.log('RESPONSE:____');
      console.log('BODY:____');
      console.log(typeof body);
      console.log(Array.isArray(JSON.parse(body).connections));
      const contactList = [];

      const loadContacts = function (contacts) {
        contacts.forEach((connection) => {
          if (connection.emailAddresses) {
            contactList.push(connection.emailAddresses[0].value);
          }
        });
      };

      let responseBody = body;

      loadContacts(JSON.parse(body).connections);

      //while (responseBody.nextPageToken) {   }
      console.log(contactList);
      console.log(req);

    });
  }

  $onInit() {

  }

  getFriendsNotInGroup() {
    return _.differenceBy(this.friends, this.members, a => a._id).map(friend => {
      return {user: friend, checked: false};
    });
  }

  toggleSelect(userId) {
    let friend = this.availableFriends.find(avail => avail.user._id === userId);
    friend.status = !friend.status;
  }

  filterFriends(val) {
    if (this.search) {
      let s = this.search.toLowerCase();
      return (val.user.name.toLowerCase().includes(s) ||
              val.user.email.toLowerCase().includes(s));
    } else {
      return true;
    }
  }

  addToPlan() {
    let toAdd = this.availableFriends.reduce((res, fr) => {
      if (fr.status) { res.push(fr.user._id); }
      return res;
    }, []);
    if (toAdd.length === 0) { return; }
    this.PlanService.addMembersToCurrentPlan(toAdd).then(() => {
      this.$state.go('^.list');
    });
  }

}
ImportContactsComponent.$inject = ['FriendService', '$state', '$http'];

const ImportContactsComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ImportContactsController
};

export default ImportContactsComponent;
