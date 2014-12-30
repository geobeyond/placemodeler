<?php

include('./global.php');
require('./UploadHandler.php');
 
 
if (isset($_POST['fid'])){ 

        $fid=intval($_POST['fid']);  
        if (isset($_POST['mediaLinks'])){
                $c=count($_POST['mediaLinks']);
                $link='link';
                for ($i=0; $i<$c; $i++){
                        $str="INSERT INTO $table (path, class, $idTable) VALUES(?,?,?)"; //.$_POST['mediaLinks'][$i]."', 'link','$fid')";                 
			
                         $query=$db->prepare($str);
                         $query->bindParam(1, $_POST['mediaLinks'][$i]);
                         $query->bindParam(2, $link);
                         $query->bindParam(3, $fid);
                         $db->beginTransaction();
                         $query->execute();
                         $db->commit();

                }
        }        
        if (isset($_FILES['incident_photo']['error']))
        { 
           $dir='images/'.$rFeature.'_'.$fid.'/';
           $class='incident_photo';
           handleMedia($_FILES['incident_photo'], $class, $dir, $fid);
	}

        if (isset($_FILES['incident_video']['error']))
        { 
           $dir='videos/'.$rFeature.'_'.$fid.'/';
           $class='incident_video';
           handleMedia($_FILES['incident_video'], $class, $dir, $fid);
        }   

}



//function savePath($files, $class, $dir, $fid)
function handleMedia($files, $class, $dir, $fid)
{ 	   
  global $table, $idTable, $db, $mediaDir, $targetMedia;

  $upload_handler = new UploadHandler(array(	
	    'upload_dir' => $targetMedia.$mediaDir.$dir,
	    'param_name' => $class,
//	    'thumbnail' => array(
//		'max_width'= 140,
//		'max_height'=140
	    //)
  ), true, null);
	   
  foreach ($files['error'] as $key => $error) 
	   {	   
	    $fileName=$files['name'][$key];
	              $pos=strrpos($fileName, '.');
                                        $name=substr($fileName, 0, $pos);
                                        $ext=substr($fileName, $pos+1);
					
                                        $relPath=$mediaDir.$dir;
                                        $str="INSERT INTO $table (name, path, size, type, class, $idTable)VALUES(?,?,?,?,?,?)";                              
                                        
                                        $query=$db->prepare($str);
					$query->bindParam(1, $name);
					$query->bindParam(2, $relPath);
					$query->bindParam(3, $files['size'][$key]);
					$query->bindParam(4, $ext);
					$query->bindParam(5, $class);
					$query->bindParam(6, $fid);
					$db->beginTransaction();
					$query->execute();
					$db->commit();
	   }
}

