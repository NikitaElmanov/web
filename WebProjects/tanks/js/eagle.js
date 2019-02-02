 var eagle = {
 	hp: 4,
 	size: 64,
 	x: 640/2,
 	y: 582,
 	draw: function() {
 		var img = new Image();

 		switch(this.hp) {
 			case 4:
 				img.src = massImgEagle[3];
 				break;
 			case 3:
 				img.src = massImgEagle[2];
 				break;
 			case 2:
 				img.src = massImgEagle[1];
 				break;
 			case 1:
 				img.src = massImgEagle[0];
 				break;
 		}

 		ctx.drawImage(img, this.x, this.y);
 	},
 };