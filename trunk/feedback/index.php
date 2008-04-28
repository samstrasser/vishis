<?php
require_once('../php/dbvars.php');
$conn = mysql_connect($host, $user, $pass);
$db = mysql_select_db($db, $conn);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Feedback::VisualizeHistory.com</title>
	<style>
	p{
		width:600px;
	}
	</style>
</head>
<body>
	<div id="content">
	  <div class="ro" id="intro">
		<p>Hello.  Please read the short description of the site below and then follow the instructions.  It will take about 10-15 minutes, including the follow up questions on the next page.</p>
		<p>Visualize History is a website which hopes to relate time and space.  It enables you to examine multiple topics at once, seeing how they relate to each other geographically and temporally.</p>
		<p>After you add the first topic, the Time Slider will appear in the bottom right corner of the map.  Drag it to scroll forward and backward through time.  You can also expand it to change the amount of time you are looking at at one time.</p>
		<p>Ready? Go.</p>
	  </div>
	  <div id="script">
	  <ol>
		<strong class="">Basics</strong>
		<li>Examine the site</li>
		<li>Drag the map around</li>
		<li>Zoom-in and out on the map</li>
	  </ol>
	  <ol>
		<strong class="">First Task: The Civil War</strong>
		<li>Add Major Events of the Civil War to the map</li>
		<li>Scroll toward the end of the war</li>
		<li>Pause at an event that interests you</li>
		<li>Examine details of that event by mousing over it</li>
	  </ol>
	  <ol>
		<strong class="">Second Task</strong>
		<li>Click on the '+' next to Valley of the Shadow to learn what the topic is</li>
		<li>Add the Valley of the Shadow to the map</li>
		<li>Resize the slider to show several events</li>
		<li>Observe something about both topics that you did not notice with only one</li>
		<li>Hide Valley of the Shadow by clicking the black eye next to it</li>
		<li>Remove Valley of the Shadow and Major Events from the map</li>
	  </ol>
	  </div>
	  <div class="ro" id="midtro">
	    <p>Almost done! Feel free to explore the site more.  I think comparing the States and the Presidents is particularly interesting.  When you finish, complete the survey below</p>
	  </div>
	  <div id="survey">
	  <form action="submit.php" method="POST">
	  
	  <h2>Just a little info about you.  Feel free not to answer</h2>
	  Name:<input type="text" name="name" size="25" />Age: <input type="text" name="age" size="6" /><br/>
	  Email: <input type="text" name="email" size="35" /><br/>

	  How would you rate your computer skills (1-5)?<br/>
	<select name="skills">
	<option value ="1">1: I can't turn my computer on without help</option>
	<option value ="2">2: Whatever came with my computer is what I use</option>
	<option value ="3">3: I install stuff and generally feel comfortable</option>
	<option value ="4">4: I am in charge of all technology in my household</option>
	<option value ="5">5: The command line and the registry are my (only) friends</option>
	<input type="hidden" name="starttime" value="<? print time(); ?>">
	<input type="hidden" name="rid" value="<? 
	$q = 'insert into _survey_ids values ()';
	$r = mysql_query($q);
	
	$rid = mysql_insert_id();
	print $rid;
	?>">
	
	</select>

	  <h2>Please answer these questions yes or no</h2>
	  <ul>
	  <?php
	  $q = 'select * from _survey_questions_yesno order by qid asc';
	  $r = mysql_query($q);
	  $lastid = '0';
	  $first = true;
	  while($row = mysql_fetch_assoc($r)){
		if($row['qid']-1 != $lastid && !$first){
			print("<br/>");
		}
		$lastid = $row['qid'];
		print("<li>");
		print($row['text']);
		print('<input type="radio" name="yesno['.$row['qid'].']" value="yes"/>Yes');
		print('<input type="radio" name="yesno['.$row['qid'].']" value="no"/>No');
		print("</li>\n");
		
		$first = false;
	  }
	  ?>
	  </ul>
	  <h2>Please type as much or as little as you want for these questions</h2>
	  <?php
	  $q = 'select * from _survey_questions_txt order by qid asc';
	  $r = mysql_query($q);
	  while($row = mysql_fetch_assoc($r)){
		print($row['text']);
		print('<br/><textarea name="text['.$row['qid'].']" rows="8" cols="45"></textarea>');
		print('<br/><br/>');
	  }
	  ?>
	  <br/>
	  <input type="submit"/>
	  </form>
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
