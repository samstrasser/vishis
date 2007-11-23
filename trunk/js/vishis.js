var vh;
var g1 = {};
var g2 = {};

function load(){
	vh = new Vishis();
}

function unload(){
	GUnload();
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
			
		// keep track of earliest start and latest end time
		currTopic.startTime = Number.POSITIVE_INFINITY,
		currTopic.endTime = Number.NEGATIVE_INFINITY;
		
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
			
			// Find min  start and max end times
			if(c.start_date.getTime() <= currTopic.startTime){
				currTopic.startTime = c.start_date.getTime()-1;
			}
			if(c.end_date.getTime() >= currTopic.endTime){
				currTopic.endTime = c.end_date.getTime()+1;
			}
			
		}

		map.adjustToFitPoints(minlat, maxlong, maxlat, minlong);
		
		slider.switchTopic(currTopic);

	};
	
	var showCurrEvents  = function(nowStart, nowEnd){
		map.clear();
		
		var nStart = nowStart.getTime();
		var nEnd = nowEnd.getTime();
			
		for(var cid in currTopic.children){
			var c = currTopic.children[cid];
			
			var cStart = c.start_date.getTime();
			var cEnd = c.end_date.getTime();

			if(cStart <= nEnd && cEnd >= nStart){
				map.displayEvent(c);
			}
		}
	};
	
	var currTopic = false;
	
	var currMode = Vishis.NEWSESSION_MODE;
	
	var map = new Map();
	
	var slider = new TimeSlider(showCurrEvents);
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

function TimeSlider(callback){

	this.switchTopic = function(newTopic){
		// Scale and shift needed to map values on the slider to human dates
		var max = newTopic.endTime;
		
		shift = newTopic.startTime;
		scale = (max - shift) / 300; // todo: make slider width a variable
		
	
	};
	
	var adjustSliders = function(thisSlider, otherSlider, offset){
		// Adjust spanner elt
		// Make sure the sliders don't overlap
		
		// Convert values to Date objects
		var nowStart = valueToDate(sliderStart.getValue());
		var nowEnd   = valueToDate(sliderEnd.getValue());
		
		// Callback the viewing panel
		callback(nowStart, nowEnd);
	};
	
	var slideSpanner = function(center, spanner, startSlider, endSlider){
		var width = spanner.getWidth();
		
		var leftEdge  = center - (width/2);
		var rightEdge = center + (width/2);
		
		string = "Spanner width: " + width + 
			" left:" + leftEdge + " right:" + rightEdge +
			" sliderOffset:" + 5 + 
			" start: " + startSlider.getValue() + 
			" end: " + endSlider.getValue();

		
		startSlider.setValue(leftEdge);
		endSlider.setValue(rightEdge + 5);//endSlider.width);
		
	};
	
	var setConstraints = function(slider, iLeft, iRight){
		//g1 = slider;
		//g2 = new Array(iLeft, iRight);
		
		slider.setXConstraint(iLeft, iRight);
	}
	
	var valueToDate = function(val){
		var time = (val * scale) + shift;
		
		return new Date(time);
	}

	
	var shift = 0, scale = 0;
	
	// initialize the  sliders
	var sliderStart = TimeSlider.createSlider(1);
	sliderStart.subscribe("change", 
		(function(offset){ adjustSliders(sliderEnd, sliderStart, offset);})
	);
	sliderStart.subscribe("slideStart", function() { 
		setConstraints(sliderStart, 0, 50);
	}); 
	/*
	sliderStart.subscribe("slideStart", 
		(function(){ setConstraints(sliderStart,	// moving the start slider
									bgOffset,		// restrict the slider so it does not overlap the end slider
									sliderEnd.getValue()
									);
									g1 = sliderEnd;
									alert(sliderEnd.getValue());
									})
	);
	*/
	
	var sliderEnd = TimeSlider.createSlider(2);
	sliderEnd.subscribe("change", 
		(function(offset){ adjustSliders(sliderStart, sliderEnd, offset);})
	)
	sliderEnd.setValue(10);
	
	var spanner = TimeSlider.createSpanner();
	spanner.subscribe("change", 
		(function(offset){ slideSpanner(offset, spanner, sliderStart, sliderEnd);})
	)
	
	spanner.setValue(100);
	slideSpanner(100, spanner, sliderStart, sliderEnd);
}

TimeSlider.createSlider = function(num){
	var bg = "sliderbg";
	var thumb = "sliderthumb" + num;
	var iLeft = 0;
	var iRight = 300;
	var iTickSize = false;
	
	var s = YAHOO.widget.Slider.getHorizSlider(bg, thumb, iLeft, iRight);
	s.backgroundEnabled = false; 	// disable background clicks so that both don't jump around
									// todo: fix this by allowing background clicks on the spanner
	
	s.width = 5;
	return s;
}

TimeSlider.createSpanner = function(){
	var s = YAHOO.widget.Slider.getHorizSlider("sliderbg", "spanner", 0, 300);
	s.backgroundEnabled = true;
	
	//TMP ONLY
	s.width = 10;
	// END TMP
	
	s.getWidth = function(){
		return this.width;
	}
	
	return s;
}


function Node(){
	var type;  // one of Region, Event, Topic
				// Topic implies Event
	
	var uid;
	var title;
	var blurb;
	var start_date; // these vars have underscores b/c I'm going directly off the SQL.
	var end_date;	// to change them, the Server object would need to convert: sql schema -> JavaScript var names
	
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

// API-ish so that the other code doesn't have to know about Google Maps
function Map(){
	var gmap = false;
	
	if (GBrowserIsCompatible()) {
		gmap = new GMap2(document.getElementById("map"));


		gmap.addControl(new GLargeMapControl());
		gmap.addControl(new GScaleControl());

		gmap.setCenter(new GLatLng(41.313038,-72.925224), 15);
	}
	
	this.displayEvent = function(node){
		var pt = new GLatLng(node.lat,  node.longitude);
		var marker = new GMarker(pt, {title: node.title});
		
		GEvent.addListener(marker, "click", function() {
	            marker.openInfoWindowHtml("<b>" + node.title+ "</b>: "+node.blurb.substring(0,255)+"...");
	          });
		
		gmap.addOverlay(marker);
	};
	
	this.adjustToFitPoints = function(s, w, n, e){
		// Bound map by the range of the events
		// todo: make sure to give them padding on the edges
		var sw = new GLatLng(s, w),
			ne = new GLatLng(n, e);
		var bounds = new GLatLngBounds(sw,  ne);
		
		var zoom = gmap.getBoundsZoomLevel(bounds)
		gmap.setCenter(bounds.getCenter(), zoom);
	};
	
	this.clear = function(){
		gmap.clearOverlays();
	}
}
