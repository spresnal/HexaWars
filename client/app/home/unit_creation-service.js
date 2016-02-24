'use strict';

angular.module('myApp.home').service('UnitCreationService', function (GameboardService) {
 
    this.createUnit = function () {
        var currHexgan = GameboardService.getcurrHexagon();
        //swap for call to server
        console.log(currHexagon.X.toString() + ' ' + currHexagon.Y.toString());

        ////on success
        //activeUsername = username;
        return true;
    }
    
});