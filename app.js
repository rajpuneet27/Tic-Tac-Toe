const X_Class = 'x';
const Circle_Class = 'circle';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElements = document.getElementById('winningMessage')
const winningMessage = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

//StartGame Function
function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_Class)
        cell.classList.remove(Circle_Class)
        cell.removeEventListener('click', handleClicker)
        cell.addEventListener('click', handleClicker, { once: true })
    })
    turnsHover();
    winningMessageElements.classList.remove('show')
}

//HandleClicker Function
function handleClicker(e){
    const cell = e.target
    const currentClass = circleTurn ? Circle_Class : X_Class;
    //placeMark
    placeMark(cell, currentClass)
    //Check for win
    if(checkWin(currentClass)){
        endGame(false)
    //check for draw
    } else if(isDraw()) {
        endGame(true)
    } else {
    //switch turns
        swapTurns()
        turnsHover()
    }
}

//EndGame Function
function endGame(draw){
    if(draw){
        winningMessage.innerText = 'Draw!'
    } else{
        winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElements.classList.add('show')
}

//IsDraw Function
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class);
    })
}

//PlaceMark Function
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

//SwapTurns Function
function swapTurns(){
    circleTurn = !circleTurn;
}

//TurnsHover Function
function turnsHover(){
    board.classList.remove(Circle_Class)
    board.classList.remove(X_Class)
    if(circleTurn){
        board.classList.add(Circle_Class)
    } else{
        board.classList.add(X_Class)
    }
}

//CheckWin Function
function checkWin(currentClass){
    return winningCombinations.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
