var vh;

function load() {
	// intentionally global variable vh: singelton used by most scripts
	vh = new VisHis();
	
	g1 = 0;
	g2 = 0;
}

/* VisHis object
 * VisHis represents the current running session for a user
 * It is a singleton object
 * The single instance will be a global variable
 */
function VisHis(){
	vh = this;

	this.currTopic;
	
	this.cookie = new VisHisCookie();

	// initialize an empty cache
	this.topicCache = new Array();
	
	this.nav = new NavigationPanel();
	this.view = new ViewingPanel();
	
}

VisHis.BROWSE_MODE = 1;
VisHis.NEWSESSION_MODE = 2;
VisHis.VISUALIZING_MODE = 3;

VisHis.prototype.switchTopic = function(newTopic){
	// todo: add topic to the cache if it's not already there
	
	vh.currTopic = newTopic;
	
	vh.nav.switchTopic(newTopic);
	
	vh.view.switchTopic(newTopic);
	
};

VisHis.prototype.switchTopicById = function(newTopicId){
	// check if this topic is in the cache
	if(vh.topicCache[newTopicId]){
		vh.switchTopic(topicCache[newTopicId]);
	}else{
		// haven't cached this topic yet so go to the server
		Server.getNodeById(newTopicId, vh.switchTopic);
	}
	
};

// todo: make this robust
function VisHisCookie(){
	this.cookie = new Cookie("vishis");
	this.cookie.visits = 1;
	this.cookie.store(10);
}

VisHisCookie.prototype.isSet = function(){
	return false;
	//return (this.cookie.visits > 0);
};


/* ViewingPanel object
 * todo:comment
 */
function ViewingPanel() {
	vh.view = this;

	// The viewing panel always starts in New Session Mode
	this.currMode = VisHis.NEWSESSION_MODE;
	
	// todo: do all the stuff required for a new session
	// 
	// 
	
	// initialize the map
	if (GBrowserIsCompatible()) {
		this.map = new GMap2(document.getElementById("map"));

		this.map.addControl(new GLargeMapControl());
		this.map.addControl(new GScaleControl());

		this.map.setCenter(new GLatLng(41.313038,-72.925224), 15);

		// add the TimeSlider to the map
		// todo: add the TimeSlider
	}
	
}

ViewingPanel.prototype.switchTopic = function(topic){
	// Either _all_ children have been downloaded or none ->
	if(topic.children && topic.children.length > 0){
		// we must have all the children
		this.showCurrTopic(topic.children);
	}else{
		// get thei children from the server
		Server.getChildren(topic.uid, vh.view.showCurrTopic);
	}

};

ViewingPanel.prototype.showCurrTopic = function(children){
	// Clear the map of everything
	vh.view.map.clearOverlays();

	if(children){
		vh.currTopic.children = children;
	}else{
		// children not set, are they in the cache?
		if(!vh.currTopic.children){
			// topic has no children
			return;
		}
	}
	
	// keep track of range
	var minlat  = Number.POSITIVE_INFINITY,
		minlong = Number.POSITIVE_INFINITY,
		maxlat  = Number.NEGATIVE_INFINITY,
		maxlong = Number.NEGATIVE_INFINITY;
		
	var children = vh.currTopic.children;
	
	vh.currTopic.childrenByStart = new Array();
	
	var earliestChild = new Object();
	earliestChild.start_date = new Date(); // init as now, everything else should be in past
	
	for(var cid in children){
		var c = children[cid];
		
		/* This will only get me efficiency if I'm very smart about it
		 * it should be much faster just to loop through all children
		// sort children by time range
		vh.currTopic.childrenByStart[c.start_date.getTime()] = c;
		vh.currTopic.childrenByEnd[c.end_date.getTime()] = c;
		*/
		
		////DEBUG ONLY
		if(c.start_date.getTime() < earliestChild.start_date.getTime()){
			earliestChild = c;
		}
		////END DEBUG
		
		// Find bounds of all the children
		if(c.lat < minlat){
			minlat = c.lat;
		}else if(c.lat > maxlat){
			maxlat = c.lat;
		}

		if(c.longitude < minlong){
			minlong = c.longitude;
		}else if(c.longitude > maxlong){
			maxlong = c.longitude;
		}
		
		// Event.display(c);
	}
	
	// Bound map by the range of the events
	// todo: make sure to give them padding on the edges
	var sw = new GLatLng(minlat, maxlong),
		ne = new GLatLng(maxlat, minlong);
	var bounds = new GLatLngBounds(sw,  ne);
	
	var zoom = vh.view.map.getBoundsZoomLevel(bounds)
	vh.view.map.setCenter(bounds.getCenter(), zoom);
	
	// NYI: vh.view.timeslider.changeTopic(topic);
	
		
	// DEBUG ONLY!!!!!
	vh.view.nowStart = new Date(earliestChild.start_date);
	vh.view.nowEnd = new Date(earliestChild.end_date);

	vh.view.showEvents();
	// END DEBUG

	
};

ViewingPanel.prototype.showEvents = function(){
	/* NYI: I might not even need this
	var nowStart = vh.view.timeslider.getNow()[0];
	var nowStart = vh.view.timeslider.getNow()[0];
	*/
	
	// todo: get nowStart, nowEnd from the TimeSlider
	
	var nowStart = vh.view.nowStart;
	var nowEnd = vh.view.nowEnd;
	
	var children = vh.currTopic.children;
	for(var cid in children){
		var c = children[cid];
		
		var cStart = c.start_date.getTime();
		var cEnd = c.end_date.getTime();
		
		var nStart = nowStart.getTime();
		var nEnd = nowEnd.getTime();
	
		if(cStart <= nEnd && cEnd >= nowStart){
			Event.display(c);
		}
	}
}


function NavigationPanel() {
	vh.nav = this;

	// Find the nav dom elt for future manipulations
	this.domElt = document.getElementById("nav-panel");

	// try to find a VisHis cookie
	if(vh.cookie.isSet()){
		// cookie is set i.e. user has been before
		this.browse();
	}else{
		// first time to the site
		this.newSession();
	}
}

NavigationPanel.prototype.browse = function(){
	vh.nav.mode = VisHis.BROWSE_MODE;
	
	if(vh.nav.browseLoaded){
		// load
		
		vh.nav.browseLoaded = true;
	}else{
		
	}
};

/* it's own method for symmetry with browse()*/
NavigationPanel.prototype.newSession = function(){
	vh.nav.currMode = VisHis.NEWSESSION_MODE;
	
	// Take a tour link
	if(false){
		var text = document.createTextNode("Take a Tour");
		var a = document.createElement("a");
		a.setAttribute("href","/tour.html");
		a.appendChild(text);
		var h3 = document.createElement("h3");
		h3.appendChild(a);
		
		this.domElt.appendChild(h3);
		
	}
	
};

NavigationPanel.prototype.switchTopic = function(topic){
	vh.nav.mode = VisHis.VISUALIZING;
	
	// todo: visualizing mode for nav
};


function TimeSlider() {
	// todo: the timeslider
}


function Node(){
	this.type;  // one of Region, Event, Topic
				// Topic implies Event
	
	this.uid;
	this.title;
	this.blurb;
	this.startdate;
	this.enddate;
	
	// Topic Only
	this.children;
	this.childrenByStartDate;
	this.childrenByEndDate;
	
	this.subTopics; // a subset of this.children
	
	this.parent //? Do I need this
	
	
	// Region Only
	this.pts;
	this.color;
	
}
Node.REGION = 0;
Node.EVENT = 1;
Node.TOPIC = 2;


/*
 * I should be implementing these all as sub-classes of Node
 * BUT I don't like the way javScript does inheritance
 * and I can't figure out a better way, a better waaaaaay.
 */
 
 /* Abstract classes responsible for all actions on Nodes */
function Event(){}
Event.display = function(node){
	var pt = new GLatLng(node.lat,  node.longitude);
	var marker = new GMarker(pt, {title: node.title});
	
	var map = vh.view.map;
	
	GEvent.addListener(marker, "click", function() {
            marker.openInfoWindowHtml("<b>" + node.title+ "</b>: "+node.blurb.substring(0,255)+"...");
          });
	
	map.addOverlay(marker);
}

function Region() {}

function Topic() {}
