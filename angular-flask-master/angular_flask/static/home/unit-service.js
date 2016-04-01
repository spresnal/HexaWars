'use strict';

angular.module('myApp.home').service('UnitService', function (GameboardService) {
 
    this.createUnit = function (type) {
        var currHexgan = GameboardService.getcurrHexagon();
        var img = new Image();
        img.src = '/static/imgs/sprites/' + type + '.png';

        GameboardService.drawHexagonWithUnit(currHexagon.X, currHexagon.Y, img);




        return true;
    }
    
});