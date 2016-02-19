"use strict";

angular.module("myApp.home", ["ngRoute", "panhandler"])

.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "home/home.html",
        controller: "HomeCtrl"
    });
}])

.controller("HomeCtrl", ["$scope", "GameboardService", function ($scope, GameboardService) {
    console.log($scope);
    GameboardService.initBoard();
}]);