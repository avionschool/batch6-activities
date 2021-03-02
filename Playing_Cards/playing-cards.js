var suits = ['♣','♠','♦','♥','♣'];
var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
// document.getElementById('sample').innerHTML = deck;
var deck =[];



function createDeck(card){
    //let deck = [];
    for(i = 0; i < suits.length; i++){
        for(j = 0; j<values.length; j++){
            card.push(suits[i] + values[j]);
        }
    }
    return card;
}

function shuffle(newDeck){
    for(let i = 0; i < 500; i++){
        var index1 = Math.floor((Math.random()*deck.length));
        var index2 = Math.floor((Math.random()*deck.length));
        newDeck[index1] = newDeck[index2];
    }
   return newDeck;
}

function sortDeck(sortDeck){
    deck.length = 0;
    for(i = 0; i < suits.length; i++){
        for(j = 0; j<values.length; j++){
            sortDeck.push(suits[i] + values[j]);
        }
    }
    return sortDeck;
}

