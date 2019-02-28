

<style>
	div .good {
		display: inline-block;
		font-size: 16px;
		font-family: Calibri;
		margin-left: 3vw;
		margin-top: 2vw;
		border-radius: 5px;
		border: 2px solid Olive;
		width: 17vw;
		height: 21vw;
	}

	div .good img {
		width: 100%; 
		height: 13vw;
		border-bottom: 2px solid RosyBrown;
		border-radius: 5px;
	}

	div .good:hover {
		transition: all ease-in-out 0.5s;
		box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}

	div .good img:hover {
		opacity: 0.5;
		transition: 1s all;
	}

	div .good span {
		margin-left: 0.4vw;
	}

	div .good input{
		width: 4vw;
		float: right;
		margin-right: 0.3vw;
		margin-bottom: 0.2vw;
		border: 2px solid Olive;
		border-radius: 3px;
		background-color: #FAFAD2;
		color: Olive;
	}

	div .good input:hover {
		color: black;
		border: 2px solid black;
	}

	div .good a {
		margin-left: 1vw;
		margin-top: 0.5vw;
		border: 2px solid Olive;
		border-radius: 3px;
		background-color: white;
		margin-left: 10vw;
	}

	div .good a:hover {
		border: 2px solid white;
		border-radius: 3px;
		background-color: Olive;
	}
</style>

<?php

include_once 'connect_db.php';

$nuts = array ('фундук', 'арахис', 'кедр', 'кешью', 'фисташки', 'семячки');
$i = 0;
$sql = "SELECT p.id, p.ammount, p.price, n.name FROM pack300 p inner join nuts n on p.id_nut = n.id;";
$result = mysqli_query($link, "SELECT * FROM pack300;");


while ($row = mysqli_fetch_row($result)) 
{ 
	echo "<div class='good'>
	<img src='imgs/$nuts[$i].jpg'><br>
	<span class='base-packs' id='{$row[1]}'>Пакетов на базе: {$row[1]}</span><br>
	<span>Цена за 1 пакет: {$row[3]} руб.</span><br>
	<span>Введите кол-во пакетов</span><input type='number' id='{$row[0]}' pattern='[0-9]{1,2}'><br/><br/>
	<a href='#'>Add to cart</a>
	</div>";  
	$i++;
} 
?>