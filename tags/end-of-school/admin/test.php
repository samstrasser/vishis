<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Check Marker Latlngs</title>
	<style>
	body{
		text-align:center;
	}
	
	#container{
		width:80%;
		text-align:left;
		margin:auto;
	}
	
	.tabular-data{
		border:1px solid black;
	}
	</style>
</head>
<body>
<div id="container">

<?

function googleGeocode($addr){
	//Three parts to the querystring: q is address, output is the format (
	$key = "ABQIAAAAbNpbJQzOmQ3LpYb48UbbNxSZT5Tpn1taJFQH4Y5Wf2aA8FIGoRR00-ePrq_DDT5-FUNm7KoXKkB1lQ";
	$address = urlencode($addr);
	$url = "http://maps.google.com/maps/geo?q=".$address."&output=csv&key=".$key;

	print $url;
	
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
print('<pre>');
print_r(googleGeocode('5508 Montgomery Street, Chevy Chase MD 20815'));
print('</pre>');

/*
$name = "thearray";
$key = "id";
print("$name"."[$key]");
print('<pre>');
print_r($_GET);
print('</pre>');

?
<form action="test.php">
<input type="checkbox" checked="checked" name="check[0]" value="true" />
<input type="checkbox" checked="checked" name="check[1]" value="true" />
<input type="checkbox" checked="checked" name="check[2]" value="false" />
<input type="checkbox" checked="checked" name="check[3]" value="true" />
<input type="checkbox" checked="checked" name="check[4]" />
<input type="checkbox" checked="checked" name="check[5]" />

<input type="submit">
</form>
*/
?>
</div>
</body>
</html>


