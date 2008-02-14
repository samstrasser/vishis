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

	public function toJson(){
		$results = array();
		foreach($this->topics as $t){
			$results[] = $t->toJson();
		}
		return $this->json->encode($results);
	}
}

class Node{
	/*
	 ** Fields (from the sql table)
		 uid
		title
		location
		lat
		lng
		start
		end 
		type
		color
	**/
	private $fields = array();
	private $blurb;
	
	public function __construct($fields){
		foreach($fields as $key => $value){
			if($key == 'start' || $key == 'end'){
				// todo: if end doesn't exist, end = today
			
				// convert dates to a string that JavaScript will understand
				// mm/dd/yyyy hh:mm:ss
				$this->fields[$key] = HistoricalDate::sqlToJs($value);
			}else{
				$this->fields[$key] = $value;
			}
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
	
	public function toJson(){
		$pieces = array();
		foreach($this->fields as $field => $val){
			$pieces[$field] = $val;
		}
		return $pieces;
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
	
	public function toJson(){
		// do the parent stuff,
		$pieces = parent::toJson();
		
		// then save all the children
		$pieces['children'] = array();
		foreach($this->children as $child){
			$pieces['children'][] = $child->toJson();
		}
		
		return $pieces;
	}
}

class Blurb{
	private $pieces = array();
	
	public function toJson(){
	
	}
}

// Useful for converting between all the formats 
// e.g. mysql, php, javascript
class HistoricalDate{
	public static function sqlToJs($date) {
		// yyyy-mm-dd hh:mm:ss
		$datetime = explode(' ', $date);
		$datePieces = explode('-', $datetime[0]);
		$yy = $datePieces[0];
		$mm = $datePieces[1];
		$dd = $datePieces[2];
		
		$time = $datetime[1];
		
		return "$mm/$dd/$yy $time";
    }
}
?>