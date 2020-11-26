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
        let img = "#node-" + (position + 1) + " img"
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
        playBoard[position] = currentPlayer
        //select an img that is a child of class .node-1 img
        let img = "#node-" + (position + 1) + " img"

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
    if ([1, 4, 7, 16, 19, 22, 13, 10].includes(position)) {
        if (playBoard[position + 1] == currentPlayer && playBoard[position - 1] == currentPlayer) {
            return true
        }
    }
    //test +1+2
    if ([0, 3, 6, 9, 12, 15, 18, 21].includes(position)) {
        if (playBoard[position + 1] == currentPlayer && playBoard[position + 2] == currentPlayer) {
            return true
        }
    }

    //corner combinations -1,-2 test
    if ([2, 5, 8, 11, 14, 17, 20, 23].includes(position)) {
        if (playBoard[position - 2] == currentPlayer && playBoard[position - 1] == currentPlayer) {
            return true
        }
    }
    //matching diagonals
    if ([2, 5, 8].includes(position)) {
        if (playBoard[2] == currentPlayer && playBoard[5] == currentPlayer && playBoard[8] == currentPlayer) {
            return true
        }
    }

    if ([17, 20, 23].includes(position)) {
        if (playBoard[17] == currentPlayer && playBoard[20] == currentPlayer && playBoard[23] == currentPlayer) {
            return true
        }
    }
    if ([15, 18, 21].includes(position)) {
        if (playBoard[15] == currentPlayer && playBoard[18] == currentPlayer && playBoard[21] == currentPlayer) {
            return true
        }
    }
    if ([0, 3, 6].includes(position)) {
        if (playBoard[0] == currentPlayer && playBoard[3] == currentPlayer && playBoard[6] == currentPlayer) {
            return true
        }
    }

    //columns combinations
    if ([0, 9, 21].includes(position)) {
        if (playBoard[0] == currentPlayer && playBoard[9] == currentPlayer && playBoard[21] == currentPlayer) {
            return true
        }
    }
    if ([3, 10, 18].includes(position)) {
        if (playBoard[3] == currentPlayer && playBoard[10] == currentPlayer && playBoard[18] == currentPlayer) {
            return true
        }
    }
    if ([6, 11, 15].includes(position)) {
        if (playBoard[6] == currentPlayer && playBoard[11] == currentPlayer && playBoard[15] == currentPlayer) {
            return true
        }
    }
    if ([8, 12, 17].includes(position)) {
        if (playBoard[8] == currentPlayer && playBoard[12] == currentPlayer && playBoard[17] == currentPlayer) {
            return true
        }
    }
    if ([5, 13, 20].includes(position)) {
        if (playBoard[5] == currentPlayer && playBoard[13] == currentPlayer && playBoard[20] == currentPlayer) {
            return true
        }
    }
    if ([2, 14, 23].includes(position)) {
        if (playBoard[2] == currentPlayer && playBoard[14] == currentPlayer && playBoard[23] == currentPlayer) {
            return true
        }
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
    started = true //starts the game

    sendAlerts()
}

$(document).ready(function () {
    $("#startGame").click(startGame)
    $(".node").click(function () {
        //replacing node- with to make it a number and subtracting 1 to make it start from 0
        let node = this.id.replace("node-", "") - 1
        if (started) // clicking of node only start if game is started
            nodeClick(node)

    })

})