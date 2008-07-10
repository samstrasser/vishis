/**
 * nav.js
 * Nav
 * Topic
 */
 
 /**
  * @class Nav
  **/

  function Nav(map, navElt){
	// Keep a reference to the Map so we can add and remove information from it
	this.map = map;
	
	
	if(!navElt){
		navElt = document.getElementById('nav-panel');
	}
	this.elt = navElt;
	
	this.currentTopics = new TopicList('currently-viewing','Currently Viewing', this.elt);
	this.currentTopics.createInfoBox();
	
	this.recentTopics  = new TopicList('recently-viewed', 'Recently Viewed', null);
	
	this.popularTopics  = new TopicList('popularly-viewed', 'Popular Topics', this.elt);
	
	// todo: "Add Your Own"

}

Nav.prototype.addTopic = function(topic){
	topic.setNav(this);
	
	// remove the topic from the old list
	this.popularTopics.removeTopicByTitle(topic.getTitle());
	
	// then add the topic to the currently viewing list
	this.currentTopics.addTopic(topic);
	this.currentTopics.hideInfoBox();
	
	topic.setDisplayMode('current');
	topic.isShell = false;
	this.map.addTopic(topic);
}

Nav.prototype.removeCurrentTopic = function(topic){
	this.currentTopics.removeTopic(topic);
	
	console.log('removing', this.currentTopics.getNumTopics());
	if(this.currentTopics.getNumTopics() == 0){
		console.log('showing box');
		this.currentTopics.showInfoBox();
	}
	
	this.map.removeTopic(topic);
	
	this.popularTopics.addTopic(topic);

	topic.setDisplayMode('other');
}
 
function TopicList(id, title, parent){
	if(parent == null){
		return {message: 'no parent passed in'};
	}
	
	this.topics = new Array();
	this.numTopics = 0; // keep track of length so we can delete keys

	// Initialize the dom elements
	var titleElt = document.createElement('h2');
	titleElt.appendChild(document.createTextNode(title));
	
	this.listElt = document.createElement('ul');
	this.listElt.setAttribute('class', 'topic-list');
	
	this.elt = document.createElement('div');
	this.elt.setAttribute('id', id);
	this.elt.setAttribute('class', 'topic-list');
	this.elt.appendChild(titleElt);
	this.elt.appendChild(this.listElt);
	
	parent.appendChild(this.elt);
}

TopicList.prototype.maxLength = 15;

TopicList.prototype.addTopic = function(topic){
	// Save the topic in the list
	this.topics.push(topic);
	this.numTopics++;

	// Add the topic in the dom
	this.listElt.appendChild(topic.getRootElement());
}

TopicList.prototype.getTopic = function(id){
	console.error("TopicList.getTopic(): not yet implemented");
	return false;
}

TopicList.prototype.getAllTopics = function(){
	return this.topics;
}

TopicList.prototype.getLength = function(){
	return this.getAllTopics().length;
}

TopicList.prototype.getNumTopics = function(){
	return this.numTopics;
}

TopicList.prototype.removeTopicByTitle = function(title){
	var topics = this.getAllTopics();
	
	for(var tid in topics){
		if(topics[tid].getTitle() == title){
			var topic = topics[tid];
			
			// delete the tid or else the shellTopic and the realTopic will be present
			delete this.topics[tid];
	
			return this.removeTopic(topic);
		}
	}
	return false;
}

TopicList.prototype.removeTopic = function(topic){
	this.listElt.removeChild(topic.getRootElement());
	
	this.numTopics--;
	
	return topic;
}

TopicList.prototype.clear = function(){
	console.error("TopicList.clear(): not yet implemented");
}

TopicList.prototype.createInfoBox = function(){
	this.infoBoxElt = document.createElement('div');	
	this.infoBoxElt.setAttribute('id', 'info-box');
	this.infoBoxElt.setAttribute('class', 'info-box');
	this.infoBoxElt.setAttribute('style', 'display:block;');
	
	var closeContainer = document.createElement('span');
	closeContainer.setAttribute('id', 'info-box-close');
	this.infoBoxElt.appendChild(closeContainer);
	
	var p = document.createElement('p');
	p.appendChild(document.createTextNode('You are not currently viewing any topics.  To start, click the "add" button on any of the topics below'));
	this.infoBoxElt.appendChild(p);

	this.hideInfoBoxPermanently = false;
	var closeButton = new YAHOO.widget.Button({
			type: "push", 
			label: " ", 
			title: "close",
			name: "todo-name", 
			container: 'info-box-close'
	});
	closeButton.addClass('close-button');
	closeButton.addListener("click", 
		(function(event){
			if(!event.newValue){
				this.hideInfoBoxPermanently = true;
				this.hideInfoBox();
			}
		}),
		this,
		this
		);
	
	
	this.elt.insertBefore(this.infoBoxElt, this.listElt);
	
	this.hideInfoBox = function(){
		this.infoBoxElt.style.display = 'none';
	}
	
	this.showInfoBox = function(){
		if(!this.hideInfoBoxPermanently){
			this.infoBoxElt.style.display = 'block';
		}
	}
	
	this.showInfoBox();

}

/** 
 * @class Topic
 **/
function Topic(node){
	this.events = new Array();
	this.nav = false;
	
	this.colorSet = Topic.getNextColorSet();

	for(var k in node){
		if(k == "start" || k == "end"){
			this[k] = new Date(node[k]);
		}else{
			this[k] = node[k];
		}
	}

	this.elt = document.createElement('li');
	
	var idPrefix = 'topic-' + this.getId();
	this.isDescVisible = true;
	this.areEventsVisible = true;

	this.showHideEvents = new YAHOO.widget.Button({
			type: "checkbox", 
			label: " ", 
			id: idPrefix+"-showhideevents", 
			name: "todo-name", 
			value: true, 
			container: this.elt, 
			checked: true,		
	});
	
	this.showHideEvents.css = 'show-hide-events';
	this.showHideEvents.addClass(this.showHideEvents.css);
	this.showHideEvents.addClass(this.showHideEvents.css + '-checked');
	this.showHideEvents.addClass('piece');
	this.showHideEvents.addListener("checkedChange", 
			this.setEventsVisibility,
			this,
			this
			);
	this.showHideEvents.addListener("checkedChange", 
		(function(event){
			if(event.newValue){
				this.showHideEvents.replaceClass(this.showHideEvents.css + '-unchecked', this.showHideEvents.css + '-checked');
			}else{
				this.showHideEvents.replaceClass(this.showHideEvents.css + '-checked', this.showHideEvents.css + '-unchecked');
			}
		}),
		this,
		this
		);
	
	this.showHideEvents.addListener("available",
		(function(e) {
			var vis = (this.mode == 'current');
			this.setShowHideEventsVisibility(vis);
		}),
		this,
		this
	);
	
	this.titleLink = document.createElement('a');
	this.titleLink.setAttribute('href', 'javascript:void(0);');
	
	var titleLinkSpan = document.createElement('span');

	this.plusNode = document.createElement('span');
	this.plusNode.appendChild(document.createTextNode('+ '));

	this.minusNode = document.createElement('span');
	this.minusNode.appendChild(document.createTextNode('- '));
	this.minusNode.style.display = 'none';
	
	titleLinkSpan.appendChild(this.plusNode);
	titleLinkSpan.appendChild(this.minusNode);
	
	this.titleLink.appendChild(titleLinkSpan);
	this.titleLink.appendChild(document.createTextNode(this.title));
	
	YAHOO.util.Dom.addClass(this.titleLink, 'title-link');
	YAHOO.util.Event.addListener(this.titleLink, "click", 
				(function(arg){
					this.toggleDescVisibility();
				}),
				null,
				this
				);
	this.elt.appendChild(this.titleLink);
	
	this.iconPic = document.createElement('img');
	this.iconPic.setAttribute('id', idPrefix+'-icon');
	this.iconPic.setAttribute('src', 
		IconFactory.getIconUrl({
			width: 16,
			height: 16,
			primaryColor: this.colorSet.primary,
			cornerColor:  this.colorSet.corner,
			strokeColor:  this.colorSet.stroke
		})
	);
	this.iconPic.setAttribute('class', 'icon piece');
	this.elt.appendChild(this.iconPic);
	this.setIconPicVisibility(false);
	
	this.addButton = new YAHOO.widget.Button(
				{
				type: "checkbox", 
				label: "add", 
				title: "title",
				id: idPrefix+"-addbutton", 
				name: "todo: name", 
				container: this.elt, 
				}
			);
	YAHOO.util.Dom.addClass(this.addButton._button,'push-button');
	this.addButton.addClass('add');
	this.addButton.addClass('piece');
	this.addButton.addListener("click", 
		(function(){
			//this.addButton.set('disabled',true);
			this.setLoadingIconVisibility(true);
			this.setAddButtonVisibility(false);
		}),
		this,
		this
	);
	this.addButton.addListener("click", 
		this.addToMap,
		this,
		this
	);
	
	this.loadingIcon = document.createElement('img');
	this.loadingIcon.setAttribute('id', idPrefix+'-loading');
	this.loadingIcon.setAttribute('src', 'img/loading.gif');
	this.loadingIcon.setAttribute('class', 'add piece');
	this.elt.appendChild(this.loadingIcon);
	this.setLoadingIconVisibility(false);
	
	this.removeButton = new YAHOO.widget.Button(
				{
				type: "checkbox", 
				label: " ", 
				title: "title",
				id: idPrefix+"-removebutton", 
				name: "todo: name", 
				container: this.elt, 
				}
			);
	YAHOO.util.Dom.addClass(this.removeButton._button,'remove');
	this.removeButton.addClass('piece');
	this.removeButton.addClass('remove');
	this.setRemoveButtonVisibility(false);
	this.removeButton.addListener("click", 
		this.removeFromMap,
		this,
		this
	);
	
	this.description = document.createElement('p');
	this.description.setAttribute('class', 'topic-desc');
	this.description.innerHTML = this.desc;
	this.description.style.display = 'none';
	this.elt.appendChild(this.description);
	
	
}

Topic.prototype.addToMap = function(){
	if(!this.nav){
		console.error("No nav found when adding topic to map");
		return false;
	}
	
	if(this.isShell){
		if(!this.query){
			if(!this.title){
				console.error('No query or title found for event', this);
			}else{
				console.warn('No query found.  Using title: ', this.title);
				this.query = this.title;
			}
				
		}
		Server.search(this.query, this.nav.addTopic, this.nav);
	}else{
		this.nav.addTopic(this);
	}
}

Topic.prototype.removeFromMap = function(){
	this.nav.removeCurrentTopic(this);
}

Topic.prototype.toggleDescVisibility = function(event){
	var display;
	var showNode;
	var hideNode
	if(this.isDescVisible){
		display = "block";
		showNode = this.minusNode;
		hideNode = this.plusNode;
	}else{
		display = "none";
		showNode = this.plusNode;
		hideNode = this.minusNode;
	}
	this.description.style.display = display;
	showNode.style.display = 'inline';
	hideNode.style.display = 'none';
	
	this.isDescVisible = !this.isDescVisible;
}

Topic.prototype.setDisplayMode = function(mode){
	this.mode = mode;
	
	if(mode == 'current'){
		// Current mode: [ eye   title   icon   remove ]
		this.setShowHideEventsVisibility(true);
		this.setIconPicVisibility(true);
		this.setLoadingIconVisibility(false);
		this.setAddButtonVisibility(false);
		this.setRemoveButtonVisibility(true);
	}else if(mode == 'other'){
		this.setShowHideEventsVisibility(false);
		this.setIconPicVisibility(false);
		this.setLoadingIconVisibility(false);
		this.setAddButtonVisibility(true);
		this.setRemoveButtonVisibility(false);
	}else{
		console.error("unknown display mode");
	}
}

Topic.prototype.setNav = function(n){
	this.nav = n;
}

Topic.prototype.setEventsVisibility = function(event){
	this.areEventsVisible = event.newValue;
	this.nav.map.ts.doCallback();
}

Topic.prototype.setShowHideEventsVisibility = function(visible){
	this.setEltVisibility(this.showHideEvents.get('element'), visible, '-moz-inline-box');
}

Topic.prototype.setIconPicVisibility = function(visible){
	this.setEltVisibility(this.iconPic, visible, 'inline');
}

Topic.prototype.setLoadingIconVisibility = function(visible){
	this.setEltVisibility(this.loadingIcon, visible, 'inline');
}

Topic.prototype.setAddButtonVisibility = function(visible){
	this.setEltVisibility(this.addButton.get('element'), visible, '-moz-inline-box');
}

Topic.prototype.setRemoveButtonVisibility = function(visible){
	this.setEltVisibility(this.removeButton.get('element'), visible, '-moz-inline-box');
}

Topic.prototype.setEltVisibilityById = function(id, visible){
	var elt = document.getElementById(id);
	this.setEltVisibility(elt, visible);
}

Topic.prototype.setEltVisibility = function(elt, visible, d){
	var disp = 'none';
	if(visible){
		if(d == null){
			disp = 'block';
		}else{
			disp = d;
		}
	}
	
	if(elt.style && elt.style.display){
		elt.style.display = disp;
	}else{
		elt.setAttribute('style', 'display:'+disp+';');
	}
}

Topic.colorSets = [
		{
			primary:  	"#FFFF00FF",
			corner:		"#FF8A00FF",
			stroke:		"#FF0000FF",
		},
		{
			primary:  	"#1000E9FF",
			corner:		"#3E66C7FF",
			stroke:		"#FF0000FF",
		},
		{
			primary:  	"#E98600FF",
			corner:		"#F1FF00FF",
			stroke:		"#FF0000FF",
		},
		{
			primary:  	"#07550FFF",
			corner:		"#00E975FF",
			stroke:		"#FF0000FF",
		},
		{
			primary:  	"#FF0000FF",
			corner:		"#511010FF",
			stroke:		"#FF0000FF",
		},
		{
			primary:  	"#F1FF00FF",
			corner:		"#FFFFFCFF",
			stroke:		"#FF0000FF",
		},
	];
Topic.nextColorSet = 0;
Topic.getNextColorSet = function(){
	if(Topic.nextColorSet >= Topic.colorSets.length){
		Topic.nextColorSet = 0;
	}
	return Topic.colorSets[Topic.nextColorSet++];
}


Topic.prototype.getEvents = function(){
	return this.events;
}

Topic.prototype.addEvent = function(event){
	this.events.push(event);
}

Topic.prototype.getId = function(){
	return this.id;
}

Topic.prototype.getTitle = function(){
	return this.title;
}

Topic.prototype.getRootElement = function(){
	return this.elt;
}