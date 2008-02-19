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
			$results[] = $t->toJsonObj();
		}
		return $this->json->encode($results);
	}
}

class Node{

	public function __construct($fields = array()){
		$this->addFields($fields);
	}
	
	public function getId(){
		return $this->getField('uid');
	}
	
	public function appendToField($key, $value){
		$old = $this->deleteField($key);
		if($old === false){
			// val didn't use to exist, so add it
			$this->addField($key, array($value));
		}elseif(!is_array($old)){
			// if its' not an array, make it one
			$this->addField($key, array($old, $value));
		}else{
			$this->addField($key, array_push($old, $value));
		}
	}
	
	public function addFields($keyvals){
		foreach($keyvals as $key => $val){
			$this->addField($key, $val);
		}
	}
	
	public function addField($key, $value){
		$this->fields[$key] = $value;
	}
	
	public function getField($key){
		if(array_key_exists($key, $this->fields)){
			return $this->fields[$key];
		}else{
			return false;
		}
	}
	
	public function deleteField($key){
		$old = $this->getField($key);
		
		if(isset($this->fields[$key])){
			unset($this->fields[$key]);
		}
		
		return $old;
	}
	
	// Convert the function to PHP objects that will be passable to the JSON-ifier
	public function toJsonObj(){
		$pieces = array();
		foreach($this->fields as $field => $val){
			$pieces[$field] = $val;
		}
		return $pieces;
	}
}

class Topic extends Node{
	private $events = array();
	private $nextEventId = 0;
	
	public function addEvent(Event $e){
		// todo: figure out indexing
		$this->events[] = $e;
	}
	
	public function addEvents($events){
		foreach($events as $e){
			$this->addEvent($e);
		}
	}
	
	public function toJsonObj(){
		// do the parent stuff,
		$pieces = parent::toJsonObj();
		
		// then save all the events
		$pieces['events'] = array();
		foreach($this->events as $e){
			// todo: calculate bounds
			
			// todo: calculate start, end times

			// "Inherit" downward
			$e->addField('color', $this->getField('color'));
		
			$pieces['events'][] = $e->toJsonObj();
		}
		
		return $pieces;
	}
	
	private function getNextEventId(){
		return $this->nextEventId++;
	}
}

class Event extends Node {
	public function addMarker(Marker $marker){
		$this->addField('marker', $marker);
	}
	
	public function addPolygon(Polygon $polygon){
		$this->appendToField('polygons', $polygon);
	}
	
	public function toJsonObj(){
		// Delete the Objects so they don't get encoded twice
		$marker = $this->deleteField('marker');
		$polygons = $this->deleteField('polygons');
	
		// do the parent stuff,
		$pieces = parent::toJsonObj();
		
		// 'Inherit" down
		$marker->addField('title', $this->getField('title'));
		$pieces['marker'] = $marker->toJsonObj();
		
		if($polygons === false){
			$polygons = array();
		}
		
		$pieces['polygons'] = array();
		foreach($polygons as $polygon){
			// "inherit" downward
			$polygon->addField('title', $this->getField('title'));
			$polygon->addField('color', $this->getField('color'));
			
			$pieces['polygons'][] = $polygon->toJsonObj();
		}
		
		return $pieces;
	}

}

class Marker extends Node {}

class Polygon extends Node {
	public function addCoordinate($coordPair){
		$this->appendToField('coords', $coordPair);
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
	
	/** KML dates can be many things
	* Specifies a single moment in time. The value is a dateTime, which can be one of the following:
	* gYear (YYYY)
	* gYearMonth (YYYY-MM)
	* date (YYYY-MM-DD)
	* dateTime (YYYY-MM-DDThh:mm:ssZ)
	* dateTime (YYYY-MM-DDThh:mm:sszzzzzz)
	* see: http://code.google.com/apis/kml/documentation/kml_tags_21.html#timestamp
	*/
	public static function kmlToJs($date) {
		$len = strlen($date);
		if($len == 4){ // YYYY
			$yy = $date;
			$mm = '06';
			$dd = '15';
		}elseif($len == 7){ // YYYY-MM
			$datePieces = explode('-', $date);
			$yy = $datePieces[0];
			$mm = $datePieces[1];
			$dd = '15';
		}elseif($len == 10){ // YYYY-MM-DD
			$datePieces = explode('-', $date);
			$yy = $datePieces[0];
			$mm = $datePieces[1];
			$dd = $datePieces[2];
		}elseif($len == 20){ // YYYY-MM-DDThh:mm:ssZ
			// todo: support time zones
			$datetime = explode('T', $date);
			$datePieces = explode('-', $datetime[0]);
			$yy = $datePieces[0];
			$mm = $datePieces[1];
			$dd = $datePieces[2];
				
			$time = substr($datetime[1], 0, 8);
		}elseif($len == 25){ // YYYY-MM-DDThh:mm:sszzzzzz
			// todo: support time zones
			$datetime = explode('T', $date);
			$datePieces = explode('-', $datetime[0]);
			$yy = $datePieces[0];
			$mm = $datePieces[1];
			$dd = $datePieces[2];
				
			$time = substr($datetime[1], 0, 8);
		}else{
			//todo: Warning: weird date
			return '';
		}

		
		return "$mm/$dd/$yy $time";
    }
}
?>