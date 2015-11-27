var map = null;
var infowindow = new google.maps.InfoWindow();
var gmarkers = [];
var i = 0;


function gotoCurrentPosition(map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // 成功処理
            function (info) {
                var lat = info.coords.latitude;
                var lng = info.coords.longitude;
                var center = new google.maps.LatLng(lat, lng);
                map.setCenter(center);
                create_center(center);
            },
            // エラー処理
            function (info) {
                console.log('現在地取得エラー: ' + info.code);
                return;
            }
        );
    } else {
        console.log('本ブラウザではGeolocationが使えません');
        return;
    }
}

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
    gotoCurrentPosition(map);

    // ポイント01
    var point = new google.maps.LatLng(35.318497, 139.550957);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://www.starbucks.co.jp/store/search/detail.php?id=396' target='_blank'>スターバックスコーヒー 鎌倉店</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a></div>");

    // ポイント02
    var point = new google.maps.LatLng(35.3191105,139.5507418);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://tabelog.com/kanagawa/A1404/A140402/14003290/' target='_blank'>Beck's 鎌倉店</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a></div>");

    // ポイント03
    var point = new google.maps.LatLng(35.319472,139.551139);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://www.mcdonalds.co.jp/shop/map/map.php?strcode=14655' target='_blank'>マクドナルド 鎌倉店</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a></div>");

    // ポイント04
    var point = new google.maps.LatLng(35.319255, 139.548826);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://r.gnavi.co.jp/gab0788/' target='_blank'>サンマルクカフェ 鎌倉店</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a></div>");

    // ポイント05
    var point = new google.maps.LatLng(35.317489, 139.551321);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://cobakaba.com/' target='_blank'>コバカバ</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a></div>");

    // ポイント06
    var point = new google.maps.LatLng(35.320036, 139.549231);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://www.yelp.co.jp/biz/callejero-%E9%8E%8C%E5%80%89%E5%B8%82' target='_blank'>CALLEJERO</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a></div>");

    // ポイント07
    var point = new google.maps.LatLng(35.319018, 139.548781);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://onaricafe.blogspot.jp/' target='_blank'>onari cafe</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='#' class='txtlink'>口コミをみる</a></div>");

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

function create_center(latlng) {
  //アイコンを作成
   var icon = new google.maps.MarkerImage('../components/img/map_icon_center.png',
    new google.maps.Size(36,47),/*アイコンサイズ設定*/
    new google.maps.Point(0,0)  // origin
    );
  var markerOptions = {
    position: latlng,
    map: map,
    icon: icon
  };
  var marker = new google.maps.Marker(markerOptions);
}

function map_click(i) {
    google.maps.event.trigger(gmarkers[i], "click");
}

google.maps.event.addDomListener(window, "load", inicializar);
