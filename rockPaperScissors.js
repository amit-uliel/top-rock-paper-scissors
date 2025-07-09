const WIN = 1;
const TIE = 0;
const LOSE = -1;

const rules = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
};

const PICKS = ["rock", "paper", "scissors"];

const scores = {
    user: 0,
    computer: 0
};

let gameOver = false;

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * PICKS.length);

    return PICKS[randomNumber];
}

// function getHumanChoice() {
//     let userChoice = prompt("enter one of the options: rock, paper, scissors");
//     return userChoice;
// }

function playRound(humanChoice, computerChoice, displayer) {
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

    displayer.textContent = message;
    return result;
}

function capitalFirstLetter (word) {
    return word[0].toUpperCase() + word.slice(1);
}

// function playGame() {
//     const scores = {
//         user : 0,
//         computer: 0,
//     };

//     for (let i = 0; i < 5; i++) {
//         let computerSelection = getComputerChoice();
//         let humanSelection = getHumanChoice();
        
//         let result = playRound(humanSelection, computerSelection);

//         updateScores(result, scores);
//     }

//     displayFinalResults(scores);
// }

function updateScores(result, scores) {
    if (result === WIN) {
        scores.user++;
    } else if (result === LOSE) {
        scores.computer++;
    }
}

function displayFinalResults(scores, displayer) {
    let results = `User Wins: ${scores.user}\nComputer Wins: ${scores.computer}\n`;
    if (scores.user > scores.computer) {
        results += "You Won!";
    } else if (scores.user < scores.computer) {
        results += "You Lost!";
    } else {
        results += "It's a Tie!";
    }

    displayer.textContent = results;
}

function handleChoiceClick(e) {
    if (gameOver) return;

    const humanChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice, resultsDisplayer);

    updateScores(result, scores);

    if (scores.user === 5 || scores.computer === 5) {
        gameOver = true;
        displayFinalResults(scores, resultsDisplayer);
    }
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', handleChoiceClick);
});

const resultsDisplayer = document.querySelector("#results");