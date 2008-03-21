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
		if(mysql_num_rows($r) == 1){
			// found the topic
			$row = mysql_fetch_assoc($r);
			foreach($row as $key => $val){
				if(in_array($key, $dateFields)){
					$row[$key] = HistoricalDate::sqlToJs($val);
				}
			}
			$topic = new Topic($row);
			
			// get the start and end of the topic in SQL, which will be much easier
			$nid = $topic->getField('nid');
			$q = "select start from nodes, node_relations ";
			$q.= "where nodes.nid = node_relations.to_nid ";
			$q.= "and node_relations.from_nid = '$nid' ";
			$q.= "order by start asc limit 1";
			$r = mysql_query($q);
			$row = mysql_fetch_assoc($r);
			$topic->addField('start', HistoricalDate::sqlToJs($row['start']));

			$nid = $topic->getField('nid');
			$q = "select end from nodes, node_relations ";
			$q.= "where nodes.nid = node_relations.to_nid ";
			$q.= "and node_relations.from_nid = '$nid' ";
			$q.= "order by end desc limit 1";
			$r = mysql_query($q);
			$row = mysql_fetch_assoc($r);
			$topic->addField('end', HistoricalDate::sqlToJs($row['end']));
			
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
		
		$nid = $topic->getField('nid');
		
		$q = "select * from nodes, node_relations ";
		$q.= "where nodes.nid = node_relations.to_nid ";
		$q.= "and node_relations.from_nid = '$nid' ";
		
		$eventsRes = mysql_query($q, $this->conn);
		while($node = mysql_fetch_assoc($eventsRes)){
			$e = new Event();
			
			foreach($node as $key => $val){
				if(in_array($key, $dateFields)){
					$val = HistoricalDate::sqlToJs($val);
				}
			
				if(in_array($key, $eventFields)){
					$e->addField($key, $val);
				}
			}
			
			// Try to find a blurb for this Event
			$eid = $node['nid'];
			$q = "select blurb_html from node_blurbs where nid='$eid' limit 1;";
			$r = mysql_query($q, $this->conn);
			if(mysql_num_rows($r) == 1){ // found a blurb for this Event
				$blurbRow = mysql_fetch_assoc($r);
				
				$blurbHtml = $blurbRow['blurb_html'];
				$e->addField('blurbHtml', $blurbHtml);
			}
			
			// Try to find a Marker for this Event
			$loc = $e->getField("location");
			// assert($loc !== false);
			$q = "select lat, lng from locations where location='$loc' limit 1;";
			$r = mysql_query($q, $this->conn);
			if(mysql_num_rows($r) == 1){ // found a Marker for this Event
				$mRow = mysql_fetch_assoc($r);
				
				$m = new Marker();
				$latlng = array($mRow['lng'], $mRow['lat']);
				$m->addField('coords', $latlng);
			
				$e->addMarker($m);
			}
			
			// Try to find Polygon(s) for this marker
			if(false){ // todo
			
			}
			$events[] = $e;
		}
		return $events;
	}
}

?>