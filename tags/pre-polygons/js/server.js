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

/*
 * The API functions
 * These functions should be called by the other scripts
 */
Server.search = function(query, cbFunc, cbObj){
	Server.makeRequest(Server.getUrl(query), cbFunc, cbObj);
}

Server.decodeAndCallback = function(json, cbFunc, cbObj){

	var obj = JSON.parse(json);
	
	// todo: only makes sense with one topic right now
	for(var tk in obj){
		// first save the children field
		var children = obj[tk]['children'];
		
		// then delete the child field to avoid duplicate info
		delete obj[tk]['children'];
		
		var topic = new Topic(obj[tk]);
		var min = new Date('12/31/2038');
		var max = new Date('01/01/1001');
		for(ck in children){
			var child = new Event(children[ck]);
			topic.addChild(child);
			
			// Keep track of the min and max to add to the Topic
			if(child.start.getTime() < min.getTime()){
				min = child.start;
			}
			if(child.end.getTime() > max.getTime()){
				max = child.end;
			}
		}
		
		if(!topic.start){
			topic.start = min;
		}
		if(!topic.end){
			topic.end = max;
		}
		
		cbFunc.call(cbObj, topic);
	}
	
	
	//callback(topic);

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