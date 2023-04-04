function getComputerSelection() {
    let random = Math.floor(Math.random() * 3);

    if (random === 0) {
        computerSelection = "rock";
        computer_image.src = "images/cpu_rock.png";
    } else if (random === 1) {
        computerSelection = "paper";
        computer_image.src = "images/cpu_paper.png";
    } else {
        computerSelection = "scissors";
        computer_image.src = "images/cpu_scissors.png";
    }

    return computerSelection;
}

function playRound(playerSelection, computerSelection) {
    if (
        (computerSelection === "rock" && playerSelection === "scissors") ||
        (computerSelection === "paper" && playerSelection === "rock") ||
        (computerSelection === "scissors" && playerSelection === "paper")) {
        updateScoreAndDisplay("computerWin");
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
        updateScoreAndDisplay("playerWin");
    } else {
        updateScoreAndDisplay();
    }
}

function showSelection() {
    const playerText = document.createTextNode(playerSelection);
    //checkAndAppendChild(playerText, playerSelectionDiv);
    const computerText = document.createTextNode(computerSelection);
    //checkAndAppendChild(computerText, computerSelectionDiv);
}

function updateScoreAndDisplay(winner = "") {
    if (playerScore < 5 && computerScore < 5) {
        if (winner === "computerWin") {
            computerScore += 1;
            const text = document.createTextNode("You lost the round!");
            const score = document.createTextNode(computerScore);
            checkAndAppendChild(text, roundResultDiv);
            checkAndAppendChild(score, computerScoreDiv);
            showSelection();
            if (computerScore === 5) {
                const text = document.createTextNode("You lost!");
                finalResultDiv.appendChild(text);
                createPlayAgain();
            }
        }
        else if (winner === "playerWin") {
            playerScore += 1;
            const text = document.createTextNode("You won the round!");
            const score = document.createTextNode(playerScore);
            checkAndAppendChild(text, roundResultDiv);
            checkAndAppendChild(score, playerScoreDiv);
            showSelection();
            if (playerScore === 5) {
                const text = document.createTextNode("You won!");
                finalResultDiv.appendChild(text);
                createPlayAgain();
            }
        }
        else {
            const text = document.createTextNode("It's a tie round!")
            checkAndAppendChild(text, roundResultDiv);
            showSelection();
        }
    }
    else return;
}

function createPlayAgain() {
    const newDiv = document.createElement("div");
    const playAgainButton = document.createElement("button");
    playAgainButton.classList.add("playAgain");
    const text = document.createTextNode("Play again");
    playAgainButton.appendChild(text);
    finalResultDiv.after(playAgainButton, newDiv);
    newDiv.appendChild(playAgainButton);

    playAgainButton.addEventListener("click", () => {
        //reset scores
        playerScore = 0;
        computerScore = 0;
        const resetComputerScoreText = document.createTextNode(computerScore);
        const resetPlayerScoreText = document.createTextNode(playerScore);
        checkAndAppendChild(resetComputerScoreText, computerScoreDiv);
        checkAndAppendChild(resetPlayerScoreText, playerScoreDiv);
        // remove text in roundResultDiv
        roundResultDiv.removeChild(roundResultDiv.firstChild);
        // remove text in finalResultDiv
        finalResultDiv.removeChild(finalResultDiv.firstChild);
        // remove playerSelection and computerSelection texts
        playerSelectionDiv.removeChild(playerSelectionDiv.firstChild);
        computerSelectionDiv.removeChild(computerSelectionDiv.firstChild);
        // remove playAgain button
        newDiv.removeChild(playAgainButton);
    });
}

function checkAndAppendChild(text, node) {
    if (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
        node.appendChild(text);
    }
    else node.appendChild(text);
}

let computerSelection;
let playerSelection;
let playerScore = 0;
let computerScore = 0;
const buttons = document.querySelectorAll("input");
const playerSelectionDiv = document.querySelector("div.playerSelection");
const computerSelectionDiv = document.querySelector("div.computerSelection");
const roundResultDiv = document.querySelector("div.roundResult");
const finalResultDiv = document.querySelector("div.finalResult");
const playerScoreDiv = document.querySelector("div.playerScore");
const computerScoreDiv = document.querySelector("div.computerScore");
const player_image = document.querySelector(".player-image");
const computer_image = document.querySelector(".computer-image");

buttons.forEach((input) =>
input.addEventListener("click", function buttonClick() {
        if (input.className === "rock") {
            playerSelection = "rock";
            player_image.src = "images/player_rock.png";
        }
        else if (input.className === "paper") {
            playerSelection = "paper";
            player_image.src = "images/player_paper.png";
        }
        else if (input.className === "scissors") {
            playerSelection = "scissors"
            player_image.src = "images/player_scissors.png";
        }

        let computerSelection = getComputerSelection();
        playRound(playerSelection, computerSelection);
    }));