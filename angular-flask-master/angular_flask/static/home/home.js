'use strict';

angular.module('myApp.home', ['ngRoute', 'panhandler', 'colorpicker.module'])

.controller('HomeCtrl', ['$scope', 'ProfileService', 'GameboardService', 'UnitCreationService', function ($scope, ProfileService, GameboardService, UnitCreationService) {
    GameboardService.initBoard();

    //set board width and height for panning
    $scope.screenHeight = window.innerHeight - 90 + 'px';
    $scope.screenWidth = window.innerWidth + 'px';

    //----Replace with calls to server later
    $scope.loggedIn = false;
    $scope.food = 120;
    $scope.stone = 80;
    $scope.gold = 54;
    $scope.wood = 49;
    //----

    if (!$scope.loggedIn) {
        $scope.view = 'login';
    }

    $scope.login = function (username, password) {
        //the function(result) passed in gets called when the http response comes back
        ProfileService.login(username, password, function (result) {
            /*
             * Result contains
             * result.success = true/false
             * result.response = data retrieved
             */

            if (result.success) {
                //Login succeeded
                $scope.loggedIn = true;
                $scope.view = 'game';
            } else {
                //Login failed
                console.log('Login failed: ' + result.response.statusText);
            }
        });
    };

    $scope.register = function (username, password) {
        ProfileService.register(username, password, function (result) {
            if (result.success) {
                $scope.loggedIn = true;
                $scope.view = 'game';
            } else {
                console.log('Register failed: ' + result.response.statusText);
            }
        });
    };

    $scope.createunit = function (type) {
        UnitCreationService.createUnit(type);
    };

}]);