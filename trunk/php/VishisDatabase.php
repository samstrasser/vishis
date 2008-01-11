<?
require_once('SearchLayer.php');

// todo: check the scope of this
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
				
		// once there is a match, get all of the children
		$children = $this->getChildren($topic);
		$topic->addChildren($children);
		
		$children = array(); // so we don't enter the loop, for now
		
		
		foreach($children as $uid => $child){
			// get all the blurb pieces
			$blurbPieces = $this->getBlurb($uid);
			
			// add the blurb pieces to the child
			
			// add the child to the topic
		}			
		
		$result->addTopic($topic);
		return $result;
	}

	private function getTopic($title){
		$topic = null;
		
		// check if a topic has the exact title
		$q = "select * from nodes where title='$title' limit 1";
		$r = mysql_query($q, $this->conn);
		while($row = mysql_fetch_assoc($r)){
			$topic = new Topic($row);
		}
		
		// if there's no exact message, check for similar matches
		// todo: %like%

		// if there's still no match, return a null result
		return $topic;
	}
	
	private function getChildren($topic){
		$children = array();
		
		$uid = $topic->getId();
		
		$q = "select * from nodes, node_relations ";
		$q.= "where nodes.uid = node_relations.to_uid ";
		$q.= "and node_relations.from_uid = '$uid' ";
		
		$r = mysql_query($q, $this->conn);
		while($row = mysql_fetch_assoc($r)){
			$children[] = new Node($row);
		}
		return $children;
	}
	
	/**
	* @param {int} the uid of the node whose blurb to get
	* @return {Array} the node's blurb, in pieces
	*/
	private function getBlurb($nodeId){
		
	}

}

?>