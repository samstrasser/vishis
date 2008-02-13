/**
 * slider.js
 */
 
/**
 * @class TimeSlider
 */
function TimeSlider(mapElt, cbFunc, cbObj){
	// Construct the GControl first
	GControl.call(this);

	TimeSlider.createSliderInDom(mapElt);
	
	this.hasLock = false;
	this.cbFunc = cbFunc;
	this.cbObj = cbObj;
	this.sliders = new Array(3);
	
	var startInitPos = TimeSlider.bgOffsetStart;
	var spannerInitPos = startInitPos + Slider.width;
	var endInitPos = spannerInitPos + Spanner.minWidth;


	// Create the sliders //
	for(var name in TimeSlider.sliderNames){
		var num = TimeSlider.sliderNames[name];
		if(name == 'spanner'){// if it's the spanner, create an instance of the the subclassed object 
			this.sliders[num] = 
				new Spanner(this, num, name, -TimeSlider.bgOffsetStart, TimeSlider.bgWidth);
		}else{
			this.sliders[num] = new 
				Slider(this, num, name, -TimeSlider.bgOffsetStart, TimeSlider.bgWidth);
		}
		
        this.sliders[num].subscribe("change", function(offset) {
			this.change(offset);
		});

        this.sliders[num].subscribe("slideStart", function() {
			this.slideStart();
		});

        this.sliders[num].subscribe("slideEnd", function() {
			this.slideEnd();
		});
	}
	
	// Override setConstraints for each of the sliders
	this.getSlider('start').setConstraints = function(){
		var end = this.getOtherSlider('end');
		
		var left = this.initConstraints.left;
		var right = end.getValue() - this.getWidth() - Spanner.minWidth;
		
		this.thumb.setXConstraint(left, right);
	};
	this.getSlider('start').setValueSilently(startInitPos);
		
	this.getSlider('end').setConstraints = function(){
		var start = this.getOtherSlider('start');
		
		var left = -1 * (start.getValue() + start.getWidth() + Spanner.minWidth);
		var right = this.initConstraints.right - this.getWidth();
		
		this.thumb.setXConstraint(left, right);
	};
	this.getSlider('end').setValueSilently(endInitPos);
	
	this.getSlider('spanner').setConstraints = function(){
		var end = this.getOtherSlider('end');
		
		var left = this.getOtherSlider('start').initConstraints.left;
		var right = end.initConstraints.right - end.getWidth() - this.getWidth();
		
		this.thumb.setXConstraint(left, right);
	};
	this.getSlider('spanner').setValueSilently(spannerInitPos);
	this.getSlider('spanner').setWidth(endInitPos - startInitPos);

}
YAHOO.lang.extend(TimeSlider, GControl);
TimeSlider.bgOffsetStart = 5;
TimeSlider.bgOffsetEnd = 244;
TimeSlider.bgArrowStart = 250;
TimeSlider.bgWidth = 275;
TimeSlider.bgClickableWidth = TimeSlider.bgOffsetEnd - TimeSlider.bgOffsetStart - 5; 
// todo: 5 = 2 * distance to the center of each slider, which isn't in the scope yet

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
	if(this.hasLock === false){
		this.hasLock = num;
		return true;
	}
	return false;
}

// Returns whether or not Slider 'num' has the lock
TimeSlider.prototype.releaseLock = function(num){
	var hadLock = this.hasLock;
	this.hasLock = false;

	return (hadLock === num);
}

TimeSlider.prototype.calculateShift = function(start, end){
	// Scale and shift needed to map values on the slider to human dates
	var max = end.getTime();
	
	this.shift = start.getTime();
	this.scale = (max - this.shift) / TimeSlider.bgClickableWidth;

}

TimeSlider.prototype.valueToDate = function(val){
	var shiftToZero = val - TimeSlider.bgOffsetStart
	var time = (shiftToZero * this.scale) + this.shift;

	return new Date(time);
}

TimeSlider.prototype.clearAllConstraints = function(){
	for(var i in this.sliders){
		// This isn't a good way to do this since we have to get into the API
		this.sliders[i].thumb.constrainX = false;
	}
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
	
	this.cbFunc.call(this.cbObj, startDate, endDate);
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
	// Slider should not move when the bg is clicked
	this.backgroundEnabled = false;
	
	// It would be nice to animate but the sliders arne't updated fast enough
	this.animate = false;
							   
	this.num = num;
	this.ts = ts;
	this.width = Slider.width;
	
	this.hasLock = false;
}
YAHOO.lang.extend(Slider, YAHOO.widget.Slider);
Slider.width = 5;

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
	spanner.setWidth(spanWidth);
	spanner.setValueSilently(spanCenter-(spanWidth/2));
}

Slider.prototype.showLabel = function(){
	this.labelElt.style.visibility = 'visible';
}

Slider.prototype.hideLabel = function(){
	this.labelElt.style.visibility = 'hidden';
}

Slider.prototype.adjustLabel = function(text){
	if(!text){
		var val = this.getValue();
		var d = this.ts.valueToDate(val);
		text = Util.formatDate(d);
	}
	
	this.labelElt.innerHTML = text;
}

Slider.prototype.setValueSilently = function(newOffset){
	//  boolean setValue  ( newOffset , skipAnim , force , silent )
	this.setValue(newOffset, true, false, true);
}

Slider.prototype.getWidth = function(){
	return this.width;
}

Slider.prototype.initConstraints = {
	// = distance from (0,0) to the start of slider
	left: -TimeSlider.bgOffsetStart, 
	
	// = distance from (0,0) to the end of the slider
	//    = distance from (0,0) to the start of the slider
	//    + distance from start of slider to end of slider
	right: TimeSlider.bgOffsetEnd
};

Slider.prototype.setConstraints = function(){ alert("You forgot to implement setConstraints for a slider (" + this.num + ")"); }

/**
 * Callbacks for the Sliders
*/
Slider.prototype.slideStart = function(){
	this.hasLock = this.ts.getLock(this.num);
	if(this.hasLock){
		this.ts.showLabels();
		
		// Clear all the constraints and impose the constraints manually
		this.ts.clearAllConstraints();
		this.setConstraints();
	}
}

Slider.prototype.slideEnd = function(){
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

/**
 * @class Spanner
 */
function Spanner(ts, num, name, iLeft, iRight, iTickSize){
	Slider.call(this, ts, num, name, iLeft, iRight, iTickSize);
	
	// The Spanner is the only one that should react to bg clicks
	this.backgroundEnabled = true;
}
YAHOO.lang.extend(Spanner, Slider);
Spanner.minWidth = 10;

Spanner.prototype.setWidth = function(newWidth){
	this.width = newWidth;
	this.thumbElt.style.width = newWidth+'px';
	
	// Set the center point since the width has changed
	this.setThumbCenterPoint();
};


Spanner.prototype.adjustOtherSliders = function(){
	var startValue  = this.getValue();
	var endValue = this.getValue() + this.getWidth();

	this.getOtherSlider('start').setValueSilently(startValue);
	this.getOtherSlider('end').setValueSilently(endValue);
};

// Spanner's do not have labels
Spanner.prototype.showLabel = function(){}
Spanner.prototype.hideLabel = function(){}
Spanner.prototype.adjustLabel = function(){}