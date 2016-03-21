'use strict';

angular.module('myApp.home').service('RequestService', ['$http', function ($http) {
    /*
     * Example
     * type: login
     * parameters: {username: user1, password: pass1}
     * 
     * result: /login?username=user1&password=pass1
     */
    this.buildURL = function (type, parameters) {
        var request = '';

        request += '/' + type + '?'; //ex: login register

        var index = 0;
        for (var parameter in parameters) { //ex: username password
            if (index !== 0) {
                request += '&';
            }
            request += parameter + '=' + parameters[parameter];
            index++;
        }

        return request;
    }

    /*
     * Example
     * method: GET
     * url: pass in built url
     * 
     * result: object.success = true/false
     *         object.response = data
     */
    this.request = function (method, url) {
        $http({
            method: method,
            url: url
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('success');
            return { success: true, response: response };
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            return { success: false, response: response };
        });
    }
}]);