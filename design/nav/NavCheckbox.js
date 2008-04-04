function NavCheckbox(id, classBase, isChecked, listenerObj1, listenerObj2, label, p){

	var buttonArgObj = {
				type: "checkbox", 
				label: label || " ", 
				id: id || "", 
				name: "todo: name", 
				value: isChecked || "true", 
				container: "li", 
				checked: isChecked,
			};
	YAHOO.widget.Button.call(this, buttonArgObj);

	if(p){
		this.p = p;
	}else{
		this.p = false;
	}
	this.cssBase = classBase;
	this.addClass(this.cssBase);
	
	if(isChecked){
		this.addClass(this.cssBase + "-checked");
	}else{
		this.addClass(this.cssBase + "-unchecked");
	}
	
	if(listenerObj1){
		this.addListener("checkedChange", 
					listenerObj1.fn,
					listenerObj1.obj || this,
					listenerObj1.scope  || this
					);
	}
	
	if(listenerObj2){
		this.addListener("checkedChange", 
					listenerObj2.fn,
					listenerObj2.obj,
					listenerObj2.scope
					);
	}
	
	
	this.addListener("checkedChange", 
					this.toggleBg,
					this,
					this
					);	
};
YAHOO.lang.extend(NavCheckbox, YAHOO.widget.Button);

NavCheckbox.prototype.toggleBg = function(event){
	console.log(event);
	var checked;
	if(this.p){
		checked = this.p.isDescVisible;
	}else{
		checked = event.newValue;
	}
	
	if(checked){
		this.replaceClass(this.cssBase + '-unchecked', this.cssBase + '-checked');
	}else{
		this.replaceClass(this.cssBase + '-checked', this.cssBase + '-unchecked');
	}
	
}