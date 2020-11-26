//Game state to so track state of the game. An array of all my points and current tokens

let playBoard = []
let emptySpace = 0
let player1 = 1
let player2 = 2

//push emptySpace to an array
for (let i = 0; i < 24; i++) {
    playBoard.push(emptySpace)
}

console.log(playBoard)