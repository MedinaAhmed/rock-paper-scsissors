const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const finalResult= document.querySelector('[data-result]')
const SELECTIONS = [
  {
    name: 'rock',
    choose: 'rock',
    beats: 'scissors'
  },
  {
    name: 'paper',
    choose: 'paper',
    beats: 'rock'
  },
  {
    name: 'scissors',
    choose: 'scissors',
    beats: 'paper'
  }
]

for (let i = 0;  i < selectionButtons.length; i += 1) {//disable button after 5click
    selectionButtons[i].onclick = function () {
    
        this.setAttribute('data-clicks', Number(this.getAttribute('data-clicks')) + 1)
        
        if (this.getAttribute('data-clicks') === '5') {
            this.setAttribute('disabled', 'disabled');
        }
       
    }
}
if(computerScoreSpan>yourScoreSpan){
    finalResult.textContent="Computer won this game"
}
else if(yourScoreSpan>computerScoreSpan)
{
    finalResult.textContent="You won this game"
}
else if(computerScoreSpan==yourScoreSpan)
{
    finalResult.textContent="This game is a tie"
}

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
})

function makeSelection(selection) {
 
 
    const computerSelection = computerPlay()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
  
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)
  
    if (yourWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)
    
 
  
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
  
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.choose
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

function computerPlay() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
}
