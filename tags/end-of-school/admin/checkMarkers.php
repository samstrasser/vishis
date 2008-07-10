<?php
require_once('../php/dbvars.php');
$conn = mysql_connect($host, $user, $pass);
$db = mysql_select_db($db, $conn);

function geocode($addr){
	//Three parts to the querystring: q is address, output is the format (
	$key = "ABQIAAAAbNpbJQzOmQ3LpYb48UbbNxSZT5Tpn1taJFQH4Y5Wf2aA8FIGoRR00-ePrq_DDT5-FUNm7KoXKkB1lQ";
	$address = urlencode($addr);
	$url = "http://maps.google.com/maps/geo?q=".$address."&output=csv&key=".$key;

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER,0);
	curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER[’HTTP_USER_AGENT’]);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	$data = curl_exec($ch);
	curl_close($ch);

	if (strpos($data,'200') !== false){
		$data = explode(",",$data);

		$prec = $data[1];
		$lat = $data[2];
		$lng = $data[3];
		return array('lat'	=> $lat, 
					 'lng'	=> $lng,
					 'prec' => $prec
					);

	} else {
		return false;
	}
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Check Marker Latlngs</title>
	<style>
	body{
		text-align:center;
	}
	
	td, th{
		border:1px solid black;
		padding-left:3px;
		padding-right:3px;
	}
		
	#container{
		width:80%;
		margin:auto;
	}
	
	.tabular-data{
		border:1px solid black;
	}
	</style>
</head>
<body>
<?

function addLocation($loc, $lat, $lng, $prec){
	//$loc = mysql_real_escape_string($loc);
	//$loc = stripslashes($loc);
	$q  = 'insert into locations (location, lat, lng, prec) ';
	$q .= "values ('$loc','$lat','$lng','$prec')";
	$r = mysql_query($q);
	if(mysql_affected_rows() == 1){
		return true;
	}else{
		return false;
	}
}

$added = 0;
$failed = 0;
$p = $_POST;
foreach($p['check'] as $id => $true){
	$success = addLocation($p['loc'][$id], $p['lat'][$id], $p['lng'][$id], $p['prec'][$id]);
	if($success){
		$added++;
	}else{
		$failed++;
	}
}
print("<em>$added added to locations</em><br/>\n");
print("<em>$failed failed to be added to locations</em><br/>\n");

/*
print("<pre>");
print_r($_POST);
print("</pre>");
*/
?>
<div id="container">
<?
function td($name, $d, $id){
	if($name !== false){
		if($name == 'check'){
			$checked = $d;
			$chBox = $checked ? 'checked="checked"' : '';
			$in = "<input type=\"checkbox\" $chBox name=\"check[$id]\" value=\"true\" />";
			print("\t<td>$in</td>\n");
		}else{
			$in = "<input type=\"hidden\" name=\"$name"."[$id]\" value=\"$d\" />";
			print("\t<td>$d $in</td>\n");
		}
	}else{
		print("\t<td>$d</td>\n");
	}
}
?>

<div id="locations-no-latlng" class="tabular-data">
<form action="checkMarkers.php" method="post">
	<table>
	  <tr>
		<th>db id</th>
		<th># nodes</th>
		<th>Location</th>
		<th>Lattitude</th>
		<th>Longitude</th>
		<th>Precision</th>
		<th><input type="checkbox" checked="checked" onclick="return false;"/></th>
	  </tr>
	<?
	$q  = "select distinct location from nodes where location !=''";
	$q .= "and location not in (select distinct n.location from nodes as n, locations as locs where n.location=locs.location)";
	$r = mysql_query($q);
	
	$id = 0;
	while($locRow = mysql_fetch_assoc($r)){
		$loc = $locRow['location'];
		
		print("<tr>\n");
		$geo = geocode($loc);
		
		if($geo === false){
			$found = false;
			$geo = array('lat'	=> 'none', 
						 'lng'	=> 'none',
						 'prec'  => '-1'
					);
		}else{
			$found = true;
		}
		
		td(false, $id, -1);
		td(false, "-1", -1);				// # of nodes
		td('loc',$loc, $id);			//location
		td('lat',$geo['lat'], $id);	//  lat
		td('lng',$geo['lng'], $id);	//  lng
		td('prec',$geo['prec'], $id);	//  precision
		
		td('check', $found, $id);
		print("</tr>\n");
		
		$id++;
	}
	?>
	</table>
	<input type="submit" value="Update (lat,lng)s"/>
</form>
</div>

<div id="nodes-no-markers" class="tabular-data">
	i want the nodes without markers but with locations
	
	select * from nodes as n, node_markers as m 
	where n.location != '' and n.location=m.location;

</div>

</div>
</body>
</html>


