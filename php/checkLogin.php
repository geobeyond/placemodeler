<?php
define('SYSPATH', '/var/www/divater/gaeta/ushahidi-v2/system/'); //cambia il path..

require_once('./check.php');
require_once('./global.php');
require('/var/www/divater/gaeta/ushahidi-v2/application/config/auth.php');

$res = array();

$login=$_POST['loginUsername'];
$password=$_POST['loginPassword'];

$date=new DateTime();
$time=$date->getTimestamp();

//funzione da usare per trovare il salt  di una pwd
function find_salt($password, $salt_pattern)
	{
		$salt = '';

		foreach ($salt_pattern as $i => $offset)
		{
			// Find salt characters, take a good long look...
			$salt .= substr($password, $offset + $i, 1);
		}
		return $salt;
	}

//crea hash password
function hash_password($password, $salt, $salt_pattern)
{
	$hash = hash('sha1', $salt.$password);

                // Change salt to an array
                $salt = str_split($salt, 1);

                // Returned password
                $password = '';

                // Used to calculate the length of splits
                $last_offset = 0;

                foreach ($salt_pattern as $offset)
                {
                        // Split a new part of the hash off
                        $part = substr($hash, 0, $offset - $last_offset);

                        // Cut the current part out of the hash
                        $hash = substr($hash, $offset - $last_offset);

                        // Add the part to the password, appending the salt character
                        $password .= $part.array_shift($salt);

                        // Set the last offset to the current offset
                        $last_offset = $offset;
                }
                // Return the password, with the remaining hash appended
                return $password.$hash;
}


$sql = $db->prepare("SELECT username, password, email, last_project, id FROM users WHERE username='$login'");

$sql->execute();
$resQuery= $sql->fetchAll();

$savedPassword = $resQuery[0]['password'];

//trova il salt
$salt_pattern=explode(',', $config['salt_pattern']);
$salt = find_salt($savedPassword, $salt_pattern);

//crea password con il salt trovato
$hash_pwd = hash_password($password, $salt, $salt_pattern);

if ($hash_pwd === $savedPassword)
{
  session_start();
  $sid=session_id(); 
  
  $res['sid']=$sid;
  $res['logok']=true;  

  $sql= $db->prepare("INSERT INTO $sessionTable (session_id, last_activity) VALUES ('$sid', '$time')");
  $sql->execute();
  
  $_SESSION['username']=$resQuery[0]['username'];
  $_SESSION['email']=$resQuery[0]['email'];  
  $_SESSION['last_project']=$resQuery[0]['last_project']; 
  $_SESSION['id']=$resQuery[0]['id'];
  
  //nome progetto se last_project esiste
  if ($resQuery[0]['last_project']!=='null')
  {
    $sql1 = $db->prepare("SELECT nome from progetti where id=".$resQuery[0]['last_project']);
    
    $sql1->execute();
    $resQuery1= $sql1->fetchAll();
    $_SESSION['nome'] = $resQuery1[0]['nome'];
   
  }
  else
    $_SESSION['nome']=false;

}
else
{
  $res['msg']='Username o/e password non validi';
  $res['logok']=false;
}

//rimuovi dalla $sessionTable i record con piu di 3 ore di last activity
  $sql= $db->prepare("DELETE from $sessionTable WHERE $time-last_activity >10800");
  $sql->execute();



$res['success']=true;
echo json_encode($res);
?>