function load(){
	var m = new Map();
}

function unload(){
	GUnload();
}


function Util(){};

Util.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

Util.formatDate = function(d){
	return Util.months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
};

Util.getDocumentHead = function(){
	return document.getElementsByTagName('head').item(0);
}

Util.include = function(file, headElt) {
	if(!headElt){
		headElt = Util.getDocumentHead();
	}
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', file);
	headElt.appendChild(js);

	return false;
}

function UNOBTRUSIVE_JAVASCRIPT(){
	// The list of files that need to be included
	// Order matters a lot 
	var files = new Array(
		// Yahoo! User Interface core
		"http://yui.yahooapis.com/2.3.1/build/yahoo-dom-event/yahoo-dom-event.js",
		"http://yui.yahooapis.com/2.3.1/build/element/element-beta-min.js",
		
		// Specific Yahoo! API requirements
		"http://yui.yahooapis.com/2.3.1/build/dragdrop/dragdrop-min.js",
		"http://yui.yahooapis.com/2.3.1/build/slider/slider-min.js",

		// Full versions of YUI objects
		//"js/debug/dragdrop.js", 
		//"js/debug/slider.js", 
		
		// Google Maps API
		"http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAbNpbJQzOmQ3LpYb48UbbNxSZT5Tpn1taJFQH4Y5Wf2aA8FIGoRR00-ePrq_DDT5-FUNm7KoXKkB1lQ",

		// Open sourced LabeledMarker for Google Maps
		"js/labeledmarker.js", 
		
		// Visualize History.com-specific code
		"js/map.js", 
		"js/slider.js"
	);


	var head = Util.getDocumentHead();
	for(key in files){
		Util.include(files[key], head);
	}
	
	delete files;
};

function TOSS_THIS_OUT_SOON(){
	
	// keep track of range of the geogrpahical positions
	var minlat  = Number.POSITIVE_INFINITY,
		minlng = Number.POSITIVE_INFINITY,
		maxlat  = Number.NEGATIVE_INFINITY,
		maxlng = Number.NEGATIVE_INFINITY;
		
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
}