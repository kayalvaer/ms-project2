//Game state to so track state of the game. An array of all my points and current tokens

let playBoard = []
let emptySpace = 0
let player1 = 1
let player2 = 2
let currentPlayer = player1 //var to check curr player

//check console for array
console.log(playBoard)

// function to receive node click to modify the play board, need parameter of what position was clicked
function nodeClick(position) {
    playBoard[position] = currentPlayer
    console.log(playBoard)
}

function sendAlerts() {
    // string concatenation to glue strings together
    $(".row.messages").html("player " + currentPlayer + " turn ")

}

function startGame() {
    //push emptySpace to an array
    for (let i = 0; i < 24; i++) {
        playBoard.push(emptySpace)
    }
    //clear the board
    currentPlayer = player1
    sendAlerts()
}

$(document).ready(function () {
    $("#startGame").click(startGame)
    $(".node").click(function () {
        //replacing node- with to make it a number and subtracting 1 to make it start from 0
        let node = this.id.replace("node-", "") - 1
        nodeClick(node)

    })

})