let cards = [];
let firstCard, secondCard;
let score = 0;
let flipped = false;
let boardFull = false;
let hardCore = false;
const gameBoard = document.getElementById('board');


document.getElementById('counter').textContent = score;
// document.querySelector('.restart').addEventListener('click', resetCards);

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
    match();
    
};

function match(){
    if(firstCard.dataset.name === secondCard.dataset.name){
        score++
        document.getElementById('counter').textContent = score;
        
    }else{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }


};

// generateHCM(){};

function resetCards(){
   
};
