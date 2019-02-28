// window.document.onload = function() { 

	var posDir = 0;
	var polosa = document.getElementById('polosa');

	document.getElementById('slider-left').onclick = function(){
		posDir -= 13;
		if(posDir < -39){
			posDir = 0;
		}
		polosa.style.left = posDir+'vw';
	};



	document.getElementById('slider-right').onclick = function(){
		posDir += 13;
		if(posDir == 13){
			posDir = -39;
		}
		polosa.style.left = posDir+'vw';
	};

	var timerId = setInterval(function() {
		posDir -= 13;
		if(posDir < -39){
			posDir = 0;
		}
		polosa.style.left = posDir+'vw';
	}, 5000);
// };