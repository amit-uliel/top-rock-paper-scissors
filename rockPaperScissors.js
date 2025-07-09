const WIN = 1;
const TIE = 0;
const LOSE = -1;

const rules = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
};

const PICKS = ["rock", "paper", "scissors"];

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * PICKS.length);

    return PICKS[randomNumber];
}

function getHumanChoice() {
    let userChoice = prompt("enter one of the options: rock, paper, scissors");
    return userChoice;
}

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    
    let message;
    let result;

    if (humanChoice === computerChoice) {
        message = "It's a tie!";
        result = TIE;
    } else if (rules[humanChoice] === computerChoice) {
        message = `You win! ${capitalFirstLetter(humanChoice)} beats ${capitalFirstLetter(computerChoice)}`;
        result = WIN;
    } else {
        message = `You Lose! ${capitalFirstLetter(computerChoice)} beats ${capitalFirstLetter(humanChoice)}`
        result = LOSE;
    }

    console.log(message);
    return result;
}

function capitalFirstLetter (word) {
    return word[0].toUpperCase() + word.slice(1);
}

function playGame() {
    const scores = {
        user : 0,
        computer: 0,
    };

    for (let i = 0; i < 5; i++) {
        let computerSelection = getComputerChoice();
        let humanSelection = getHumanChoice();
        
        let result = playRound(humanSelection, computerSelection);

        updateScores(result, scores);
    }

    displayFinalResults(scores);
}

function updateScores(result, scores) {
    if (result === WIN) {
        scores.user++;
    } else if (result === LOSE) {
        scores.computer++;
    }
}

function displayFinalResults(scores) {
    console.log(`User Wins: ${scores.user}\nComputer Wins: ${scores.computer}`);

    if (scores.user > scores.computer) {
        console.log("You Won!");
    } else if (scores.user < scores.computer) {
        console.log("You Lost!");
    } else {
        console.log("It's a Tie!");
    }
}

playGame();