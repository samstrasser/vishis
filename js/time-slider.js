function TimeSlider(){
	slider2 = YAHOO.widget.Slider.getHorizSlider("sliderbg", "sliderthumb2", -10, 300, 10);
	slider2.backgroundEnabled = false;
	slider2.subscribe("change", TimeSlider.adjustSlider);
	//slider2.setValue(80,true);

	slider = YAHOO.widget.Slider.getHorizSlider("sliderbg", "sliderthumb",  0, 290, 10); 
	slider.backgroundEnabled = false;
	slider.subscribe("change", TimeSlider.adjustSlider); 	
	//slider.setValue(60,true);
}

TimeSlider.adjustSlider = function(offset){
	var width = slider2.thumb.getValue() - slider.thumb.getValue();
	if (width >= 0){
		var spanner = document.getElementById('spanner');
		spanner.style.left = (10+slider.thumb.getValue()) + 'px';
		spanner.style.width = width+'px';
	} else {
		var other;
		if(this.thumb.id == "sliderthumb2") {
			slider.setValue(offset, true);
		} else {
			slider2.setValue(offset, true);
		}
	}
	
	
}

TimeSlider.s2 = function(offset){
	slider2.setValue(100);
}

var timeslider = null;
function init(){
	timeslider = new TimeSlider();
}

