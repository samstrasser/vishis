/**
 * slider.js
 */
 
/**
 * @class TimeSlider
 */
function TimeSlider(mapElt, callback){
	// Construct the GControl first
	GControl.call(this);

	TimeSlider.createSliderInDom(mapElt);
	
	this.callback = callback;
	this.sliders = new Array(3);

	// Create the sliders //
	for(var name in TimeSlider.sliderNames){
		var num = TimeSlider.sliderNames[name];
		var s = new Slider(this, num, name, 0, 400);
		
        s.subscribe("change", function(offset) {
			//s.change(offset);
		});

        s.subscribe("slideStart", function() {
			s.slideStart();
		});

        s.subscribe("slideEnd", function() {
			s.slideEnd();
		});

		this.sliders[num] = s;
	}
	
	// Override setConstraints for each of the sliders
	this.getSlider('start').setConstraints = function(){
		var end = this.getOtherSlider('end');
		this.setXConstraint(this.initConstraints.left,
			end.getValue() + end.getWidth());
	};
	
	this.getSlider('end').setConstraints = function(){
		var start = this.getOtherSlider('start');
		this.setXConstraint(start.getValue() + start.getWidth(),
			this.initConstraints.right);
	};
	
	var spanner = this.getSlider('spanner').getValue();
	spanner.setConstraints = function(){
		this.setXConstraint(
			this.getOtherSlider('start').initConstraints.left, // 
			this.getOtherSlider('end').initConstraints.right - (this.getWidth()/2)
		);
	};
	TimeSlider.overrideSpannerMethods(spanner);

}
YAHOO.lang.extend(TimeSlider, GControl);
TimeSlider.sliderId = 'timeslider';
TimeSlider.sliderBgId = 'sliderbg';
TimeSlider.sliderNames = {
	'start':0,
	'end':1,
	'spanner':2
};

TimeSlider.createSliderInDom = function(mapElt){
	var sliderDiv = document.createElement('div');
	sliderDiv.setAttribute('id', TimeSlider.sliderId);
	var sliderBgDiv = document.createElement('div');
	sliderBgDiv.setAttribute('id', TimeSlider.sliderBgId);
	sliderDiv.appendChild(sliderBgDiv);
	mapElt.appendChild(sliderDiv);
	
	TimeSlider.sliderWidth = sliderBgDiv.offsetWidth;
}

TimeSlider.overrideSpannerMethods = function(spanner){
	spanner.getWidth = function(){
		return this.width;
	}
	
	spanner.setWidth = function(newWidth){
		this.width = newWidth;
		this.thumbElt.style.width = newWidth+'px';
	};
	
	spanner.adjustOtherSliders = function(){
		var startValue  = this.getValue();
		var endValue = this.getValue() + this.getWidth();
		
		this.getSlider('start').setValue(startValue);
		this.getSlider('end').setValue(endValue);
	};
	
	spanner.showLabel = function(){ return true; }
	spanner.hideLabel = function(){ return true; }
}

TimeSlider.prototype.initialize = function(map){
	this.map = map;
	
	var container = document.getElementById(TimeSlider.sliderId);
	
	map.getContainer().appendChild(container);
	return container;
}

TimeSlider.prototype.getDefaultPosition = function(){
	return new GControlPosition(G_ANCHOR_BOTTOM_RIGHT, new GSize(10, 15));
}

TimeSlider.prototype.getSlider = function(name){
	if(name in TimeSlider.sliderNames){
		return this.sliders[TimeSlider.sliderNames[name]];
	}else{
		return false;
	}
}

// Returns whether or not Slider 'num' got the lock
TimeSlider.prototype.getLock = function(num){
	console.log("Getting lock from " + num);
	if(this.hasLock === false){
		this.hasLock = num;
		return true;
	}
	return false;
}

// Returns whether or not Slider 'num' has the lock
TimeSlider.prototype.releaseLock = function(num){
	console.log("Releasing lock from " + num);
	var hadLock = this.hasLock;
	this.hasLock = false;

	return (hadLock === num);
}

TimeSlider.prototype.calculateShift = function(start, end){
	// Scale and shift needed to map values on the slider to human dates
	var max = end.getTime();
	
	this.shift = start.getTime();
	this.scale = (max - shift) / TimeSlider.sliderWidth;
}

TimeSlider.prototype.valueToDate = function(val){
	// pass
	return new Date('12/31/1985');
}

TimeSlider.prototype.hideLabels = function(){
	for(var k in this.sliders){
		this.sliders[k].hideLabel();
	}
}

TimeSlider.prototype.showLabels = function(){
	for(var k in this.sliders){
		this.sliders[k].showLabel();
	}
}

TimeSlider.prototype.adjustLabels = function(){
	for(var k in this.sliders){
		this.sliders[k].adjustLabel();
	}
}

TimeSlider.prototype.doCallback = function(){
	var startValue = this.getSlider('start').getValue();
	var startDate = this.valueToDate(startValue);
	
	var endValue = this.getSlider('end').getValue();
	var endDate = this.valueToDate(endValue);
	
	this.callback(startDate, endDate);
}

/**
 * @class Slider
 */
function Slider(ts, num, name, iLeft, iRight, iTickSize){
	var bgEltId = TimeSlider.sliderBgId;
	var bgElt = document.getElementById(bgEltId);
	
	var thumbEltId = 'slider-thumb-' + name;
	var thumb = document.createElement('div');
	thumb.setAttribute('id', thumbEltId);
	this.thumbElt = thumb;

	// only add labels to the start- and end- sliders
	if(name != "spanner"){
		var label = document.createElement('div');
		label.setAttribute('id', 'slider-label-'+name);
		label.style.visibility = 'hidden'
		this.labelElt = label;
		
		var img = document.createElement('img');
		img.setAttribute('src', 'img/slider.thumb.'+name+'.png');

		thumb.appendChild(label);
		thumb.appendChild(img);
	}
	
	bgElt.appendChild(thumb);

	YAHOO.widget.Slider.call(this, bgEltId, bgEltId, 
            new YAHOO.widget.SliderThumb(thumbEltId, bgEltId, 
                               iLeft, iRight, 0, 0, iTickSize), "horiz");
							   
	this.num = num;
	this.ts = ts;
	
	this.hasLock = false;
}
YAHOO.lang.extend(Slider, YAHOO.widget.Slider);


Slider.prototype.getOtherSlider = function(name){	
	return this.ts.getSlider(name);
}
/** 
 * Called when a slider is being changed.
 * Adjusts the other sliders so that it looks like they are all moving together
 * This method needs to be overwritten by the spanner which uses different logic
 */
Slider.prototype.adjustOtherSliders = function(){
	var startValue = this.getOtherSlider('start').getValue();
	var endValue   = this.getOtherSlider('end').getValue();
	var spanWidth = endValue - startValue;
	var spanCenter = (startValue + endValue)/2;
	
	var spanner = this.getOtherSlider('spanner');
	spanner.setValue(spanCenter-(spanWidth/2));
	spanner.setWidth(spanWidth);
}

Slider.prototype.showLabel = function(){
	this.labelElt.style.visibility = 'visible';
}

Slider.prototype.hideLabel = function(){
	this.labelElt.style.visibility = 'hidden';
}

Slider.prototype.adjustLabelText = function(text){
	if(!text){
		var val = this.getValue();
		var d = this.ts.valueToDate(val);
		text = Util.formatDate(d);
	}
	
	this.labelElt.innerHTML = text;
}

Slider.prototype.initConstraints = {
	// = distance from (0,0) to the start of slider
	left: -25, 
	
	// = distance from (0,0) to the end of the slider
	//    = distance from (0,0) to the start of the slider
	//    + distance from start of slider to end of slider
	right: 360 + 25
};

Slider.prototype.setContraints = function(){ alert("You forgot to implement setConstraints for a slider (" + this.num + ")"); }

/**
 * Callbacks for the Sliders
*/
Slider.prototype.slideStart = function(){
	console.log("Slide started:");
	console.log(this);
	this.hasLock = this.ts.getLock(this.num);
	if(this.hasLock){
		this.ts.showLabels();
		//this.setConstraints();
	}
}

Slider.prototype.slideEnd = function(){
	console.log("Slide end:");
	console.log(this);
	if(this.hasLock){
		this.ts.hideLabels();
	}

	this.hasLock = false;
	var hadLock = this.ts.releaseLock(this.num);
}

Slider.prototype.change = function(offset){
	if(this.hasLock){
		this.adjustOtherSliders();
		
		this.ts.adjustLabels();
		this.ts.doCallback();
	}
}