'use strict';

angular.module('myApp.home').service('ProfileService', ['RequestService', function (RequestService) {
    var activeUsername;

    this.login = function (username, password) {
        console.log('Login attempt for: ' + username + ':' + password);

        var url = RequestService.buildURL('login', { username: username, password: password });
        return RequestService.request('GET', url);
    }

    this.register = function (username, password) {
        console.log('Register attempt for: ' + username + ':' + password);
        
        var url = RequestService.buildURL('register', { username: username, password: password });
        return RequestService.request('POST', url);
    }

    this.getUsername = function() {
        return activeUsername;
    }
}]);