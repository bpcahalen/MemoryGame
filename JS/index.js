let cards = [];
let firstCard, secondCard;
let score = 0;
let flipped = false;
let boardFull = false;
let hardCore = false;
const gameBoard = document.getElementById('board');


document.getElementById('counter').textContent = score;

fetch("Cards/index.json")
    .then(resp => resp.json()) 
    .then(data => { 
    cards = [...data, ...data];
    shuffle();
    generateCards();
})

function shuffle(){
    for(let i = cards.length; i > 0; i--){
        let x = Math.floor(Math.random()*(i+1));

        let start = cards[i];
        cards[i] = cards[x];
        cards[x] = start;
    }
};

function generateCards(){
    for(let card of cards){
        const piece = document.createElement('div');
        piece.classList.add('card');
        // piece.addEventListener('click', flipped());
        piece.setAttribute('data-name', card.name);
        piece.innerHTML = `
        <div class="front"> 
        <img src=${card.image}/>
        </div>
        <div class="back"></div>
        `;
        gameBoard.appendChild(piece);
    }
};


// flip(){};

// match(){};

// generateHCM(){};

// resetCards(){};
