<?php
require_once('./check.php');
require_once('./global.php');

if (isset ($_POST['idProject']))
{
  $idProgetto = intval($_POST['idProject']);

  //recupera il nome del progetto
  $sth=$db->prepare("select nome from progetti where id=$idProgetto");
  $sth->execute();
  $row = $sth->fetch();
  $nome = $row['nome'];

  //cancella dalla tabella progetti:
  $sth = $db->prepare("DELETE from progetti WHERE id=$idProgetto");
  $sth->execute();

   //recupera l'id del progetto nella tabella category
  $sth=$db->prepare("select id from category where category_title='$nome'");
  $sth->execute();
  $row = $sth->fetch();
  $idCategory = $row['id'];

  //cancella la category dalla tabella category
  $sth = $db->prepare("DELETE from category WHERE category_title='$nome'");
  $sth->execute();
  
  //cancella le subcategories dalla tabella category
  $sth = $db->prepare("DELETE from category WHERE parent_id=$idCategory");
  $sth->execute();
 }
?>
 
