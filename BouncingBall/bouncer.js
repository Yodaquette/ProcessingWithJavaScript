// Environment for the bouncing animation
function bouncer(processing)
{
    // Environment variables
    var width = 200, height = 200, fps = 24;

    // Initialize a ball object
    var bouncer = new Ball(processing, width / 2, 20, 20);
    
    // Setup the environment
    processing.setup = function ()
    {
	processing.size(width, height);
	processing.frameRate(fps);
	processing.stroke(0,0,0);
	processing.fill(20, 20, 255);
    };
    
    // Main loop
    processing.draw = function ()
    {
	bouncer.computeNextStep(width,height,fps);
	processing.background(255, 255, 255);
	bouncer.drawBall();
    };
}

function main()
{
    var canvas = document.getElementById("bounce");
    var instance = new Processing(canvas,bouncer);
}