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
	console.log(topic);
	
	
	if(this.isACurrTopic(topic)){
		return true;
	}
	
	this.currTopics[topic.getId()] = topic;
	
	var events = topic.getEvents();
	for(var ek in events){
		var overlays = events[ek].getOverlays();
		
		for(var ok in overlays){
			var overlay = overlays[ok];
			
			// Add all the overlays to the map right at the beginning
			this.addOverlay(overlay);
			overlay.hide();		
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
	
	this.polygons = new Array();
	this.marker = false;
}

Event.prototype.addPolygon = function(polygon){
	this.polygons.push(polygon);
}

Event.prototype.addMarker = function(marker){
	this.marker = marker;
}

Event.prototype.getOverlays = function(){
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
function Marker(node){
	this.domElt;
	this.titleElt;
	
	for(var k in node){
		this[k] = node[k];
	}

	var latlng = new GLatLng(this.lat, this.lng);
	
	var icon = new GIcon();
	icon.image = 'img/event.icon.png';
	icon.iconSize = new GSize(10, 10);
	icon.iconAnchor = new GPoint(5, 5);
	icon.infoWindowAnchor = new GPoint(5, 5);

	var opts = { 
	  "icon": icon,
	  "clickable": true,
	  "labelText": this.title,
	  "labelOffset": new GSize(10, -11),
	  "labelClass": "marker"
	};
	
	LabeledMarker.call(this, latlng, opts);
	
	// todo: add mouseover, mouseout actions
	//GEvent.addListener(titleElt, "mouseover", showBlurb());
	//GEvent.addListener(domElt, "mouseout", hideBlurb());

};
YAHOO.lang.extend(Marker, LabeledMarker);

Marker.prototype.hideBlurb = function(){
	//pass
}

Marker.prototype.showBlurb = function(){
	//pass
}

Marker.prototype.bringToFront = function(){
	// pass
}

/**
  * Sets the label text
 */
 Marker.prototype.setLabelText = function(text){
	this.labelText_ = text;
	this.div_.innerHTML = this.labelText_;
	
	this.redraw(true);
 }
 
 function Polygon(node){
	var latlngs = new Array();
	for(var ck in node.coords){
		var lat = parseInt(node.coords[ck][1], 10);
		var lng = parseInt(node.coords[ck][0], 10);
		
		// hack: why would lat or lng ever be one of these huge numbers??
		if(!isNaN(lat) && lat > -90   && lat < 90 &&
		   !isNaN(lng) && lng > -180  && lng < 180){
			var latlng = new GLatLng(lat, lng)
			latlngs.push(latlng);
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
 }
 YAHOO.lang.extend(Polygon, GPolygon);
