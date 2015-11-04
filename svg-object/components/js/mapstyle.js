function initialize() {
	var latlng = new google.maps.LatLng(35.321582, 139.552480);
	var myOptions = {
		zoom: 19,/*拡大比率*/
		center: latlng,/*表示枠内の中心点*/
		mapTypeControlOptions: { mapTypeIds: ['map01', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
	};
	var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

	/*スタイル*/
	var styleOptions = [
	{
		featureType: "all",
		elementType: "all",
		stylers: [
		{ saturation: -100 },
		{ visibility: "simplified" }
		]
	},{
		featureType: "road.highway",
		elementType: "all",
		stylers: [
		{ visibility: "simplified" }
		]
	},{
		featureType: "transit.line",
		elementType: "all",
		stylers: [
		{ visibility: "simplified" }
		]
	},{
		featureType: "poi",
		elementType: "geometry",
		stylers: [
		{ visibility: "off" }
		]
	},{
		featureType: "landscape.man_made",
		elementType: "geometry",
		stylers: [
		{ visibility: "simplified" }
		]
	},{
		featureType: "road",
		elementType: "labels",
		stylers: [
		{ visibility: "off" }
		]
	},{
		elementType: "labels.icon",
		stylers: [
		{ visibility: "off" }
		]
	}
	]

	/*アイコン設定▼*/
	var icon = new google.maps.MarkerImage('components/img/mapicon.png',
		new google.maps.Size(36,48),/*アイコンサイズ設定*/
		new google.maps.Point(0,0)/*アイコン位置設定*/
		);
	var markerOptions = {
		position: latlng,
		map: map,
		icon: icon,
		title: '株式会社バディング'
	};
	var marker = new google.maps.Marker(markerOptions);
	　/*アイコン設定ここまで▲*/

	var styledMapOptions = { name: '株式会社バディング' }
	var map01Type = new google.maps.StyledMapType(styleOptions, styledMapOptions);
	map.mapTypes.set('map01', map01Type);
	map.setMapTypeId('map01');
}