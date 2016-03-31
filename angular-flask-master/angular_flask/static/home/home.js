'use strict';

angular.module('myApp.home', ['ngRoute', 'panhandler'])

.controller('HomeCtrl', ['$scope', 'ProfileService', 'GameboardService', 'UnitService', function ($scope, ProfileService, GameboardService, UnitService) {
    GameboardService.initBoard();

    //set board width and height for panning
    $scope.screenHeight = window.innerHeight - 90 + 'px';
    $scope.screenWidth = window.innerWidth + 'px';

    $scope.loggedIn = true;
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

    $scope.createunit = function(type) {
        UnitService.createUnit(type);
    };

    }]);