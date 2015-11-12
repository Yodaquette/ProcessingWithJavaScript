var radius = 50.0;
var fps = 15;
var width = 200, height = 200;
var X, Y, nX, nY, delay = 16;

function tracker(processing)
{
	// Setup the environment
	processing.setup = function ()
	{
		processing.size(width, height);
		processing.strokeWeight(15);
		processing.frameRate(fps);
		X = width / 2;
		Y = height / 2;
		nX = X;
		nY = Y;
	};

	// Drawing loop
	processing.draw = function ()
	{
		radius = radius + Math.sin(processing.frameCount / 4);

		// Track circle to new destination
		X += (nX - X) / delay;
		Y += (nY - Y) / delay;

		// Fill canvas with grey
		processing.background(100);

		// Set fill color to blue
		processing.fill(0,121,184);
		
		// Set stroke-color to white
		processing.stroke(255);

		// Draw circle
		processing.ellipse(X,Y,radius,radius);
	};

	// Set circle's next destination
	processing.mouseMoved = function ()
	{
		nX = processing.mouseX;
		nY = processing.mouseY;
	};
}

function init()
{
	var canvas = document.getElementById("mouseTracker");
	var procInstance = new Processing(canvas,tracker);
}