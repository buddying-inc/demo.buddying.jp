var OneWave = function(param) {
    // TODO マジックナンバー unit, timeの増減, xAxis,
    var W = this;
    var canvas = document.getElementById(param.id);
    var canvasWidth = canvas.clientWidth;
    var canvasHeight = canvas.clientHeight;
    var ctx = canvas.getContext('2d');
    var yAxis = 0;
    var linexAxis;
    var unit = 100;
    var seconds = 0;
    var time = 0;
    var color = param.color || '#ffffff';
    var lineWidth = param.lineWidth || 30;

    W.init = function() {
        W.retinaSupport();
        linexAxis = canvasHeight / 2;
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

    W.start = function() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        W.drawLine();

        seconds -= .01; //プラスで<=、マイナスで=>移動、数値変更でスピード変更
        time = seconds * Math.PI;
        setTimeout(W.start, 100);
    };

    W.drawLine = function() {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        W.drawSine(linexAxis);
        ctx.stroke();
    };

    W.drawSine = function(xAxis) {
        var x = time;
        var y = Math.sin(x);
        ctx.moveTo(yAxis, unit * y + xAxis);

        for (var i = yAxis; i <= canvasWidth + 10; i += 10) {
            x = time + (-yAxis + i) / unit;
            y = Math.sin(x) / 5; // 数値変更で波の高さ変更
            ctx.lineTo(i, unit * y + xAxis);
        }
    };

    W.init();
};
