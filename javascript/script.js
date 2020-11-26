//Game state to so track state of the game. An array of all my points and current tokens

let playBoard = []
let emptySpace = 0
let player1 = 1
let player2 = 2
let currentPlayer = player1 //var to check curr player
let pick = false
let won = 0 //0 means ongoing game, 1 means a win, 2 is a draw

//check console for array
console.log(playBoard)

// function to receive node click to modify the play board, need parameter of what position was clicked
function nodeClick(position) {
    playBoard[position] = currentPlayer
    console.log(playBoard)

    //check current player won
    if (calcMatch()) {
        pick = true
        sendAlerts()
        return; // stop function from continuing
    }


    //player switch
    if (currentPlayer == player1) {
        currentPlayer = player2
    } else {
        currentPlayer = player1
    }
    //write send alerts
    sendAlerts()
}
//calculate matches
let fakeWin = 0

//assuming 5th click is a match
function calcMatch() {
    fakeWin++
    if (fakeWin % 5 == 0) {
        return true
    } else {
        return false
    }
}

function sendAlerts() {
    // string concatenation to glue strings together
    let action = " turn"
    if (pick) {
        action = " to pick"
    }

    if (won == 1) {
        action = " winner"
    }

    if (won == 2) {
        $(".row.messages").html("Its a draw!")
    } else {
        $(".row.messages").html("player " + currentPlayer + action)
    }

}

function startGame() {
    //push emptySpace to an array
    for (let i = 0; i < 24; i++) {
        playBoard.push(emptySpace)
    }
    //clear the board
    currentPlayer = player1
    pick = false //currently not on pick mode
    won = 0 //track if game has entered won state

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