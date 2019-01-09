const gameBoard = (() => {
	let tiles = [];
	const add = (tile, index) => {
		tiles[index] = tile;
	};

	const checkTiles = () => tiles;

	const initialize = () => tiles = [];

	return { add, checkTiles, initialize };
})();

const game = (() => {
	let currentPlayer = 'X',
		gameOver = false,
		winningMove;

	let winningConditions = [
		[0,1,2], [0,3,6], [0,4,8],
		[1,4,7], [2,4,6], [3,4,5],
		[2,5,8], [6,7,8]
	]

	const changePlayer = () => currentPlayer = currentPlayer === "X" ? "O" : "X";

	const move = () => {
		Array.from(document.querySelectorAll('.tile')).forEach(i => { 
			i.addEventListener('click', (e) => {
				if (!i.textContent && !gameOver) {
					i.textContent = currentPlayer
					gameBoard.add(currentPlayer, i.dataset.tile);
					checkGameOver()
					changePlayer()
				} 
			})
		})
	};

	const checkGameOver = () => {
		let tiles = gameBoard.checkTiles();
		winningConditions.some(i => {
			if(tiles[i[0]] === tiles[i[1]] && tiles[i[1]] === tiles[i[2]] && tiles[i[1]]) {
				gameOver = true;
				winningMove = i;
				displayController.celebrate(currentPlayer, winningMove);
			}
		})
	}

	const reset = () => {
		Array.from(document.querySelectorAll('.tile')).forEach(i => {
			i.textContent = undefined;
			i.style.backgroundColor = '#83cee7';
		});
		gameOver = false;
		currentPlayer = 'X';
	}

	return { move, gameOver, currentPlayer, reset }
})();

const displayController = (() => {

	const Tac = document.getElementById('game')

	const render = () => {
		let board = document.createElement('div');
		board.setAttribute('id', 'board');

		for (i = 0; i <= 8; i++) {
			let tile = document.createElement('div');
			tile.classList.add('tile');
			tile.dataset.tile = i;

			board.appendChild(tile);
		}

		restartButton = document.createElement('button');
		restartButton.setAttribute('id', 'restart');
		restartButton.textContent = 'Restart';
		restartButton.addEventListener('click', (e) => {
			game.reset();
			gameBoard.initialize();
		});

		Tac.appendChild(board);
		Tac.appendChild(restartButton);
	};

	const celebrate = (player, condition) => {
		let highLight = [];

		condition.forEach(i => {
			highLight.push(document.querySelector(`div[data-tile="${i}"]`))
		})

		highLight.forEach(tile => tile.style.backgroundColor = '#b61686')
	}

	return { render, celebrate };
})();

displayController.render();
game.move();
