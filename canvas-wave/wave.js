var Wave = function(param) {
    var W = this;
    var canvas = document.getElementById(param.id);
    var canvasWidth = canvas.clientWidth;
    var canvasHeight = canvas.clientHeight;
    var ctx = canvas.getContext('2d');
    var unit = canvasHeight / 2 - param.lineWidth; // 円の大きさ
    var seconds = 0;
    var time = 0;
    var yAxis = -10;
    var linexAxis, wavexAxis;
    var type, color, lineWidth, waveInterval, speed;
    var waveTimer;

    W.init = function() {
        W.retinaSetting(canvas.clientWidth, canvas.clientHeight);
        W.setting(param);
    };

    W.retinaSetting = function(width, height) {
        var pixelRatio = window.devicePixelRatio;
        if (pixelRatio) {
            // grab the width and height from canvas
            // reset the canvas width and height with pixelRatio applied
            canvas.setAttribute('width', Math.round(width * pixelRatio));
            canvas.setAttribute('height', Math.round(height * pixelRatio));
            // force the canvas back to the original size using css
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            // set render scaled
            ctx.scaleX = ctx.scaleY = pixelRatio;
            canvasWidth = width * pixelRatio;
            canvasHeight = height * pixelRatio;
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
        waveTimer = setTimeout(W.start, 100);
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

    window.addEventListener('resize', function() {
        clearTimeout(waveTimer);
        var width = canvas.parentNode.clientWidth;
        W.retinaSetting(width, canvasHeight);
        W.start();
    });

    W.init();
};