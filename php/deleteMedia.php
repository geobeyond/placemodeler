<?php
include('./global.php');


$ret=array();
$ret['success']=false;

if (isset($_POST['id']))
{
    $id=intval($_POST['id']);
    $query="SELECT path, name, type FROM $table WHERE $idMedia=".$db->quote($id);
    $sth=$db->prepare($query); 
    $sth->execute();
    $row=$sth->fetch();  
    
  if ($_POST['type']==='dataViewImages' || $_POST['type']==='dataViewVideos')
  {     

    $path=realpath(dirname(__FILE__)).'/../'.$row['path'].$row['name'].'.'.$row['type'];

    if (unlink($path))
    {
	$thumbnail='.'.$row['path'].'/thumbnail/'.$row['name'].'.'.$row['type'];
	unlink($thumbnail);
	
	$query="DELETE FROM $table WHERE $idMedia=".$db->quote($id);
	$res=$db->exec($query);  
	if ($res>0)
	{
	  $ret['success']=true;
	}
    }
    else
    {
	$ret['success']=false;
    }
  }
  else
  {
	$query="DELETE FROM $table WHERE $idMedia=".$db->quote($id);
	$res=$db->exec($query);  
	if ($res>0)
	{
	  $ret['success']=true;
	}
	else
	{
	  $ret['success']=false;	
	}
  
  }
}
else if (isset($_POST['featureId']))
{
  $featureId=intval($_POST['featureId']); 
  
  $class='foto';
  removeDir($featureId, $class);
  $class='video';
  removeDir($featureId, $class);
  
  $query="DELETE FROM $table WHERE $idTable=".$db->quote($featureId);
  $res=$db->exec($query);  
  if ($res>0)
  {
    $ret['success']=true;
  }
  /*
  $query="SELECT path from $table WHERE $idTable=".$db->quote($featureId)." AND class='foto' LIMIT 1";
  $sth=$db->prepare($query); 
  $sth->execute();
  $row=$sth->fetch();
  
  if ($row['path']!='')
  {
    $dirPath=$targetMedia.$row['path'];
    if (rrmdir($dirPath))
    {
	$query="DELETE FROM $table WHERE $idTable=".$db->quote($featureId);
	$res=$db->exec($query);  
	if ($res>0)
	{
	  $ret['success']=true;
	}
    }
    else
    {
      $ret['success']=false;
    }
  }
  else
  {
    $ret['success']=true;
  }*/
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
die(json_encode($ret));



function removeDir($featureId, $class){
  global $table, $idTable, $db, $targetMedia;
  
  $query="SELECT path from $table WHERE $idTable=".$db->quote($featureId)." AND class='$class' LIMIT 1";
  $sth=$db->prepare($query); 
  $sth->execute();
  $row=$sth->fetch();
  if ($row['path']!='')
    rrmdir($targetMedia.$row['path']);    
}


 // When the directory is not empty:
 function rrmdir($dir) {
   if (is_dir($dir)) {
     $objects = scandir($dir);
     foreach ($objects as $object) {
       if ($object != "." && $object != "..") {
         if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object);
       }
     }
     reset($objects);
     rmdir($dir);
   }
 }
?>