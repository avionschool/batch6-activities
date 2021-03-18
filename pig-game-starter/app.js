/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// document.getElementsByTagName('img')[0].setAttribute('src', 'dice-1.png');
//=======Form=======//
const form = document.querySelector('.form');
const submit = form.querySelector('#submit-button');

function playerName(nameOne, nameTwo, target){
    this.One = nameOne;
    this.Two = nameTwo;
    this.targetScore = target;
}

//==================Buttons===================================//
const shuffleBtn = document.getElementsByClassName("btn-roll")[0];
const holdBtn = document.getElementsByClassName("btn-hold")[0];
const newgameBtn = document.getElementsByClassName("btn-new")[0];

//========PLAYER Total SCORE=================//
const playerOneTotal = document.getElementById('score-0');
const playerTwoTotal = document.getElementById('score-1');


//=====CURRENT=====///
let playerScoreOne = document.getElementById('current-0');
let playerScoreTwo = document.getElementById('current-1');
let currentScoreOne = 0;
let currentScoreTwo = 0;


//========WHO'S TURN IS IT================//
let playerOneTurn = true;
let playerTwoTurn = false;;

//=================DICE======================//
let dice = document.getElementsByTagName('img')[0];
const dice_values = [1,2,3,4,5,6];
var dice_imgs = dice_values[Math.floor(dice_values.length*Math.random())];
//============SOUNDS=======================//
const diceSound = new Audio('roll.wav');
const winnerSound = new Audio('triumph.mp3');


//===========FUNCTIONS (EVENTS)=============//
startGame();
function startGame(){

    submit.addEventListener('click', formData);
    shuffleBtn.addEventListener('click', clickHandler);
    holdBtn.addEventListener('click', hold);
    newgameBtn.addEventListener('click', (()=>location.reload()));
    
    
}
let targetScore;
function formData(e){
    let data = new FormData(form);
    let newPlayers = new playerName(data.get('player-one'), data.get('player-two'), data.get('target-score'));
    if(newPlayers.One.length > 1 && newPlayers.Two.length > 1 && newPlayers.targetScore > 1){
        e.preventDefault();
        document.querySelector('#name-0').innerHTML = newPlayers.One;
        document.querySelector('#name-1').innerHTML = newPlayers.Two;
        document.querySelector('.target-score span').innerHTML = `${newPlayers.targetScore}`;
        document.querySelector('.form-wrapper').style.visibility = 'hidden';
        targetScore = newPlayers.targetScore;
    }
       
    
}
function clickHandler(){
    diceSound.play();
    let dice_imgs = dice_values[Math.floor(dice_values.length*Math.random())];
    if(playerOneTurn === true){
        playerOne();
        
    }
    else if (playerTwoTurn === true){
        playerTwo();
    }
    
   
    function playerOne(){
        playerScoreOne.innerHTML = `${currentScoreOne+=dice_imgs}`;
        dice.setAttribute('src', `dice-${dice_imgs}.png`);
        dice.classList.toggle('dice-roll')
        document.querySelector('#name-0').classList.add('active');
        document.querySelector('#name-1').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        if(dice_imgs === 1){
            currentScoreOne = 0;
            playerScoreOne.innerHTML = `${currentScoreOne}`;
            playerOneTurn = false;
            playerTwoTurn = true;
            
        }
        return currentScoreOne;
        
        
    }

    function playerTwo(){
        playerScoreTwo.innerHTML = `${currentScoreTwo+=dice_imgs}`;
        dice.classList.toggle('dice-roll')
        dice.setAttribute('src', `dice-${dice_imgs}.png`);
        document.querySelector('#name-1').classList.add('active');
        document.querySelector('#name-0').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.remove('active');
        
        if(dice_imgs === 1){
            currentScoreTwo = 0;
            playerScoreTwo.innerHTML = `${currentScoreTwo}`;
            playerTwoTurn = false;
            playerOneTurn = true;
            
        }
        return currentScoreTwo;
    }
}

function hold(){
    let dice_imgs = dice_values[Math.floor(dice_values.length*Math.random())];
    dice.setAttribute('src', `dice-${dice_imgs}.png`);
    let i;
    let newScore;
    if(playerOneTurn === true){
        i = 0;
        let initialVal = playerOneTotal.innerHTML;
        newScore = parseInt(initialVal) + currentScoreOne;
        playerOneTurn = false;
        playerTwoTurn = true;
        currentScoreOne = 0;
        playerScoreOne.innerHTML = `${currentScoreOne}`;
    }
    else if(playerTwoTurn === true){
        i = 1;
        let initialVal = playerTwoTotal.innerHTML;
        newScore = parseInt(initialVal) + currentScoreTwo;
        playerTwoTurn = false;
        playerOneTurn = true;
        currentScoreTwo = 0;
        playerScoreTwo.innerHTML = `${currentScoreTwo}`;
    }
    document.querySelector(`#name-${i}`).classList.remove('active');
    document.getElementById(`score-${i}`).innerHTML = `${newScore}`;
    winner();
 }

 function winner(){
    let j;
    if(parseInt(playerOneTotal.innerHTML) >= targetScore){
        j = 0;
        winnerSound.play();
        holdBtn.style.pointerEvents = 'none';
        shuffleBtn.style.pointerEvents = 'none';
     }
    else if(parseInt(playerTwoTotal.innerHTML) >= targetScore){
        j = 1;
        winnerSound.play();
        holdBtn.style.pointerEvents = 'none';
        shuffleBtn.style.pointerEvents = 'none';
}
document.getElementById(`name-${j}`).classList.add('winner')
document.querySelector(`.player-${j}-panel`).classList.add('winner-wrapper');

}