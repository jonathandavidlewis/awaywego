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

    this.loadContacts = this.loadContacts.bind(this);
    this.filterGoogleContacts = this.filterGoogleContacts.bind(this);
    this.getGoogleContacts = this.getGoogleContacts.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.filterFriends = this.filterFriends.bind(this);
    this.addToPlan = this.addToPlan.bind(this);
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
    this.http(req).then((handleError, this.filterGoogleContacts));
  }

  loadContacts(contacts) {
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
  }

  filterGoogleContacts(response) {

    const contactObject = this.loadContacts(response.data.connections);
    const contactList = [];
    for (let key in contactObject) {
      contactList.push(contactObject[key]);
    }

    this.allContacts = contactList;
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