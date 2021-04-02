const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const WINNING_COMBINATIONS = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]

const board = document.getElementById('board');
const cells = document.querySelectorAll('[date-cell]');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const winningMessagePage = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');

let circleTurn = false;

startGame();

restartButton.addEventListener('click', () => {
    startGame();
})

function startGame(){

    cells.forEach(cell => {
        clearClass(cell);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass();    
    winningMessagePage.classList.remove('show');

}



function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // place the mark
    placeMark(cell, currentClass);
    // check for win
    if(checkWin(currentClass)){
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        //switch turns
        swapTurn();
        setBoardHoverClass();

    }

}



function checkDraw(){
    return [...cells].every(cell => {
        return (cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS));
    })
}

function endGame(isDraw) {
    if(isDraw) {
        winningMessageText.innerText = "Draw!";
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
    }
    winningMessagePage.classList.add('show');
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}


function setBoardHoverClass(){
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    clearClass(board);
    board.classList.add(currentClass);
}

function clearClass(e){
    e.classList.remove(X_CLASS);
    e.classList.remove(CIRCLE_CLASS);
}

function swapTurn(){
    circleTurn = (!circleTurn);
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}