var suits = ['♣','♠','♦','♥'];
var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var deck =[];

console.log(`List of functions:
To create a new deck of Cards: Type 'createDeck()'
To shuffle cards: Type 'shuffle(deck)'
To sort cards by suit: Type 'sortSuit(deck)'
To sort cards by Values in Ascending Order: Type 'sortValuesAscending(deck)'
To sort cards by Values in Decending Order: Type 'sortValuesDescending(deck)'
To deal cards: Type 'dealCard(deck)'
To deal Five cards: Type dealFive(deck)'
`);

//Creating a New Deck
function createDeck(){
    
    deck.length =0;
    for(i = 0; i < suits.length; i++){
        for(j = 0; j< values.length; j++){
            deck.push(suits[i] + values[values.length-1-j]);
        }
    }
    //shuffle(card);
    return deck;
}

//Shuffle Cards
function shuffle(newDeck){
    for(let i = 0; i < 500; i++){
        var index1 = Math.floor((Math.random()*newDeck.length));
        var index2 = Math.floor((Math.random()*newDeck.length));
        var elem = newDeck[index1];
        newDeck[index1] = newDeck[index2];
        newDeck[index2]= elem;
    }
   return newDeck;
}

//Sorting Suits
function sortSuit(card){
    let sortedSuit = card.map(x=> x);
    //let sortedSuit = card;
    return sortedSuit.sort((a,b)=> {
        let i = suits.indexOf(a.slice(0,1));
        let j = suits.indexOf(b.slice(0,1));
        return i - j;
    });
}

//SORTING VALUES
function sortValuesAscending(card){
    //let sortedCard = card.map(x=> x);
    let sortedCard = card;
    sortedCard.sort(function compare(a, b){
        let i = values.indexOf(a.slice(1));
        let j = values.indexOf(b.slice(1));
        return i - j;
    });
    return sortedCard;

}
function sortValuesDescending(card){
    //let sortedCard = card.map(x=> x);
    let sortedCard = card;
    sortedCard.sort(function compare(a, b){
        let i = values.indexOf(a.slice(1));
        let j = values.indexOf(b.slice(1));
        return j - i;
    });
    return sortedCard;
}

//DEAL CARD
function dealCard(card){
    console.log(`${CardValue(card)} of ${CardSuits(card)}`);
    card.shift();
    return card;
}

function CardSuits(card){
    switch(card[0][0]){
        case '♣':
            return 'Clubs';
        case '♠':
            return 'Spades';
        case '♥':
            return 'Hearts';
        case '♦':
            return 'Diamonds';
    }
}

function CardValue (card){
    switch(card[0].slice(1)){
        case 'A':
            return 'Ace';
        case '2':
            return 'Two';
        case '3':
            return 'Three';
        case '4':
            return 'Four';
        case '5':
            return 'Five';
        case '6':
            return 'Six';
        case '7':
            return 'Seven';
        case '8':
            return 'Eight';
        case '9':
            return 'Nine';
        case '10':
            return 'Ten';
        case 'J':
            return 'Jack';
        case 'Q':
            return 'Queen';
        case 'K':
            return 'King';
    }
}

//DEAL 5 CARDS
function dealFive(card){
    if(card.length < 5){
        return dealCard(card);
    }
    else{
        let fiveCards = [];
        pushFiveCards();
        shiftDeck()
        sortValuesAscending(fiveCards);
        console.log(fiveCards);
         
        function pushFiveCards(){
            for(let i =0; i<5; i++){
                fiveCards.push(card[i]);
            }
            return fiveCards;
        }
        function shiftDeck(){
            for(let i =0; i<5; i++){
               card.shift();
            }
            return card;
        }
    
        switch(true){
            case fourOfaKind(fiveCards):
                return 'Four of a Kind';
            case RoyalFlush(fiveCards):
                return 'Royal Flush';
             case straight(fiveCards) && flush(fiveCards):
                return 'Straight Flush';
            case straight(fiveCards):
                return 'Straight';
            case flush(fiveCards):
                return 'Flush';
            case fullHouse(fiveCards):
                return 'FullHouse';
            case threeKind(fiveCards):
                return 'Three of a Kind';
            case twoKind(fiveCards):
                return 'Two Pair';
            default:
                return 'One Pair';
        }
        
    }
   
}


//Functions for Combinations
function straight(card){
    let arr = [];
    let cardRank = [];
    for(i = 0; i<card.length; i++){
       arr.push(values.indexOf(card[i].slice(1)) === values.indexOf(card[0].slice(1)) +i) ;
       cardRank.push(card[i].slice(1))
    }
    if(cardRank.includes('A') && cardRank.includes('10') && cardRank.includes('J')  && cardRank.includes('Q') && cardRank.includes('K')){
        return true;
    }
    else{
        return arr.every(item => item === true);
    }
}

function flush(card){
    switch(true){
        case card.every(item => item.slice(0,1)=='♣'):
            return  true;
        case card.every(item => item.slice(0,1)=='♠'):
            return true;
        case card.every(item => item.slice(0,1)=='♥'):
            return true;
        case card.every(item => item.slice(0,1)=='♦'):
            return true;
    }

}

function fourOfaKind(card){
//     let arr = [];
//     for(i = 0; i<card.length; i++){
//        arr.push(values.indexOf(card[i].slice(1)) === values.indexOf(card[0].slice(1))) ;
//     }
//    return arr.includes(true,3 || false,arr[arr.length-1] )
return card[0].slice(1) == card[3].slice(1) || card[1].slice(1) == card[4].slice(1);
}

function fullHouse(card){
    if(card[0].slice(1) === card[1].slice(1) && card[2].slice(1) === card[3].slice(1)){
        return true;
    }
    else if(card[3].slice(1) === card[4].slice(1) && card[0].slice(1) === card[2].slice(1)){
        return true;
    }
}

 function RoyalFlush(card){
     let cardRank = [];
     let cardSuit = [];
     for( i=0; i<card.length; i++){
         cardSuit.push(card[i].slice(0,1));
         cardRank.push(card[i].slice(1));
     }
     return(cardRank.includes('A') && cardRank.includes('10') && cardRank.includes('J')  && cardRank.includes('Q') && cardRank.includes('K') && cardSuit.every((item,_index,arr) => item == arr[0]));
 }

  function threeKind(card){
     return card[0].slice(1) == card[2].slice(1) || card[1].slice(1) == card[3].slice(1) || card[2].slice(1) == card[4].slice(1) ;
    }

    function twoKind(card){
        let arr = [];
        for(i = 0; i<card.length; i++){
           for(j =1; j < card.length; j++){           
                arr.push(card[i].slice(1) === card[j].slice(1) && card.indexOf(card[i]) !== card.indexOf(card[j]) );
            }
           
        }
    //console.log(arr);
       return arr.includes(true);
    }