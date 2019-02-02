
var x = 0,
	x2 = 0;
var text  = document.querySelector("#block-text");
var color_block = document.querySelector("#cb-color");

document.querySelector("#cross-bar").onclick = function () {

	var timer = setInterval( function() {

		if (color_block.style.width == 100 + '%'){
			clearInterval(timer);
		}

		text.innerHTML = x + '%';

		x++;
		color_block.style.width = x + '%';
		x2 += 1.35;
		text.style.marginLeft = x2 + 'px';
	}, 100);
}

document.getElementById("help").addEventListener("click", function (){
	location.reload();
});
