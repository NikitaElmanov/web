<?php 
// error_reporting(E_ALL);

$db_host = 'localhost'; 
$db_user = 'root'; 
$db_password = ''; 
$db_name = 'shop'; 

$link = mysqli_connect($db_host, $db_user, $db_password, $db_name); 
if (mysqli_connect_errno()) {      
	die('<p style="color:red">'.mysqli_connect_errno().' - '.mysqli_connect_error().'</p>');
}  