'use strict';

angular.module('myApp.home').service('ProfileService', function () {
    var activeUsername;

    this.login = function (username, password) {
        //swap for call to server
        console.log('Login attempt for: ' + username + ':' + password);

        //on success
        activeUsername = username;
        return true;
    }

    this.register = function (username, password) {
        //swap for call to server
        console.log('Register attempt for: ' + username + ':' + password);
        
        //on success
        activeUsername = username;
        return true;
    }

    this.getUsername = function() {
        return activeUsername;
    }
});