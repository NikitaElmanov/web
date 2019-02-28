<?php 

require 'lib-phpMailer/phpmailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->isSMTP();

$mail->Host = 'smtp.mail.ru';
$mail->SMTPAuth = true;
$mail->Username = 'elmanov_mr'; // логин от вашей почты
$mail->Password = 'nutrilite89'; // пароль от почтового ящика
$mail->SMTPSecure = 'ssl';
$mail->Port = '465';

$mail->CharSet = 'UTF-8';
$mail->From = 'elmanov_mr@mail.ru'; // адрес почты, с которой идет отправка
$mail->FromName = 'Max'; // имя отправителя
$mail->addAddress('89106232571@yandex.ru', 'Maxim');
$mail->addAddress('nelmanov8@gmail.com', 'Nick');

$mail->isHTML(true);

$mail->Subject = 'test theme';
$mail->Body = 'Привет, мир! <p>Это строка <b>HTML кода</b></p>';
$mail->AltBody = 'Привет, мир! Это альтернативное письмо';

if( $mail->send() ){
	echo 'Письмо отправлено';
}else{
	echo 'Письмо не может быть отправлено. ';
	echo 'Ошибка: ' . $mail->ErrorInfo;
}

?>