'use strict';

angular.module('myApp.home', ['ngRoute', 'panhandler'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', '$timeout', 'GameboardService', function ($scope, $timeout, GameboardService) {
    GameboardService.initBoard();

    //set board width and height for panning
    $scope.screenHeight = window.innerHeight - 90 + 'px';
    $scope.screenWidth = window.innerWidth + 'px';

    $scope.loggedIn = false;

    $scope.preventPan = function () {
        if (!$scope.loggedIn) {
            return true;
        } else {
            return false;
        }
    };
}]);