

function Bullet(x, y, dirX, dirY, c, sbp, sbe) {
	this.x = x;
	this.y = y;
	this.r = 2;
	this.speed = 5;
	this.c = c;
	this.dirX = dirX;
	this.dirY = dirY;
	this.shotByPlayer = sbp;
	this.shotByEnemy = sbe;
	this.didNotHitInPlayer = true;
	this.indexTraget = 0;
} 

Bullet.prototype.drawBullet = function() {
	drawCircle(this.x, this.y, this.r, this.c);
};

Bullet.prototype.moveBullet = function() {
	if(this.dirX === 1) { //right
		this.x += this.speed;
	}	
	if(this.dirX === -1) { //left
		this.x -= this.speed;
	}
	if(this.dirY === 1) { //down
		this.y += this.speed;
	}
	if(this.dirY === -1) { //top
		this.y -= this.speed;
	}
};

Bullet.prototype.collisionBordersBullet = function() {
	if(this.x + this.r > width - box*2) { //right
		return true; 
	}	
	if(this.x < box) { //left
		return true;
	}
	if(this.y + this.r > height - 6) { //down
		return true;
	}
	if(this.y < 6) { //top
		return true;
	}
	
	return false;
};

Bullet.prototype.collisionWallsBullet = function() {

	// for (var i = 0, borderTop = 6; i < map.length; i++, borderTop += box) {  //vertical
	// 	for (var j = 0, borderLeft = box; j < map[i].length; j++, borderLeft += box) {  //horizontal
	// 		if(map[i][j] === 1) {

	// 			if (this.x < borderLeft + box && // left |<--         
	// 			   	this.x + this.r > borderLeft && // right -->|            
	// 			   	this.y < borderTop + box && // top
	// 			   	this.y + this.r > borderTop) { // down              



	// 			   	return true;
	// 			}
	// 		}
				
	//     }      
	// }

	for (var i = 0; i < walls.length; i++) {

		if (this.x < walls[i].x + box && // left |<--         
		   	this.x + this.r > walls[i].x && // right -->|            
		   	this.y < walls[i].y + box && // top
		   	this.y + this.r > walls[i].y) { // down              

			walls[i].checkWallHp(i);
			if (this.indexTraget < 1) {
				audTick.play();
				this.indexTraget = 0;
			}

			this.indexTraget++;
			
		   	return true;
		}
	}

	return false;
};

Bullet.prototype.collisionEnemy = function() {
	for (var i = 0; i < enemies.length; i++) {
		if (this.x === enemies[i].x && this.y === enemies[i].y) {
			return true;
		}
	}
	return false;
};

Bullet.prototype.killEnemyOrPlayer = function(indexBullet) {

	    //for colision bullet with enemies
	if(this.shotByPlayer && !this.shotByEnemy) { 
		for(let i = 0; i< enemies.length; i++) {

			if (this.x < enemies[i].x + box &&   // <--   
			   	this.x + this.r/2 > enemies[i].x &&   // -->
			   	this.y < enemies[i].y + box &&   // top
				this.y + this.r/2 > enemies[i].y) {   // down

				BOOM(enemies[i].x, enemies[i].y);

				audRip.play();

				enemies.splice(i, 1);
				enemies.push(new Enemy());

				bullets.splice(indexBullet, 1);

				player.score++;
			}
		}
	}
	else {       //for colision bullet with player

		if (this.x < player.x + box &&   // <--   
		   	this.x > player.x &&         // -->
		   	this.y < player.y + box &&   // top
			this.y > player.y) {         // down

			BOOM(player.x, player.y);
			bullets.splice(indexBullet, 1);
			audRip.play();

			if(this.didNotHitInPlayer) { //для того чтобы -1 хп происходило при попадании одной пули (а не вычиталось по 1 каждый цикл пока пуля летив в области player)
				this.didNotHitInPlayer = false;
				player.hp--;
			}
		}
	}
};

Bullet.prototype.collisionEnemy = function() {
	for (var i = 0; i < enemies.length; i++) {
		if (this.x === enemies[i].x && this.y === enemies[i].y) {
			return true;
		}
	}
	return false;
};

Bullet.prototype.collisionWithEagle = function(indexBullet) {

  	if (this.x < eagle.x + eagle.size &&   // <--   
	   	this.x > eagle.x &&                // -->
	   	this.y < eagle.y + eagle.size &&   // top
		this.y > eagle.y) {                // down

  		
  		BOOM(this.x - box/2, this.y-box/2);
  		bullets.splice(indexBullet, 1);

  		eagle.hp--;

  		return true;
  	}

  	return false;
};

function BOOM(x ,y) {
	
	ctx.drawImage(imgBoom, x, y);
}

