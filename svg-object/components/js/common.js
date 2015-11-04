$(function(){

  $(window).load(function(){
    var $hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    var $hue02 = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

    var svg_test = document.getElementById('svg_test').contentDocument;
    var $svg_test = $(svg_test);
    $svg_test.find('path').attr('fill', $hue);

    var $ribbon = $('#ribbon', $svg_test);
    var $hat = $('#hat', $svg_test);
    $ribbon.find('path').attr('fill', $hue02);

  });


});