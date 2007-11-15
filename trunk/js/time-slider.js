var slider2;
var slider; 

function figureValues(offset) {
	var width = slider2.thumb.getValue() - slider.thumb.getValue();
	if (width >= 0){
		var spanner = document.getElementById('spanner');
		spanner.style.left = (10+slider.thumb.getValue()) + 'px';
		spanner.style.width = width+'px';
	} else {
		var other;
		if(this.thumb.id == "sliderthumb2") {
			other = slider;
			slider.setValue(offset, true);
		} else {
			other = slider2;
			slider2.setValue(offset, true);
		}
		//other.setValue(this.getValue(), true);
	}
	document.getElementById('txtStart').value = timeFormat(Math.ceil(slider.getValue()/10)/2+7);
	document.getElementById('txtEnd').value = timeFormat(Math.ceil(slider2.getValue()/10)/2+7);
}

function timeFormat(t) {
	var ap = 'am';
	if (t >= 12) { t = (t<13)?t:t - 12; ap = 'pm';}
	var ft =  (Math.floor(t) == t)?t+':00'+ap:Math.floor(t)+':30'+ap;
	return ft;
}

function init() {
	// setup sliders
	slider2 = YAHOO.widget.Slider.getHorizSlider("sliderbg", "sliderthumb2", -10, 300, 10);
	slider2.backgroundEnabled = false;
	slider2.subscribe("change", figureValues);
	slider2.setValue(80,true);

	slider = YAHOO.widget.Slider.getHorizSlider("sliderbg", "sliderthumb",  0, 290, 10); 
	slider.backgroundEnabled = false;
	slider.subscribe("change", figureValues); 	
	slider.setValue(60,true);
	
}

