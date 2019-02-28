<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>site</title>
	<link type="text/css" rel="stylesheet" href="style.css" />
	<link rel="stylesheet" type="text/css" href="styleSlider.css">
	<link rel="icon" href="imgs/amblem.png">
	<script src="https://code.jquery.com/jquery-3.0.0.min.js"> </script>
	<script type="text/javascript" src='js/main.js' defer></script>
	<script type="text/javascript">
		 $(document).ready(function () { 
		 	$(".good a").click(function setCartIdAndAmmount(){ 
		 		var parent = $(this).parent(); 
		 		
		 		var count = parent.find('input').val();
		 		var id = parent.find('input').attr('id');

		 		// проверка на кол-во пакетов
		 		if(count <= 0) {
		 			alert("Вы ввели отрицательное количество пакетов. Попробуйте снова");
		 			return 1; 
		 		}

		 		$.ajax({
		 			type: "POST",
		 			url: "logic_cart.php",
		 			data: {id: id, count: count},
		 			success: function(data){alert('Good is added');}
		 		});

		 		return false; 
		 	}); 

		 	$("#cart img").click(function transferToCart(e){ 
		 		e.preventDefault();
  			    window.location.href = 'busket.php';
	 		});

			document.getElementsByClassName('login')[0].onclick = function(){ //////////////////login
				document.getElementsByClassName('form_interence')[0].style.display = 'block';
			};

			document.getElementsByClassName('form-exit')[0].onclick = function(){
				document.getElementsByClassName('form_interence')[0].style.display = 'none';///////////////////////
			};

			document.getElementsByClassName('logup')[0].onclick = function(){///////////////////registration
				document.getElementsByClassName('form_registration')[0].style.display = 'block';
			};

			document.getElementsByClassName('form-exit')[1].onclick = function(){
				document.getElementsByClassName('form_registration')[0].style.display = 'none';
			};   

			document.getElementsByClassName('logout')[0].onclick = function(){///////////////////registration
				$.ajax({
		 			type: "GET",
		 			url: "destroy_user_session.php",
		 			success: function(){
		 				alert('you finished session');
	 					document.location.reload(true);
		 			}
		 		});
			};                                                                    /////////////////////////////
	 		
		});
	</script>
</head>
<body id='fon' style='background-image: url(imgs/fon.jpg); background-attachment: fixed; background-position: 0px 0px;	background-repeat: repeat;
	background-size: contain; '>
	<div id="wrapper">
		<div id="header">
			<div class="inner-header">
				<div class="caption">
					<a href='index.php'><img src="imgs/amblem.png" alt="amblem"/></a>
					<a href='index.php'><span class="caption-text" style='font-family: Calibri;'>Nuts world</span></a>

					<div class="side">
						<ul class="menu">
							<li class="menu__list"><a href="index.php">Home</a></li>
							<li class="menu__list"><a href="busket.php">Busket</a></li>
							<li class="menu__list"><a href="#">About us</a>
								<ul class="menu__drop">
									<li><a href='creators.html'>Creators</a></li>
									<li><a href='documentation.html'>Documentation</a></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div id="left-col">
			<div class="inner-left">
				<div class="side">
					<ul class="menu">
						<li class="menu__list"><a href="file:///C:/Users/MaxNick/Desktop/Институт/3%20курс%201%20семестр/лабы%20по%20WEB-программированию/лабы/ЛАБА_2(css)/2%20file/4%20работа%20-%20%202%20file/index_lab2_file2_4.html">Home</a></li>
						<li class="menu__list"><a href="busket.php">Busket</a>
						</li>
						<li class="menu__list"><a href="#">About us</a>
							<ul class="menu__drop">
								<li><a href='creators.html'>Creators</a></li>
								<li><a href='documentation.html'>Documentation</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>	
		</div>
		<div id="center-col">
			<div class="inner-center">

				<div id="main-slider">
					<button id="slider-left">&lt;</button>
					<div id='slider'>
						<div id='polosa'>
							<img src="imgs/фундук.jpg">
							<img src="imgs/арахис.jpg">
							<img src="imgs/кедр.jpg">
							<img src="imgs/кешью.jpg">
							<img src="imgs/фисташки.jpg">
							<img src="imgs/семячки.jpg">
						</div>
					</div>
					<button id="slider-right">&gt;</button>
				</div>

				<?php
					include_once 'main.php'; 
				?>
			</div>
		</div>
		<div id="right-col">
			<div class="inner-right">
				<div id="cart">
					<?php
						include 'user_name.php'; 
					?>
					<div class='log' style="text-align: center; font-family: Calibri; font-size: 1.7vw; color: SteelBlue; margin-bottom: 5vw; margin-top: 5vw;">
						<div class='login' style="border: 2px solid Olive; color: MidnightBlue; width: 7vw; border-radius: 3px; margin: 0 auto; cursor: pointer;">Sing in</div>
						<br>
						<div class='logup' style="border: 2px solid Olive; color: MidnightBlue; width: 7vw; border-radius: 3px; margin: 0 auto; cursor: pointer;">Sing up</div>
						<br>
						<div class='logout' style="border: 2px solid Olive; color: MidnightBlue; width: 7vw; border-radius: 3px; margin: 0 auto; cursor: pointer;">Sing out</div>
					</div>
					<img src="imgs/cart.png" alt="cart" style='cursor: pointer; display: block; margin: 0 auto'>
				</div>	
			</div>
		</div>
		<div class='form_interence' style='border-radius: 5px; width: 500px; height: 500px; position: fixed; margin: 10px 30vw; display: none; z-index: 3; background-color: white;'>
			<div  class='form-exit' style='position: absolute; left: 97%; cursor: pointer;'>&#9746;</div>

			<div id='inter' style='position: absolute; left: 3vw; top: 13vw; color: Olive; '>
				<form action="form_interence.php" method="POST">
					<span>E-mail:</span> <input class='mail-client' type="mail" pattern='[A-Za-z0-9_-]{3,}@[A-Za-z]{3,}.[A-Za-z]{2,5}' name="user_mail" style="width: 23.2vw; height: 2vw;"/>
					<br><br>
					<span>Password:</span> <input type="password" name="user_password"  style="width: 22vw; height: 2vw;"/>
					<br><br>
					<input type="submit" value='Sing in'/>
				</form>
			</div>
		</div>
		<div class='form_registration' style='border: 2px solid Olive; border-radius: 5px; width: 500px; height: 500px; position: fixed; margin: 10px 30vw; display: none; z-index: 3; background-color: white;'>
			<div  class='form-exit' style='position: absolute; left: 96%; cursor: pointer;'>&#9746;</div>

			<div id='reg' style='position: absolute; left: 3vw; top: 13vw; color: Olive; '>
				<form action="form_registration.php" method="POST">
					<span>E-mail:</span> <input type="mail" pattern='[A-Za-z0-9_-]{3,}@[A-Za-z]{3,}.[A-Za-z]{2,5}' name="user_mail" style="width: 23.2vw; height: 2vw;"/>
					<br><br>
					<span>Password:</span> <input type="password" name="user_password"  style="width: 22vw; height: 2vw;"/>
					<br><br>
					<input type="submit" value='Sing up'/>
				</form>
			</div>
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