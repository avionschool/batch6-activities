'use strict';

const deckOfCards = {
  suits: ['♠', '♡', '♢', '♣'],
  values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

const Card = function (value, suit, index, eachCard) {
  this.value = value;
  this.suit = suit;
  this.index = index;
  this.eachCard = eachCard;
};

// create a deck of cards
const createDeck = function () {
  let deck = new Array();
  let eachCard;
  // create a deck using nested for loop
  for (let suit = 0; suit < deckOfCards.suits.length; suit++) {
    for (let value = 0; value < deckOfCards.values.length; value++) {
      let card = new Card(
        deckOfCards.values[value],
        deckOfCards.suits[suit],
        deckOfCards.index[value],
        (eachCard = deckOfCards.values[value] + deckOfCards.suits[suit])
      );
      // console.log(eachCard);
      deck.push(card);
    }
  }
  return deck;
};
let deck1 = createDeck();

// 1) create a function that accepts the array of cards and retruns an array of shuffled cards
const shuffle = function (arrayInput) {
  for (let i = 0; i < arrayInput.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arrayInput[i];
    arrayInput[i] = arrayInput[j];
    arrayInput[j] = temp;
  }
  return arrayInput;
};

// 2)Create a function that accepts the array of cards and returns arranged by suit
const arrangeBySuit = (arrayInput) => {
  let sortArray = arrayInput.sort((a, b) => {
    if (a.suit > b.suit) return 1;
    else if (a.suit < b.suit) return -1;
    else 0;
  });
  return sortArray;
};

// 3) arranged by value in asc / des
let arrangeByValue = function (arrayInput) {
  let sortArray = arrayInput.sort((a, b) => {
    if (a.index > b.index) return 1;
    else if (a.index < b.index) return -1;
    else 0;
  });
  return sortArray;
};

// 4) Deal a Card
const symbolsToWords = function (symbol) {
  switch (symbol) {
    case '♠':
      return ' of Spades';
    case '♡':
      return ' of Hearts';
    case '♢':
      return ' of Diamonds';
    case '♣':
      return ' of Clubs';
    default:
      return symbol;
  }
};

const numberToWords = function (num) {
  switch (num) {
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
};

const dealRandomCard = function (arrayInput) {
  const randomCard = arrayInput.splice(
    Math.floor(Math.random() * arrayInput.length),
    1
  )[0];
  const test =
    numberToWords(randomCard.value) + symbolsToWords(randomCard.suit);
  return test;
};

// 5) dealing five cards until the deck is exhausted
const dealFiveCards = function (arrayInput) {
  shuffle(arrayInput);

  const randomCard = arrayInput.splice(
    Math.floor(Math.random() * arrayInput.length),
    5
  );
  return randomCard;
};
// console.log('Initial Deck:', deck1);
// console.log(deck1);

// console.log('Arranged by Suit:', arrangeBySuit(deck1));
// console.log(deck1);

// console.log('Arranged by Value:', arrangeByValue(deck1));
// console.log(deck1);

// console.log(dealRandomCard(deck1));
// console.log(deck1);

// console.log(dealFiveCards(deck1));
// console.log(deck1);
