'use strict';

angular.module('myApp.home').service('UnitCreationService', function (GameboardService) {
 
    this.createUnit = function (type) {
        var currHexgan = GameboardService.getcurrHexagon();
        var img = new Image();
        img.src = '/app/home/sprites/' + type + '.png';

        GameboardService.drawHexagonWithUnit(currHexagon.X, currHexagon.Y, img);

        //console.log(currHexagon.X.toString() + ' ' + currHexagon.Y.toString());


        return true;
    }
    
});