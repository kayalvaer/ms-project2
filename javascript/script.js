//Game state to so track state of the game. An array of all my points and current tokens

let playBoard = []
let emptySpace = 0
let player1 = 1
let player2 = 2
let currentPlayer = player1 //var to check curr player
let pick = false
let won = 0 //0 means ongoing game, 1 means a win, 2 is a draw
let started = false //check if game is started
let stage = 1 //placing of tokens ,2 is moving token
let gameState = {
    player1: {
        owned: 12,
        taken: 0
    },
    player2: {
        owned: 12,
        taken: 0
    }

}

//check console for array
console.log(playBoard)

// function to receive node click to modify the play board, need parameter of what position was clicked
function nodeClick(position) {
    //if not picking we placing
    if (pick) {
        //validation that a player dont pick empty or own token
        let currentToken = playBoard[position.y][position.x]
        if (currentToken == emptySpace || currentToken == currentPlayer) { // validation failed
            return false
        }


        playBoard[position.y][position.x] = emptySpace


        //set source to empty, to remove token
        let img = "#node-" + (position.y + 1) + "_" + (position.x + 1) + " img"
        $(img).attr("src", "")


        pick = false
        if (currentPlayer == player1) {
            //before changing player we have to make sure current player is invisible
            gameState.player1.taken++
            currentPlayer = player2
        } else {
            gameState.player2.taken++
            currentPlayer = player1
        }
        //write send alerts
        sendAlerts()
        return;

    } else if (stage == 2) {
        //check gameState of players
        if (currentPlayer == player1) {
            if (gameState.player1.inHand) { //does player1 has something onHand
                //verify if they are allowed to paste it
                if (isAdjacent(gameState.player1, position)) {
                    placeToken(position)
                    //clearing what is on hand
                    gameState.player1.inHand = false
                }
                //
            } else {

                if (playBoard[position.y][position.x] != currentPlayer) {
                    alert("please pick your own token")
                    return false
                } else {
                    //allow them to continue
                    gameState.player1.inHand = position
                    //set attr on image and node
                    let img = "#node-" + (position.y + 1) + "_" + (position.x + 1) + " img"
                    $(img).attr("width", "25px")
                    return true
                }

            }
        } else {
            if (gameState.player2.inHand) {
                //verify if they are allowed to paste it
                if (isAdjacent(gameState.player2, position)) {
                    placeToken(position)
                    //
                    gameState.player2.inHand = false
                }
            } else {

                if (playBoard[position.y][position.x] != currentPlayer) {
                    alert("please pick your own token")
                    return false
                } else {
                    //allow them to continue
                    gameState.player2.inHand = position
                    //set attr on image and node
                    let img = "#node-" + (position.y + 1) + "_" + (position.x + 1) + " img"
                    $(img).attr("width", "25px")
                    return true
                }

            }
        }
    } else {
        placeToken(position) //if adjacent placing token is allowed
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
//test if player movement is legal
function isAdjacent(player, position) {
    playBoard[player.inHand.y][player.inHand.x] = emptySpace
    let img = "#node-" + (player.inHand.y + 1) + "_" + (player.inHand.x + 1) + " img"
    //restore original img size
    $(img).attr("width", "45px")
    return true

}

//place a token
function placeToken(position) {

    playBoard[position.y][position.x] = currentPlayer
    //select an img that is a child of class .node-1 img

    let img = "#node-" + (position.y + 1) + "_" + (position.x + 1) + " img"

    if (currentPlayer == player1) {
        if (stage == 1) {
            gameState.player1.owned--
        }

        $(img).attr("src", "/imgs/pexels-karolina-grabowska-4397810.png")
    } else {
        if (stage == 1) {
            gameState.player2.owned--
        }

        if (gameState.player2.owned == 0) { //need to suspend stage 2 if player2 made a match
            stage = 2
        }
        $(img).attr("src", "/imgs/pexels-miguel-á-padriñán-3752033.png")
    }
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
    //testing equality within same box, and testing if based on even numbers being activated
    if (position.x % 2 == 0) {
        let x1 = position.x + 1
        let x2 = position.x + 2
        //doing remainder function circle
        // testing even numbers boxes
        x1 = x1 % 8
        x2 = x2 % 8

        if (playBoard[position.y][x1] == currentPlayer && playBoard[position.y][x2] == currentPlayer) {
            return true
        }

        x1 = position.x - 1
        x2 = position.x - 2

        x1 = x1 % 8
        x2 = x2 % 8

        if (playBoard[position.y][x1] == currentPlayer && playBoard[position.y][x2] == currentPlayer) {
            return true
        }

    } else {
        //everyTime we have an odd number on the box we need to move up and down 1 by 1 to test
        let x1 = position.x - 1
        let x2 = position.x + 1

        x1 = x1 % 8
        x2 = x2 % 8

        if (playBoard[position.y][x1] == currentPlayer && playBoard[position.y][x2] == currentPlayer) {
            return true
        }
    }




}


function sendAlerts() {
    // string concatenation to glue strings together
    let action = " turn"
    //changing the action to say move instead of turn
    if (stage == 2) {
        action = " to move"
    }
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
    $("#p1-owned").html(gameState.player1.owned)
    $("#p1-taken").html(gameState.player1.taken)
    $("#p2-owned").html(gameState.player2.owned)
    $("#p2-taken").html(gameState.player2.taken)
}

function startGame() {
    //push emptySpace to an array
    for (let i = 0; i < 3; i++) {
        //creating a two dimensional array, playBoard will have only 3 arrays of 8 points
        let points = []
        for (let j = 0; j < 8; j++) {
            points.push(emptySpace)
            //clear board when clicking start
            let img = "#node-" + (i + 1) + "_" + (j + 1) + " img"
            $(img).attr("src", "")

        }
        playBoard.push(points)
    }
    //clear the board
    currentPlayer = player1
    pick = false //currently not on pick mode
    won = 0 //track if game has entered won state
    started = true //starts the game

    stage = 1

    gameState = {
        player1: {
            owned: 12,
            taken: 0
        },
        player2: {
            owned: 12,
            taken: 0
        }
    }

    $("#p1-owned").html(gameState.player1.owned)
    $("#p1-taken").html(gameState.player1.taken)
    $("#p2-owned").html(gameState.player2.owned)
    $("#p2-taken").html(gameState.player2.taken)

    sendAlerts()
}

$(document).ready(function () {
    $("#startGame").click(startGame)
    $(".node").click(function () {
        //replacing node- with to make it a number and subtracting 1 to make it start from 0
        let point = this.id.replace("node-", "").split("_") //spilling whats left of the node and getting the two array cordinates

        let node = {
            y: point[0] - 1,
            x: point[1] - 1 //y represent numbers 1-3, x is number 1-8, subtract 1 because array start from 0
        }
        if (started) // clicking of node only start if game is started
            nodeClick(node)

    })

})