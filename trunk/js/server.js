/* This file represents an API for the scripts to use to interact with the server.
 * It is responsible for creating aynch requests, listening for responses, and changing the UI appropriately
 */
 
 /* Server object: Abstract class 
  * todo:comment
  */
function Server(){}

// set up the constants for the whole server
Server.baseurl = 'php/get.php';
Server.method = 'GET';

/*
 * The API functions
 * These functions should be called by the other scripts
 */
Server.getPopularExamples = function(callback){
	var url = Server.getUrl('getNodeList.py?what=popularExamples');
	Server.getNodeList(url, callback);
}

Server.getSubTopics = function(topicId){
	var url = Server.getUrl('getNodeList.py?what=subTopics&tid='+topicId);
	Server.getNodeList(url, callback);
}

Server.getRelatedTopics = function(topicId){
	var url = Server.getUrl('getNodeList.py?what=relatedTopics&tid='+topicId);
	Serve.getNodeList(url, callback);
}

Server.getNodeById = function(nodeId, callback){
	var url = Server.getUrl('node', 'node', nodeId);

	Server.get(url, callback);
}

Server.getChildren = function(nodeId, callback){
	var url = Server.getUrl('children', 'nodelist', nodeId);
	
	Server.get(url, callback);
}



/* Private functions */
Server.get = function(url, callback){
	var request = Server.createRequest();
	
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			if(request.status == 200){
				var obj = eval('(' + request.responseText + ')');
				callback(obj);
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

Server.getUrl = function(what, type, nid){
	return (document.location + Server.baseurl + '?what=' + what + '&type=' + type + '&nid=' + nid + '&');
}