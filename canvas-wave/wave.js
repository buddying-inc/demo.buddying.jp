window.onload = function() {
    var unit,
        canvas, context,
        height, width, xAxis1, xAxis2, yAxis,
        heightHarf, heightQuarter,
        lineWidth = 30;

    function init() {
        canvas = document.getElementById('canvas');
        canvas.width = canvas.clientWidth;
        canvas.height = 300;
        context = canvas.getContext('2d');

        height = canvas.height;
        width = canvas.width;

        yAxis = 0;

        heightQuarter = Math.floor(height / 4);
        heightHarf = Math.floor(height / 2);
        xAxis1 = heightQuarter;
        xAxis2 = height - heightQuarter;
        unit = Math.floor(heightQuarter - (lineWidth / 2));
        draw();
    }

    function draw() {
        context.clearRect(0, 0, width, height);

        context.strokeStyle = '#fff';
        context.lineWidth = lineWidth;

        context.beginPath();
        drawSine1(draw.t);
        drawSine2(draw.t);
        context.stroke();

        draw.seconds = draw.seconds - .007;
        draw.t = draw.seconds * Math.PI;
        setTimeout(draw, 35);
    }
    draw.seconds = 0;
    draw.t = 0;

    function drawSine1(t) {
        var x = t;
        var y = Math.sin(x);
        context.moveTo(yAxis, (unit * y) + xAxis1);

        for (var i = yAxis - lineWidth; i <= width + lineWidth; i += 10) {
            x = t + (-yAxis + i) / unit;
            y = Math.sin(x);
            context.lineTo(i, (unit * y) + xAxis1);
        }
    }

    function drawSine2(t) {
        var x = t;
        var y = Math.sin(x);
        context.moveTo(yAxis, (unit * y) + xAxis2);

        for (var i = yAxis - lineWidth; i <= width + lineWidth; i += 10) {
            x = t + (-yAxis + i) / unit;
            y = Math.sin(x);
            context.lineTo(i, (unit * y) + xAxis2);
        }
    }

    init();
};