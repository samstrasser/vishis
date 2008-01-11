<?php
/**
 * @class TrustedSite represents a site that vishis trusts to search for historical data
 *
 *  
 */
 
require_once('JSON.php');
 
interface TrustedSite{
	// @return {SearchResult} result of the query
	public function search($query);
	
	// Assumes the $query exists
	// public function get($query);
}

class SearchResult{
	public function __construct(){
		$this->json = new Services_JSON();
		$this->topics = array();
	}
	
	public function addTopic($t){
		$this->topics[$t->getId()] = $t;
	}
	
	public function numResults(){
		return count($this->topics);
	}

	protected function asJson(){		
		return $this->json->encode($data);
	}
	
	protected function asHtml(){
		// pass
		return "";
	}
}

class Node{
	private $fields = array();
	private $blurb;
	
	public function __construct($fields){
		foreach($fields as $key => $value){
			$this->fields[$key] = $value;
		}
		
		$this->blurb = new Blurb();
	}
	
	public function getId(){
		if(array_key_exists('uid', $this->fields)){
			return $this->fields['uid'];
		}else{
			// todo: error
			return -1;
		}
	}
}

class Topic extends Node{
	private $children = array();
	
	public function __construct($fields){
		parent::__construct($fields);
	}
	
	public function addChild(Node $node){
		$this->children[$node->getId()] = $node;
	
	}
	
	public function addChildren($children){
		foreach($children as $child){
			$this->addChild($child);
		}
	}
}

class Blurb{
	private $pieces = array();
}

// Useful for converting between all the formats 
// e.g. mysql, php, javascript
class Date{
	private $pieces = array();
	
	public function __construct($dateString, $format='mysql'){
		$this->dateString = $dateString;
	}
	
	public function asJavascriptString(){
	
	}
	
	public function asPhpTimestamp(){
	
	}
}
?>