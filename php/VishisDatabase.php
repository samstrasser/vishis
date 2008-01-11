<?
// todo: check the scope of this
require_once('dbvars.php');

class VishisDatabase implements TrustedSite{
	public function __construct(){
		$this->conn = false;
		$this->db = false;
		
		$this->connect();
	}
	public function connect(){
		$this->conn = mysql_connect($host, $user, $pass);
		$this->db = mysql_select_db($db, $conn);
	}

	public function search($query){
		$result = new SearchResult();
		// check if a topic has the exact title
		
		// if there's no exact message, check for similar matches
		
		// if there's still no match, return an empty result
		if(false){
			return NO_RESULT;
		}
		
		// once there is a match, get all of the children
		
		// for each of the children
			// get all the blurb pieces
		
		return $result;
	}

	public function disconnect(){
		if($this->conn){
			mysql_close($this->conn);
		}
	}

}


?>