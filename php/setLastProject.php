<?php
include('./global.php');

$ret = array();
if (isset($_POST['user_id']) && isset($_POST['last_project']))
{
  $lastProject=intval($_POST['last_project']);
  $userId=intval($_POST['user_id']);

  $query = "update users set last_project=$lastProject where id=$userId";
  $sth=$db->query($query);
  
  $ret['success'] = true;
   
}
else
  $ret['success'] = false;

return json_encode($ret); 
