'use strict';

angular.module('myApp.home', ['ngRoute', 'panhandler'])

.controller('HomeCtrl', ['$scope', 'ProfileService', 'GameboardService', 'UnitService', function ($scope, ProfileService, GameboardService, UnitService) {
    GameboardService.initBoard();

    //set board width and height for panning
    $scope.screenHeight = window.innerHeight - 90 + 'px';
    $scope.screenWidth = window.innerWidth + 'px';
    $scope.build = 'units';

    //----Replace with calls to server later
    $scope.displayName = 'Sam\'s Empire';
    $scope.loggedIn = false;
    $scope.food = 100;
    $scope.stone = 20;
    $scope.gold = 20;
    $scope.wood = 20;
    //----

    if (!$scope.loggedIn) {
        $scope.view = 'login';
    }

    //initialize kendo color picker
    $('#empireColor').kendoColorPalette({
        palette: 'basic',
        tileSize: 32
    });

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
        if (type === 'pikeman' || type === 'knight' || type === 'swordsman') {
            if ($scope.gold >= 2 && $scope.stone >= 2) {
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
        else if (type === 'mage') {
            if ($scope.gold >= 5) {
                UnitService.createUnit(type);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.gold = $scope.gold - 5;
                    }, 1000);
                });
            }
        }
        // Costs 1 gold, 1 wood
        else if (type === 'archer') {
            if ($scope.gold >= 1 && $scope.wood >= 1) {
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

    $scope.updateInfo = function (displayName) {
        $scope.empireColor = $('#empireColor').data('kendoColorPalette').value();
        //empireColor retrieved as hash (ex: #3f48cc) the '#' must be stripped before sending a post request
        ProfileService.updateInfo(displayName, $scope.empireColor.slice(1, empireColor.length), function(result) {
            if (result.success) {
                console.log('Info Updated');
                $scope.view = 'game';
            } else {
                console.log('Info Update Failed');
                //Remove this after server added
                $scope.view = 'game';
            }
        });
    };

    //Handle scrolling to end of board
    var moveListener = function () {
        //console.log(document.getElementById('panhandler').childNodes[0].style.MozTransform);
        //console.log('moving');
    };
    document.getElementById('panhandler').addEventListener('mousedown', function () {
        document.getElementById('panhandler').addEventListener('mousemove', moveListener);
    });
    document.getElementById('panhandler').addEventListener('mouseup', function () {
        document.getElementById('panhandler').removeEventListener('mousemove', moveListener);
    });
}]);
