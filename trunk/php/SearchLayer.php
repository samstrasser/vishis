<?php
/**
 * @class TrustedSite represents a site that vishis trusts to search for historical data
 *
 *  
 */
 
interface TrustedSite{
	// Returns a Search Result
	public function search($query);
}

class SearchResult{
	public function __construct(){
		$this->json = new Services_JSON();
		$this->data = array();
	}

	protected function asJson(){		
		return $this->json->encode($data);
	}
}
?>