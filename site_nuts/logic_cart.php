<?php
session_start();
$_SESSION['shop'][$_POST['id']]=$_POST['count'];
?>

