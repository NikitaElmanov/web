<?php
session_start();
	//получение айди, число купленных пакетов, майл покупателя
	$good_id = $_GET['id'];
	$good_count = $_GET['count'];

	if ($_SESSION['user'] == null){
		echo "<script>alert('Please, sing up or sing in before making purchases');</script>";
		return;
	}

	//Обноваление БД
	include_once 'connect_db.php';

	$result = mysqli_query($link, "SELECT p.id_nut, n.name, p.price, p.ammount FROM pack300 p inner join nuts n on n.id = p.id_nut where p.id_nut = '$good_id'");

	if ($row = $result->fetch_assoc()) {
		if($row['ammount'] < $good_count){
			echo "<h2 style='font-family: Calibri; text-align: center;'>There are no so packs in base. Please, read properly information about every good on home page. <br><a href='index.php'>Please, go back home page.</a><h2>";
			//exit;
		}
		else{
			if($result = mysqli_query($link, "SELECT ammount FROM pack300 where id = '$good_id'")){
				$row = $result->fetch_assoc();
				$var = $row['ammount']-$good_count; //новой число пакетов
			}

			$sql = "UPDATE pack300 SET ammount='$var' WHERE id='$good_id'";

			if (mysqli_query($link, $sql)) {
			    echo "<script>alert('Perchase is completed seccussfully. Check out your email. You have a letter with ditails.');</script>";
			} else {
			    echo "Error updating record: " . mysqli_error($link) . "<br>";
			}
		}
	}
?>