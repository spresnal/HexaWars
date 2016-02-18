(function(){
    var canvas = document.getElementById('hexmap');

    var hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776, // 30 degrees in radians
        sideLength = 30,
        boardWidth = 27,
        boardHeight = 17;

    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;

    if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 1;

        drawBoard(ctx, boardWidth, boardHeight);

        canvas.addEventListener("click", function(eventInfo) {
            var x,
                y,
                hexX,
                hexY,
                screenX,
                screenY;

            x = eventInfo.offsetX || eventInfo.layerX;
            y = eventInfo.offsetY || eventInfo.layerY;

            
            hexY = Math.floor(y / (hexHeight + sideLength));
            hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

            screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
            screenY = hexY * (hexHeight + sideLength);

            drawBoard(ctx, boardWidth, boardHeight);

            // Check if the mouse's coords are on the board
            if(hexX >= 0 && hexX < boardWidth) {
                if(hexY >= 0 && hexY < boardHeight) {
                    ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);

                    drawHexagon(ctx, screenX, screenY, true);
                }
            }
        });
    }

    function drawBoard(canvasContext, width, height) {
        var x, y, i;
		$http({method: 'GET', url: 'js/posts.json'}).success(function(data) {
			$scope.posts = data;
			//angular.forEach($scope.data, function(value, key){
			for(i=0;i<data.length;i++){
				//console.log("x: "+value.x+"   y: "+value.y);
				document.write(value.x);
				document.write(value.y);
				drawHexagon(
                    ctx, 
                    value.x * hexRectangleWidth + ((y % 2) * hexRadius), 
                    value.y * (sideLength + hexHeight), 
                    false
                );
        	}
		});
		/*
        for(x = 0; x < width; ++x) {
            for(y = 0; y < height; ++y) {
                drawHexagon(
                    ctx, 
                    x * hexRectangleWidth + ((y % 2) * hexRadius), 
                    y * (sideLength + hexHeight), 
                    false
                );
            }
        }
        */
    }

    function drawHexagon(canvasContext, x, y, fill) {           
        var fill = fill || false;

        canvasContext.beginPath();
        canvasContext.moveTo(x + hexRadius, y);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo(x, y + sideLength + hexHeight);
        canvasContext.lineTo(x, y + hexHeight);
        canvasContext.closePath();

        if(fill) {
            canvasContext.fill();
        } else {
            canvasContext.stroke();
        }
    }

})();