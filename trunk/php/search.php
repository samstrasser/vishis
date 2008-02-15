<?
/** 
 * search.php
 * Forward-facing API that searches the trusted sites for a given topic
*/
//header('Content-type: text/plain');
define('USAGE', 'todo: Usage: ...');

require_once('SearchLayer.php');

// The specific sites' classes
require_once('VishisDatabase.php');
require_once('KmlFile.php');

if(!$_REQUEST['q']){
	// todo: real language
	die(USAGE);
}

$query = $_REQUEST['q'];

// todo: have a smarter way of figuring out which type the query is
if(substr($query, 0, 7) == 'http://'){
	$site = new KmlFile();
}else{
	$site = new VishisDatabase();
}

$result = $site->search($query);
print($result->toJson());

?>