
let directBulletX = 0, directBulletY = -1; //начальное направление пули

window.onkeydown = function(e) {

	if ((e.keyCode === 38 || e.keyCode === 87) && player.mayGoTop) { // up
		player.movePlayer(0, -1);

		directBulletX =  0;
		directBulletY = -1;

		mayGo();
	} 
	else if ((e.keyCode === 40 || e.keyCode === 83) && player.mayGoDown) { // down
		player.movePlayer(0, 1);

		directBulletX = 0;
		directBulletY = 1;

		mayGo();
	} 
	else if ((e.keyCode === 37 || e.keyCode === 65) && player.mayGoLeft) {//left
		player.movePlayer(-1, 0);

		directBulletX = -1;
		directBulletY =  0;

		mayGo();
	} 
	else if ((e.keyCode === 39 || e.keyCode === 68) && player.mayGoRight) {//right
		player.movePlayer(1, 0);

		directBulletX = 1;
		directBulletY = 0;

		mayGo();
	}

	if(e.keyCode === 32) { //for MOVE BULLETS
		bullets.push(new Bullet(player.x + imgTank.width/2, player.y + imgTank.height/2, directBulletX, directBulletY, player.colorBullet, true, false));
		audShootPlayer.play();
	}

	if (e.keyCode === 13) {
		if (typeof gameLoop !== "function") {
			location.reload();
		}
	}
};


function mayGo() {
	player.mayGoLeft = true;
	player.mayGoRight = true;
	player.mayGoTop = true;
	player.mayGoDown = true;
}