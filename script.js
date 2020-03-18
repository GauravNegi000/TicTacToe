var origBoard;	// It will contain original values in a board during a run .
var huPlayer = 'O';	// To indicate human player.
var aiPlayer = 'X'; // To indicate ai(Computer) player.
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],		//These are the winning combinations of tic tac toe.
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
var gamelevel = 'easy';	// It will later on to determine the difficulty,level of game.
var huScore = 0;
var aiScore = 0;
var tieScore = 0;

const cells = document.querySelectorAll('.cell'); // To select all the cells in a document(HTML).

setTimeout(load,1000);	// First call to load function to load a game while loading the page.

// Function to load the game and setting initial conditions.
function load() {
	document.querySelector('.selectSym').style.display = 'block'; 
	document.querySelector('.endgame').style.display = 'none';
	
	document.querySelector('#huScore').innerText = huScore;
	document.querySelector('#aiScore').innerText = aiScore;
	document.querySelector('#tieScore').innerText = tieScore;

	for(var i = 0; i < cells.length; i++ ) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
	}
}

// Function to select and assign symbol coming from player.
function selectSym(sym) {
	huPlayer = sym;
	aiPlayer = (huPlayer == 'X') ? 'O' : 'X' ;
	document.querySelector('.selectSym').style.display = 'none';
	document.querySelector('.level').style.display = 'block'; // and moving to next selecting the difficulty level.
}

// Function to select level.
function level(lev) {
	gamelevel = lev;
	document.querySelector('.level').style.display = 'none';
	startGame();	// and now start the game.
}

// Function to start the game.
function startGame() {
	// Array.from()  method returns an Array object from any object with a length property or an iteratable object.
	// The keys() method returns an array iterator object with the keys of an array.
	
	origBoard = Array.from(Array(9).keys()); // Here initializing the origBoard from values 0-8.
	
	for(var i = 0; i < cells.length; i++ ) {
		cells[i].addEventListener('click', turnClick, false); // It will add click event listener on all cells.
	}
}

// Function to handle the event. 
function turnClick(square) {
	// The target property gets the element on which the evenr originally occurred.
	if (typeof origBoard[square.target.id] == 'number') {	// To check whether the cell is clicked or not by checking that board still contain a number or not.
		turn(square.target.id, huPlayer);
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}

}

// Function to store in the board and turn the cell either X or O .
function turn(squareId, player) {
	 origBoard[squareId] = player;
	 document.getElementById(squareId).innerText = player;
	 let gameWon = checkWin(origBoard, player); // checking at every click that game is won or not.
	 if (gameWon) gameOver(gameWon)		// If game is won then it will go or gameover with the winning data.
}

//Function to check the win in game.
function checkWin(board, player) {
	// The reduce() method reduces the array to a single value ,it executes a provided function for each value of the array,the return value of the fun is stored in an accumulator(result/total).
	let plays = board.reduce((a, e, i) =>	// Collecting at which places in the board the current player  has its value.
		(e === player) ? a.concat(i) : a, []);
	
	let gameWon = null;	// It will store who has won the game and at what index of the winCombos.

	//The entries() method returns an Array Iterator object with key/value pairs.
	//For each item in the original array, the new iteration object will contain an array with the index as the key, and the item value as the value:
	//The every() method checks if all elements in an array pass a test (provided as a function).
	//The indexOf() method returns the position of the first occurrence of a specified value in a string.This method returns -1 if the value to search for never occurs.
	
	for (let [index, win] of winCombos.entries()) {
		if(win.every(elem => plays.indexOf(elem) > -1)){	// checking at each combination of winCombos by checking its every entry whether it is present in plays(places of current player) or not.
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

// Function to execute after game over.
function gameOver(gameWon){
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor = 
			gameWon.player == huPlayer ? 'green' : 'red';
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);	
	}
	//declareWinner(gameWon.player == huPlayer ? "You Win" : "You Lose");
	setTimeout(declareWinner,2000,gameWon.player == huPlayer ? "You Win" : "You Lose" )

	if(gameWon.player == huPlayer) huScore += 1;
	else aiScore += 1;
}

//Function to display the winner.
function declareWinner(who) {
	document.querySelector('.endgame').style.display = 'block';
	document.querySelector('.endgame .text').innerText = who;
}

// Function to determine empty squares or cells ( or places which or not filled in the board ).
function emptySquares() {
	//The filter() method creates an array filled with all array elements that pass a test (provided as a function).
	return origBoard.filter(s => typeof s == 'number'); // Filtering by selecting only those who has the number as a valuetype in the origboard.
}

// Function to determine the best spot in the board  for the ai player.
function bestSpot() {
	if (gamelevel == 'easy') return emptySquares()[0];	// easy algorithm for ai player by determining next consecutive empty place.
	return minimax(origBoard, aiPlayer).index;	// unbeatable ai algorithm.
}

// Function to check whether the game is tie or not.
function checkTie() {
	if(emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = 'gray';
			cells[i].removeEventListener('click', turnClick, false);
		}
		setTimeout(declareWinner,2000,"Tie Game!");
		tieScore += 1;
		return true;
	}
	return false;
}

// A Minimax algorithm can be best defined as a recursive function that does the following things:

//1. return a value if a terminal state is found (+10, 0, -10)
//2. go through available spots on the board
//3. call the minimax function on each available spot (recursion)
//4. evaluate returning values from function calls
//5. and return the best value

//Function for creating unbeatable ai with the help of minimax algorithm.
function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
