﻿'use strict';

var currHexagon = {Y:-1, X:-1};

angular.module('myApp.home').service('GameboardService', function () {
   
    this.initBoard = function () {
        var hexagonAngle = 0.523598776, // 30 degrees in radians
            sideLength = 40,
            boardWidth = 50,
            boardHeight = 50,
            hexHeight = Math.sin(hexagonAngle) * sideLength,
            hexRadius = Math.cos(hexagonAngle) * sideLength,
            hexRectangleHeight = sideLength + 2 * hexHeight,
            hexRectangleWidth = 2 * hexRadius,
            canvas = document.getElementById('hexmap');

        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;

            function drawHexagon (canvasContext, x, y, fill) {
                fill = fill || false;

                canvasContext.beginPath();
                canvasContext.moveTo(x + hexRadius, y);
                canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
                canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
                canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
                canvasContext.lineTo(x, y + sideLength + hexHeight);
                canvasContext.lineTo(x, y + hexHeight);
                canvasContext.closePath();

                if (fill) {
                    canvasContext.fill();
                } else {
                    canvasContext.stroke();
                }
            }

            function drawBoard(canvasContext, width, height) {
                var i,
                    j;

                for (i = 0; i < width; ++i) {
                    for (j = 0; j < height; ++j) {
                        drawHexagon(
                            ctx,
                            i * hexRectangleWidth + ((j % 2) * hexRadius),
                            j * (sideLength + hexHeight),
                            false
                        );
                    }
                }
            }

            drawBoard(ctx, boardWidth, boardHeight);

            canvas.addEventListener('click', function (eventInfo) {
                
                // Get the X and Y coordinates of the selected Hexagon
                var x = eventInfo.offsetX || eventInfo.layerX,
                    y = eventInfo.offsetY || eventInfo.layerY,
                    hexY = Math.floor(y / (hexHeight + sideLength)),
                    hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth),
                    screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius),
                    screenY = hexY * (hexHeight + sideLength);

                drawBoard(ctx, boardWidth, boardHeight);

                // Check if the mouse's coords are on the board
                if (hexX >= 0 && hexX < boardWidth) {
                    if (hexY >= 0 && hexY < boardHeight) {

                        // No hexagon previously selected. Set X & Y. Highlight hexagon.
                        if (currHexagon.X == -1 && currHexagon.Y == -1) {
                            currHexagon.X = screenX;
                            currHexagon.Y = screenY;
                        }
                        // Check if we selected the same hexagon. If we did clear it.
                        else if (currHexagon.X == screen.X && currHexagon.Y == screen.Y) {
                            ctx.fillStyle = '#ffffff';
                            drawHexagon(ctx, currHexagon.X, currHexagon.Y, true);
                        }
                        // New Hexagon, clear the old hexagon. Then set X & Y. Highlight new hexagon.
                        else {
                            ctx.fillStyle = '#ffffff';
                            drawHexagon(ctx, currHexagon.X, currHexagon.Y, true);
                            currHexagon.X = screenX;
                            currHexagon.Y = screenY;
                            ctx.fillStyle = '#add8e6';
                            drawHexagon(ctx, screenX, screenY, true);
                        }
                        
                    }
                }
            });
        }
    }
});