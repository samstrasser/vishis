/* This file represents an API for the scripts to use to interact with the server.
 * It is responsible for creating aynch requests, listening for responses, and changing the UI appropriately
 */
 
 /* Server object: Abstract class 
  * todo:comment
  */
function Server(){}

// set up the constants for the whole server
Server.baseUrl = '/php/';
Server.searchUrl = Server.baseUrl + 'search.php';
Server.method = 'GET';

// Static variables to help assign ids
Server.nextTopicId = 0;

/*
 * The API functions
 * These functions should be called by the other scripts
 */
Server.search = function(query, cbFunc, cbObj){
	Server.makeRequest(Server.getUrl(query), cbFunc, cbObj);
}

// cbObj.cbFunc should expect exactly one Topic object as an argument
// and may be called several times
Server.decodeAndCallback = function(json, cbFunc, cbObj){

	var obj = JSON.parse(json);
	console.log(obj);
	
	for(var tk in obj){
		// first save the Events
		var events = obj[tk]['events'];
		
		// then delete the child field to avoid duplicate info
		delete obj[tk]['events'];
		
		var topic = new Topic(obj[tk]);
		var min = new Date('12/31/2038'); // todo HDate.max;
		var max = new Date('01/01/1001'); // todo: HDate.min

		for(ek in events){
			var eventObj = events[ek];
			
			var markerObj = eventObj['marker'];
			delete eventObj['marker'];
			
			var polygons = eventObj['polygons'];
			delete eventObj['events'];

			var event = new Event(eventObj);
			
			for(pk in polygons){
				var polygon = new Polygon(polygons[pk]);
				event.addPolygon(polygon);
			}
			
			var marker = new Marker(markerObj);
			event.addMarker(marker);
			
			topic.addEvent(event);
			
			// Keep track of the min and max to add to the Topic
			if(event.start.getTime() < min.getTime()){
				min = event.start;
			}
			if(event.end.getTime() > max.getTime()){
				max = event.end;
			}
		}
		
		if(!topic.start){
			topic.start = min;
		}
		if(!topic.end){
			topic.end = max;
		}
		topic.id = Server.nextTopicId++;
		
		console.log(topic);
		cbFunc.call(cbObj, topic);
	}
}


/* Private functions */
Server.makeRequest = function(url, cbFunc, cbObj){
	var request = Server.createRequest();
	
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			if(request.status == 200){
				Server.decodeAndCallback(request.responseText, cbFunc, cbObj);
			}
			
		}
	}
	
	request.open(Server.method, url);

	request.send(null);
}

Server.createRequest = function(){
	// todo: support IE
	return new XMLHttpRequest();
}

Server.getUrl = function(query){
	var host = document.location.hostname;
	if(host.substring(0,4) != "www."){
		host = "www." + host;
	}
	var url = "http://" + host + Server.searchUrl + '?q=' + query + '&';
	return url;
}