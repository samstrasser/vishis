/**
 * map.js
 * Map (GMap2)
 * Event (LabeledMarker)
 * Depends on: GMaps API, LabeledMarker
 * 
 */

 /**
  * @class Map
  */
function Map(mapDiv){
	// Create and set up the map first
	if(!mapDiv){
		mapDiv = document.getElementById("map");
	}
	this.constructor.superclass.constructor.call(this, mapDiv);

	this.addControl(new GLargeMapControl());
	this.addControl(new GScaleControl());

	this.ts = new TimeSlider(mapDiv, this.displayEvents, this);
	this.addControl(this.ts);

	this.setCenter(new GLatLng(36.879621,-98.525391), 4); // U.S. map centered out
	
	this.currTopics = new Array();
	this.currTimeSpan = {
		start: new Date(),			 // the latest supported date 		//todo: add future
		end:   new Date('1/1/1001') // the earliest supported date	// todo: add past
	};
};
YAHOO.lang.extend(Map, GMap2);

Map.prototype.addTopic = function(topic){
	if(this.isACurrTopic(topic)){
		return true;
	}
	
	this.currTopics[topic.getId()] = topic;
	
	var events = topic.getEvents();
	for(var ek in events){
		// Add a reference to the map so the events can call Map methods
		events[ek].addMap(this);
		
		var overlays = events[ek].getAllOverlays();
		
		for(var ok in overlays){
			var overlay = overlays[ok];
			
			// Add all the overlays to the map right at the beginning
			try{
				this.addOverlay(overlay);
				overlay.hide();
			}catch(e){
				console.log(overlay);
				throw(e);
			}
		}
	}

	// Readjust the span of the currently viewable Events
	if(topic.start.getTime() < this.currTimeSpan.start.getTime()){
		this.currTimeSpan.start = topic.start;
	}
	if(topic.end.getTime() > this.currTimeSpan.end.getTime()){
		this.currTimeSpan.end = topic.end;
	}
	
	// readjust the TimeSlider to reflect the new time span
	// todo: un hardcode dates
	this.ts.calculateShift(this.currTimeSpan.start, this.currTimeSpan.end);
	
	// display this (and all other) topics
	// call the TimeSlider to simulate a change
	this.ts.doCallback();
	
}

Map.prototype.removeTopic = function(topic){
	if(!this.isACurrTopic(topic)){
		return true;
	}
	
	for(var k in this.currTopics){
		if(this.currTopics[i].getId() == topic.getId()){
			delete this.currTopics[i];
			return true;
		}
	}
	
	return false;
}

Map.prototype.clearTopics = function(){
	this.clearOverlays();
	
	for(var tid in this.currTopics){
		delete this.currTopics[tid];
	}
	delete this.currTopics;
	
	this.currTopics = new Array();
	
	// todo: disable TimeSlider
}

Map.prototype.displayEvents = function(start, end){
	if(!start){
		start = currTimeSpan.start;
	}
	if(!end){
		end = currTimeSpan.end;
	}

	var nowStart = start.getTime();
	var nowEnd = end.getTime();

	for(var tid in this.currTopics){
		var events = this.currTopics[tid].getEvents();
		for(var ek in events){
			var e = events[ek];

			var eventStart = e.start.getTime();
			var eventEnd = e.end.getTime();
			
			if(eventStart <= nowEnd && eventEnd >= nowStart){
				e.show();
			}else{
				e.hide();
			}
		}
	}
}

Map.prototype.isACurrTopic = function(topic){
	return topic.getId() in this.currTopics;
}

Map.prototype.adjustToFitPoints = function(n, s, e, w){
	// Bound map by the range of the events
	// todo: make sure to give them padding on the edges
	var sw = new GLatLng(s, w),
		ne = new GLatLng(n, e);
	var bounds = new GLatLngBounds(sw,  ne);
	
	var zoom = this.getBoundsZoomLevel(bounds)
	this.setCenter(bounds.getCenter(), zoom);
}

function Event(node){
	// Add default start and end
	this.start = new Date('01/01/1001'); // todo: HDate.MIN
	this.end = new Date();				// todo: HDate.MAX
	
	for(var k in node){
		if(k == "start" || k == "end"){
			this[k] = new Date(node[k]);
		}else{
			this[k] = node[k];
		}
	}
	
	// Create the blurb
	this.blurbHtml  = '<span class="title">' + this.title + '</span>';
	this.blurbHtml += '<div class="desc">';
	if(this.location){
		this.blurbHtml += '<h3 class="location">' + this.location + '</h3>';
	}
	this.blurbHtml += '<h3 class="date-range">' + Util.formatDate(this.start) + '-' + Util.formatDate(this.end) + '</h3>';
	if(this.blurb){
		this.blurbHtml += '<p class="blurb">' + this.blurb + '</p>';
	}
	this.blurbHtml += '</div>';
	
	this.polygons = new Array();
	this.marker = false;
}

Event.prototype.addPolygon = function(polygon){
	this.polygons.push(polygon);
}

Event.prototype.addMarker = function(marker){
	this.marker = marker;
}

Event.prototype.getMarker = function(){
	return this.marker;
}

Event.prototype.addMap = function(map){
	this.map = map;
}

Event.prototype.getOverlays = function(){
	if(this.polygons.length > 0){
		return this.polygons;
	}else{
		return new Array(this.marker);
	}
}

Event.prototype.getAllOverlays = function(){
	return this.polygons.concat(this.marker);
}

Event.prototype.show = function(){
	var overlays = this.getOverlays();
	for(var ok in overlays){
		overlays[ok].show();
	}
}

Event.prototype.hide = function(){
	var overlays = this.getOverlays();
	for(var ok in overlays){
		overlays[ok].hide();
	}
}


/**
 * @class 
 */
function Marker(node, event){
	this.e = event; // keep track of the parent
	
	var lat = parseFloat(node.coords[1]);
	var lng = parseFloat(node.coords[0]);
	delete node.coords;
	var latlng = new GLatLng(lat, lng);
	
	for(var k in node){
		this[k] = node[k];
	}

	var icon = new GIcon();
	icon.image = 'img/event.icon.png';
	icon.iconSize = new GSize(10, 10);
	icon.iconAnchor = new GPoint(5, 5);
	icon.infoWindowAnchor = new GPoint(5, 5);

	var opts = { 
	  "icon": icon,
	  "clickable": true,
	  "labelText": this.e.blurbHtml,
	  "labelOffset": new GSize(10, -11),
	  "labelClass": "marker"
	};
	
	LabeledMarker.call(this, latlng, opts);
	
	// Note: we can register the events on the LabeledMarker b/c it passes through events on the div_ element
	// i.e. this is both the dom element and the javascript object instance
	GEvent.bind(this, "mouseover", this, this.showBlurb);
	GEvent.bind(this, "mouseover", this, this.bringToFront);
	
	GEvent.bind(this, "mouseout", this, this.hideBlurb);
	GEvent.bind(this, "mouseout", this, this.restoreZIndex);

};
YAHOO.lang.extend(Marker, LabeledMarker);

Marker.prototype.hideBlurb = function(){
	this.desc_.style.display = 'none';
}

Marker.prototype.showBlurb = function(){
	this.desc_.style.display = 'block';
}

Marker.prototype.bringToFront = function(){
	// todo: bring the icon forward
	console.log(this);
	console.log(this.getIcon());

	this.oldZIndex=this.div_.style.zIndex;
	this.div_.style.zIndex="1000";
}

Marker.prototype.restoreZIndex = function(){
	// todo: send the icon back
	
	this.div_.style.zIndex=this.oldZIndex;
}

/**
  * Sets the label text
 */
Marker.prototype.setLabelText = function(text){
	this.labelText_ = text;
	this.div_.innerHTML = this.labelText_;
	
	this.redraw(true);
 }
 
function Polygon(node, event){
	this.e = event;
 
	var latlngs = new Array();
	for(var ck in node.coords){
		var lat = parseFloat(node.coords[ck][1]);
		var lng = parseFloat(node.coords[ck][0]);
		
		if(!isNaN(lat) && lat > -90   && lat < 90 &&
		   !isNaN(lng) && lng > -180  && lng < 180){
			this.latlng = new GLatLng(lat, lng)
			latlngs.push(this.latlng);
		}
	}
	delete node.coords;
	
 	for(var k in node){
		this[k] = node[k];
	}
	
	GPolygon.call(this, 
				latlngs, 		// Points
				"#883333",		// Stroke Color
				1,				// Stroke Weight
				.8,				// Stroke Opacity
				"#EF0000",		// Fill Color
				.3,				// Fill Opacity
				{clickable:true}//Opts
			);
	
	//GEvent.bind(this, "click", this, this.toggleMarker);
	GEvent.bind(this, "click", this, this.showDetails);
}
YAHOO.lang.extend(Polygon, GPolygon);

Polygon.prototype.showDetails = function(){
	var html = '<div class="polygon">' + this.e.blurbHtml + '</div>';
	this.e.map.openInfoWindowHtml(
		this.latlng,	// point
		html,			// html
		
		// options object:
		{ maxWidth: 250 }	// in pixels
	);
}

Polygon.prototype.getMarker = function(){
	if(!this.marker){
		this.marker = this.e.getMarker(); // cache the marker for speed
	}	
	return this.marker;
}

Polygon.prototype.toggleMarker = function(){
	var m = this.getMarker();
	if(m.isHidden()){
		this.showMarker();
	}else{
		this.hideMarker();
	}
}

Polygon.prototype.showMarker = function(){
	var m = this.getMarker();
	m.show();
	m.showBlurb();
}

Polygon.prototype.hideMarker = function(){
	var m = this.getMarker();
	m.hideBlurb();
	m.hide();
}
