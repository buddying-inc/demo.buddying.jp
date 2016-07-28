window.onload = function() {
    var unit,
        canvas, context,
        height, width, xAxis, yAxis,
        draw, lineWidth = 20;

    /**
     * Init function.
     *
     * Initialize variables and begin the animation.
     */
    function init() {
        canvas = document.getElementById('canvas');
        canvas.width = canvas.clientWidth;
        canvas.height = 300;
        context = canvas.getContext('2d');

        height = canvas.height;
        width = canvas.width;

        xAxis = Math.floor(height / 2);
        unit = xAxis - (lineWidth / 2);
        yAxis = -lineWidth;

        context.save();
        draw();
    }

    /**
     * Draw animation function.
     *
     * This function draws one frame of the animation, waits 20ms, and then calls
     * itself again.
     */
    draw = function () {
        // Clear the canvas
        context.clearRect(0, 0, width, height);

        // Set styles for animated graphics
        context.strokeStyle = '#fff';
        context.lineWidth = lineWidth;

        // Draw the sine curve at time draw.t, as well as the circle.
        context.beginPath();
        drawSine(draw.t);
        context.stroke();

        // Update the time and draw again
        draw.seconds = draw.seconds - .007;
        draw.t = draw.seconds * Math.PI;
        setTimeout(draw, 35);
    };
    draw.seconds = 0;
    draw.t = 0;

    /**
     * Function to draw sine
     *
     * The sine curve is drawn in 10px segments starting at the origin.
     */
    function drawSine(t) {
        // Set the initial x and y, starting at 0,0 and translating to the origin on
        // the canvas.
        var x = t;
        var y = Math.sin(x);
        context.moveTo(yAxis, (unit * y) + xAxis);

        // Loop to draw segments
        for (var i = yAxis; i <= width + lineWidth; i += 10) {
            x = t + (-yAxis + i) / unit;
            y = Math.sin(x);
            context.lineTo(i, (unit * y) + xAxis);
        }
    }

    init();
};
