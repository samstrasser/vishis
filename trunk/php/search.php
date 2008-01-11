<?
/** 
 * search.php
 * Forward-facing API that searches the trusted sites for a given topic
*/
define('USAGE', 'todo: Usage: ...');

if(!$_REQUEST['query']){
	// todo: real language
	die(USAGE);
}

$query = $_REQUEST['query'];

$sites = $json->decode($_REQUEST['sites']);

foreach($sites as $site){
	// include the appropriate class
	
	// initialize this site's object
	
	// search this site
	
	// if search returned results
		// package the results into json
		// output the result
		// end script
}


?>