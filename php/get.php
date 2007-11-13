<?php
//header('Content-type: application/json');

$what = $_REQUEST['what'];
$output = $_REQUEST['output'];
$type = $_REQUEST['type'];
$nid = $_REQUEST['nid'];

$conn = mysql_connect('localhost', 'visualiz', 'bones18');
$db = mysql_select_db('visualiz_vishis', $conn);

if($type == 'nodelist'){
	if($what == 'children'){
		$q = "select * from nodes, node_relation ";
		$q.= "where nodes.uid = node_relation.to_uid ";
		$q.= "and node_relation.from_uid = '$nid' ";

		$r = mysql_query($q);
		
		print "[";
		
		$nodes = array();
		while($row = mysql_fetch_assoc($r)){
			$properties = array();
			foreach($row as $key => $value){
				if($key == "start_date" || $key == "end_date"){
					// SQL dates in YYYY-MM-DD
					$pieces = explode(" ", $value); // get rid of time
					
					$value = $pieces[0];
					$pieces = explode("-",$value);
					$yr = $pieces[0];
					$mo = $pieces[1];
					$da = $pieces[2];
					
					// JavaScript dates in MM/DD/YYYY
					$val = "new Date(\"$mo/$da/$yr\")";
					//$val = "$mo/$da/$yr";
				}else{
					$val = $value;
					$val = str_replace('"', "'",$val);
					$val = str_replace ("\r\n", " ", $val);
					$val = str_replace("'", "\'", $val);
					$val = '"' . $val . '"';
				}
				$properties[] = "\"".$key.'": '. $val;

			}
			$nodes[] = "{ " . implode($properties, ",") . "}";
		}
		
		print implode($nodes, ",");
		print "]";
	}
}elseif($type == 'node'){
	if($what == 'node'){
		$q = "select * from nodes where uid = '$nid' limit 1 ";
		$r = mysql_query($q);
		$row = mysql_fetch_assoc($r);
		
		$properties = array();
		foreach($row as $key => $value){
			if($key == "start_date" || $key == "end_date"){
				// SQL dates in YYYY-MM-DD
				$pieces = explode(" ", $value); // get rid of time
				
				$value = $pieces[0];
				$pieces = explode("-",$value);
				$yr = $pieces[0];
				$mo = $pieces[1];
				$da = $pieces[2];
				
				// JavaScript dates in MM/DD/YYYY
				$val = "new Date(\"$mo/$da/$yr\")";
				//$val = "$mo/$da/$yr";
			}else{
				$val = $value;
				$val = str_replace('"', "'",$val);
				$val = str_replace ("\r\n", " ", $val);
				$val = str_replace("'", "\'", $val);
				$val = '"' . $val . '"';
			}
			$properties[] = "\"".$key.'": '. $val;
		}
		print "({ " . implode($properties, ",") . "})";
	}
}

mysql_close($conn);
?>