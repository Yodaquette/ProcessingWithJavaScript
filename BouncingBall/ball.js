// Simulate a bouncing ball with the processing.js library
function Ball(procjs, x_val, y_val, radius_val)
{
    // Member variables
    var x = x_val, y = y_val, radius = radius_val, step = 0;
    
    // Compute the next step of the animation
    this.computeNextStep = function (sketch_width, sketch_height, frame_rate)
    {
		step++;
		var sin_value = Math.abs(Math.sin(Math.PI * step / parseFloat(frame_rate)));
		var bounce_height = sketch_height / 2 * sin_value;
		var ball_height = sketch_height - (bounce_height + radius);
		y = parseInt(ball_height);
    }
    
    // Draw the ball
    this.drawBall = function ()
    {
		procjs.ellipse(x, y, radius, radius);
    }
}