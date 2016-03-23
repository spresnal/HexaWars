'use strict';

angular.module('myApp.home').service('ProfileService', ['RequestService', function (RequestService) {
    var activeUsername;

    this.login = function (username, password, responseHandler) {
        console.log('Login attempt for: ' + username + ':' + password);
        console.log('Hashed Password: ' + CryptoJS.SHA3(password).toString());

        var url = RequestService.buildURL('login', { username: username, password: CryptoJS.SHA3(password).toString() });
        RequestService.request('GET', url, responseHandler);
    }

    this.register = function (username, password, responseHandler) {
        console.log('Register attempt for: ' + username + ':' + password);
        console.log('Hashed Password: ' + CryptoJS.SHA3(password).toString());
        
        var url = RequestService.buildURL('register', { username: username, password: CryptoJS.SHA3(password).toString() });
        RequestService.request('POST', url, responseHandler);
    }

    this.getUsername = function() {
        return activeUsername;
    }
}]);