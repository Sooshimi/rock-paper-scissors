function getComputerChoice() {
    let random = Math.floor(Math.random() * 3);

    if (random === 0) {
        computerChoice = "rock";
    } else if (random === 1) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }

    return computerChoice;
}

function playRound(playerSelection, computerSelection) {
    if (
        (computerSelection === "rock" && playerSelection === "scissors") ||
        (computerSelection === "paper" && playerSelection === "rock") ||
        (computerSelection === "scissors" && playerSelection === "paper")) {
        updateScore("computerWin");
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
        updateScore("playerWin");
    } else {
        updateScore();
    }
    console.log("Player score: ", playerScore);
    console.log("Computer score: ", computerScore);
}

function updateScore(winner = "") {
    if (playerScore < 5 && computerScore < 5) {
        if (winner === "computerWin") {
            computerScore += 1;
            const text = document.createTextNode("You lost the round!");
            const score = document.createTextNode(computerScore);
            checkAndAppendChild(text, roundResultDiv);
            checkAndAppendChild(score, computerScoreDiv);
            if (computerScore === 5) {
                const text = document.createTextNode("You lost!");
                finalResultDiv.appendChild(text);
            }
        }
        else if (winner === "playerWin") {
            playerScore += 1;
            const text = document.createTextNode("You won the round!");
            const score = document.createTextNode(playerScore);
            checkAndAppendChild(text, roundResultDiv);
            checkAndAppendChild(score, playerScoreDiv);
            if (playerScore === 5) {
                const text = document.createTextNode("You won!");
                finalResultDiv.appendChild(text);
            }
        }
        else {
            const text = document.createTextNode("It's a tie round!")
            checkAndAppendChild(text, roundResultDiv);
        }
    }
    else return;
}

function checkAndAppendChild(text, node) {
    if (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
        node.appendChild(text);
    }
    else node.appendChild(text);
}

let computerChoice;
let playerSelection;
let playerScore = 0;
let computerScore = 0;
const buttons = document.querySelectorAll("button");
const roundResultDiv = document.querySelector("div.roundResult");
const finalResultDiv = document.querySelector("div.finalResult");
const playerScoreDiv = document.querySelector("div.playerScore");
const computerScoreDiv = document.querySelector("div.computerScore");

buttons.forEach((button) =>
    button.addEventListener("click", function buttonClick() {
        if (button.className === "rock") {
            playerSelection = "rock";
        }
        else if (button.className === "paper") {
            playerSelection = "paper";
        }
        else if (button.className === "scissors") {
            playerSelection = "scissors"
        }

        let computerSelection = getComputerChoice();
        playRound(playerSelection, computerSelection);
    }));