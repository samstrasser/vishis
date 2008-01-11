<?php
/**
 * @class TrustedSite represents a site that vishis trusts to search for historical data
 *
 *  
 */

define('NO_RESULT', '[]');
 
abstract class TrustedSite{
	public function __construct($url);
	public function search($query);

	public function disconnect();
	public function connect($url);
	
	protected function encode($data){
		if(!$data){
			$data = $this->data;
		}
		
		if(!$this->json){
			$this->json = new Services_JSON();
		}
		return $this->json->encode($data);
	}
}
?>