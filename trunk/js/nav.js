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
	
	this.recentTopics  = new TopicList('recently-viewed', 'Recently Viewed', null);
	
	this.popularTopics  = new TopicList('popularly-viewed', 'Popular Topics', this.elt);
	
	// todo: "Add Your Own"

}

Nav.prototype.addTopic = function(topic){
	topic.setNav(this);

	// add the topic to the currently viewing list
	this.currentTopics.addTopic(topic);
	
	this.map.addTopic(topic);
}
 
function TopicList(id, title, parent){
	if(parent == null){
		return {message: 'no parent passed in'};
	}
	
	this.topics = new Array();

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

TopicList.prototype.removeTopic = function(topic){
	console.error("TopicList.removeTopic(): not yet implemented");
	return false;
}

TopicList.prototype.clear = function(){
	console.error("TopicList.clear(): not yet implemented");
}


/** 
 * @class Topic
 **/
function Topic(node){
	this.events = new Array();
	this.nav = false;
	
	for(var k in node){
		if(k == "start" || k == "end"){
			this[k] = new Date(node[k]);
		}else{
			this[k] = node[k];
		}
	}

	this.elt = document.createElement('li');
	
	var tid = this.getId();
	this.isDescVisible = true;

	this.showHideEvents = new YAHOO.widget.Button({
			type: "checkbox", 
			label: " ", 
			id: "topic"+tid+"-showhideevents", 
			name: "todo-name", 
			value: true, 
			container: this.elt, 
			checked: true,		
	});
	
	this.showHideEvents.css = 'show-hide-events';
	this.showHideEvents.addClass(this.showHideEvents.css);
	this.showHideEvents.addClass(this.showHideEvents.css + '-checked');
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
			this.setEltVisibility(false, e.target);
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
	
	this.addButton = new YAHOO.widget.Button(
				{
				type: "checkbox", 
				label: "add", 
				title: "title",
				id: "topic"+tid+"-addbutton", 
				name: "todo: name", 
				container: this.elt, 
				}
			);
	YAHOO.util.Dom.addClass(this.addButton._button,'push-button');
	this.addButton.addClass('add');
	// todo: add onclick handler
	
	this.removeButton = new YAHOO.widget.Button(
				{
				type: "checkbox", 
				label: "remove", 
				title: "title",
				id: "topic"+tid+"-removebutton", 
				name: "todo: name", 
				container: this.elt, 
				}
			);
	YAHOO.util.Dom.addClass(this.removeButton._button,'push-button');
	this.removeButton.addClass('remove');
	this.removeButton._button.style.display = 'none';
	
	// todo: this.description
	this.description = document.createElement('p');
	this.description.setAttribute('class', 'topic-desc');
	this.description.innerHTML = this.desc;
	this.description.style.display = 'none';
	this.elt.appendChild(this.description);
	
	
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

Topic.prototype.setNav = function(n){
	this.nav = n;
}

Topic.prototype.setEventsVisibility = function(event){
	console.log('You are still faking the map, but in a better way', event.newValue);
}

Topic.prototype.setShowHideDescVisibility = function(visible){

}

Topic.prototype.setIconPicVisibility = function(visible){

}

Topic.prototype.setAddButtonVisibility = function(visible){

}

Topic.prototype.setRemoveButtonVisibility = function(visible){

}

Topic.prototype.setEltVisibilityById = function(visible, id){
	var elt = document.getElementById(id);
	this.setEltVisibility(visible, elt);
}

Topic.prototype.setEltVisibility = function(visible, elt){
	var disp = 'none';
	if(visible){
		disp = 'block';
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

Topic.prototype.getRootElement = function(){
	return this.elt;
}