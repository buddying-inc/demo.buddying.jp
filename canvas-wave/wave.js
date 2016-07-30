window.onload = function() {
    var unit,
        canvas, context, context2,
        height, width, xAxis1, xAxis2, yAxis;
    var lineWidth = 6;

    function init() {
        canvas = document.getElementById('canvas');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        context = context2 = canvas.getContext('2d');

        height = canvas.height;
        width = canvas.width;

        yAxis = 0;

        xAxis1 = height - 10 - 5;
        xAxis2 = height - 10;
        unit = 50; // 波の間隔
        draw();
    }

    function draw() {
        context.clearRect(0, 0, width, height);
        context2.clearRect(0, 0, width, height);

        drawStroke();
        drawWave();

        draw.seconds = draw.seconds - .007;
        draw.t = draw.seconds * Math.PI;
        setTimeout(draw, 100);
    }
    draw.seconds = 0;
    draw.t = 0;

    function drawStroke() {
        context.strokeStyle = '#fff';
        context.lineWidth = lineWidth;

        context.beginPath(); //パスの開始
        drawSine1(draw.t);
        context.stroke();
    }
    function drawSine1(t) {
        var x = t; //時間を横の位置とする
        var y = Math.sin(x);
        context.moveTo(yAxis, unit * y + xAxis1); //スタート位置にパスを置く

        // Loop to draw segments (横幅の分、波を描画)
        for (var i = yAxis; i <= width + 10; i += 10) {
            x = t + (-yAxis + i) / unit;
            y = Math.sin(x) / 5; // 数値変更で波の強さ変更
            context.lineTo(i, unit * y + xAxis1);
        }
    }

    function drawWave() {
        context2.fillStyle = '#fff';

        context2.beginPath(); //パスの開始
        drawSine(draw.t);
        context2.lineTo(width + 10, height); //パスをCanvasの右下へ
        context2.lineTo(0, height); //パスをCanvasの左下へ
        context2.closePath(); //パスを閉じる
        context2.fill(); //塗りつぶす
    }


    function drawSine(t) {
        var x = t; //時間を横の位置とする
        var y = Math.sin(x);
        context2.moveTo(yAxis, unit*y+xAxis2); //スタート位置にパスを置く

        // Loop to draw segments (横幅の分、波を描画)
        for (var i = yAxis; i <= width + 10; i += 10) {
            x = t + (-yAxis + i) / unit;
            y = Math.sin(x) / 5; // 数値変更で波の強さ変更
            context2.lineTo(i, unit * y + xAxis2);
        }
    }

    init();
};