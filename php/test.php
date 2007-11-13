<?php
//header('Content-type: application/json');

$what = $_REQUEST['what'];


$conn = mysql_connect('localhost', 'visualiz', 'bones18');
$db = mysql_select_db('visualiz_vishis', $conn);

$q = "SELECT * FROM nodes";
$r = mysql_query($q);
while($row = mysql_fetch_assoc($r)){
	//print_r($row);
}


mysql_close($conn);
?>