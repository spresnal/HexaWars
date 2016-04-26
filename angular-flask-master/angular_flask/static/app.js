'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'angularMoment',
  'myApp.home',
  'myApp.leaderboards',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/static/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/leaderboards', {
            templateUrl: '/static/leaderboards/leaderboards.html',
            controller: 'LeaderboardsCtrl'
        })
        .otherwise({ redirectTo: '/home' });
}]);
