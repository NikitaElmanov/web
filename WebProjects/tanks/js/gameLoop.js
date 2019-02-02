


var gameLoop = function() {

	clear();
	drawGraund();
	drawWalls();

	//EAGLE
	eagle.draw();

	//PLAYER
	player.drawPlayer();
	player.collisionBordersPlayer();
	player.collisionWallsPlayer();
	player.collisionEnemyPlayer();

	//BULLET
	for(let i = 0; i < bullets.length; i++) {
		bullets[i].drawBullet();
		bullets[i].moveBullet();

		if(bullets[i].collisionWallsBullet()) {
			BOOM(bullets[i].x - box/2, bullets[i].y - box/2);

			bullets.splice(i, 1);
			continue;
		}

		if (bullets[i].collisionEnemy() && bullets[i].shotByPlayer && !bullets[i].shotByEnemy) {
			BOOM(bullets[i].x - box/2, bullets[i].y - box/2);

			var tempEnemy = new Enemy();
			enemies.push(tempEnemy);
			tempEnemy.checkNormalPos();
			bullets.splice(i, 1);
			continue;
		}

		if(bullets[i].collisionBordersBullet()) {
			BOOM(bullets[i].x - box/2, bullets[i].y - box/2);
			audTick.play();
			bullets.splice(i, 1);
			continue;
		}

		if(bullets[i].collisionWithEagle(i)) {
			continue;
		}

		bullets[i].killEnemyOrPlayer(i);
	}

	//ENEMY
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].drawEnemy();
		enemies[i].moveEnemy();
		enemies[i].shoot();
		enemies[i].collisionWallsEnemy();
		enemies[i].collisionBordersEnemy();
		enemies[i].collisionWithYourself(i);
	}

	GameOver(); // проверка на конец игры (hp < 1)
	
	scoreText();
	HpText();

	if(typeof gameLoop == "function") {
		requestAnimationFrame(gameLoop);
	}
};


window.addEventListener("load", function() {

	init();

	audFon.play();

	gameLoop();
});