<?
require_once('SearchLayer.php');

class VishisDatabase implements TrustedSite{
	public function __construct(){
		$this->conn = false;
		$this->db = false;
		
		$this->connect();
	}
	public function connect(){
		require_once('dbvars.php');
		$this->conn = mysql_connect($host, $user, $pass);
		$this->db = mysql_select_db($db, $this->conn);
	}

	public function disconnect(){
		if($this->conn){
			mysql_close($this->conn);
		}
	}

	public function search($query){
		$result = new SearchResult();
		
		$topic = $this->getTopic($query);
		if(!$topic){ return $result; }
				
		// once there is a match, get all of the Events
		$events = $this->getEvents($topic);
		$topic->addEvents($events);
		
		$result->addTopic($topic);
		return $result;
	}

	private function getTopic($title){
		$dateFields = array('start', 'end');
		$topic = null;
		
		// check if a topic has the exact title
		$q = "select * from nodes where title='$title' limit 1";
		$r = mysql_query($q, $this->conn);
		while($row = mysql_fetch_assoc($r)){
			foreach($row as $key => $val){
				if(in_array($key, $dateFields)){
					$row[$key] = HistoricalDate::sqlToJs($val);
				}
			}
			$topic = new Topic($row);
		}
		
		// if there's no exact message, check for similar matches
		// todo: %like%

		// if there's still no match, return a null result
		
		return $topic;
	}
	
	private function getEvents($topic){
		$eventFields = array('title', 'location', 'start', 'end');
		$markerFields = array('lat', 'lng');
		$dateFields = array('start', 'end');
	
		$events = array();
		$marker = false;
		
		$uid = $topic->getField('uid');
		
		$q = "select * from nodes, node_relations ";
		$q.= "where nodes.uid = node_relations.to_uid ";
		$q.= "and node_relations.from_uid = '$uid' ";
		
		$r = mysql_query($q, $this->conn);
		while($row = mysql_fetch_assoc($r)){
			$e = new Event();
			
			// We know there will be a marker since polygons are not supported
			$m = new Marker();
			
			foreach($row as $key => $val){
				if(in_array($key, $dateFields)){
					$val = HistoricalDate::sqlToJs($val);
				}
			
				if(in_array($key, $eventFields)){
					$e->addField($key, $val);
				}
				if(in_array($key, $markerFields)){
					$m->addField($key, $val);
				}
			}
			$m->addField('coords', array($m->getField('lng'), $m->getField('lat')));
			
			$e->addMarker($m);
			$events[] = $e;
		}
		return $events;
	}
}

?>