// Store HTML ids so we can display things by them:
const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const winsDisplay = document.getElementById('wins')
// Get all buttons:
const possibleChoices = document.querySelectorAll('button')
// Create global variables for users choice, computers choice and the result: ('let' == global)
let userChoice 
let computerChoice
let result
let wins = 0

// Event listener listening for buttons to be clicked:
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id // Get the button that the user clicked
    userChoiceDisplay.innerHTML = userChoice // Display button choice to the screen
    generateComputerChoice() // Generate computers choice
    getResult() // Work out result based on users choice and computers choice
}))

// Function to make user pick an option 'rock', 'paper' or 'scissors':
function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1 // Generate random number between 1 - 3 (Math.random) and round it down (Math.floor) 
    
    if (randomNumber === 1) {
        computerChoice = 'rock'
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors'
    }
    if (randomNumber === 3) {
        computerChoice = 'paper'
    }
    computerChoiceDisplay.innerHTML = computerChoice // Display computer choice in HTML
}

function getResult() {
    if (computerChoice === userChoice) {
        result = 'Draw!'
    }
    if (computerChoice === 'rock' && userChoice === 'paper') {
        result = 'You win!'
        wins = wins + 1
    } 
    if (computerChoice === 'rock' && userChoice === 'scissors') {
        result = 'You lose!'
    } 
    if (computerChoice === 'paper' && userChoice === 'scissors') {
        result = 'You win!'
        wins = wins + 1
    } 
    if (computerChoice === 'paper' && userChoice === 'rock') {
        result = 'You lose!'
    } 
    if (computerChoice === 'scissors' && userChoice === 'rock') {
        result = 'You win!'
        wins = wins + 1
    } 
    if (computerChoice === 'scissors' && userChoice === 'paper') {
        result = 'You lose!'
    } 
    resultDisplay.innerHTML = result
    winsDisplay.innerHTML = wins
}

