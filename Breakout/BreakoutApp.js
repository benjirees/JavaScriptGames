const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let timerId
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [230, 10] // Users starting coordinates
let currentPosition = userStart

const ballStart = [270, 40] // Balls starting coordinates
let ballCurrentPosition = ballStart

// Class representing a block:
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// Array of all blocks:
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

// Draw all blocks:
function addBlocks() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

// Add and position User:
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// Draw User:
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// Draw Ball:
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// Move user:
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            // If the user is within the frame (boundary) move left:
            if (currentPosition[0] > 0) {  
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            // If the user is within the frame (boundary) move right:
            if (currentPosition[0] < boardWidth-blockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
        case 'a':
            // If the user is within the frame (boundary) move left:
            if (currentPosition[0] > 0) {  
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'd':
            // If the user is within the frame (boundary) move right:
            if (currentPosition[0] < boardWidth-blockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// Add ball:
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// Move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 10)

// Check for collisions:
function checkForCollisions() {
    // Check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        // If true, ball is in a block:
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            // Visually remove the block that has been hit by creating an array of all blocks and then removing block[i] from class:
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block') 
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            // Check for win:
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'You win!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
                setTimeout(function() {
                    window.location.reload()
                }, 3000)
                
            }

        }
    }


    // Check for wall collision
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        changeDirection()
    }

    // Check for user collisions:
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    // Check for game end:
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose!'
        document.removeEventListener('keydown', moveUser)
        setTimeout(function() {
            window.location.reload()
        }, 3000)
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}
