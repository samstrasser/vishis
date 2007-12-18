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
function Map(div){
	// Create and set up the map first
	var mapDiv = document.getElementById("map");
	this.constructor.superclass.constructor.call(this, mapDiv);

	this.addControl(new GLargeMapControl());
	this.addControl(new GScaleControl());
	
	// this.ts = new TimeSlider();// todo: TS constructor called
	// this.addControl(this.ts);

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
		
		// this is ok b/c id is globally unique
		this.currEvents[child.id] = child;
		
		try{
			this.addOverlay(child);
		}catch(e){
			g3 = e;
			g2 = child;
		}
	}
	
	// display this (and all other) topics
	this.displayEvents(new Date('1/1/1900'), new Date());
	
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
	delete this.currTopics;
	
	// todo: make sure the Events are hidden or deleted
	
	this.currTopics = new Array();
}

Map.prototype.displayEvents = function(start, end){
	// todo: if start or end is undef, then default to the start and end of all currTopics

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
	this.node = node;

	this.latlng = new GLatLng(node.lat,  node.longitude);
	
	var icon = new GIcon();
	icon.image = 'img/event.icon.png';
	icon.iconSize = new GSize(10, 10);
	icon.iconAnchor = new GPoint(5, 5);
	icon.infoWindowAnchor = new GPoint(5, 5);

	this.opts = { 
	  "icon": icon,
	  "clickable": true,
	  "labelText": node.title,
	  "labelOffset": new GSize(10, -11),
	  "labelClass": "marker"
	};
	
	// todo: make sure event starts as hidden
	
	LabeledMarker.call(this, this.latlng, this.opts);
	
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
