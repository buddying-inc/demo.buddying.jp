/*global Wave*/
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
        lineWidth: 5,
        wave: {
            speed    : 0.05,
            interval : 10,
            direction: 'left',
        },
    };
    var oneWave = new Wave(option2);
    oneWave.start();
};