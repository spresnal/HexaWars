'use strict';

angular.module('myApp.home', ['ngRoute', 'panhandler'])

.controller('HomeCtrl', ['$scope', 'ProfileService', 'GameboardService', 'UnitCreationService', function ($scope, ProfileService, GameboardService, UnitCreationService) {
    GameboardService.initBoard();

    //set board width and height for panning
    $scope.screenHeight = window.innerHeight - 90 + 'px';
    $scope.screenWidth = window.innerWidth + 'px';

    //----Replace with calls to server later
    $scope.loggedIn = true;
    $scope.food = 120;
    $scope.stone = 80;
    $scope.gold = 54;
    $scope.wood = 49;
    //----

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
        UnitCreationService.createUnit(type);
    };

    }]);