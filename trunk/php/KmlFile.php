<?
require_once('SearchLayer.php');

class KmlFile implements TrustedSite{
	const tag_topic 	= 'DOCUMENT';
	const tag_event 	= 'PLACEMARK';
	const tag_title 	= 'NAME';
	const tag_start 	= 'BEGIN';
	const tag_end 		= 'END';
	const tag_point		= 'POINT';
	const tag_polygon	= 'POLYGON';
	const tag_coords 	= 'COORDINATES';

	public function __construct(){
		// I don't think there is anything that needs to go here
	}

	public function search($url){
		$this->result = new SearchResult();

		if (!($fp = fopen($url, "r"))) {
		    die("could not open XML input");
		}

		$this->depth = array();

		$this->parse($fp);
		return $this->result;
	}

	private function startElement($parser, $name, $attrs) {
		/*
		for ($i = 0; $i < $this->depth[$parser]; $i++) {
	        echo "  ";
	    }
	    echo "$name\n";
	    $this->depth[$parser]++;
		*/
	
		array_push($this->tagStack, $name);
		
		if($name == self::tag_topic){
			$this->currTopic = new Topic();
		}elseif($name == self::tag_event){
			$this->currEvent = new Node();			
		}else{
			// Remember which tag this is, so when we get data, we can interpret it properly
			$this->currTag = $name;
		}
	}

	private function endElement($parser, $name) {
		//
		// $this->depth[$parser]--;
		//
		
		$last = array_pop($this->tagStack);
		// $last == $name // sanity check
		
		if($name == self::tag_topic){
			$this->result->addTopic($this->currTopic);
		}elseif($name == self::tag_event){
			$this->currTopic->addChild($this->currEvent);
			//$this->currEvent = false;
		}else{
			// For now, we are going to ignore all other tags
		}
	}
	
	private function elementData($parser, $data){
		if($this->currTag == self::tag_title){
			$title = trim($data);
			
			// Is this the Event's title?
			if(in_array(self::tag_event, $this->tagStack)){
				$this->currEvent->addField('title', $title);
			}else{
				$this->currTopic->addField('title', $title);
			}
		}elseif($this->currTag == self::tag_start){
			$dateString = trim($data);
			$this->currEvent->addField('start', HistoricalDate::kmlToJs($dateString));
		}elseif($this->currTag == self::tag_end){
			$dateString = trim($data);
			$this->currEvent->addField('end', HistoricalDate::kmlToJs($dateString));
		}elseif($this->currTag == self::tag_coords){
			// make sure this is a point ( since we aren't supporting polygons yet)
			if(in_array(self::tag_point, $this->tagStack)){
				$coordPair = trim($data);
				$latlng = explode(',', $coordPair);
				$this->currEvent->addField('lng', $latlng[0]);
				$this->currEvent->addField('lat', $latlng[1]);
			}elseif(in_array(self::tag_polygon, $this->tagStack)){
				$coords = explode("\n", trim($data));
				foreach($coords as $coord){
					$coordPair = trim($coord);
					$latlng = explode(',', $coordPair);
					$this->currEvent->addField('lng', $latlng[0]);
					$this->currEvent->addField('lat', $latlng[1]);
				}
			
			}
		}else{
			// For now, we are going to ignore all other tags
		}
	}
	
	private function parse($fp){
		$this->tagStack = array();
		
		$parser = xml_parser_create();
		xml_set_element_handler($parser, 
								array($this, "startElement"), 
								array($this, "endElement")
								);
		xml_set_character_data_handler($parser, 
								array($this, "elementData")
								);

		while ($data = fread($fp, 4096)) {
		    if (!xml_parse($parser, $data, feof($fp))) {
				// todo: die gracefully
		        die(sprintf("XML error: %s at line %d",
		                    xml_error_string(xml_get_error_code($parser)),
		                    xml_get_current_line_number($parser)));
		    }
		}
		xml_parser_free($parser);
	}
}
?>