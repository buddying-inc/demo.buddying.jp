var map = null;
var infowindow = new google.maps.InfoWindow();
var gmarkers = [];
var i = 0;

function inicializar() {
    // 初期設定
    var option = {
        // ズームレベル
        zoom: 18,
        // 中心座標
        center: new google.maps.LatLng(35.318707, 139.550142),
        // タイプ
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), option);
    google.maps.event.addListener(map, "click", function() {infowindow.close();});

    // ポイント01
    var point = new google.maps.LatLng(35.318497, 139.550957);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://www.starbucks.co.jp/store/search/detail.php?id=396' target='_blank'>スターバックスコーヒー 鎌倉店</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a></div>");

    // ポイント02
    var point = new google.maps.LatLng(35.3191105,139.5507418);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://tabelog.com/kanagawa/A1404/A140402/14003290/' target='_blank'>Beck's 鎌倉店</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a><iframe src='https://www.google.com/maps/embed?pb=!1m0!3m2!1sja!2sjp!4v1448512759504!6m8!1m7!1ss2i1BGx_Jsn_hoLhQuMvFQ!2m2!1d35.3192097560262!2d139.5509369315995!3f264!4f0!5f0.7820865974627469' width='400' height='300' frameborder='0' style='border:0' allowfullscreen></iframe></div>");

    // ポイント03
    var point = new google.maps.LatLng(35.319472,139.551139);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://www.mcdonalds.co.jp/shop/map/map.php?strcode=14655' target='_blank'>マクドナルド 鎌倉店</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a><iframe src='https://www.google.com/maps/embed?pb=!1m0!3m2!1sja!2sjp!4v1448512879581!6m8!1m7!1s7IwqIn0Uu_G-_NckpTuzxA!2m2!1d35.31931790005627!2d139.5511798064505!3f358.2808178261086!4f0.21037575085237847!5f0.7820865974627469' width='400' height='300' frameborder='0' style='border:0' allowfullscreen></iframe></div>");

    // ポイント04
    var point = new google.maps.LatLng(35.319255, 139.548826);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://r.gnavi.co.jp/gab0788/' target='_blank'>サンマルクカフェ 鎌倉店</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a><iframe src='https://www.google.com/maps/embed?pb=!1m0!3m2!1sja!2sjp!4v1448516455492!6m8!1m7!1sxo3XUIhjzxm4evW1sQazDg!2m2!1d35.31943639347639!2d139.5488448195708!3f190.67774506944713!4f11.71452486743992!5f0.7820865974627469' width='400' height='300' frameborder='0' style='border:0' allowfullscreen></iframe></div>");

    // ポイント05
    var point = new google.maps.LatLng(35.317489, 139.551321);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://cobakaba.com/' target='_blank'>コバカバ</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a><iframe src='https://www.google.com/maps/embed?pb=!1m0!3m2!1sja!2sus!4v1448516625463!6m8!1m7!1sHEJhsOGHi7lVMfoxLvcqtQ!2m2!1d35.31754672768127!2d139.5511332991286!3f113.24!4f0.39000000000000057!5f0.8160813932612223' width='400' height='300' frameborder='0' style='border:0' allowfullscreen></iframe></div>");

    // ポイント06
    var point = new google.maps.LatLng(35.320036, 139.549231);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://www.yelp.co.jp/biz/callejero-%E9%8E%8C%E5%80%89%E5%B8%82' target='_blank'>CALLEJERO</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a><iframe src='https://www.google.com/maps/embed?pb=!1m0!3m2!1sja!2sus!4v1448517039805!6m8!1m7!1sI62gjUwqrpdYz4YdrkexcQ!2m2!1d35.32004632008887!2d139.5490942348141!3f87.39!4f0!5f0.8160813932612223' width='400' height='300' frameborder='0' style='border:0' allowfullscreen></iframe></div>");

    // ポイント07
    var point = new google.maps.LatLng(35.319018, 139.548781);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://onaricafe.blogspot.jp/' target='_blank'>onari cafe</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a><iframe src='https://www.google.com/maps/embed?pb=!1m0!3m2!1sja!2sus!4v1448517207967!6m8!1m7!1sdlSIPYPU_E7A0MrySRu26g!2m2!1d35.31904891154874!2d139.5488536337206!3f270.909173555318!4f0.6749156738451063!5f0.4000000000000002' width='400' height='300' frameborder='0' style='border:0' allowfullscreen></iframe></div>");

}

function create_maker(latlng, html) {
  //アイコンを作成
   var icon = new google.maps.MarkerImage('../components/img/map_icon.png',
    new google.maps.Size(36,47),/*アイコンサイズ設定*/
    new google.maps.Point(0,0)  // origin
    );
  var markerOptions = {
    position: latlng,
    map: map,
    icon: icon
  };
  var marker = new google.maps.Marker(markerOptions);
    // マーカーをクリックした時の処理
    google.maps.event.addListener(marker, "click", function() {
        infowindow.setContent(html);
        infowindow.open(map, marker);
    });
    gmarkers[i] = marker;
    i++;
    return marker;
}

function map_click(i) {
    google.maps.event.trigger(gmarkers[i], "click");
}

google.maps.event.addDomListener(window, "load", inicializar);