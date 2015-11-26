function initialize() {
    var latlng = new google.maps.LatLng(35.318467, 139.551009);
    var myOptions = {
        zoom: 18, /*拡大比率*/
        center: latlng, /*表示枠内の中心点*/
        mapTypeId: google.maps.MapTypeId.ROADMAP/*表示タイプの指定*/
    };
    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);


// ポリライン表示
var line01 = [
new google.maps.LatLng(35.3174899840103, 139.54954281449318),
new google.maps.LatLng(35.31734444341774, 139.55007925629616)
];
var polyOptions = {
    strokeColor: "#e45991",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: line01
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

// ポリライン表示
var line02 = [
new google.maps.LatLng(35.31826145420579, 139.54980969429016),
new google.maps.LatLng(35.31842340729798, 139.54929739236832),
new google.maps.LatLng(35.31854815472892, 139.5493483543396),
new google.maps.LatLng(35.31865977068823, 139.54884141683578)
];
var polyOptions = {
    strokeColor: "#e45991",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: line02
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

// ポリライン表示
var line03 = [
new google.maps.LatLng(35.316461345634586, 139.5490251481533),
new google.maps.LatLng(35.31642632792769, 139.5491847395897),
new google.maps.LatLng(35.31640225324539, 139.54920083284378)
];
var polyOptions = {
    strokeColor: "#e45991",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: line03
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

// ポリライン表示
var line04 = [
new google.maps.LatLng(35.320634362849745, 139.5514753460884),
new google.maps.LatLng(35.32046201882108, 139.551313072443)
];
var polyOptions = {
    strokeColor: "#e45991",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: line04
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

// ポリライン表示
var line05 = [
new google.maps.LatLng(35.319787958647844, 139.55143176019192),
new google.maps.LatLng(35.31982735192944, 139.55131642520428),
new google.maps.LatLng(35.31973379285432, 139.5512466877699)
];
var polyOptions = {
    strokeColor: "#e45991",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: line05
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

// ポリライン表示
var line06 = [
new google.maps.LatLng(35.3179244156498, 139.5509523153305),
new google.maps.LatLng(35.31799882688039, 139.55066934227943),
new google.maps.LatLng(35.318081992292385, 139.55070957541466),
new google.maps.LatLng(35.31814217773456, 139.55074980854988)
];
var polyOptions = {
    strokeColor: "#e45991",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: line06
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

// ポリライン表示
var line07 = [
new google.maps.LatLng(35.31917845459533, 139.55006182193756),
new google.maps.LatLng(35.319174077529844, 139.5501959323883),
new google.maps.LatLng(35.31932289762276, 139.55020934343338),
new google.maps.LatLng(35.31946734039222, 139.55022275447845)
];
var polyOptions = {
    strokeColor: "#e45991",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: line07
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

// ポリライン表示
var line08 = [
new google.maps.LatLng(35.31980218400175, 139.54946637153625),
new google.maps.LatLng(35.31997726507562, 139.54953342676163),
new google.maps.LatLng(35.31992036376818, 139.54983115196228)
];
var polyOptions = {
    strokeColor: "#e45991",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: line08
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

// ポリライン表示
var line09 = [
new google.maps.LatLng(35.31862256538557, 139.55201715230942),
new google.maps.LatLng(35.31850657227332, 139.55227196216583),
new google.maps.LatLng(35.31843872716828, 139.55238729715347),
new google.maps.LatLng(35.318335865126265, 139.55247581005096),
new google.maps.LatLng(35.31828771689144, 139.55255091190338),
new google.maps.LatLng(35.318313979568536, 139.55268770456314),
new google.maps.LatLng(35.31835337356817, 139.55274403095245)
];
var polyOptions = {
    strokeColor: "#e45991",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: line09
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);



// ポリライン表示(舗装されていない道)
var points = [
new google.maps.LatLng(35.319191585790286, 139.54863488674164),
new google.maps.LatLng(35.31913906099759, 139.54877972602844),
new google.maps.LatLng(35.31905589667274, 139.5488440990448),
new google.maps.LatLng(35.31894209272114, 139.54890310764313),
new google.maps.LatLng(35.318832665693584, 139.54887092113495),
new google.maps.LatLng(35.31873636978684, 139.5488440990448)
];
var polyOptions = {
    strokeColor: "#88D498",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: points
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

// ポリライン表示(舗装されていない道)
var points = [
new google.maps.LatLng(35.31948703711351, 139.55022811889648),
new google.maps.LatLng(35.31961615994541, 139.54991430044174),
new google.maps.LatLng(35.319771544774845, 139.54952538013458),
new google.maps.LatLng(35.319961945496786, 139.54906672239304)
];
var polyOptions = {
    strokeColor: "#88D498",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: points
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);


// ポリライン表示(舗装されていない道)
var points = [
new google.maps.LatLng(35.3190033717919, 139.55224514007568),
new google.maps.LatLng(35.31878014066774, 139.55269038677216),
new google.maps.LatLng(35.31895522395449, 139.55284595489502),
new google.maps.LatLng(35.319143438064955, 139.5530068874359)
];
var polyOptions = {
    strokeColor: "#88D498",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: points
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);


// ポリライン表示(急な坂道)
var points = [
new google.maps.LatLng(35.31918283166056, 139.54980969429016),
new google.maps.LatLng(35.31932289762276, 139.54987943172455),
new google.maps.LatLng(35.31938855345904, 139.54995453357697),
new google.maps.LatLng(35.31941919283106, 139.55005645751953),
new google.maps.LatLng(35.31941481577863, 139.55017983913422)
];
var polyOptions = {
    strokeColor: "#F9C22E",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: points
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);


// ポリライン表示(急な坂道)
var points = [
new google.maps.LatLng(35.31938855345904, 139.5506250858307),
new google.maps.LatLng(35.31938855345904, 139.55079674720764),
new google.maps.LatLng(35.31938417640493, 139.55097377300262),
new google.maps.LatLng(35.31937979935062, 139.55119907855988)
];
var polyOptions = {
    strokeColor: "#F9C22E",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: points
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);


// ポリライン表示(急な坂道)
var points = [
new google.maps.LatLng(35.31804916385051, 139.54969972372055),
new google.maps.LatLng(35.318073238042516, 139.54962730407715),
new google.maps.LatLng(35.318103877912904, 139.54952001571655),
new google.maps.LatLng(35.318178288978366, 139.54946368932724)
];
var polyOptions = {
    strokeColor: "#F9C22E",
    strokeOpacity: "0.8",
    strokeWeight: 3,
    path: points
};
var poly = new google.maps.Polyline(polyOptions);
poly.setMap(map);

}