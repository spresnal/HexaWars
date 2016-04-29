'use strict';

angular.module('myApp.home').service('UnitService', function (GameboardService, RequestService) {

this.createUnit = function (type) {
    var currHexgan = GameboardService.getcurrHexagon();
    var img = new Image();
    img.src = '/static/imgs/sprites/' + type + '.png';
    GameboardService.drawHexagonWithUnit(currHexagon.X + 8, currHexagon.Y+8, img);

    // console.log(currHexagon.X.toString() + ' ' + currHexagon.Y.toString());

    var url = RequestService.buildURL('made_player', {
      x: currHexagon.hexX,
      y: currHexagon.hexY,
      kind: type,
      owner: 0
     });

    console.log(url)
    RequestService.request('POST', url, function(){});

    return true;
}

});
