<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>VisualizeHistory.com</title>
	<link rel="stylesheet" type="text/css" href="css/styles.css" />
	
	<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.5.1/build/fonts/fonts-min.css" />
	<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.5.1/build/button/assets/skins/sam/button.css" />

	<!-- Yahoo! User Interface core -->
	<script src="http://yui.yahooapis.com/2.3.1/build/yahoo-dom-event/yahoo-dom-event.js" type="text/javascript"></script>
	<script src="http://yui.yahooapis.com/2.3.1/build/element/element-beta-min.js" type="text/javascript"></script>

	<!-- Specific Yahoo! API requirements -->
	<script src="http://yui.yahooapis.com/2.3.1/build/animation/animation-min.js" type="text/javascript"></script>
	<script src="http://yui.yahooapis.com/2.3.1/build/dragdrop/dragdrop-min.js" type="text/javascript"></script>
	<script src="http://yui.yahooapis.com/2.3.1/build/slider/slider-min.js" type="text/javascript"></script>
	
	<script type="text/javascript" src="http://yui.yahooapis.com/2.5.1/build/button/button-min.js"></script>
	
	<!-- Google Maps API -->
	<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAbNpbJQzOmQ3LpYb48UbbNxSZT5Tpn1taJFQH4Y5Wf2aA8FIGoRR00-ePrq_DDT5-FUNm7KoXKkB1lQ" type="text/javascript"></script>

	<!-- Open sourced LabeledMarker for Google Maps -->
	<script src="js/labeledmarker.js" type="text/javascript"></script>
	<script src="js/iconfactory.js" type="text/javascript"></script>

	<!-- vishis-specific scripts -->
	<script src="js/cookie.js" type="text/javascript"></script>
	<script src="js/map.js" type="text/javascript"></script>
	<script src="js/nav.js" type="text/javascript"></script>
	<script src="js/slider.js" type="text/javascript"></script>
	<script src="js/server.js" type="text/javascript"></script>
	<script src="js/JSON.js" type="text/javascript"></script>
	<script src="js/vishis.js" type="text/javascript"></script>
	
	<script>
	var topics;
	<?	
	require_once('php/SearchLayer.php');
	require_once('php/VishisDatabase.php');

	$queries = array(
		'U.S. Presidents',
		'Major Events of the Civil War',
		'The Valley of the Shadow'
	);

	$site = new VishisDatabase();
	$result = new SearchResult();
	
	$id = -1;
	foreach($queries as $q){
		$t = $site->getTopicShell($q);
		if($t){
			$t->addField('query', $q);
			$t->addField('id', $id--);
			$result->addTopic($t);
		}else{
			print("Trouble with $q\n");
		}
	}
	print('topics = ');
	print($result->toJson());
	print(';');

	?>
	topics.push(
		{
		'id': <? print $id--; ?>,
		'title': 'U.S. States',
		'query': 'http://code.google.com/apis/kml/documentation/us_states.kml',
		'desc': 'Each of the United States outlined and shown as they joined the Union.<cite><a href="http://code.google.com/apis/kml/documentation/us_states.kml" target="_blank" title="http://code.google.com/apis/kml/documentation/us_states.kml"></a></cite>'
		}
	);
	</script>


</head>
<body class="sidebar-right" onload="load(topics)" onunload="unload()">
  <div id="header">
	<h1>Visualize History <span class="dotcom">.com</span></h1>
  </div>
  <div id="content">
	<div id="viewing-panel">
		<div id="map"></div>
	</div>
	<div id="nav-panel">
	</div>
  </div>
 
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
var pageTracker = _gat._getTracker("UA-2026299-2");
pageTracker._initData();
pageTracker._trackPageview();
</script>
  </body>
</html>
