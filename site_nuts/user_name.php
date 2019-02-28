<?php 

	if (isset($_SESSION['user'])){
		echo "<p style='text-align: center; font-size: 1vw; color: MidnightBlue; font-weight: bold;'>{$_SESSION['user']}</p>";
	}

?>