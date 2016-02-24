'use strict';

angular.module('myApp.home', ['ngRoute', 'panhandler'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', 'ProfileService', 'GameboardService', 'UnitCreationService', function ($scope, ProfileService, GameboardService, UnitCreationService) {
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

    $scope.createunit = function() {
        UnitCreationService.createUnit();
    };

    }]);