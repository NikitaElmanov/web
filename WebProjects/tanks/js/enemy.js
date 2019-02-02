function Enemy() {
	this.x = (Math.floor(Math.random() * (640/box - 1 + 1)) + 1) * box;
	this.y = (Math.floor(Math.random() * (544/box - 1 + 1)) + 1) * box;
	this.shift = 1;
	this.countSteps = 0;
	this.randSteps = 0;
	this.dir = "DOWN";
	this.colorBullet = "#FF0012";
	this.randDir = 0;
	this.valueBullet = 0;
	this.changedDir = false;
	this.speedTop   = 1;
	this.speedDown  = 1;
	this.speedRight = 1;
	this.speedLeft  = 1;
}

Enemy.prototype.constructor = Enemy;

Enemy.prototype.moveEnemy = function() {
	
	if(this.countSteps < this.randSteps) {
		if(this.dir === "RIGHT") {
			this.x += this.shift * this.speedRight;
		}
		if(this.dir === "LEFT") {
			this.x -= this.shift * this.speedLeft;
		}
		if(this.dir === "TOP") {
			this.y -= this.shift * this.speedTop;
		}
		if(this.dir === "DOWN") {
			this.y += this.shift * this.speedDown;
		}
		
		this.countSteps++;
	}
	else {
		this.newDirection();
	}
};

 Enemy.prototype.newDirection = function(direction) {
	this.randSteps = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
	var randDir = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // 1=RIGHT; 2=LEFT; 3=TOP; 4=DOWN  

	if(direction === "RIGHT") {
		direction = 1;
	}
	if(direction === "LEFT") {
		direction = 2;
	}
	if(direction === "TOP") {
		direction = 3;
	}
	if(direction === "DOWN") {
		direction = 4;
	}

	while(randDir === direction) {   //Это нужно, чтобы рандомно выбранное направление не было тем же самым как и предыдущее
		randDir = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
	}

	this.countSteps = 0;
	this.changedDir = true;
	this.valueBullet = 0;

	switch(randDir) {
		case 1: 
			this.dir = "RIGHT";
			break;
		case 2: 
			this.dir = "LEFT";
			break;
		case 3: 
			this.dir = "TOP";
			break;
		case 4: 
			this.dir = "DOWN";
			break;
	}
}

Enemy.prototype.drawEnemy = function() {
	// if(this.dir === "RIGHT") {
	// 	imgEnemy.src = imgTankEnemy[3];
	// }
	// if(this.dir === "LEFT") {
	// 	imgEnemy.src = imgTankEnemy[2];
	// }
	// if(this.dir === "TOP") {
	// 	imgEnemy.src = imgTankEnemy[0];
	// }
	// if(this.dir === "DOWN") {
	// 	imgEnemy.src = imgTankEnemy[1];
	// }

	 ctx.drawImage(imgEnemy, this.x, this.y);
};

Enemy.prototype.shoot = function() {

	if(this.dir === "RIGHT") {
		if(this.valueBullet < 1  && this.changedDir) {
			bullets.push(new Bullet(this.x + box/2, this.y + box/2, 1, 0, this.colorBullet, false, true));
			this.valueBullet++;
			this.changedDir = false;

			audShootEnemy.play();
		}
		else {
			this.valueBullet = 0;
		}
	} 
	if(this.dir === "LEFT") {
		if(this.valueBullet < 1  && this.changedDir) {
			bullets.push(new Bullet(this.x + box/2, this.y + box/2, -1, 0, this.colorBullet, false, true));
			this.valueBullet++;
			this.changedDir = false;

			audShootEnemy.play();
		}
		else {
			this.valueBullet = 0;
		}
	}
	if(this.dir === "DOWN"){
		if(this.valueBullet < 1  && this.changedDir) {
			bullets.push(new Bullet(this.x + box/2, this.y + box/2, 0, 1, this.colorBullet, false, true));
			this.valueBullet++;
			this.changedDir = false;

			audShootEnemy.play();
		}
		else {
			this.valueBullet = 0;
		}
	} 
	if(this.dir === "TOP") {
		if(this.valueBullet < 1 && this.changedDir) {
			bullets.push(new Bullet(this.x + box/2, this.y + box/2, 0, -1, this.colorBullet, false, true));
			this.valueBullet++;
			this.changedDir = false;

			audShootEnemy.play();
		}
		else {
			this.valueBullet = 0;
		}
	}

};

Enemy.prototype.checkNormalPos = function () {
	for (var i = 0, borderTop = 6; i < map.length; i++, borderTop += box) {  //vertical
		for (var j = 0, borderLeft = box; j < map[i].length; j++, borderLeft += box) {  //horizontal
			if(map[i][j] === 1) {
				while (this.x < borderLeft + box && // left |<--         /*
					   	this.x + box > borderLeft && // right -->|            ------Условие (*) -------------
					   	this.y < borderTop + box && // top
					   	this.y + box > borderTop || // down 
					   	(player.x === this.x && player.y === this.y)) { 

					this.x = (Math.floor(Math.random() * (640/box - 1 + 1)) + 1) * box;
					this.y = (Math.floor(Math.random() * (640/box - 1 + 1)) + 1) * box;
				}
			}
		}
	}
};

Enemy.prototype.collisionBordersEnemy = function() {
	if(this.x < box) { //left

		this.x = box;
		this.newDirection("LEFT");
	}
	if(this.x +box > width - box*2) { //right

		this.x =  width-box*3;
		this.newDirection("RIGHT");
	}
	if(this.y < 6) { //up

		this.y = 6;
		this.newDirection("TOP");
	}
	if(this.y + box > height - 6) { //down

		this.y = height - 6 - box;
		this.newDirection("DOWN");
	}
};

Enemy.prototype.collisionWallsEnemy = function() {
	for (var i = 0, borderTop = 6; i < map.length; i++, borderTop += box) {  //vertical
		for (var j = 0, borderLeft = box; j < map[i].length; j++, borderLeft += box) {  //horizontal
			if(map[i][j] === 1) {

				if (this.x < borderLeft + box && // left |<--         /*
				   	this.x + box > borderLeft && // right -->|            ------Условие (*) -------------
				   	this.y < borderTop + box && // top
				   	this.y + box > borderTop) { // down                /*

				   	if(this.dir === "LEFT") { // ехал наЛево
				   		this.newDirection("LEFT");
				   		this.x += 1; //во всех отсальных ифах if() тоже самое. Т.е. сдвигаем координаты игрока, чтобы условие(*) повторно не срабатывало
					}					 
				   	if(this.dir === "RIGHT") { // ехал наПраво
				   		this.newDirection("RIGHT"); 0;
				   		this.x -= 1;
				   	}
				   	if(this.dir === "TOP") { // ехал Вверх
				   		this.newDirection("TOP");
				   		this.y += 1; 
				   	} 
				   	if(this.dir === "DOWN") { // ехал Вниз
				   		this.newDirection("DOWN");
				   		this.y -= 1;
				   	}
				}
			}
		}//end for(2)
	}//end for(1)
};

Enemy.prototype.collisionWithYourself = function(index) {
	for (var i = 0; i < enemies.length; i++) {
		if (index !== i) {
			if (this.x < enemies[i].x + box &&   // <--
			   	this.x + box > enemies[i].x &&   // -->
			   	this.y < enemies[i].y + box &&   // top
				this.y + box > enemies[i].y) {      // down

				if(this.dir === "LEFT") { // ехал наЛево
			   		this.newDirection("LEFT");

			   		this.x += box/8; //во всех отсальных ифах if() тоже самое. Т.е. сдвигаем координаты игрока, чтобы условие(*) повторно не срабатывало
				}					 
			   	if(this.dir === "RIGHT") { // ехал наПраво
			   		this.newDirection("RIGHT");

			   		this.x -= box/8;
			   	}
			   	if(this.dir === "TOP") { // ехал Вверх
			   		this.newDirection("TOP");

			   		this.y += box/8; 
			   	} 
			   	if(this.dir === "DOWN") { // ехал Вниз
			   		this.newDirection("DOWN");

			   		this.y -= box/8;
				}
			} // if 2
		} // if 1
	} //end for
};