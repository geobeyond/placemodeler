<?php
include('./global.php');

$id = intval($_POST['idProject']);

$query = 'select id, category_title from category where parent_id='.$id;

$sth=$db->query($query);


$ret = array();
$ret['data']=array();

if ($sth!==FALSE)
{
  $ret['success'] = true;
  
  $rows = $sth->fetchAll(PDO::FETCH_ASSOC);
  foreach($rows as $row)
  {
    array_push($ret['data'], $row);
  }    
}
else
{
  $ret['success']=false;
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
die(json_encode($ret));
?> 
