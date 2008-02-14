<?
require_once('SearchLayer.php');

class KmlFile implements TrustedSite{
	public function __construct(){
		// I don't think there is anything that needs to go here
	}

	public function search($url){
		$this->result = new SearchResult();
		
/*
		$topic = new Topic($row);
		$children[] = new Node($row);
		*/

		if (!($fp = fopen($url, "r"))) {
		    die("could not open XML input");
		}

		$this->parse($fp);
		return $this->result;
	}

	public function startElement($parser, $name, $attrs) {
	    global $depth;
	    for ($i = 0; $i < $depth[$parser]; $i++) {
	        echo "  ";
	    }
	    echo "$name\n";
	    $depth[$parser]++;
	}

	public function endElement($parser, $name) {
	    global $depth;
	    $depth[$parser]--;
	}
	
	public function parse($fp){
		$parser = xml_parser_create();
		xml_set_element_handler($parser, 
								array($this, "startElement"), 
								array($this, "endElement")
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