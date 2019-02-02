let player = {
	x: 335,//center of 
	y: 515,// the map
	speed: 5,
	hp: 3,
	score: 0,
	dX: 0,
	dY: 0,

	mayGoLeft: true,
	mayGoRight: true,
	mayGoTop: true,
	mayGoDown: true,

	colorBullet: "#FFFC00",

	movePlayer: function(dirX, dirY) {
		this.dX = dirX;
		this.dY = dirY;

		this.x += this.speed*this.dX;
		this.y += this.speed*this.dY;
	},
	drawPlayer: function() {
		ctx.drawImage(imgTank, this.x, this.y);

		//FOR GUN OF Circle
		if(player.dX === 1) { //right
			imgTank.src = imgTanksPlayer[3];
		}
		if(player.dX === -1) { //left
			imgTank.src = imgTanksPlayer[2];
		}
		if(player.dY === 1) { //down
			imgTank.src = imgTanksPlayer[1];
		}
		if(player.dY === -1) { //up
			imgTank.src = imgTanksPlayer[0];
		}
	},
	collisionBordersPlayer: function() {
		if(this.x < box) { //left
			this.x = box;
		}
		if(this.x +box > width - box*2) { //right
			this.x =  width-box*3
		}
		if(this.y < 6) { //up
			this.y = 6;
		}
		if(this.y + box > height - 6) { //down
			this.y = height - 6 - box;
		}
	},
	collisionWallsPlayer: function() {

		for (var i = 0, borderTop = 6; i < map.length; i++, borderTop += box) {  //vertical
			for (var j = 0, borderLeft = box; j < map[i].length; j++, borderLeft += box) {  //horizontal
				if(map[i][j] === 1) {

					if (this.x < borderLeft + box && // left |<--         /*
					   	this.x + box > borderLeft && // right -->|            ------Условие (*) -------------
					   	this.y < borderTop + box && // top
					   	this.y + box > borderTop) { // down                /*

					   	if(this.dX === -1) { // ехал наЛево
					   		this.mayGoLeft = false;

					   		this.x += 1; //во всех отсальных ифах if() тоже самое. Т.е. сдвигаем координаты игрока, чтобы условие(*) повторно не срабатывало
						}					 
					   	if(this.dX === 1) { // ехал наПраво
					   		this.mayGoRight = false;

					   		this.x -= 1;
					   	}
					   	if(this.dY === -1) { // ехал Вверх
					   		this.mayGoTop = false;

					   		this.y += 1; 
					   	} 
					   	if(this.dY === 1) { // ехал Вниз
					   		this.mayGoDown = false;

					   		this.y -= 1;
					   	}
					}
				}
			}//end for(2)
		}//end for(1)

	},
	collisionEnemyPlayer: function () {
		for (var i = 0; i < enemies.length; i++) {
			if (this.x < enemies[i].x + box &&   // <--
			   	this.x + box > enemies[i].x &&   // -->
			   	this.y < enemies[i].y + box &&   // top
				this.y + box > enemies[i].y) {   // down

				if(enemies[i].dir === "LEFT") { // ехал наЛево
			   		enemies[i].speedTop = 1;
					enemies[i].speedDown = 1;
					enemies[i].speedRight = 1;
					enemies[i].speedLeft = 0;

					this.mayGoLeft = true;
					this.mayGoDown = true;
					this.mayGoTop = true;
					this.mayGoRight = false;

					//enemies[i].newDirection("LEFT");
				}					 
			   	if(enemies[i].dir === "RIGHT") { // ехал наПраво
			   		enemies[i].speedTop = 1;
					enemies[i].speedDown = 1;
					enemies[i].speedRight = 0;
					enemies[i].speedLeft = 1;


					this.mayGoLeft = false;
					this.mayGoDown = true;
					this.mayGoTop = true;
					this.mayGoRight = true;
					//enemies[i].newDirection("RIGHT");
			   	}
			   	if(enemies[i].dir === "TOP") { // ехал Вверх
			   		enemies[i].speedTop = 0;
					enemies[i].speedDown = 1;
					enemies[i].speedRight = 1;
					enemies[i].speedLeft = 1;


					this.mayGoLeft = true;
					this.mayGoDown = false;
					this.mayGoTop = true;
					this.mayGoRight = true;
					//enemies[i].newDirection("TOP");
			   	} 
			   	if(enemies[i].dir === "DOWN") { // ехал Вниз
			   		enemies[i].speedTop = 1;
					enemies[i].speedDown = 0;
					enemies[i].speedRight = 1;
					enemies[i].speedLeft = 1;


					this.mayGoLeft = true;
					this.mayGoDown = true;
					this.mayGoTop = false;
					this.mayGoRight = true;
					//enemies[i].newDirection("DOWN");
				}
			} // if 2
		}
	}
};