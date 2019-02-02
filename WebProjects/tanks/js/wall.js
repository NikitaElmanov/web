

function Wall(x, y) {
	this.x = x;
	this.y = y; 
	this.hp = 2; // чтобы сломалась стенка нужно попасть в неё 2 раза
}

function initializeObjectsWalls(walls) {  //for start in init()  //create objects of wall
	for (var i = 0, borderTop = 6; i < map.length; i++, borderTop += box) {  //vertical
		for (var j = 0, borderLeft = box; j < map[i].length; j++, borderLeft += box) {  //horizontal
			if(map[i][j] === 1) {

				walls.push( new Wall(borderLeft, borderTop) );
			}
		}
	}
}

Wall.prototype.checkWallHp = function(indexToRemoveObject) {
	this.hp--;

	if(this.hp < 1) {
		
		audBrokenWall.play();

		clearMap(this.x, this.y);
		walls.splice(indexToRemoveObject, 1);
	}
};