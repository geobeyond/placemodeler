<?php
require_once('./check.php');
require_once('./global.php');

$nome = $_POST['nome'];
$desc = $_POST['desc'];


$str = "insert into progetti (nome, descrizione) values(?,?)";

$query=$db->prepare($str);
$query->bindParam(1, $nome);
$query->bindParam(2, $desc);

$db->beginTransaction();
$query->execute();
$db->commit();

//crea all'interno del db ushahidi
    $params = array(
      'task' => 'category',
      'action' => 'add',
      'category_title' => $nome,
      'category_description' => $desc,
      'parent_id' => '0',
      'category_color'=> '000000'
    );
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_USERPWD, "$user:$password");
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_POST, count($params)); 
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,TRUE);

    $output = curl_exec($ch);
    $resArr= json_decode($output, true);
    if ($resArr['error']['code']=='0'){
      if (curl_errno($ch)) {
	      print curl_error($ch);
	  } else {
	      curl_close($ch);
	      $count = count($sottocategorie);
	      $idParent = getProjectId($nome);
	      for ($i=0; $i<$count; $i++)
	      {
		createSubCategory($sottocategorie[$i], $idParent);
	      }
	      //id del progetto
	      $sth = $db->prepare('select id from progetti order by id desc limit 1');
	      $sth->execute();
	      $row = $sth->fetch();
	      $idProgetto = $row['id'];
	      
	      
	      //id del progetto nella tabella category:
	      $sth1 = $db->prepare("select id from category where category_title='$nome'");
	      $sth1->execute();
	      $row1 = $sth1->fetch();	      
	      $idCategory=$row1['id'];
	      
	      //ed insert nella tabella progetti:
	      $sth2 = $db->prepare("update progetti set id_category=$idCategory where id=$idProgetto");
	      $sth2->execute();
	      
	      
	    //  $ret = array();
	      $resArr['success'] = true;
	      $resArr['id'] = $idProgetto;

	      echo json_encode($resArr);
       } 
    }
   
    else
    {
      echo json_encode($resArr);
    }
	



function createSubCategory($name, $idParent){
    global $apiUrl, $user, $password;
    
    $params = array(
      'task' => 'category',
      'action' => 'add',
      'category_title' => $name,
      'category_description' => $name,
      'parent_id' => $idParent,
      'category_color'=> '000000'
    );
   
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_USERPWD, "$user:$password");
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_POST, count($params)); 
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    $output = curl_exec($ch);
    if (curl_errno($ch)) {
	    print curl_error($ch);
	} else {
	    curl_close($ch);
	}    
}

function getProjectId($name){
  global $db;
 
  $sth = $db->prepare("select id from category where category_title='$name'");
  $sth->execute();
  $row = $sth->fetch();
  return $row['id'];
}

?>
