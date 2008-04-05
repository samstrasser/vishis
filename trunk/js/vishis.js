
function load(topics){
	// Don't show vishis to the public
	var urlVars = Util.getUrlVariables();
	if(urlVars['v'] == 'hidden'){
		Cookie.set('v', 'hidden');
	}
	if(Cookie.get('v') == 'hidden'){
		var m = new Map();
		var n = new Nav(m);
		nav = n;
		
		for(var i=0; i< topics.length; i++){
			var t = new Topic(topics[i]);
			t.setNav(n);
			t.isShell = true; // mark this as only having a description
			
			n.popularTopics.addTopic(t);
		}
	}
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

/**
 * Returns an object literal of key => value pairs from a url with variables at the end
 */
Util.getUrlVariables = function(url){
	if(!url){
		url = document.location;
	}

	url = decodeURI(url);
	var qmark = url.indexOf('?');
	var endPart = url.substring(qmark+1);
	var parts = endPart.split('&');

	var vars = {};

	for(var i=0; i<parts.length; i++){
		kv = parts[i].split('=');
		vars[kv[0]] = kv[1];
	}
	
	return vars;
}