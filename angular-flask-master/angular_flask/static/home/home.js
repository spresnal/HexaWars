'use strict';

angular.module('myApp.home', ['ngRoute', 'panhandler'])

.controller('HomeCtrl', ['$scope', 'ProfileService', 'GameboardService', 'UnitService', function ($scope, ProfileService, GameboardService, UnitService) {
    GameboardService.initBoard();

    //set board width and height for panning
    $scope.screenHeight = window.innerHeight - 90 + 'px';
    $scope.screenWidth = window.innerWidth + 'px';

    //----Replace with calls to server later
    $scope.loggedIn = false;
    $scope.food = 100;
    $scope.stone = 20;
    $scope.gold = 20;
    $scope.wood = 20;
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
      
        // Costs 2 gold, 2 steel
        if (type == 'pikeman' || type == 'knight' || type == 'swordsman') {
            if ($scope.gold > 2 && $scope.stone > 2) {
                UnitService.createUnit(type);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.gold = $scope.gold - 2;
                        $scope.stone = $scope.stone - 2;
                    }, 1000);
                });
            }
        }
        // Costs 5 gold
        else if (type == 'mage') {
            if ($scope.gold > 5) {
                UnitService.createUnit(type);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.gold = $scope.gold - 5;
                    }, 1000);
                });
            }
        }
        // Costs 1 gold, 1 wood
        else if (type == 'archer') {
            if ($scope.gold > 1 && $scope.wood > 1) {
                UnitService.createUnit(type);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.gold = $scope.gold - 1;
                        $scope.wood = $scope.wood - 1;
                    }, 1000);
                });
            }
        }
 

    };


}]);