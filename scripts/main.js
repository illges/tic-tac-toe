const gameBoard = (() => {
	const add = (e) => {
		console.log(e.target.textContent)
	};
	return { add };

})();

const game = (() => {
	let currentPlayer = "X";

	const changePlayer = () => currentPlayer = currentPlayer === "X" ? "O" : "X";

	const move = () => {
		Array.from(document.querySelectorAll('.tile')).forEach(i => { 
			i.addEventListener('click', (e) => {
				if (!i.textContent) {
					i.textContent = currentPlayer
					changePlayer()
					gameBoard.add(e)
				}
			})
		})
	};

	const reset = () => document.querySelector('.reset').addEventListener('click', () => {
		Array.from(document.querySelectorAll('.tile')).forEach(i => {
			i.textContent = ''
		})
	})
	return { move }
})();

const player = (name, team) => {
	return { name, team }
}

const displayController = (() => {

	const game = document.getElementById('game')

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
		restartButton.addEventListener('click', (e) => console.log(e))

		game.appendChild(board);
		game.appendChild(restartButton);
	};

	return { render };
})();

displayController.render();
game.move();
