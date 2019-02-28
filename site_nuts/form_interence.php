<?php 
session_start();

	$user_mail = $_POST['user_mail'];
	$user_password = $_POST['user_password'];

	include_once 'connect_db.php';

	$result = mysqli_query($link, 'SELECT mail, password FROM users;');
	$exists = false;

	while ($row = mysqli_fetch_row($result)) {
		if($row[0] == $user_mail && $row[1] == $user_password){
			$exists = true;
			break;
		}
	}

	if($exists){
		echo "<script>alert('You seccussfully sign in.');</script>";
		$_SESSION['user']=$user_mail;
		// echo "You seccussfully sign in.";
	}
	else{
		echo "<script>alert('Invalid password or email. Please check out inputing data.');</script>";
		// echo "Invalid password or email. Please check out inputing data.";
	}

session_write_close();

?>