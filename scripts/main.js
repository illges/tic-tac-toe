const gameBoard = (() => {
	let table = ["", "", "", "", "", "", "", "", ""];
	const add = (e) => console.log(e.target);
	return {table, add};

})();

const game = (() => {
	const move = () => {Array.from(document.querySelectorAll('.tile')).forEach(move => move.addEventListener('click', e => gameBoard.add(e)))};
	return {move}
})();

const player = (name, team) => {
	return { name, team }
}

function render() {
	const turn = Array.from(document.querySelectorAll(".tile"))
	turn.forEach(i=>{
		i.innerHTML = gameBoard.table[turn.indexOf(i)]
	})
}

render()

const bilbo = player("bilbo", "X")
const frodo = player("frodo", "O")


//Temp Code to see click events
// const turn = Array.from(document.querySelectorAll('.tile'));
//   turn.forEach(turn => turn.addEventListener('click', e => bilbo.takeTurn(e)));


