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
	this.currEvents = new Array();
};
YAHOO.lang.extend(Map, GMap2);

Map.prototype.addTopic = function(topic){
	if(this.isACurrTopic(topic)){
		return true;
	}
	
	this.currTopics[topic.getId()] = topic;
	
	for(var k in topic.children){
		var child = topic.children[k];
		
		// this is ok b/c child.getId() is globally unique
		this.currEvents[child.getId()] = child;

		this.addOverlay(child);
		child.hide();
	}
	
	// readjust the TimeSlider to reflect the new time span
	// todo: un hardcode dates
	this.ts.calculateShift(new Date('01/01/1789'), new Date());
	
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

		var eventStart = e.start.getTime();
		var eventEnd = e.end.getTime();
		
		if(eventStart <= nowEnd && eventEnd >= nowStart){
			e.show();
		}else{
			e.hide();
		}
		
	}
}

Map.prototype.isACurrTopic = function(topic){
	return topic.getId() in this.currTopics;
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
	
	for(var k in node){
		if(k == "start" || k == "end"){
			this[k] = new Date(node[k]);
		}else{
			this[k] = node[k];
		}
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
YAHOO.lang.extend(Event, LabeledMarker);

Event.prototype.getId = function(){
	return this.uid;
}

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
