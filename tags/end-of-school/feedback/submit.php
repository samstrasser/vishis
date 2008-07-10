<?php
require_once('../php/dbvars.php');
$conn = mysql_connect($host, $user, $pass);
$db = mysql_select_db($db, $conn);

//$browser = get_browser(null, true);

$rid = $_POST['rid'];
$name = $_POST['name'];
$email = $_POST['email'];
$age = $_POST['age'];
$skills = $_POST['skills'];
$format = DATE_ATOM; //2005-08-15T15:52:01
$started  = substr(date($format, $_POST['starttime']), 0, 19);
$finished = substr(date($format), 0 ,19);

$rq  = "insert into _survey_respondent (rid, name, email, age, skills, started, finished) ";
$rq .= "values('$rid', '$name', '$email', '$age', '$skills', '$started', '$finished')";
mysql_query($rq);

foreach($_POST['yesno'] as $qid => $ansText){
	if($ansText == 'yes'){
		$ans = 1;
	}else{
		$ans = 0;
	}
	
	$q = "insert into _survey_answers_yesno (rid, qid, ans) values('$rid','$qid','$ans')";
	mysql_query($q);
}

foreach($_POST['text'] as $qid => $ansRaw){	
	$ans = mysql_real_escape_string($ansRaw);
	$q = "insert into _survey_answers_txt (rid, qid, ans) values('$rid','$qid','$ans')";
	mysql_query($q);
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Feedback::VisualizeHistory.com</title>
</head>
<body>
<div id="content">
Thank you for submitting.  If you have questions, just email me.  
</div>
</body>
</html>
