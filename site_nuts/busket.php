<?php
	session_start();
?>
<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset='UTF-8'>
	<title>site</title>
	<link type="text/css" rel="stylesheet" href="style.css" />
	<link rel='icon' href='imgs/amblem.png'>
	<script src="https://code.jquery.com/jquery-3.0.0.min.js"> </script>
	<style>
		table.table-busket{
			border-collapse: collapse;
			width: 90vw;
			height: 50%;
			font-size: 20px;
			margin: 10% auto;
		}
		
		table.table-busket th{
			background-color: Olive;
			color: Khaki;
		}

		table.table-busket td{
			text-align: center;
		}

		table input.clear-good{
			float: right;
		}

		table input.bought-good{
			float: right;
			margin-right: 1.5vw;
		}
	</style>
	<script type="text/javascript">
		$(document).ready(function () {
			$(".clear-good").click(function del(){

	 			var id = $(this).attr('id');

	 			console.log(id);

	 			$.ajax({
		 			type: "POST",
		 			url: "busket.php",
		 			data: {id: id, action: 'del'},
		 			success: function(){
		 				show();
		 				//window.location.reload();
		 			}
		 		});

		 	});

		 	window.onload = show;
		 	function show(){ 
	 			$.ajax({
		 			type: "POST",
		 			url: "busket.php",
		 			data: {action: 'show'},
		 			error: function(){
		 				alert("Could not");
		 			},
		 			success: function(response){
		 				$('#busket_body').html(response);
		 			}
		 		});
		 	};

		 	$(".bought-good").click(function buy(){ 

	 			var id = $(this).attr('id'); //id пакета c определенным контентовм
	 			var count = $(this).attr('name'); //кол-во пакетов
	 			// var mail = $('input.mail-client').val(); //почта юзера

	 			// var regex = '[A-Za-z0-9.]{3,}@[A-Za-z]{3,10}.[A-Za-z]{1,5}';
	 			// if(!mail.match(regex)){ //если введенная почта не подходит
	 			// 	alert("Вы ввели неправильную почту. Пробуйте ещё раз.");
	 			// 	return 1;
	 			// }

	 			console.log(id);
	 			console.log(count);
	 			// console.log(mail);

	 			$.ajax({
	      				type: "POST",
			 			url: "mail.php",
			 			data: {id: id, count: count}, //POST
			 			// data: "id="+id+"&count="+count+"&mail="+mail+"&action="+'UpdateDB', //GET
			 			success: function(){
			 			// 	// showMailSending();
			 			// 	// show();
			 				// window.location.href = "http://site/mail.php";
			 				// alert('Письмо отправлено');
			 			}
			 		});

	 			//2-VARIANT_BEGIN___________________________________________________________
		 			window.location.href = "http://site/updatePacksDB.php?id="+id+"&count="+count;
		 			// $.ajax({
	     //  				type: "GET",
			 		// 	url: "updatePacksDB.php",
			 		// 	// data: {id: id, mail: mail, count: count, action: 'sendMail'}, //POST
			 		// 	data: "id="+id+"&count="+count, //GET
			 		// 	success: function(){
			 		// 		alert('Perchase is completed seccussfully. Check out your email. You have a letter with ditails.');
			 		// 	},
			 		// 	error: function(){
			 		// 		alert('Please, sing up or sing in before making purchases');
			 		// 	}
			 		// });
		 			
		 		//2-VARIANT_END___________________________________________________________

	 			//1-VARIANT_BEGIN___________________________________________________________
		 			// $.ajax({
	     //  				type: "POST",
			 		// 	url: "mail.php",
			 		// 	data: {id: id, mail: mail, count: count, action: 'sendMail'}, //POST
			 		// 	// data: "id="+id+"&count="+count+"&mail="+mail+"&action="+'UpdateDB', //GET
			 		// 	// success: function(){
			 		// 	// 	// showMailSending();
			 		// 	// 	// show();
			 		// 	// 	window.location.href = "http://site/mail.php";
			 		// 	// }
			 		// });

			 		// function showMailSending(){
			 		// 	var params = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
						// window.open("mail.php", "Test", params);
			 		// }
		 		//1-VARIANT_END___________________________________________________________
		 	});

		});
	</script>
	</head>
<body id='busket_body' style='background-image: url(imgs/fon.jpg);	background-attachment: fixed;	background-position: 0px 0px;	background-repeat: repeat;
	background-size: contain;'>
	<div id='wrapper'>
		<div id='header'>
			<div class='inner-header'>
				<div class='caption'>
					<a href='index.php'><img src='imgs/amblem.png' alt='amblem'/></a>
					<span class='caption-text'><a href='index.php' style='font-family: Calibri;'>Nuts world</a></span>

					<div class='side'>
						<ul class='menu'>
							<li class='menu__list'><a href='index.php'>Home</a></li>
							<li class='menu__list'><a href='busket.php'>Busket</a>
							</li>
							<li class='menu__list'><a href='#'>About us</a>
								<ul class='menu__drop'>
									<li><a href='creators.html'>Creators</a></li>
									<li><a href='documentation.html'>Documentation</a></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div id="center-col" style='width: 100%;'>
			<div class="inner-center">
				<?php
				$action = $_POST['action']; //////////// Не примемает action => не выводит show and del

				if ($action == 'show'){
				 	
					if (!(isset($_SESSION['shop']))){
						echo "<h2 style='font-family: Calibri; text-align: center;'>You do not have any orders. <br>Please, go back home page.<h2>";
						exit;
					}
					$shop = $_SESSION['shop'];
					if (count($shop) == 0){
						echo "<h2 style='font-family: Calibri; text-align: center;'>You do not have any orders. <br>Please, go back home page.<h2>";
						exit;
					}

					//получение количества переменных в сессии
					$varsInsession = 0;
					foreach ($_SESSION['shop'] as $key => $value){
						$varsInsession++;
					}

					// echo " получение количества переменных в сессии=".$varsInsession;
					$goodInSession = false;
					foreach ($_SESSION['shop'] as $key => $value){
						if($value > 0 && $key >= 1){
							$goodInSession = true;
						}
					}

					if(!$goodInSession){
						echo "<h2 style='font-family: Calibri; text-align: center;'>You do not have any orders. <br>Please, go back home page.<h2>";
						$goodInSession = false;
						exit;
					}
					else if($goodInSession){
//----------------------------------------------------------------------1-VARIANT-BEGIN--------------------------------------------
						include_once 'connect_db.php'; 

						$nuts = array ('фундук', 'арахис', 'кедр', 'кешью', 'фисташки', 'семячки');

						$goodInSession = false;
				 		echo "<table class='table-busket' border='1'>";
				 		echo '<tr><th>Name</th><th>Packs</th><th>Price for one</th><th>Total price</th></tr>';

				 //2-VARIANT_BEGIN-----------------------------------------------------------------
				 	foreach ($_SESSION['shop'] as $key => $countPack) {
				 			$sql = "SELECT p.id, p.ammount, p.price, n.name FROM pack300 p inner join nuts n on p.id_nut = n.id;";
							$result = mysqli_query($link, $sql);
							while ($row = $result->fetch_assoc()) {
								if($row['id'] == $key && $countPack > 0){
	    							echo "<tr>
								   		<td>{$row['name']}</td>
								   		<td>{$countPack}</td>
								   		<td>" . $row['price'] . "</td>
								   		<td>" . $row['price'] * $countPack . "</td>
								   		<td>
								   		<input class='clear-good' type='button' name='' value='Clear' id='{$row['id']}'/>
							   			<input class='bought-good' type='button' name=" . $countPack . "  value='Buy' id='{$row['id']}'/>
							   			</td>
							   		</tr>";
						   		}
							}
						}
						echo '</table>';
					}
				} else if ($action == 'del'){

					$id = $_POST['id'];

					foreach ($_SESSION['shop'] as $key => $value) {
						if ($id == $key){
							$_SESSION['shop'][$key] = 0; //если число покаетов count = 0, тогда оно не пройдет по суловию в методе show(); выше по коду
						}
					}

				} else if ($action == 'sendMailUpdateDB'){

						// //получение айди, число купленных пакетов, майл покупателя
						// $good_id = $_POST['id'];
						// $good_count = $_POST['count'];
						// $user_mail = $_POST['mail'];
						// $toAdminMail = "89106232571@yandex.ru"; //почта работника склада

						// echo "good id:" . $good_id;
						// echo "good_count:" . $good_count;
						// echo "user_mail:" . $user_mail;

						// echo "<script>console.log(good id = {$good_id})</script>";
						// echo "<script>console.log(good_count = {$good_count})</script>";
						// echo "<script>console.log(user_mail = {$user_mail})</script>";

						// // $toUser = $user_mail;
						// // $common_subject = "Purchase nuts";
						// // mail($toUser, $common_subject, $user_sms);
						// // mail($toAdmin, $common_subject, $admin_sms);

						// //настрйка отправки письма
						// require 'lib-phpMailer/phpmailer/PHPMailerAutoload.php';

						// $mailForUser = new PHPMailer;

						// $mailForUser->isSMTP();

						// $mailForUser->Host = 'smtp.mail.ru';
						// $mailForUser->SMTPAuth = true;
						// $mailForUser->Username = 'elmanov_mr'; // логин от вашей почты
						// $mailForUser->Password = 'nutrilite89'; // пароль от почтового ящика
						// $mailForUser->SMTPSecure = 'ssl';
						// $mailForUser->Port = '465';
						// $mailForUser->CharSet = 'UTF-8';
						// $mailForUser->isHTML(true);

						// //Создание отправителя для админа как для изера
						// $mailForAdmin = $mailForUser;

						// //заполнение свойтсв для юзера
						// $mailForUser->From = 'elmanov_mr@mail.ru'; // адрес почты, с которой идет отправка - SENDER POST
						// $mailForUser->FromName = 'elmanov_mr'; // имя отправителя
						// $mailForUser->addAddress($user_mail, 'user name');
						// $mailForUser->Subject = "SHOP Nuts";

						// //заполение свойтсв дял админа
						// $mailForAdmin->From = 'elmanov_mr@mail.ru'; // адрес почты, с которой идет отправка
						// $mailForAdmin->FromName = 'elmanov_mr'; // имя отправителя
						// $mailForAdmin->addAddress($toAdminMail, 'admin name');
						// $mailForAdmin->Subject = "SHOP Nuts";

						// //заполнение тела письма и работа с БД
						// include_once 'connect_db.php';

						// $result = mysqli_query($link, 'SELECT nuts.name, pack300.price FROM pack300 inner join nuts on nuts.id = pack300.id_nut;');

						// while ($row = mysqli_fetch_row($result)) {
						// 	if($row['id'] == $good_id){
						// 		$mailForUser->Body = 'Вас приветствует интурнет магазин Ореховый мир!<br> Вы успешно приобрели' . $row["nuts.name"] . ', цена 1 пакета которго равна' . $row["pack300.price"];
						// 		$mailForAdmin->Body = 'Вас приветствует интурнет магазин Ореховый мир!<br> Пользователь с почтовым адресом '. $user_mail ." успешно приобрел ". $row[0] . ", цена 1 пакета которго равна" . $row[1];
						// 	}
						// }
						// //отправка письма пользователю и спец.работнику -1
						// if( $mailForUser->send() ){
						// 	echo 'Письмо дял пользователя отправлено';
						// }else{
						// 	echo 'Письмо для пользователя не может быть отправлено. ';
						// 	echo 'Ошибка: ' . $mail->ErrorInfo;
						// }
						// //-2
						// if( $mailForAdmin->send() ){
						// 	echo 'Письмо специальное отправлено<br>';
						// }else{
						// 	echo 'Письмо специальное не может быть отправлено.<br>';
						// 	echo 'Ошибка: ' . $mail->ErrorInfo . "<br>";
						// }

						// //Обноваление БД
						// $result = mysqli_query($link, "SELECT ammount FROM pack300 where id = {$good_id}");
						// $var = $result-$good_count; //новой число пакетов

						// $sql = "UPDATE pack300 SET ammount={$var}WHERE id={$good_id}";

						// if (mysqli_query($link, $sql)) {
						//     echo "Record updated successfully<br>";
						// } else {
						//     echo "Error updating record: " . mysqli_error($link) . "<br>";
						// }

						// echo "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk";
					}
				?>
			</div>
		</div>
		<div id="footer">
			<div class="inner-footer">
				If you have any issues buying on the site then you should going to submenu "Documentation" in tag "About us".<br>
				If you couldn't managed positive results, you can type me using post below.<br>
				All rules are reserved &copy<br>
  				<span class='authors-mail'>Information about authors - <a href='mailto:elmanov_mr@mail.ru'>Author's post</a></span>
			</div>
		</div>	
	</div>
</body>
</html>



