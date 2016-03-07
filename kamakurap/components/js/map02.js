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
        center: new google.maps.LatLng(35.311341, 139.546762),
        // タイプ
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), option);
    google.maps.event.addListener(map, "click", function() {infowindow.close();});


    // ポイント00
    var point = new google.maps.LatLng(35.311341, 139.546762);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://uraga-moana.jp/shop/index.html' target='_blank'>お菓子工房 MOANA</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='../' class='txtlink'>お店の詳細</a></div>");

    // ポイント01
    var point = new google.maps.LatLng(35.313745, 139.539990);
    var marker = create_maker(point, "<div class='box'><a class='linkttl' href='http://kamakuramarche-un.com/' target='_blank'>鎌倉マルシェアン</a><span class='badge cafe'>カフェ</span><span class='badge atmosphere'>にぎやか</span><a href='../page2.html' class='txtlink'>お店の詳細</a></div>");

}

function create_maker(latlng, html) {
  //アイコンを作成
   var icon = new google.maps.MarkerImage('../components/img/map_icon02.png',
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