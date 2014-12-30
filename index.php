<?php
require_once('./php/check.php');
require_once('./php/global.php');

session_start();
$sid=session_id();



$userId= checkSession($sid);


if ($userId){

 /* $userData=$db->select($usersTable, ['firstname', 'lastname', 'email'],['id'=>$userId]);
  if (count($userData)===1){
    $_SESSION['firstname']=$userData[0]['firstname'];
    $_SESSION['lastname']=$userData[0]['lastname'];
    $_SESSION['email']=$userData[0]['email'];
    //print_r(array_values($_SESSION));
    */
    ?>
<html>
<head>
    <title>Div@ter pm client</title>

<script src="https://maps.google.com/maps/api/js?v=3.5&amp;sensor=false"></script>
     <!-- ExtJS debug-->
<!-- <link rel="stylesheet" type="text/css" href="http://cdn.sencha.com/ext/gpl/4.2.1/resources/css/ext-all.css" />
    <script type="text/javascript" charset="utf-8" src="http://cdn.sencha.com/ext/gpl/4.2.1/ext-debug.js"></script>-->

 
<!-- <script type="text/javascript" src="./externals/extjs/ext-all-debug.js"></script>   -->
<!-- <link rel="stylesheet" type="text/css" href="./resources/css/ext-all-debug.css"/> -->

<!--   <link rel="stylesheet" type="text/css" href="resources/NewbridgeGreen-extjs-theme-bootstrap/resources/css/bootstrap/bootstrap.css" /> -->
    
    <!-- OpenLayers -->
    <link rel="stylesheet" type="text/css" href="externals/openlayers/theme/default/style.css" />    
    <script src="externals/openlayers/lib/OpenLayers.debug.js"></script>
    <script src="externals/openlayers/lib/QuickHull.js"></script>



    <script type="text/javascript" src="http://cdn.sencha.com/ext/gpl/4.2.1/examples/shared/include-ext.js"></script> 
    <script type="text/javascript" src="./app.js"></script>

         <link rel="stylesheet" type="text/css" href="resources/css/all.css"/>    
     <link rel="stylesheet" type="text/css" href="./css/custom.css"/>
     
    <style type="text/css">
    .x-theme-neptune .x-tab-default-active .x-tab-inner {
        color: white;
    }
    .x-theme-neptune .gxp-crumb-separator {
        height: 18px;
        font-size: 18px !important;
        top: 8px;
    }    
        
    </style>

</head>
<body></body>
</html>
    <?php
 /* } // fine if ($userId){
  else{
    header("Location: ./login.php");
  }
*/
}
else{
  header("Location: ./login.php");
}
?>