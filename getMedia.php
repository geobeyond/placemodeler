<?php 

$fid=$_GET['fid'];
if ($_POST['fid']!='') $fid=$_POST['fid'];

//$db=new PDO('mysql:host=sql.geovolution.it;dbname=geovolut37572','geovolut37572','jack76');
$db=new PDO('mysql:host=localhost;dbname=ushahidi_v2','root','lynxbinario');

$result = $db->query("SELECT idphase1_media, name, path FROM phase1_media where ph1_feature='{$fid}'");
$noResult=true;
foreach($result as $row) {
	$noResult=false;
	$media="";
	$media['id']=$row['idphase1_media'];
	$media['name']=$row['name'];
	$media['path']=$row['path'];
	if (preg_match("!^images!", $row['path'])){
		$media['thumb']=str_replace("images/{$fid}", "images/{$fid}/thumbnail", $row['path']);
		$ret['images'][]=$media;
	}
	else {
		$ret['videos'][]=$media;
	}
}
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
die(json_encode($ret));



?>
