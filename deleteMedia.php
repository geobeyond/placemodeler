<?php 
$db=new PDO('mysql:host=localhost;dbname=ushahidi_v2','root','lynxbinario');

if (isset($_GET['id'])){
	$sql="delete from phase1_media where idphase1_media={$_GET['id']}";
}else {
	$sql="delete from  phase1_media where ph1_feature='{$_GET['fid']}'";
}
$stmt=$db->prepare($sql);
$db->beginTransaction();
$stmt->execute();
$db->commit();
?>
