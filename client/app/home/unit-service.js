'use strict';

angular.module('myApp.home').service('UnitService', function (GameboardService) {
 
    var currentUnits = [];

    this.createUnit = function (type) {
        var currHexgan = GameboardService.getcurrHexagon();
        var img = new Image();
        img.src = '/app/home/sprites/' + type + '.png';

        GameboardService.drawHexagonWithUnit(currHexagon.X, currHexagon.Y, img);

        console.log('Clicked Hex:'+currHexagon.X.toString() + ' ' + currHexagon.Y.toString());
        return true;
    }


});