import angular from 'angular';
import _ from 'lodash';

// imports for this component
import FriendCardComponent from '../friends/friend-card/friend-card';
import FriendService from '../../services/friend/friend.service';

import template from './import-contacts.html';
import './import-contacts.css';

class ImportContactsController {
  constructor(FriendService, $state, $http) {
    this.http = $http;
    this.googleAccessToken = localStorage.getItem('awg_google_access_token');
    this.search = '';
    this.$state = $state;
    this.friends = FriendService.friendships.map(fr => fr.to);
    this.availableFriends = [];
    this.allContacts = [];
    this.loadingContacts = false;

    this.filterGoogleContacts = this.filterGoogleContacts.bind(this);
    this.getGoogleContacts = this.getGoogleContacts.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.filterFriends = this.filterFriends.bind(this);
    this.addToPlan = this.addToPlan.bind(this);
  }

  $onInit() {
  }

  getGoogleContacts() {
    this.loadingContacts = true;

    var req = {
      method: 'GET',
      url: 'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses&pageSize=2000',
      headers: {
        'Authorization': 'Bearer ' + this.googleAccessToken,
        'Content-Type': 'application/json'
      }
    };

    const handleError = function (response) {
      console.log('There was an error', response);
    };
    //$http(req).then(function(){...}, function(){...});
    this.http(req).then((handleError, this.filterGoogleContacts));

  }

  filterGoogleContacts(response) {

    console.log("DATATYPE", Array.isArray(response.data.connections));

    const loadContacts = function (contacts) {

      return contacts.reduce((filteredContacts, contact) => {
        if (contact.emailAddresses) {
          let thisContact = {email: contact.emailAddresses[0].value};
          if (contact.names) {
            thisContact.name = contact.names[0].displayName;
            filteredContacts[contact.emailAddresses[0].value] = thisContact;
          }
        }
        return filteredContacts;
      }, {});
    };
    const contactObject = loadContacts(response.data.connections);
    const contactList = [];
    for (let key in contactObject) {
      contactList.push(contactObject[key]);
    }

    this.allContacts = contactList;
    console.log(this.allContacts);
    this.pages = [];
    let page = 0;
    for (let i = 0; i < this.allContacts.length;) {
      this.pages[page] = [];
      for (let j = 0; j < 60; j++) {
        this.pages[page].push(this.allContacts[i]);
        i++;
      }
      page++;
    }
    this.availableFriends = this.pages[0];
    console.log(this.pages[0]);
    this.loadingContacts = false;
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
ImportContactsController.$inject = ['FriendService', '$state', '$http'];

const ImportContactsComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ImportContactsController
};

const ImportContactsModule = angular.module('app.importContacts', [])
  .component('importContacts', ImportContactsComponent);

export default ImportContactsModule.name;