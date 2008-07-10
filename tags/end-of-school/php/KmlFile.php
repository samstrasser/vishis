<?
require_once('SearchLayer.php');

class KmlFile implements TrustedSite{
	const tag_topic 	= 'DOCUMENT';
	const tag_event 	= 'PLACEMARK';
	const tag_title 	= 'NAME';
	const tag_start 	= 'BEGIN';
	const tag_end 		= 'END';
	const tag_blurb		= 'DESCRIPTION';
	const tag_point		= 'POINT';
	const tag_polygon	= 'POLYGON';
	const tag_coords 	= 'COORDINATES';
	
	const nodetype_topic 	= 'topic';
	const nodetype_event 	= 'event';
	const nodetype_marker 	= 'marker';
	const nodetype_polygon 	= 'polygon';
	
	private $curr = array();

	public function __construct(){
		// I don't think there is anything that needs to go here
	}

	public function search($url){
		$this->result = new SearchResult();

		/* $this->depth = array();*/

		$this->parseFile($url);
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
			$this->curr[self::nodetype_topic] = new Topic();
		}elseif($name == self::tag_event){
			$this->curr[self::nodetype_event] = new Event();			
		// Create a Marker every time you create an event // }elseif($name == self::tag_marker){
			$this->curr[self::nodetype_marker] = new Marker();
		}elseif($name == self::tag_polygon){
			$this->curr[self::nodetype_polygon] = new Polygon();
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
			$this->result->addTopic($this->curr[self::nodetype_topic]);
		}elseif($name == self::tag_event){
			$this->curr[self::nodetype_event]->addMarker($this->curr[self::nodetype_marker]);
			$this->curr[self::nodetype_topic]->addEvent($this->curr[self::nodetype_event]);
		}elseif($name == self::tag_polygon){
			$this->curr[self::nodetype_event]->addPolygon($this->curr[self::nodetype_polygon]);
		}else{
			// For now, we are going to ignore all other tags
		}
	}
	
	private function elementData($parser, $data){
		$data = trim($data);
		
		// Take care of special tags
		if($this->currTag == self::tag_title){	
			$field = 'title';
			if(in_array(self::tag_event, $this->tagStack)){
				$nodeType = self::nodetype_event;
			}else{
				$nodeType = self::nodetype_topic;
			}
		}elseif($this->currTag == self::tag_coords){
			$field = 'coords';
			$data = $this->parseCoordinateList($data);
			if(in_array(self::tag_point, $this->tagStack)){
				$nodeType = self::nodetype_marker;
				$data = $data[0];
			}elseif(in_array(self::tag_polygon, $this->tagStack)){
				$nodeType = self::nodetype_polygon;
			}
		}elseif($this->currTag == self::tag_start){
			$nodeType = self::nodetype_event;
			$field = 'start';
			$data = HistoricalDate::kmlToJs($data);
		}elseif($this->currTag == self::tag_end){
			$nodeType = self::nodetype_event;
			$field = 'start';
			$data = HistoricalDate::kmlToJs($data);
		}elseif($this->currTag == self::tag_blurb){
			$nodeType = self::nodetype_event;
			$field = 'blurb';
		}else{
			// For now, we are going to ignore all other tags
		}
		
		if($nodeType && $field && $data){	
			$this->curr[$nodeType]->addField($field, $data);
		}
	}
	
	private function parseCoordinateList($data){
		$list = array();
		$coords = explode("\n", trim($data));
		
		foreach($coords as $coord){
			$coordPair = trim($coord);
			if($coordPair){
				$latlng = explode(',', $coordPair);
				array_push($list, $latlng);
			}
		}
		return $list;
	}
	
	private function parseFilePointer($fp){
		$this->tagStack = array();
		
		$this->curr = array(
			nodetype_topic	 => false,
			nodetype_event	 => false,
			nodetype_marker	 => false,
			nodetype_polygon => false
		);
		
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
	
	private function parseFile($uri){
		$this->tagStack = array();
		
		$this->curr = array(
			nodetype_topic	 => false,
			nodetype_event	 => false,
			nodetype_marker	 => false,
			nodetype_polygon => false
		);
		
		$parser = xml_parser_create();
		xml_set_element_handler($parser, 
								array($this, "startElement"), 
								array($this, "endElement")
								);
		xml_set_character_data_handler($parser, 
								array($this, "elementData")
								);

		if (!xml_parse($parser, file_get_contents($uri), true)){ 
			// todo: die gracefully
		}
		xml_parser_free($parser);
	}

}
?>