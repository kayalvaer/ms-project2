/* class Game {
    constructor(gameData) {
        this.players = []
        this.totalPiecesPlaced = 0
        this.selectedPiece
        this.currentPlayer
        this.currentStatus = {
            "circle-1": null,
            "circle-2": null,
            "circle-3": null,
            "circle-4": null,
            "circle-5": null,
            "circle-6": null,
            "circle-7": null,
            "circle-8": null,
            "circle-9": null,
            "circle-10": null,
            "circle-11": null,
            "circle-12": null,
            "circle-13": null,
            "circle-14": null,
            "circle-15": null,
            "circle-16": null,
            "circle-17": null,
            "circle-18": null,
            "circle-19": null,
            "circle-20": null,
            "circle-21": null,
            "circle-22": null,
            "circle-23": null,
            "circle-24": null,
        }
    }

    promptPlayer(type) {
        $(".messages").empty()
        switch (type) {
            case "turn":
                $(".messages").append(`<div class="message-content typewriter">${this.currentPlayer.name}, it is your turn</div>`)
                break
            case "not empty":
                $(".messages").append("<div class='message-content typewriter'>Chose an empty field</div>")
                break
            case "not adjacent":
                $(".messages").append("<div class='message-content typewriter'>Chose an adjacent field</div>")
                break
            case "mill error":
                $(".messages").append("<div class='message-content typewriter'>You can't take a piece from a mill!</div>")
                break
            case "mill success":
                $(".messages").append("<div class='message-content typewriter'>You may take one of your opponent's pieces!</div>")
                break
            case "own piece":
                $(".messages").append("<div class='message-content typewriter'>Please select one of your pieces</div>")
                break
            case "opponent piece":
                $(".messages").append("<div class='message-content typewriter'>Please select an opponent's piece</div>")
                break
            default:
                break
        }

    }
} */

function stepsToPlay() {
    let x = document.getElementsByClassName("modal-body");
    x.innerHTML = "stepsToPlay"
}