<?php
require('./global.php');

session_start();
$sid=session_id();
$userId= checkSession($sid);

if ($userId){
  $_SESSION['success']=true;
  echo json_encode($_SESSION);
}
else
{
  $res=array();
  $res['success']=false;
  echo json_encode($res);
}
?>