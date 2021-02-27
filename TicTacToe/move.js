//HTML ELEMENTS
const cellBoard = document.querySelectorAll('.cell');
var result = document.querySelector('.game-result');
var announcer = document.querySelector('.game-result h1 span');
var currentPlayer = document.getElementById('current-player');
var realTime = document.getElementById('real-time-result');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const resetBtn = document.getElementById('reset-button');




const board =[
    [1,1,1],
    [1,1,1],
    [1,1,1]
];


const boardHistory = [];
var moveHistory = [];
var playerX = 'X';
var playerO = 'O';
currentPlayer.innerHTML = "Player 1's turn";
let x = false;

startGame();
function startGame(){
    result.style.visibility = 'hidden';
    result.style.pointerEvents = 'none';
    cellBoard.forEach(function (item){
        item.classList.remove(playerX);
        item.classList.remove(playerO);
        item.removeEventListener('click', clickHandlder);
        item.addEventListener('click', clickHandlder, {once :true});
    })
    resultEvent();
}

function clickHandlder(e){
    let box = e.target;
    let i = box.id;
    console.log(i);
    console.log(board);
    let index = i.split('-');
    if(x === false){
        currentPlayer.innerHTML = "Player 2's turn";
        box.classList.add(playerX);
        board[index[0]][index[1]] = playerX;
        moveHistory.push(box);
        boardHistory.push(JSON.parse(JSON.stringify(board)));
        console.log(boardHistory);
        x = true;
        
    } 
    else{
        currentPlayer.innerHTML = "Player 1's turn";
        box.classList.add(playerO);
        board[index[0]][index[1]] = playerO;
        moveHistory.push(box) ;
        boardHistory.push(JSON.parse(JSON.stringify(board)));
        console.log(boardHistory);
        x= false;
    }
   
     winningrow();
     winningColumn();
     winningDiagonal();   
     drawGame();

}

//FUNCTIONS
//BUTTONS
function resultEvent(){
    var i = 1;
    nextBtn.style.visibility = 'hidden';
    prevBtn.addEventListener('click', function(){
        nextBtn.style.visibility = 'visible';
        moveHistory[moveHistory.length - i].style.visibility = "hidden";
        //console.log(moveHistory.length - i);
        console.log(boardHistory[boardHistory.length-1-i]);
        // console.log(i);
        i++;
        
        if(moveHistory[0].style.visibility == "hidden"){
            this.style.visibility = 'hidden';
        }
    });
           
    nextBtn.addEventListener('click', function(){
        i --;
        moveHistory[moveHistory.length - i].style.visibility = "visible";
        prevBtn.style.visibility = 'visible';
        this.style.visibility = 'visible';
        moveHistory[moveHistory.length - i].style.visibility = "visible";
        //console.log(moveHistory.length - i);
        console.log(boardHistory[boardHistory.length-i]);
        // console.log(i);
        
        if(moveHistory[moveHistory.length -1].style.visibility == "visible"){
            this.style.visibility = 'hidden';
            
        }
    });

    resetBtn.addEventListener('click',function(){
        location.reload();
    });      
}

//DRAW!!

function drawGame(){
    // let boardCopy = boardHistory[boardHistory.length-1];
    function Num1(item){
        return item === 1;
    }

    var draw1 = board[0].some(Num1);
    var draw2 = board[1].some(Num1);
    var draw3 = board[2].some(Num1);
        
    if(draw1 == false && draw2 == false && draw3 == false && playerWinnerO == false && playerWinnerX == false){
    result.style.visibility = 'visible';
    result.style.pointerEvents = 'all';
    resetBtn.style.zIndex = '5';
    document.querySelector('#game-result h1').innerHTML = 'Draw!!';
    }
}



//WINNING CONDITIONS ------------------------------------------------------------- 
var playerWinnerX = false;
var playerWinnerO = false;
   
function rowWinner(){
        if(playerWinnerX == true && playerWinnerO == false){
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Player 1!";
            resetBtn.style.zIndex = '5';
            }
        else if(playerWinnerX == false && playerWinnerO == true){
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Player 2!";
            resetBtn.style.zIndex = '5';
        }
            
} 
// ROWS WINNING CONDITIONS

function winningrow(){
    //Row X
   if(board[0][0] === playerX && board[0][1] === playerX && board[0][2] === playerX){
       playerWinnerX  = true;
       rowWinner();
   }

   else if(board[1][0] == playerX && board[1][1] == playerX && board[1][2] == playerX){
       playerWinnerX  = true;
       rowWinner();
   }

   else if(board[2][0] == playerX && board[2][1] == playerX && board[2][2] == playerX){
       playerWinnerX  = true;
       rowWinner();
   }

   //PLAYER O
   else if(board[0][0] ===playerO && board[0][1] === playerO && board[0][2] === playerO){
       playerWinnerO = true;
       rowWinner();
   }

   else if(board[1][0] === playerO && board[1][1] === playerO && board[1][2] === playerO){
       playerWinnerO = true;
       rowWinner();
   }

   else if(board[2][0] === playerO && board[2][1] === playerO && board[2][2] ===playerO){
       playerWinnerO = true;
       rowWinner();
   }
}


//COLUMNS WINNING CONDITIONS
function winningColumn(){
        
    //PLAYER X
    if(board[0][0] === playerX && board[1][0] === playerX && board[2][0] === playerX){
        playerWinnerX = true;
        rowWinner();
    }
    else if(board[0][1] === playerX && board[1][1] === playerX && board[2][1] === playerX){
        playerWinnerX  = true;
        rowWinner();
    }

    else if(board[0][2] === playerX && board[1][2] ===playerX && board[2][2] === playerX){
        playerWinnerX  = true;
        rowWinner();
    }
    //PLAYER O
    else if(board[0][0] === playerO && board[1][0] === playerO && board[2][0] === playerO){
        playerWinnerO = true;
        rowWinner();
    }
    else if(board[0][1] === playerO && board[1][1] === playerO && board[2][1] === playerO){
        playerWinnerO = true;
        rowWinner();
    }
    else if(board[0][2] === playerO && board[1][2] ===playerO && board[2][2] === playerO){
        playerWinnerO = true;
        rowWinner();
    }
}

//WINNING DIAGONALS
function winningDiagonal(){
       
    if(board[0][0] === playerX && board[1][1] === playerX && board[2][2] === playerX){
        playerWinnerX = true;
        rowWinner();
            
    }
    else if(board[2][0] === playerX && board[1][1] === playerX && board[0][2] === playerX){
        playerWinnerX = true;
        rowWinner();
            
    }
    //PLAYER O
    if(board[0][0] === playerO && board[1][1] === playerO && board[2][2] === playerO){
        playerWinnerO = true;
        rowWinner();
            
    }
    else if(board[2][0] === playerO && board[1][1] === playerO && board[0][2] === playerO){
        playerWinnerO = true;
        rowWinner(); 
    }
}
    