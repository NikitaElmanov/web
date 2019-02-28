<?php session_start();
//получение айди, майл покупателя
	$good_id = $_POST['id'];
	$good_count = $_POST['count'];

	if ($_SESSION['user'] == null){
		echo "<script>alert('Please, sing up or sing in before making purchases');</script>";
		return;
	}
	$user_mail = $_SESSION['user'];
	
	$toAdminMail = "79106232571@yandex.ru"; //почта работника склада
	// echo "<MAILaction = ".$action;
	// echo "good_id = ".$good_id;
	// echo "user_mail = ".$user_mail;

	//настрйка отправки письма
	require 'lib-phpMailer/phpmailer/PHPMailerAutoload.php';

	$mail = new PHPMailer;
	$mail->SMTPDebug = 2;  

	$mail->isSMTP();
	$mail->Host = 'smtp.mail.ru';
	$mail->SMTPAuth = true;
	$mail->Username = "elmanov_mr";
	$mail->Password = "nutrilite89";
	$mail->SMTPSecure = 'ssl';
	$mail->Port = "465";
	$mail->CharSet = 'UTF-8';
	$mail->From ='elmanov_mr@mail.ru';
	$mail->FromName = "Nuts SHOP's Administration";
	$mail->addAddress('89106232571@yandex.ru', 'Worker');
	$mail->addAddress($user_mail, 'User');
	$mail->isHTML(true);
	$mail->Subject = 'SHOP';

	//заполнение тела письма и работа с БД
	include_once 'connect_db.php';

	$result = mysqli_query($link, 'SELECT nuts.id, nuts.name, pack300.price, pack300.ammount FROM pack300 inner join nuts on nuts.id = pack300.id_nut;');

	while ($row = mysqli_fetch_row($result)) {
		echo "---" . $row[0] . '<br/>';
		echo "---" . $good_id . '<br/>';
		echo "---" . $row[3] . '<br/>';
		echo "---" . $good_count . '<br/>';
		if($row[0] == $good_id && $row[3] >= $good_count){
			$mail->Body = 'Было успешно приобретено ' . $row[1] . ', по цене ' . $row[2] * $good_count . " рублей";
			break;
		}
		else{
			$mail->Body = 'Упаковок товара ' . $row[1] . ' количеством ' .  $good_count . " нет на базе.";
		}
	}
	//отправка письма пользователю-1
	if( $mail->send() ){
		echo "Письмо отправлено<br>";
	}else{
		echo 'Письмо для пользователя не может быть отправлено.<br>';
		echo 'Ошибка: ' . $mail->ErrorInfo;
	}


