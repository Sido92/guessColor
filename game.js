var numSquares = 6;
var colors = [];
var pickedColor;
var points = document.querySelector("#points");
var pointsCount = 0;
var max = document.querySelector("#max");
var maxCount = 0;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var container = document.getElementById("container");
var percentCount = 0;
var percent = document.querySelector("#percent");

init();

function init() {

	setMode();
	setSquares();
	reset();

}

function setSquares() {
	colorDisplay.innerHTML = pickedColor;


	for (var i=0;i < squares.length; i++) {
		//add initial colort to squares
		squares[i].style.backgroundColor = colors[i];

		//add click listeners
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			maxCount++;
			max.innerHTML = maxCount;
			if (clickedColor === pickedColor) {
				pointsCount++;
				points.innerHTML = pointsCount;
				messageDisplay.style.color = this.style.backgroundColor;
				messageDisplay.textContent = "CORRECT!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play again?";
				setTimeout(function() {reset();}, 1500);
				

			} else {
				messageDisplay.style.color = this.style.backgroundColor;
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "TRY AGAIN!";
			}

			percentCount = Math.round(pointsCount/maxCount*100);
			percent.innerHTML = percentCount;

		});
	};

}
function setMode() {

		for(var i = 0;  i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			resetScore();
			
			if (this.textContent === "Easy") { numSquares = 3; 
			} else if (this.textContent === "Hard") {numSquares = 6;
			} else {
				numSquares = 9;
			}

			reset();
		});
	};
}

function reset() {

	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";

	for (var i=0;i < squares.length; i++) {
	//add initial colort to squares
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		squares[i].style.backgroundColor = colors[i];
	};

	
}

/*easyBtn.addEventListener("click", function() {
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	numSquares = 3;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = document.querySelector("body").style.backgroundColor;

	for (var i=0;i < 3; i++) {
	//add initial colort to squares
	squares[i].style.backgroundColor = colors[i];
	}

	for (var i=3;i <= 5; i++) {
	//add initial colort to squares
	squares[i].style.display = "none";
	}

});

hardBtn.addEventListener("click", function() {
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = document.querySelector("body").style.backgroundColor;

	for (var i=0;i < squares.length; i++) {
	//add initial colort to squares
	squares[i].style.backgroundColor = colors[i];
	squares[i].style.display = "block";
	}
});*/





function changeColors(color){
	for(var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor  = color;
	};
};

function pickColor() {
	//pick a random number
	var randomSquare = Math.floor(Math.random() * colors.length);

	//return color
	return colors[randomSquare];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to arr
	for (var i = 0; i < num ; i++) {
		arr.push(randomColor());
	};
	//return that arr
	return arr;

}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r +", "+g+", "+b+")";

}

function resetScore() {
	pointsCount = 0;
	maxCount = 0;
	percentCount = 0;
	points.innerHTML = pointsCount;
	max.innerHTML = maxCount;
	percent.innerHTML = percentCount;
}

resetButton.addEventListener("click", function() {
	reset();
	resetScore();

});