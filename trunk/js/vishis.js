var vh;
var g1 = {};
var g2 = true;//{};

var slStart = false;
var slEnd = false;
var slSpan = false;

var start = false;
var end = false;

var vToD = false;

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
	map.addTimeSlider(slider);
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
		scale = (max - shift) / TimeSlider.sliderWidth;
		
		this.resetPosition(newTopic);
	};
	
	this.resetPosition = function(topic){
		sliderStart.setValue(sliderStart.initPos);
		sliderEnd.setValue(sliderEnd.initPos);
		adjustSliders();
	};
	
	var adjustSliders = function(offset){
		if(spannerIsSliding){
			return;
		}
	
		// Adjust spanner
		var startValue = sliderStart.getValue(),
			endValue   = sliderEnd.getValue();
		var spanWidth = endValue - startValue;
		var spanCenter = (startValue + endValue)/2;
		
		// make sure to adjust only when necessary
		// otherwise get stuck in an infinite loop
		spanner.setValue(spanCenter-(spanWidth/2));
		spanner.setWidth(spanWidth);
		
		doCallback(startValue, endValue);

	};
	
	var slideSpanner = function(left){
		if(sliderIsSliding){
			return;
		}
		
		var width = spanner.getWidth();
		
		var startValue  = left;
		var endValue = left + width;
		
		sliderStart.setValue(startValue);
		sliderEnd.setValue(endValue);
		
		doCallback(startValue, endValue);
		
	};
	
	var setConstraints = function(slider, iLeft, iRight){
		slider.setXConstraint(iLeft, iRight);
	};
	
	var doCallback = function(startValue, endValue){
		// Convert values to Date objects
		var nowStart = valueToDate(startValue);
		var nowEnd   = valueToDate(endValue);
		
		//DEBUG ONLY
		start = nowStart;
		end = nowEnd;
		// DEBUG ONLY
		
		// Callback the viewing panel
		callback(nowStart, nowEnd);
	};
	
	var valueToDate = function(val){
		val = val - (-1 * sliderStart.initPos);
	
		var time = (val * scale) + shift;
		
		return new Date(time);
	};
	
	vToD = valueToDate;

	
	var shift = 0, scale = 0;
	var sliderIsSliding = false,
		spannerIsSliding = false;
	
	// initialize the  sliders
	var sliderStart = TimeSlider.createSlider(1);
	sliderStart.subscribe("change", 
		(function(offset){ adjustSliders(offset);})
	);
	sliderStart.subscribe("slideStart", (function(offset){ sliderIsSliding = true;}))
	sliderStart.subscribe("slideEnd", (function(offset){ sliderIsSliding = false;}))
	
	var sliderEnd = TimeSlider.createSlider(2);
	sliderEnd.subscribe("change", 
		(function(offset){ adjustSliders(offset);})
	)
	sliderEnd.subscribe("slideStart", (function(offset){ sliderIsSliding = true;}))
	sliderEnd.subscribe("slideEnd", (function(offset){ sliderIsSliding = false;}))
	
	var spanner = TimeSlider.createSpanner();
	spanner.subscribe("change", 
		(function(offset){ slideSpanner(offset);})
	)
	spanner.subscribe("slideStart", (function(offset){ spannerIsSliding = true;}))
	spanner.subscribe("slideEnd", (function(offset){ spannerIsSliding = false;}))	
	
	slStart = sliderStart;
	slEnd = sliderEnd;
	slSpan = spanner;
	
	this.resetPosition();
}
TimeSlider.bgOffset = 20;
TimeSlider.sliderWidth = 360;
TimeSlider.imgWidth = 400;
TimeSlider.spannerMin = 5;
TimeSlider.thumbWidth = 8;

		
TimeSlider.prototype = new GControl();

TimeSlider.prototype.initialize = function(map){
	var container = document.getElementById("timeslider");
	
	map.getContainer().appendChild(container);
	return container;
}

TimeSlider.prototype.getDefaultPosition = function(){
	return new GControlPosition(G_ANCHOR_BOTTOM_RIGHT, new GSize(10, 15));
}

TimeSlider.createSlider = function(num){
	var bg = "sliderbg";
	var thumb = "sliderthumb" + num;
	var iLeft = 0, iRight = 0;
	
	if(num == 1){// startSlider
		iLeft = TimeSlider.bgOffset;
		iRight = TimeSlider.imgWidth - TimeSlider.bgOffset - TimeSlider.spannerMin - TimeSlider.thumbWidth;
	}else if(num == 2){
		iLeft = TimeSlider.bgOffset + TimeSlider.spannerMin;
		iRight = TimeSlider.imgWidth - TimeSlider.bgOffset - TimeSlider.thumbWidth;
	}
	iLeft = iLeft * -1;
	
	var s = YAHOO.widget.Slider.getHorizSlider(bg, thumb, iLeft, iRight);
	s.backgroundEnabled = false; 	// disable background clicks so that both don't jump around
									// todo: fix this by allowing background clicks on the spanner
	s.initPos = iLeft;
	s.width = TimeSlider.thumbWidth;
	return s;
}

TimeSlider.createSpanner = function(){
	var iLeft = -1 * (TimeSlider.bgOffset);
	var iRight = TimeSlider.imgWidth - TimeSlider.bgOffset - TimeSlider.thumbWidth - TimeSlider.spannerMin;

	var s = YAHOO.widget.Slider.getHorizSlider("sliderbg", "spanner", iLeft, iRight);
	s.backgroundEnabled = false;
	
	s.getWidth = function(){
		return this.width;
	}
	
	s.setWidth = function(newWidth){
		this.width = newWidth;
		var spannerDiv = document.getElementById('spanner');
		spannerDiv.style.width = newWidth+'px';
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
		var latlng = new GLatLng(node.lat,  node.longitude);
	
		/*
		var icon = new GIcon();
		//icon.image = 'red_marker.png';
		icon.iconSize = new GSize(32, 32);
		icon.iconAnchor = new GPoint(16, 16);
		icon.infoWindowAnchor = new GPoint(25, 7);
		*/

		opts = { 
		  "clickable": true,
		  "labelText": node.title,
		  "labelOffset": new GSize(-6, -10),
		  "labelClass": "marker"
		};
		var marker = new LabeledMarker(latlng, opts);

		GEvent.addListener(marker, "click", function() {
		  marker.openInfoWindowHtml("I'm a Labeled Marker!");
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
	
	this.addTimeSlider = function(slider){
		gmap.addControl(slider);
	};
	
	this.clear = function(){
		gmap.clearOverlays();
	};
}
