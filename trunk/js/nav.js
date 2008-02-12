/**
 * nav.js
 * Nav
 * Topic
 */
 
 /**
  * @class Nav
  **/
function Nav(navElt){
	if(!navElt){
		navElt = document.getElementId('nav-panel');
	}
	this.elt = navElt;
	
	this.currentTopics = new TopicList('currently-viewing');
	this.currentTopics.attachToElt(this.elt);
	
	this.recentTopics  = new TopicList('recently-viewed');
	this.recentTopics.attachToElt(this.elt);
	
	this.searchBox = {
		textField: 'todo',
		searchResultsDiv: 'todo'
	}; // todo: search box
}
 
function TopicList(id, title){
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
}

TopicList.prototype.maxLength = 15;

// Attach the list to a parent element in the dom
// By id
TopicList.prototype.attachToId = function(id){
	this.attachToElt(document.getElementById(id));
}

// Attach the list to a parent element in the dom
// By element
TopicList.prototype.attachToElt = function(elt){
	elt.appendChild(this.elt);
}

TopicList.prototype.getContainerElt = function(){
	return this.elt;
}

TopicList.prototype.add = function(topic){
	if(topic.getId() in this.topics){
		console.warn('Topic added to list but its already there');
	}
	
	// Save the topic in the list
	this.topics[topic.id] = topic;

	// Add the topic in the dom
	this.listElt.appendChild(topic.getRootElement());
}

TopicList.prototype.getTopic = function(id){
	if(id in this.topics){
		return this.topics[id];
	}else{
		return false;
	}
}

TopicList.prototype.getAllTopics = function(){
	return this.topics;
}

TopicList.prototype.getLength = function(){
	return this.getAllTopics.length;
}

TopicList.prototype.remove = function(topic){
	var removed = this.listElt.removeChild(topic.getRootElement());	
	
	// then delete it from the list of topics
	delete this.topics[topic.getId()];
	
	return removed;
}

// clears the list of all toipics
//optionally passes the topics to another list
TopicList.prototype.clear = function(transferTo){
	var allTopics = this.getAllTopics();
	for(var topicId in allTopics){
		var removed = this.remove(allTopics[topicId]);
		if(transferTo){
			// add topic to the new list
			transferTo.add(removed);
		}
		
	}
}


/** 
 * @class Topic
 **/
function Topic(node, displayType){
	this.id = 0;
	this.children = new Array();
	
	for(var k in node){
		this[k] = node[k];
	}

	this.elt = document.createElement('li');	
	
	if(!displayType){
		displayType = 'current';
	}
	this.setDisplayType(displayType);
	
	var cbox = document.createElement('input');
	cbox.setAttribute('type','checkbox');
	cbox.setAttribute('checkbox','checkbox');
	this.elt.appendChild(cbox);
	
	var add = document.createElement('span');
	add.setAttribute('class', 'add');
	add.innerHTML = '+';
	this.elt.appendChild(add);
	
	var title = document.createElement('span');
	title.setAttribute('class', 'title');
	title.innerHTML = 'todo: this.title';
	this.elt.appendChild(title);
	
	var color = document.createElement('div');
	color.setAttribute('class', 'swatch');
	color.innerHTML = ' ';
	color.style.backgroundColor = '#aaaaaa'; // todo: this.color
	this.elt.appendChild(color);
	
	var remove = document.createElement('span');
	remove.setAttribute('class', 'remove');
	remove.innerHTML = 'X';
	this.elt.appendChild(remove);
}

Topic.prototype.addChild = function(event){
	this.children[event.getId()] = event;
}

Topic.prototype.getId = function(){
	return this.id;
}

Topic.prototype.getRootElement = function(){
	return this.elt;
}

// Hides all the Topic's children on the map
Topic.prototype.hide = function(){
	// pass
}

// Shows all the Topic's children on the map
Topic.prototype.show = function(){
	// pass
}

Topic.prototype.setDisplayType = function(type){
	this.elt.setAttribute('class', type + ' topic');
}