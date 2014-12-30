<?php


#credenziali per accesso al database di ushahidi_v2_palestrina
$db=new PDO('mysql:host=localhost;dbname=ushahidi_v2_palestrina','root','lynxbinario');


# path assoluto della directory del client
$targetMedia='/var/www/divater/palestrina/pm';





#per $apiUrl settare una url differente dalla url del server
#perché ciò è necessario per poter utilizzare il proxy.
$apiUrl = 'http://palestrina_ushahidi.divater.it/api'; 

#credenziali di autenticazione per geoserver
$user = 'admin';
$password  = 'Divater100!';



##############non modificare#########################

$mediaDir='/media/';

$sottocategorie = array(
  'Rilievo Nominale',
  'Rilievo Percettivo',
  'Rilievo Grafico/Fotografico/Video',
  'Questionario fase7',
  'Questionario fase4',
  'Rilievo Base'

);

if (isset($_OST['fase']))
  $phase=intval($_POST['fase']);
else 
  $phase=1;

$allowedPhases=array(1,3,6,8);
if (in_array($phase, $allowedPhases))
{
  $table='phase'.$phase.'_media';
  $idTable='ph'.$phase.'_feature';
  $rFeature='pm_phase'.$phase;
  $idMedia='idphase'.$phase.'_media';
}
else
{
  ; //exit(0);
}


//nomi delle tabelle del db


$sessionTable='sessions';

///////////////////////////////////////////////////////////

function checkSession($sid){
  global $db, $sessionTable; 
  $sql = $db->prepare("SELECT count(*) as count FROM $sessionTable WHERE session_id='$sid'");
  $sql->execute();
  $res= $sql->fetch();
  if ($res['count']=='1'){
    return true;
  }
  return false;
}
?>