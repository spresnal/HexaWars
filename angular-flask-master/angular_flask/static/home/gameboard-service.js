
'use strict';

var currHexagon = {
    Y: -1,
    X: -1
};



angular.module('myApp.home').service('GameboardService', function (RequestService, $interval) {
    var board;

    this.getcurrHexagon = function() {
        return currHexagon;
    }

    this.initBoard = function() {
        var hexagonAngle = 0.523598776, // 30 degrees in radians
            sideLength = 35,
            boardWidth = 100,
            boardHeight = 100,
            hexHeight = Math.sin(hexagonAngle) * sideLength,
            hexRadius = Math.cos(hexagonAngle) * sideLength,
            hexRectangleHeight = sideLength + 2 * hexHeight,
            hexRectangleWidth = 2 * hexRadius,
            canvas = document.getElementById('hexmap');

        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            //ctx.fillStyle = '#C0C0C0';
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;

            // Fills in the hexagons
            //drawBoard(ctx, boardWidth, boardHeight, true);

            // Outline the board
//            drawBoard(ctx, boardWidth, boardHeight, false);

            // this.drawHexagonWithUnit = function (x, y, img) {
            //
            //     ctx.drawImage(img, x, y);
            //y
            // }

            function drawHexagon(canvasContext, x, y, fill, uni) {
                // fill = fill || false;

                canvasContext.beginPath();
                canvasContext.moveTo(x + hexRadius, y);
                canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
                canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
                canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
                canvasContext.lineTo(x, y + sideLength + hexHeight);
                canvasContext.lineTo(x, y + hexHeight);
                canvasContext.closePath();

                canvasContext.fill();
                canvasContext.stroke();

                if (uni != 0 && uni != undefined) {
                    //console.log("->" + x.toString() + ' ' + y.toString() + ' unit' + uni);
                    var img = new Image();
                    img.src = '/static/imgs/sprites/' + uni + '.png';
                    canvasContext.drawImage(img,
                    x + 8,
                    y + 8
                );

              }
            }



            function drawBoard(canvasContext, width, height, fill) {
                var i, j;
                var url = RequestService.buildURL('get_grid', {
                    test: "test1"
                });
                $interval(function() {
                        RequestService.request('POST',
                            url,
                            function(data) {
                                board = data.response.data;

                                for (i = 0; i < board.length; i++) {
                                    canvasContext.fillStyle = '#FFFFFF';
                                    if (board[i].x != 0 && board[i].x != 99 && board[i].y != 0 && board[i].y != 99) {
                                        switch (board[i].type) {
                                        case 0:
                                            canvasContext.fillStyle = '#397628';
                                            break;
                                        case 1:
                                            canvasContext.fillStyle = '#991e00';
                                            break;
                                        case 2:
                                            canvasContext.fillStyle = '#feb950';
                                            break;
                                        case 3:
                                            canvasContext.fillStyle = '#256d7b';
                                            break;
                                        }
                                    } else {
                                        canvasContext.fillStyle = '#000';
                                    }

                                    drawHexagon(
                                        ctx,
                                        board[i].x * hexRectangleWidth + ((board[i].y % 2) * hexRadius),
                                        board[i].y * (sideLength + hexHeight),
                                        true,
                                        board[i].uni
                                    );
                                }
                                /*
                                                  for(i=0; i<board.length; i++) {
                                                      if (board[i].uni != 0) {
                                                        console.log("->" + board[i].x.toString() + ' ' + board[i].y.toString());
            
                                                        var img = new Image();
                                                        img.src = '/static/imgs/sprites/' + board[i].uni + '.png';
                                                        canvasContext.drawImage(img,
                                                          board[i].x * hexRectangleWidth + ((board[i].y % 2) * hexRadius) + 8,
                                                          board[i].y * (sideLength + hexHeight) + 8
                                                        );
                                                      }
                                                  }
                                */

                                canvasContext.fillStyle = '#00ff00';

                            });
                    },
                    5000);
                /*
                for (i = 0; i < width; ++i) {
                    for (j = 0; j < height; ++j) {
                        drawHexagon(
                            ctx,
                            jboard.x * hexRectangleWidth + ((j % 2) * hexRadius),
                            jboard.y * (sideLength + hexHeight),
                            fill
                        );
                    }
                }
                */
            }

            drawBoard(ctx, boardWidth, boardHeight);

            function drawBoardOutlines(canvasContext, width, height, fill) {
                var i, j;
                for (i = 0; i < width; ++i) {
                    for (j = 0; j < height; ++j) {
                        drawHexagonBoarder(
                            ctx,
                            i * hexRectangleWidth + ((j % 2) * hexRadius),
                            j * (sideLength + hexHeight),
                            fill
                        );
                    }
                }
            }

            function drawHexagonBoarder(canvasContext, x, y, fill, uni) {
                // fill = fill || false;

                canvasContext.beginPath();
                canvasContext.moveTo(x + hexRadius, y);
                canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
                canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
                canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
                canvasContext.lineTo(x, y + sideLength + hexHeight);
                canvasContext.lineTo(x, y + hexHeight);
                canvasContext.closePath();

                
                canvasContext.stroke();
            }

            canvas.addEventListener('click', function(eventInfo) {

                // Get the X and Y coordinates of the selected Hexagon
                var x = eventInfo.offsetX || eventInfo.layerX,
                    y = eventInfo.offsetY || eventInfo.layerY,
                    hexY = Math.floor(y / (hexHeight + sideLength)),
                    hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth),
                    screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius),
                    screenY = hexY * (hexHeight + sideLength);

                //conversion from click to tuple
                console.log(board[hexX * 100 + hexY]);
                
                // Clean the board real quick
               //  ctx.strokeStyle = '#fff';
               //  ctx.lineWidth = 2;
                // drawBoardOutlines(canvas, x, y, true);


                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;

                //                drawBoard(ctx, boardWidth, boardHeight);

                // Check if the mouse's coords are on the board
                if (hexX >= 0 && hexX < boardWidth) {
                    if (hexY >= 0 && hexY < boardHeight) {

                        // No hexagon previously selected. Set X & Y. Highlight hexagon.
                        if (currHexagon.X == -1 && currHexagon.Y == -1) {
                            currHexagon.X = screenX;
                            currHexagon.Y = screenY;
                            ctx.strokeStyle = '#00ff00';
                            ctx.lineWidth = 2;
                            drawHexagonBoarder(ctx, currHexagon.X, currHexagon.Y, false);
                        }
                            // Check if we selected the same hexagon. If we did clear it.
                        else if (currHexagon.X == screen.X && currHexagon.Y == screen.Y) {
                            ctx.strokeStyle = '#00ff00';
                            ctx.lineWidth = 2;
                            drawHexagonBoarder(ctx, currHexagon.X, currHexagon.Y, false);
                        }

                        // New Hexagon, clear the old hexagon. Then set X & Y. Highlight new hexagon.
                        else {
                            // Clear AOE around previous hexagon
                            ctx.strokeStyle = '#fff';
                            ctx.lineWidth = 2;
                            drawHexagonBoarder(ctx, currHexagon.X, currHexagon.Y, false);

                            // East Hex
                            drawHexagonBoarder(ctx, currHexagon.X + hexRectangleWidth, currHexagon.Y, false);

                            // West Hex
                            drawHexagonBoarder(ctx, currHexagon.X - hexRectangleWidth, currHexagon.Y, false);

                            // NE Hex
                            drawHexagonBoarder(ctx, currHexagon.X + hexRectangleWidth / 2, currHexagon.Y - (hexRectangleHeight - 17.5), false);

                            // NW Hex
                            drawHexagonBoarder(ctx, currHexagon.X - hexRectangleWidth / 2, currHexagon.Y - (hexRectangleHeight - 17.5), false);

                            // SW Hex
                            drawHexagonBoarder(ctx, currHexagon.X + hexRectangleWidth / 2, currHexagon.Y + (hexRectangleHeight - 17.5), false);

                            // SE Hex
                            drawHexagonBoarder(ctx, currHexagon.X - hexRectangleWidth / 2, currHexagon.Y + (hexRectangleHeight - 17.5), false);




                            currHexagon.X = screenX;
                            currHexagon.Y = screenY;
                            ctx.strokeStyle = '#00ff00';
                            ctx.lineWidth = 2;
                            drawHexagonBoarder(ctx, screenX, screenY, false);
                        }

                    }
                }

                // If the clicked Hex has a unit highlight the area around it
                if (board[hexX * 100 + hexY].uni) {
                    ctx.strokeStyle = '#00ff00';
                    ctx.lineWidth = 2;

                    // East Hex
                    drawHexagonBoarder(ctx, currHexagon.X + hexRectangleWidth, currHexagon.Y, false);

                    // West Hex
                    drawHexagonBoarder(ctx, currHexagon.X - hexRectangleWidth, currHexagon.Y, false);

                    // NE Hex
                    drawHexagonBoarder(ctx, currHexagon.X + hexRectangleWidth/2, currHexagon.Y - (hexRectangleHeight - 17.5), false);

                    // NW Hex
                    drawHexagonBoarder(ctx, currHexagon.X - hexRectangleWidth / 2, currHexagon.Y - (hexRectangleHeight - 17.5), false);

                    // SW Hex
                    drawHexagonBoarder(ctx, currHexagon.X + hexRectangleWidth / 2, currHexagon.Y + (hexRectangleHeight - 17.5), false);

                    // SE Hex
                    drawHexagonBoarder(ctx, currHexagon.X - hexRectangleWidth / 2, currHexagon.Y + (hexRectangleHeight -17.5 ), false);
                }

                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;

            });
        }
    }
});
