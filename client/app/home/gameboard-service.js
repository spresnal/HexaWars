"use strict";

angular.module("myApp.home").service("GameboardService", function () {
   
    this.initBoard = function () {
        var hexagonAngle = 0.523598776, // 30 degrees in radians
            sideLength = 30,
            boardWidth = 27,
            boardHeight = 17,
            hexHeight = Math.sin(hexagonAngle) * sideLength,
            hexRadius = Math.cos(hexagonAngle) * sideLength,
            hexRectangleHeight = sideLength + 2 * hexHeight,
            hexRectangleWidth = 2 * hexRadius,
            canvas = document.getElementById("hexmap");

        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");

            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#CCCCCC";
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

            canvas.addEventListener("click", function (eventInfo) {
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
                        ctx.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);

                        drawHexagon(ctx, screenX, screenY, true);
                    }
                }
            });
        }
    }
});