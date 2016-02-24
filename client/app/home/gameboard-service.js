'use strict';

var currHexagon = {Y:-1, X:-1};



angular.module('myApp.home').service('GameboardService', function () {
    this.getcurrHexagon = function() {
        return currHexagon;
    }

    this.initBoard = function () {
        var hexagonAngle = 0.523598776, // 30 degrees in radians
            sideLength = 55,
            boardWidth = 50,
            boardHeight = 50,
            hexHeight = Math.sin(hexagonAngle) * sideLength,
            hexRadius = Math.cos(hexagonAngle) * sideLength,
            hexRectangleHeight = sideLength + 2 * hexHeight,
            hexRectangleWidth = 2 * hexRadius,
            canvas = document.getElementById('hexmap');

        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            //ctx.fillStyle = '#C0C0C0';
            ctx.strokeStyle = '#C0C0C0';
            ctx.lineWidth = 2;

            // Fills in the hexagons
            //drawBoard(ctx, boardWidth, boardHeight, true);

            //Outline the board
            drawBoard(ctx, boardWidth, boardHeight, false);

            this.drawHexagonWithUnit = function (x, y, img) {
                ctx.drawImage(img, x+30, y+30);
            }

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

            function drawBoard(canvasContext, width, height, fill) {
                var i,
                    j;

                for (i = 0; i < width; ++i) {
                    for (j = 0; j < height; ++j) {
                        drawHexagon(
                            ctx,
                            i * hexRectangleWidth + ((j % 2) * hexRadius),
                            j * (sideLength + hexHeight),
                            fill
                        );
                    }
                }
            }

            

            canvas.addEventListener('click', function (eventInfo) {
                
                // Get the X and Y coordinates of the selected Hexagon
                var x = eventInfo.offsetX || eventInfo.layerX,
                    y = eventInfo.offsetY || eventInfo.layerY,
                    hexY = Math.floor(y / (hexHeight + sideLength)),
                    hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth),
                    screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius),
                    screenY = hexY * (hexHeight + sideLength);

                ctx.strokeStyle = '#C0C0C0';
                ctx.lineWidth = 2;

                drawBoard(ctx, boardWidth, boardHeight);

                // Check if the mouse's coords are on the board
                if (hexX >= 0 && hexX < boardWidth) {
                    if (hexY >= 0 && hexY < boardHeight) {

                        // No hexagon previously selected. Set X & Y. Highlight hexagon.
                        if (currHexagon.X == -1 && currHexagon.Y == -1) {
                            currHexagon.X = screenX;
                            currHexagon.Y = screenY;
                            ctx.strokeStyle = '#FF0000';
                            ctx.lineWidth = 2;
                            drawHexagon(ctx, currHexagon.X, currHexagon.Y, false);
                        }
                        // Check if we selected the same hexagon. If we did clear it.
                        else if (currHexagon.X == screen.X && currHexagon.Y == screen.Y) {
                            ctx.strokeStyle = '#C0C0C0';
                            ctx.lineWidth = 2;
                            drawHexagon(ctx, currHexagon.X, currHexagon.Y, false);
                        }
                        // New Hexagon, clear the old hexagon. Then set X & Y. Highlight new hexagon.
                        else {
                            ctx.strokeStyle = '#C0C0C0';
                            ctx.lineWidth = 2;
                            drawHexagon(ctx, currHexagon.X, currHexagon.Y, false);
                            currHexagon.X = screenX;
                            currHexagon.Y = screenY;
                            ctx.strokeStyle = '#FF0000';
                            ctx.lineWidth = 2;
                            drawHexagon(ctx, screenX, screenY, false);
                        }
                        
                    }
                }
            });
        }
    }
});