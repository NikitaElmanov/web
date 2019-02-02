window.addEventListener("load", startGame);

var myGamePiece;
var myUpBtn;
var myDownBtn;
var myLeftBtn;
var myRightBtn;
var massObstacles = [new Obtacle(485, 120, 40, 200, "imgs/cat_1.png"), new Obtacle(485, -120, 40, 200, "imgs/cat_2.png")];
var score;

function Text(x, y, score, px, color){
	this.scoreText = score;
	this.x = x;
	this.y = y;
	this.px = px;
	this.color = color;
	this.update = function() {

		if(this.scoreText >= 10 && this.scoreText < 100) {
			this.x = 360;
		}
		else if (this.scoreText >= 100 && this.scoreText < 1000) {
			this.x = 340;
		}
		else if(this.scoreText >= 1000){
			this.x = 320;
		}

		myGameArea.ctx.fillStyle = this.color;
		myGameArea.ctx.font = this.px + " Calibri";
		myGameArea.ctx.fillText("Score: "+ this.scoreText, this.x, this.y);
	};
}

function Obtacle(x, y, width, height, imgSrc) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.image = new Image();
	this.image.src = imgSrc;
	this.update = function() {
		this.x--;
		myGameArea.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	};
	this.destroy = function(index) {
		if(this.x < -35) {
			massObstacles.splice(index, 1);
		}
	};
	this.createNewObtacle = function() {

		if(massObstacles[massObstacles.length - 1].x < 150) {
			var randY_1 = (Math.floor(Math.random() * (-40 - (-270) + 1)) - 270);
			var randY_2 = (Math.floor(Math.random() * (270 - (40) + 1)) + 40);
			
			while(Math.abs(randY_2) - Math.abs(myGameArea.canvas.height - Math.abs(randY_1)) < 50 || 
				  Math.abs(randY_2) - Math.abs(myGameArea.canvas.height - Math.abs(randY_1)) > 100) {
				randY_1 = (Math.floor(Math.random() * (-40 - (-270) + 1)) - 270);
				randY_2 = (Math.floor(Math.random() * (270 - (40) + 1)) + 40);
			}

			score.scoreText++; //increase scores
			var item_1 = new Obtacle(485, randY_1, 40, 270, "imgs/cat_2.png");
			var item_2 = new Obtacle(485, randY_2, 40, 270, "imgs/cat_1.png");
			massObstacles.push(item_1);
			massObstacles.push(item_2);
		}
	};
	this.crashWith = function (anyObj) {
		//some obtacle
		var myLeft = this.x;
		var myRight = this.x + this.width;
		var myUp = this.y;
		var myDown = this.y + this.height; 

		//red box
		var anyLeft = anyObj.x;
		var anyRight = anyObj.x + anyObj.width;
		var anyUp = anyObj.y;
		var anyDown = anyObj.y + anyObj.height; 

		if( anyDown > myUp && anyRight > myLeft && anyLeft < myRight && anyUp < myDown) {
			myGameArea.stop();
		}
	};
}

function startGame(){
	myGameArea.start();
	myGamePiece = new component(30, 20, "imgs/hole_1.png", 10, 120, "image");
	myBackground = [new component(480, 270, "imgs/background1.png", 0, 0, "background"), new component(480, 270, "imgs/background2.png", 480, 0, "background")];
	myUpBtn = new component(30, 30, "rgb(0, 0, 255, 0.5)", 50, 10);
	myDownBtn = new component(30, 30, "rgb(0, 0, 255, 0.5)", 50, 70);
	myLeftBtn = new component(30, 30, "rgb(0, 0, 255, 0.5)", 20, 40);
	myRightBtn = new component(30, 30, "rgb(0, 0, 255, 0.5)", 80, 40);
	score = new Text(380, 30, 0, "30px", "grey");
}

var myGameArea ={
	canvas: document.createElement("canvas"),
	start: function(){
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.ctx = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 10); //game LOOP
		window.addEventListener("mousedown", function(e){
			myGamePiece.img.src = "imgs/hole_2.png";
			myGameArea.x = e.pageX;
			myGameArea.y = e.pageY;
		});
		window.addEventListener("mouseup", function(e){
			myGamePiece.img.src = "imgs/hole_1.png";
			myGameArea.x = false;
			myGameArea.y = false;
		});
		window.addEventListener("keydown", function(e){
			myGamePiece.img.src = "imgs/hole_2.png";
			myGameArea.key = e.keyCode;
		});
		window.addEventListener("keyup", function(e){
			myGamePiece.img.src = "imgs/hole_1.png";
			myGameArea.key = false;
		});
	},
	videoPlay: function(){
		this.video.play();
	},
	videoStop: function(){
		this.video.pause();
	},

	clear: function(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function(){
		clearInterval(this.interval);
	}
};

function component(width, height, color, x, y, type){
	this.type = type;
	if (this.type == "image" || this.type == "background"){
		this.img = new Image();
		this.img.src = color; 
	}
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function(){
		var ctx = myGameArea.ctx;
		if (this.type == "image"){
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		} else if (this.type == "background"){
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	};
	this.clicked = function(){
		switch(myGameArea.key){
			case 37:{ moveLeft(); break;}
			case 38:{ moveUp(); break;}
			case 39:{ moveRight(); break;}
			case 40:{ moveDown(); break;}
		}

		var myLeft = this.x;
		var myRight = this.x + this.width;
		var myUp = this.y;
		var myDown = this.y + this.height;

		if(myGameArea.x && myGameArea.y && 
		   myGameArea.x >= myLeft && myGameArea.x <= myRight &&
		   myGameArea.y >= myUp && myGameArea.y <= myDown) {
			return true;
		}
		return false;
	};

	this.Pos = function(){
		this.x--;

		if (this.x <= -(this.width)){
			this.x = this.width;
		}
	};

	this.collidBorders = function () {
		if (this.x < 0) {
			this.x = 0;
		}
		else if( this.x + this.width > myGameArea.canvas.width) {
			this.x = myGameArea.canvas.width - this.width;
		}
		else if (this.y < 0) {
			this.y = 0;
		}
		else if (this.y > myGameArea.canvas.height - this.height) {
			this.y = myGameArea.canvas.height - this.height;
		}
	};
}

function updateGameArea(){
	myGameArea.clear();
	for (var i = 0; i < myBackground.length; i++) {
		 myBackground[i].update();
		 myBackground[i].Pos();
	}
	if( myUpBtn.clicked() ) { moveUp(); }
	if( myDownBtn.clicked() ) { moveDown(); }
	if( myLeftBtn.clicked() )  { moveLeft(); }
	if( myRightBtn.clicked() )  { moveRight(); }

	for(var i=0; i<massObstacles.length; i++) {
		massObstacles[i].update();
		massObstacles[i].destroy(i);
	    massObstacles[i].crashWith(myGamePiece);
	    massObstacles[i].createNewObtacle();
	}

	myGamePiece.update();
	myGamePiece.collidBorders();

	score.update();

	myUpBtn.update();
	myDownBtn.update();
	myLeftBtn.update();
	myRightBtn.update();
}

function moveUp(){
	myGamePiece.y--;
}

function moveDown(){
	myGamePiece.y++;
}

function moveLeft(){
	myGamePiece.x--;
}

function moveRight(){
	myGamePiece.x++;
}