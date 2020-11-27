//Game state to so track state of the game. An array of all my points and current tokens

let playBoard = []
let emptySpace = 0
let player1 = 1
let player2 = 2
let currentPlayer = player1 //var to check curr player
let pick = false
let won = 0 //0 means ongoing game, 1 means a win, 2 is a draw
let started = false //check if game is started

//check console for array
console.log(playBoard)

// function to receive node click to modify the play board, need parameter of what position was clicked
function nodeClick(position) {
    //if not picking we placing
    if (pick) {
        playBoard[position] = emptySpace

        //set source to empty, to remove token
        let img = "#node-" + (position.y + 1) + "_" + (position.x + 1) + " img"
        $(img).attr("src", "")


        pick = false
        if (currentPlayer == player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
        //write send alerts
        sendAlerts()
        return;

    } else {
        playBoard[position.y][position.x] = currentPlayer
        //select an img that is a child of class .node-1 img
        let img = "#node-" + (position.y + 1) + "_" + (position.x + 1) + " img"

        if (currentPlayer == player1) {
            $(img).attr("src", "/imgs/pexels-karolina-grabowska-4397810.png")
        } else {
            $(img).attr("src", "/imgs/pexels-miguel-á-padriñán-3752033.png")
        }
    }


    console.log(playBoard)

    //check current player won
    if (calcMatch(position)) {
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

//Calculate the win
function calcMatch(position) {
    //test across combinations
    let y1 = position.y + 1
    let y2 = position.y + 2

    //remainder functions
    y1 = y1 % 3
    y2 = y2 % 3

    if (playBoard[y1][position.x] == currentPlayer && playBoard[y2][position.x] == currentPlayer) {
        return true
    }

    let x1 = position.x + 1
    let x2 = position.x + 2

    if (playBoard[position.y][x1] == currentPlayer && playBoard[position.y][x2] == currentPlayer) {
        return true
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
    for (let i = 0; i < 3; i++) {
        //creating a two dimensional array, playBoard will have only 3 arrays of 8 points
        let points = []
        for (let j = 0; j < 8; j++) {
            points.push(emptySpace)
        }
        playBoard.push(points)
    }
    //clear the board
    currentPlayer = player1
    pick = false //currently not on pick mode
    won = 0 //track if game has entered won state
    started = true //starts the game

    sendAlerts()
}

$(document).ready(function () {
    $("#startGame").click(startGame)
    $(".node").click(function () {
        //replacing node- with to make it a number and subtracting 1 to make it start from 0
        let point = this.id.replace("node-", "").split("_") //spilling whats left of the node and getting the two array cordinates
        let node = {
            y: point[0] - 1,
            x: point[0] - 1 //y represent numbers 1-3, x is number 1-8, subtract 1 because array start from 0
        }
        if (started) // clicking of node only start if game is started
            nodeClick(node)

    })

})