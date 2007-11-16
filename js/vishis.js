var vh;
function load(){
	vh = new Vishis();
}

Vishis.BROWSE_MODE = 1;
Vishis.NEWSESSION_MODE = 2;
Vishis.VISUALIZING_MODE = 3;

function Vishis(){
	var currTopic = false;
	
	// todo: var cookie;
	
	var topicCache = new Array();
	
	var nav = new NavigationPanel();
	var view = new ViewingPanel();
	
	this.switchTopicById = function(newTopicId){
		// check if the topic has been cached
		if(topicCache[newTopicId]){
			switchTopic(topicCache[newTopicId]);
		}else{
			// haven't cached this topic yet so go to the server
			Server.getNodeById(newTopicId, this.switchTopic);
		}
	};
	
	this.switchTopic = function(newTopic){
		// todo: try to cache the topic
		
		currTopic = newTopic;
		
		nav.switchTopic(newTopic);
		
		view.switchTopic(newTopic);
	};
}

function ViewingPanel(){
	var currTopic = false;
	
	var currMode = Vishis.NEWSESSION_MODE;
	
	var map = new Map();
	
	var slider = new TimeSlider();
	
	this.switchTopic = function(newTopic){
		currTopic = newTopic;
	
		// Either _all_ children have been downloaded or none ->
		if(newTopic.children && newTopic.children.length > 0){
			// we must have all the children
			showCurrTopic();
		}else{
			// get the children from the server
			Server.getChildren(newTopic.uid, this.showCurrTopic);
		}

	};
	
	// Children is optional
	this.showCurrTopic = function(children){
		// first clear the map
		map.clear();
	
		if(children){
			// Children passed in => make sure to save them
			currTopic.children = children;
		}else{
			// children not passed in.  Try to use saved ones
			if(currTopic.children){
				children = currTopic.children;
			}else{
				// topic has no children
				return;
			}
		}
		
		// keep track of range
		var minlat  = Number.POSITIVE_INFINITY,
			minlong = Number.POSITIVE_INFINITY,
			maxlat  = Number.NEGATIVE_INFINITY,
			maxlong = Number.NEGATIVE_INFINITY;
		
		for(var cid in children){
			var c = children[cid];
						
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
		}

		map.adjustToFitPoints(minlat, maxlong, maxlat, minlong);
		
		slider.switchTopic(currTopic);

	};
	
	this.showEvents = function(nowStart, nowEnd){
		var nStart = nowStart.getTime();
		var nEnd = nowEnd.getTime();
			
		for(var cid in children){
			var c = currTopic.children[cid];
			
			var cStart = c.start_date.getTime();
			var cEnd = c.end_date.getTime();

			if(cStart <= nEnd && cEnd >= nStart){
				Event.display(c);
			}
		}
	};
}


function NavigationPanel(){
	var currMode = Vishis.NEWSESSION_MODE;
	
	this.switchTopic = function(newTopic){
		// pass
	};
	
	this.browse = function(){
		// pass
	};
	
	this.newSession = function(){
		// pass
	};
	
}

function TimeSlider(){
	var sliderStart = false,
		sliderEnd = false;
	
	this.switchTopic = function(newTopic){
	
	};
	
	this.adjustSliders = function(thisSlider, otherSlider, offset){
	
	};
	
	this.sliderStartChanged = function(offset){
	
	};
	
	this.sliderEndChanged = function(offset){
	
	};
}

function Node(){
	var type;  // one of Region, Event, Topic
				// Topic implies Event
	
	var uid;
	var title;
	var blurb;
	var startdate;
	var enddate;
	
	// Topic Only
	var children;
	var childrenByStartDate;
	var childrenByEndDate;
	
	var subTopics; // a subset of children
	
	var parent //? Do I need this
	
	
	// Region Only
	var pts;
	var color;
	
}
Node.REGION = 0;
Node.EVENT = 1;
Node.TOPIC = 2;

// API so that the other code doesn't know about Google Maps
function Map(){
	var map = false;
	
	if (GBrowserIsCompatible()) {
		map = new GMap2(document.getElementById("map"));


		map.addControl(new GLargeMapControl());
		map.addControl(new GScaleControl());

		map.setCenter(new GLatLng(41.313038,-72.925224), 15);
	}
	
	this.displayEvent = function(node){
		var pt = new GLatLng(node.lat,  node.longitude);
		var marker = new GMarker(pt, {title: node.title});
		
		GEvent.addListener(marker, "click", function() {
	            marker.openInfoWindowHtml("<b>" + node.title+ "</b>: "+node.blurb.substring(0,255)+"...");
	          });
		
		map.addOverlay(marker);
	};
	
	this.adjustToFitPoints = function(s, w, n, e){
		// Bound map by the range of the events
		// todo: make sure to give them padding on the edges
		var sw = new GLatLng(s, w),
			ne = new GLatLng(n, e);
		var bounds = new GLatLngBounds(sw,  ne);
		
		var zoom = map.getBoundsZoomLevel(bounds)
		map.setCenter(bounds.getCenter(), zoom);
	};
	
	this.clear = function(){
		map.clearOverlays();
	}
}
