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

	// todo: callback function
	this.ts = new TimeSlider(mapDiv, (function(s) {return true; }));
	this.addControl(this.ts);

	//this.setCenter(new GLatLng(41.313038,-72.925224), 15); // Yale zoomed in
	this.setCenter(new GLatLng(36.879621,-98.525391), 4); // U.S. map centered out
	
	this.currTopics = new Array();
	this.currEvents = new Array();
};
YAHOO.lang.extend(Map, GMap2);

Map.prototype.addTopic = function(topic){
	if(this.isACurrTopic(topic)){
		return true;
	}
	
	this.currTopics[topic.id] = topic;
	
	for(var k in topic.children){
		var child = topic.children[k];
		
		// this is ok b/c child.id is globally unique
		this.currEvents[child.id] = child;
		
		this.addOverlay(child);
		child.hide();
	}
	
	// display this (and all other) topics
	this.displayEvents();
	
}

Map.prototype.removeTopic = function(topic){
	if(!this.isACurrTopic(topic)){
		return true;
	}
	
	for(var k in this.currTopics){
		if(this.currTopics[i].id == topic.id){
			delete this.currTopics[i];
			return true;
		}
	}
	
	return false;
}

Map.prototype.clearTopics = function(){
	for(var id in this.currEvents){
		this.currEvents[id].hide();
		delete this.currEvents[id];
	}

	delete this.currTopics;
	
	this.currTopics = new Array();
	this.currEvents = new Array();
}

Map.prototype.displayEvents = function(start, end){
	if(!start){
		// todo: set start as the min of the children of topic
		start = new Date('1/1/1001');
	}
	if(!end){
		end = new Date();
	}

	var nowStart = start.getTime();
	var nowEnd = end.getTime();

	for(var id in this.currEvents){
		var e = this.currEvents[id];

		var eventStart = e.node.start_date.getTime();
		var eventEnd = e.node.end_date.getTime();
		
		if(eventStart <= nowEnd && eventEnd >= nowStart){
			e.show();
		}else{
			e.hide();
		}
		
	}
}

Map.prototype.isACurrTopic = function(topic){
	return topic.id in this.currTopics;
}

Map.prototype.adjustToFitPoints = function(s, w, n, e){
	// Bound map by the range of the events
	// todo: make sure to give them padding on the edges
	var sw = new GLatLng(s, w),
		ne = new GLatLng(n, e);
	var bounds = new GLatLngBounds(sw,  ne);
	
	var zoom = this.getBoundsZoomLevel(bounds)
	this.setCenter(bounds.getCenter(), zoom);
}

/**
 * @class Event
 */
function Event(node){
	this.children = new Array();
	this.domElt;
	this.titleElt;

	var latlng = new GLatLng(node.lat,  node.longitude);
	
	var icon = new GIcon();
	icon.image = 'img/event.icon.png';
	icon.iconSize = new GSize(10, 10);
	icon.iconAnchor = new GPoint(5, 5);
	icon.infoWindowAnchor = new GPoint(5, 5);

	var opts = { 
	  "icon": icon,
	  "clickable": true,
	  "labelText": node.title,
	  "labelOffset": new GSize(10, -11),
	  "labelClass": "marker"
	};
	
	LabeledMarker.call(this, latlng, opts);
	
	// todo: add mouseover, mouseout actions
	//GEvent.addListener(titleElt, "mouseover", showBlurb());
	//GEvent.addListener(domElt, "mouseout", hideBlurb());

};
YAHOO.lang.extend(Event, LabeledMarker);

Event.prototype.hideBlurb = function(){
	//pass
}

Event.prototype.showBlurb = function(){
	//pass
}

/**
  * Sets the label text
 */
 Event.prototype.setLabelText = function(text){
	this.labelText_ = text;
	this.div_.innerHTML = this.labelText_;
	
	this.redraw(true);
 }
