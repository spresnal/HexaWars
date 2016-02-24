'use strict';

angular.module('myApp.home').service('SelectHexagonService', function() {

    this.highlightHexagon = (function(eventInfo) {
        var x = eventInfo.offsetX || eventInfo.layerX,
            y = eventInfo.offsetY || eventInfo.layerY,
            hexY = Math.floor(y / (hexHeight + sideLength)),
            hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth),
            screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius),
            screenY = hexY * (hexHeight + sideLength);

        // drawBoard(ctx, boardWidth, boardHeight);

        // Check if the mouse's coords are on the board
        if (hexX >= 0 && hexX < boardWidth) {
            if (hexY >= 0 && hexY < boardHeight) {
                ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);

                drawHexagon(ctx, screenX, screenY, true);
            }
        }
    });
});