console.log('testing')

const xc = 'x'
const oc ='O'
const Winc =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const boxE = document.querySelectorAll('[data-box]')
const board = document.getElementById('board')
const WinM = document.getElementById('winningM')
const ReB = document.getElementById('ReB')
const winMTE = document.getElementById('data-winM-text')
let OTurn

startGame()

ReB.addEventListener('click', startGame)

function startGame(){
    OTurn = false
    boxE.forEach(box => {
        box.classList.remove(xc)
        box.classList.remove(oc)
        box.removeEventListener('click', handleClick)
        box.addEventListener('click',handleClick,{once: true })
    })
    sBoardHoverC()
    WinM.classList.remove('show')
}

function handleClick(e){
    const box = e.target
    const currentC = OTurn ? oc : xc
    Mark(box,currentC)
    if (WinCheck(currentC)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns()
        sBoardHoverC()
    }
}

function endGame(draw) {
    if(draw){
        winMTE.innerText = 'Draw!'
    }else{
        winMTE.innerText = `${OTurn ? "O's" : "X's"} Wins!`
    }
    WinM.classList.add('show')
}

function isDraw(){
    return[...boxE].every(box =>{
        return box.classList.contains(xc) || box.classList.contains(oc)
    })
}

function Mark(box, currentC){
    box.classList.add(currentC)
}

function swapTurns() {
    OTurn = ! OTurn
}

function sBoardHoverC(){
    board.classList.remove(xc)
    board.classList.remove(oc)
    if(OTurn){
        board.classList.add(oc)
    } else {
        board.classList.add(xc)
    }
}

function WinCheck(currentC){
    return Winc.some(combination =>{
        return combination.every(i => {
            return boxE[i].classList.contains(currentC)
        })
    })
}