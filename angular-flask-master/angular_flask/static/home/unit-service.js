'use strict';

angular.module('myApp.home').service('UnitService', function (GameboardService, RequestService) {

this.createUnit = function (type) {
    // var currHexgan = GameboardService.getcurrHexagon();
    // var img = new Image();
    // img.src = '/static/imgs/sprites/' + type + '.png';

    // GameboardService.drawHexagonWithUnit(currHexagon.X, currHexagon.Y, img);

    // console.log(currHexagon.X.toString() + ' ' + currHexagon.Y.toString());


    var url = RequestService.buildURL('made_player', { test: "test1" });
    RequestService.request('POST', url, function(){});


    return true;
}

});
