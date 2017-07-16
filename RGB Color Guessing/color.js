var numSquares = 6
var colors = [];
var pickedColor;

var h1 = document.querySelector("h1");
var resetButtom = document.querySelector("#reset");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.getElementById("message");
var colorDisplay = document.getElementById("colorDisplay");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

resetButtom.addEventListener("click", function(){
	reset();
})

function setupModeButtons(){
		//event button listeners
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//figure out how many squares to show
			//ternary ->    if===       ?then             :else
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6; 	
			reset();
		})
	}

}

function setupSquares(){
	for(var i = 0; i< squares.length; i++){
		//add click listeners
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			if(clickedColor == pickedColor){
				messageDisplay.textContent = "Correct!"
				resetButtom.textContent = "Play Again"
				changeColors(clickedColor);
				h1.style.backgroundColor = pickedColor;
			} else{
				this.style.backgroundColor = "#232323"
				messageDisplay.textContent = "Try Again!"
			}
		});
	}
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//clear message
	messageDisplay.textContent = ""
	//change button text
	resetButtom.textContent = "New Colors"
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
		squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length)
	return colors[random]
}

function generateRandomColors(num){
	var arr = []
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "red" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a "red" from 0 - 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}