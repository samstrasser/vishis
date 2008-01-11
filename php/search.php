<?
/** 
 * search.php
 * Forward-facing API that searches the trusted sites for a given topic
*/
define('USAGE', 'todo: Usage: ...');
require_once('SearchResults.php');
require_once('TrustedSite.php');
require_once('VishisDatabase.php');

if(!$_REQUEST['query']){
	// todo: real language
	die(USAGE);
}

$query = $_REQUEST['query'];

// For now, the only supported TrustedSite is the Vishis Database
$site = new VishisDatabase();
$result = $site->search($query);

print($result->asJson());

?>