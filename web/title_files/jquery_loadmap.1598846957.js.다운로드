var loadmap = function(url,el,map_style) {

	var maps = url.split("/");
	var style_normal = [],
		style_grey = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
		style_red = [{"stylers":[{"hue":"#dd0d0d"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]}],
		style_blue = [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}],
		style_black = [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}];
	if(typeof maps[5] == "undefined" || typeof maps[6] == "undefined") {
		alert($.lang[LANG]['config.map.error1']);
		return false;
	}
	
	if(typeof map_style == "undefined") map_style = "style_normal";
	switch(map_style) {
		case "style_normal" : map_style = style_normal; break;
		case "style_grey" : map_style = style_grey; break;
		case "style_red" : map_style = style_red; break;
		case "style_blue" : map_style = style_blue; break;
		case "style_black" : map_style = style_black; break;
	}

	var info = decodeURIComponent(maps[5]),
		pos = maps[6].replace("@","").split(",");
	var reg = /(\d+(\.\d+)?)/,
		zoom = 17;
	if(typeof pos[2] == 'undefined') {
		alert($.lang[LANG]['config.map.error1']);
		return false;
	} else {
		m = pos[2].match(reg);
		if(m && m[0]) {
			if(Number(m[0]) > 21) {
				alert($.lang[LANG]['config.map.error2']);
				return false;
			}
			zoom = Number(m[0]);
		}
	}

	var title = info.split("+").join(" "),
		address = info.replace(" ","+"),
		lat,lng = 0,
		TILE_SIZE = 256;

	// $.getJSON('//maps.google.com/maps/d/edit?mid=AIzaSyAIajsQkeE99dXkRFM9EITu_tRVnQv4KQs&z=' + zoom + '&ll=' + pos[0] + ',' + pos[1], function(data) {
	// 	console.log(data);
	// });

	var Latlng = new google.maps.LatLng(pos[0],pos[1]);

	var map = new google.maps.Map(document.getElementById(el), {
			center: Latlng,
			zoom: zoom,
			scrollwheel: false,
			navigationControl: true,
			mapTypeControl: false,
			scaleControl: false,
			styles : map_style
		}
	);

	google.maps.event.addListenerOnce(map, 'idle', function(){
		var newLatlng = getNewCenter( map, marker.getPosition(), map.getZoom());

		map.setCenter( newLatlng );
		marker.setPosition( newLatlng );
	});
	//add a marker
	var marker = new google.maps.Marker({
		position: Latlng,
		map: map,
		title: title
	});

	var infowindow = new google.maps.InfoWindow({
		content: '<div class="scrollFix">'+ title +'</div>'
	}); 
	infowindow.open(map,marker);

	function project(latLng) {
	  var siny = Math.sin(latLng.lat() * Math.PI / 180);

	  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
	  // about a third of a tile past the edge of the world tile.
	  siny = Math.min(Math.max(siny, -0.9999), 0.9999);

	  return new google.maps.Point(
	      TILE_SIZE * (0.5 + latLng.lng() / 360),
	      TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
	}

	function getNewCenter( map, latLng, zoom ) {
		var scale = 1 << zoom;

		var worldCoordinate = project(latLng);

		var tileCoordinate = new google.maps.Point(
		    worldCoordinate.x * scale / TILE_SIZE,
		    worldCoordinate.y * scale / TILE_SIZE
	    );

		tileCoordinate.x += 0.8;

		var newWorldCoordinate = {x: '', y: ''},
			tcX = tileCoordinate.x,
			tcY = tileCoordinate.y;

		newWorldCoordinate.x = tcX * TILE_SIZE / scale;
		newWorldCoordinate.y = tcY * TILE_SIZE / scale; 

	    var newLatlng = map.getProjection().fromPointToLatLng( newWorldCoordinate );

	    return newLatlng;
	}


}