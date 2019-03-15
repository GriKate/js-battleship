//let value = prompt('Fire!');
//let letter = value.substring(0, 1);
//console.log(letter);
//let number = value.substring(1, 2);
//let loc = letter + number;
//console.log(loc);

//let num = '66';

let model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [
	{locations: ['06', '16', '26'], hits: ['', '', '']},
	{locations: ['24', '34', '44'], hits: ['', '', '']},
	{locations: ['10', '11', '12'], hits: ['', '', '']}], //объект содержит массив с объектами
	fire: function(guess) { // 6.
		for (let i=0; i<this.numShips; i++) //let!!!! 
		{
			let ship = this.ships[i];
			//let locations = ship.locations;
			let index = ship.locations.indexOf(guess); //0, 1, 2 -1
			if (index >= 0) { //если попал
				ship.hits[index] = 'hit';
				view.displayHit(guess);
				view.displayMessage('Ранил!');
				if (this.isSunk(ship)) {
					this.shipsSunk++; //+1 потоплен
					view.displayMessage('Ты потопил корабль!');
				};
				return true; //выстрел удачный
			};
		};
		view.displayMiss(guess);
		view.displayMessage('Мимо!');
		return false; //выстрел неудачный
	},
	isSunk: function(ship) {
		for (let i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== 'hit') {
				return false;
			}
		};
		return true; //почему не в for??
	}
}; 

let view = {
	displayMessage: function(msg) {
		let messageArea = document.getElementById('messageArea');
		messageArea.innerHTML = msg; //равно!!!!!
	},

	displayMiss: function(location) {
		let cell = document.getElementById(location);//
		cell.setAttribute('class', 'miss'); //метод setAttribute!!!!!
	},

	displayHit: function(location) {
		let cell = document.getElementById(location);
		cell.setAttribute('class', 'hit');
	}
};

let controller = {
	guesses: 0,
	parseGuess: function(guess) {//'A0'  5.
		let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
		if (guess === null || guess.length !== 2) {
			alert('Введите букву и цифру');
		} else {
			let firstSym = guess.charAt(0);//'A'
			let row = alphabet.indexOf(firstSym);//0
			let column = guess.charAt(1);//'0'
			if (isNaN(row) || isNaN(column)) {//если не число
				alert('Такого символа нет на доске!');
			} else if (row<0 || row>=model.boardSize || column<0 || column>=model.boardSize) {
				alert('Введите корректное значение!')//если число, но меньше 0 или больше 7
			} else {
				this.guesses++;
				console.log(this.guesses);
				return row + column; //0 + '0' ='00'
			}
		}
		return null;
	},
	processGuess: function (guess) { // 4.
		let location = this.parseGuess(guess); // 5.
		if (location) { // (=true), то есть parseGuess не вернул null, кот. является псевдоложью
			let hit = model.fire(location); //return true/false  6.
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage('Ты потопил все корабли за ' + this.guesses + ' попыток(и)');
				let inputArea = document.getElementById('input');
				inputArea.setAttribute('class', 'invisible');
			}
		}
	}
};

function init() { // 2.
	let fireButton = document.getElementById('fireButton');
	fireButton.onclick = handleFireButton; // без ()!!!
	let guessInput = document.getElementById('guessInput');
	guessInput.onkeypress = handleKeyPress;
};

function handleFireButton() { // 3.
	let guessInput = document.getElementById('guessInput');
	let guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = ''; //удаляем содержимое, заменяем пустой строкой
};

function handleKeyPress(e) {
	let fireButton = document.getElementById('fireButton');
	if (e.keyCode === 13) { //клавиша enter - 13 событие
		fireButton.click(); //метод имитирует щелчок мыши
		return false; //чтобы форма не пыталась передать данные
	}
}

window.onload = init; // 1. без ()!!!

//model.fire('53');
//model.fire('06');
//model.fire('16');
//model.fire('26');
//model.fire('34');
//model.fire('24');
//console.log(controller.parseGuess('A9')); //null
//console.log(controller.parseGuess('X0')); //null
//console.log(controller.parseGuess('4g')); //null
//console.log(controller.parseGuess('.4')); //null
//console.log(controller.parseGuess('b5')); //null
//console.log(controller.parseGuess('B5'));
//console.log(controller.parseGuess('A64')); //null
//controller.processGuess('A6');
//controller.processGuess('B6');
//controller.processGuess('C6');
//controller.processGuess('C4');
//controller.processGuess('D4');
//controller.processGuess('E4');
//controller.processGuess('B0');
//controller.processGuess('B1');
//controller.processGuess('B2');
