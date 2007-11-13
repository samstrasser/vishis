<?php

$conn = mysql_connect('localhost', 'visualiz', 'bones18');
$db = mysql_select_db('visualiz_vishis', $conn);

$q = "select * from nodes, node_relation ";
$q.= "where nodes.uid = node_relation.to_uid ";
$q.= "and node_relation.from_uid = '29' ";

$r = mysql_query($q);

while($row = mysql_fetch_assoc($r)){
	print $row['uid'].":<br/>";
	foreach($row as $key => $value){
		print "&nbsp;&nbsp;&nbsp;$key => $value<br/>";
	}
	
}

mysql_close($conn);
?>