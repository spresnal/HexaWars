'use strict';

angular.module('myApp.home', ['ngRoute', 'panhandler'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', 'ProfileService', 'GameboardService', function ($scope, ProfileService, GameboardService) {
    GameboardService.initBoard();

    //set board width and height for panning
    $scope.screenHeight = window.innerHeight - 90 + 'px';
    $scope.screenWidth = window.innerWidth + 'px';

    $scope.loggedIn = false;
    if (!$scope.loggedIn) {
        $scope.view = 'login';
    }

    $scope.login = function (username, password) {
        if (ProfileService.login(username, password)) {
            $scope.loggedIn = true;
            $scope.view = 'game';
        }
    };

    $scope.register = function (username, password) {
        if (ProfileService.register(username, password)) {
            $scope.loggedIn = true;
            $scope.view = 'game';
        }
    };
}]);