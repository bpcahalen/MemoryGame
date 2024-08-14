let cards = [];
let firstCard, secondCard;
let score = 0;
let flipped = false;
let boardFull = false;
let hardCore = false;
const gameBoard = document.getElementById('board');


document.getElementById('counter').textContent = score;

fetch("index.json")
    .then(response => {return response.json()})
    .then(data => { 
        cards = [...data, ...data];
        // shuffle();
        generateCards();
        
})


function shuffle(){
   
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
    this.classList.add('flip');
};

// match(){};

// generateHCM(){};

// resetCards(){};
