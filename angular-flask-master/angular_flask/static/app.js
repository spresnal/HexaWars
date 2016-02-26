'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'angularMoment',
  'myApp.home',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/static/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/view2', {
            templateUrl: '/static/view2/view2.html',
            controller: 'View2Ctrl'
        })
        .otherwise({ redirectTo: '/home' });
}]);
