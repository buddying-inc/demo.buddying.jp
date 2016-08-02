var Wave = function(param) {
    // TODO マジックナンバー unit, timeの増減, xAxis,
    var W = this;
    var canvas = document.getElementById(param.id);
    var canvasWidth = canvas.clientWidth;
    var canvasHeight = canvas.clientHeight;
    var ctx = canvas.getContext('2d');
    var unit = canvasHeight / 2; // 円の大きさ
    var seconds = 0;
    var time = 0;
    var yAxis = -10;
    var linexAxis, wavexAxis;
    var type, color, lineWidth, waveInterval, speed;

    W.init = function() {
        W.retinaSupport();
        W.setting(param);
    };

    W.retinaSupport = function() {
        var pixelRatio = window.devicePixelRatio;
        if (pixelRatio) {
            // grab the width and height from canvas
            // reset the canvas width and height with pixelRatio applied
            canvas.setAttribute('width', Math.round(canvasWidth * pixelRatio));
            canvas.setAttribute('height', Math.round(canvasHeight * pixelRatio));
            // force the canvas back to the original size using css
            canvas.style.width = canvasWidth + 'px';
            canvas.style.height = canvasHeight + 'px';
            // set render scaled
            ctx.scaleX = ctx.scaleY = pixelRatio;
            canvasWidth = canvasWidth * pixelRatio;
            canvasHeight = canvasHeight * pixelRatio;
        }
    };

    W.setting = function(param) {
        var wave = param.wave;
        type         = param.type        || 'single';
        color        = param.color       || '#ffffff';
        lineWidth    = param.lineWidth   || 20;
        speed        = wave.speed        || 0.01;
        waveInterval = wave.interval     || 1;
        if (wave.direction === 'right') {
            speed = -speed;
        }
        linexAxis = canvasHeight / 2;
        wavexAxis = linexAxis + lineWidth;
    };

    W.isWave = function() {
        return type === 'wave';
    };

    W.start = function() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = lineWidth;

        W.drawLine();
        if (W.isWave()) {
            W.drawWave();
        }

        seconds = seconds + speed;
        time = seconds * Math.PI;
        setTimeout(W.start, 100);
    };

    W.drawLine = function() {
        ctx.beginPath();
        W.drawSine(linexAxis);
        ctx.stroke();
    };

    W.drawWave = function() {
        ctx.beginPath();
        W.drawSine(wavexAxis);
        ctx.lineTo(canvasWidth + 10, canvasHeight);
        ctx.lineTo(yAxis, canvasHeight);
        ctx.closePath();
        ctx.fill();
    };

    W.drawSine = function(xAxis) {
        var x = time;
        var y = Math.sin(x);
        ctx.moveTo(yAxis, unit * y + xAxis);

        for (var i = yAxis; i <= canvasWidth + 10; i += 10) {
            x = time + (-yAxis + i) / unit / waveInterval;
            y = Math.sin(x);
            ctx.lineTo(i, unit * y + xAxis);
        }
    };
    
    W.init();
};

window.onload = function() {
    var option = {
        id       : 'canvas',
        type     : 'wave',
        color    : '#fff',
        lineWidth: 10,
        wave: {
            speed    : 0.01,
            interval : 10,
            direction: 'right',
        },
    };
    var wave = new Wave(option);
    wave.start();

    var option2 = {
        id       : 'one-canvas',
        type     : 'single',
        color    : '#ddd',
        lineWidth: 30,
        wave: {
            speed    : 0.05,
            interval : 10,
            direction: 'left',
        },
    };
    var oneWave = new Wave(option2);
    oneWave.start();
};