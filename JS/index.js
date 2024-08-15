let cards = [];
let firstCard, secondCard;
let score = 0;
let guessHCM = 0;
let flipped = false;
let boardFull = false;
let hardCore = false;
const gameBoard = document.getElementById('board');


document.getElementById('counter').textContent = score;
document.querySelector('.restart').addEventListener('click', resetCards);
document.querySelector('.HCM').addEventListener('click', generateHCM);

fetch("index.json")
    .then(response =>  response.json())
    .then(data => { 
        cards = [...data, ...data];
        shuffle();
        generateCards();       
})


function shuffle(){
    let currentIndex = cards.length,
    randomIndex, 
    temporaryIndex;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryIndex = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryIndex;
    }
};

function generateCards(){
    for(let card of cards){
        const piece = document.createElement('div');
        piece.classList.add('card');
        piece.setAttribute('data-name', card.name);
        piece.innerHTML = `
        <div>
        <img class="front" src=${card.image}> </img>
        </div>
        <div class="back"></div>`
        gameBoard.appendChild(piece);
        piece.addEventListener('click', flip);
    }
};

function generateHCMCards(){
    for(let card of cards){
        const piece = document.createElement('div');
        piece.classList.add('card');
        piece.setAttribute('data-name', card.name);
        piece.innerHTML = `
        <div class="frontHCM"></div>
        <div class="back"></div>`
        gameBoard.appendChild(piece);
        piece.addEventListener('click', flip);
    }
};  


function flip(){
    if(boardFull){
        return;
    }

    if(this === firstCard){
        return;
    }

    this.classList.add('flip');

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;

    if(hardCore){
        matchHCM();
    }else {
        match();
    }
};

function match(){
    if(firstCard.dataset.name !== secondCard.dataset.name){
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 750);
    }else{
        score++
        document.getElementById('counter').textContent = score;
        lockCards();
        if(score == 8){
            alert('Winner!');
            return;
        }else{
        resetBoard();
        }
    }    
};

function matchHCM(){
    if(firstCard.dataset.name !== secondCard.dataset.name){
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
            guessHCM++;

        if(guessHCM == 5){
            if(confirm('Guess limit reached. You loose. Try again?')){
                hardCore = true;
            }else{
                hardCore = false;
            }
            resetBoard();
            shuffle();
            guessHCM = 0;
            score = 0;
            document.getElementById('counter').textContent = score;
            if(hardCore){
                gameBoard.innerHTML = '';
                generateHCMCards();
            }else{
                gameBoard.innerHTML = '';
                generateCards();
            }
        }
        }, 750);
    }else{
        score++
        document.getElementById('counter').textContent = score;
        lockCards();
        guessHCM = 0;
        if(score == 8){
            alert('Winner!');
            return;
        }else{
            resetBoard();
        }
    }    
};

function resetBoard(){
    firstCard = null;
    secondCard = null;
    boardFull = false;
}

function lockCards(){
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
}

function generateHCM(){
    alert('RULES: \n1.) All cards are blank. It will be a pure blind guess. \n2.) You will get 5 guesses to get a right answer. Every right answer resets your number of guesses.  \n3.) After 3 wrong guesses, you loose. \n4.) Have fun and Good Luck!')
    resetBoard();
    guessHCM = 0;
    shuffle();
    hardCore = true;
    gameBoard.innerHTML = '';
    generateHCMCards();
};

function resetCards(){
   resetBoard();
   shuffle();
   score = 0;
   document.getElementById('counter').textContent = score;
   gameBoard.innerHTML = '';
   generateCards();
};
