// Create an Array of objects:
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
]

// Sort array randomly:
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

// Function for creating a board (3x4 of squares):
function createBoard() {
    // Loop through array:
    for (let i = 0; i < cardArray.length; i++) {
        // Create an image element in our HTML document 
        const card = document.createElement('img')
        // Set attributes to the card (image element)
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard) // Listens for a click event on the card
        // Append card item (image element) to the 'grid' div:
        gridDisplay.appendChild(card)
    }
}
createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img') // Get all cards from HTML document (in this case all elements with img == cards)
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        //alert('You have clicked the same card!')
    }

    // If the cards match turn cards white and remove their event listeners:
    if (cardsChosen[0] == cardsChosen[1]) {
        //alert('You found a match!')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('clicks', flipCard)
        cards[optionTwoId].removeEventListener('clicks', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        //alert('Sorry try again!')
    }
    resultDisplay.textContent = cardsWon.length
    cardsChosen = []
    cardsChosenIds = []

    // If the amount of times won is equal to amount of cards:
    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations you have matched them all!'
    }
}

// Function for flipping a card when it is clicked and revealing the food underneath:
function flipCard() {
    const cardId = this.getAttribute('data-id') // Get the id (position in cardArray) of the card clicked
    cardsChosen.push(cardArray[cardId].name) // Push the card chosens name onto the 'cardsChosen' array 
    cardsChosenIds.push(cardId)

    this.setAttribute('src', cardArray[cardId].img) // Display the appropriate image of this car dependant on the id of the card clicked

    // If the length of the 'cardsChosen' array is 2 then the user has chosen 2 cards, meaning we can check if they match:
    if (cardsChosen.length === 2) {
        setTimeout( checkMatch, 500 )
    }
}