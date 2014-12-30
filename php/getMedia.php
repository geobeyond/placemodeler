<?php
include('./global.php');


$fid=intval($_POST['fid']);
$class=$_POST['class'];


//$offset=intval($_POST['start']);
//$limit=intval($_POST['limit']);

$query="SELECT $idMedia as id, name, path, type FROM $table where $idTable='$fid' AND class=".$db->quote($class);//."LIMIT $limit OFFSET $offset";

//echo $query;
$sth=$db->query($query);

$ret['data']=array();

if ($sth!==FALSE)
{  
  $rows = $sth->fetchAll(PDO::FETCH_ASSOC);
  foreach($rows as $row)
  {
    switch($class)
    {
     case 'incident_photo':
	$row['thumb']='.'.$row['path'].'thumbnail/';
	
	$realPath=realpath(dirname(__FILE__)).'/../'.$row['path'].$row['name'].'.'.$row['type'];		
	$size=getimagesize($realPath);	
	$row['width']=$size[0];
	$row['height']=$size[1];
	
     break;
     case 'incident_video':
        $row['thumb']='.'.$mediaDir.'/video-icon.png';	  
     break;
     case 'link':
        $row['thumb']='.'.$mediaDir.'/link-icon.png';	
     break;
     default:
     break;
    }
    array_push($ret['data'], $row);
  }  
  $ret['success']=true;
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
