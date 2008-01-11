<?
/** 
 * search.php
 * Forward-facing API that searches the trusted sites for a given topic
*/
header('Content-type: text/plain');
define('USAGE', 'todo: Usage: ...');

require_once('SearchLayer.php');

// The specific sites' classes
require_once('VishisDatabase.php');

if(!$_REQUEST['query']){
	// todo: real language
	die(USAGE);
}

$query = $_REQUEST['query'];

// For now, the only supported TrustedSite is the Vishis Database
$site = new VishisDatabase();
$result = $site->search($query);

var_dump($result);
//print($result->asJson());

?>