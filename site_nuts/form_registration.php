<?php
	$user_mail = $_POST['user_mail'];
	$user_password = $_POST['user_password'];

	include_once 'connect_db.php';

	$result = mysqli_query($link, 'SELECT mail FROM users;');
	$isNew = true;

	while ($row = mysqli_fetch_row($result)) {
		if($row[0] == $user_mail){
			echo "<script>alert('User with this e-mail already exists');</script>";
			$isNew = false;
			break;
		}
	}

	if($isNew){
		$sql = "INSERT INTO users (mail, password)
		VALUES ('$user_mail', '$user_password')";

		if ($link->query($sql) === TRUE) {
		    echo "New record created successfully";
		} else {
		    echo "Error: " . $sql . "<br>" . $link->error;
		}
	}