<?php
if (isset($_GET['include_script'])) //protezione da include_script 
 exit;
if (strpos(strtolower($_SERVER['REQUEST_URI']),'set-cookie:')!==false) //protezione da settaggio cookie via url...
  exit;
?>
