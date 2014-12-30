 <?php
require('./global.php');
session_start();
$sid=session_id();

$res=array();

$userId= checkSession($sid);
if ($userId){
  $sql=$db->prepare("DELETE from $sessionTable WHERE session_id='$sid'");
  $sql->execute();
  session_destroy();
  $res['success']=true;
  $res['logout']=true;
}
else
{
  $res['success']=false;
}
echo json_encode($res);
?>