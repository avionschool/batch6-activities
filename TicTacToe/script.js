// HTML ELEMENTS
var cellRow1 = document.querySelectorAll('.cell.row1');
var cellRow2 = document.querySelectorAll('.cell.row2');
var cellRow3 = document.querySelectorAll('.cell.row3');
var result = document.querySelector('.game-result');
var announcer = document.querySelector('.game-result h1 span');
var currentPlayer = document.getElementById('current-player');
var realTime = document.getElementById('real-time-result');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const resetBtn = document.getElementById('reset-button');

console.log('hello world');
//BOARD
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

//GAME!
startGame();

function startGame(){
    result.style.visibility = 'hidden';
    result.style.pointerEvents = 'none';
    cellRow1.forEach(function (item){
        item.removeEventListener('click', clickHandlderR1);
        item.classList.remove(playerX);
        item.classList.remove(playerO);
        item.removeEventListener('click', clickHandlderR1);
        item.addEventListener('click', clickHandlderR1, {once :true});
    })
    
    cellRow2.forEach(function(item){
        item.removeEventListener('click', clickHandlderR2);
        item.classList.remove(playerX);
        item.classList.remove(playerO);
        item.addEventListener('click', clickHandlderR2 , {once :true});
    })
    
    cellRow3.forEach(function(item){
        item.removeEventListener('click', clickHandlderR3);
        item.classList.remove(playerX);
        item.classList.remove(playerO);
        item.addEventListener('click', clickHandlderR3, {once :true});
    })
    resultEvent();
}


//ROW CLICK EVENTS

function clickHandlderR1(e){
    let box = e.target;
    let i = box.id;
    let index = i.split('-');
    if(x === false){
        currentPlayer.innerHTML = "Player 2's turn";
        box.classList.add(playerX);
        board[0][index[1]] = playerX;
        moveHistory.push(box);
        boardHistory.push(JSON.parse(JSON.stringify(board)));
        console.log(boardHistory);
        x = true;
        
    } 
    else{
        currentPlayer.innerHTML = "Player 1's turn";
        box.classList.add(playerO);
        board[0][index[1]] = playerO;
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

function clickHandlderR2(e){
    let box = e.target;
    let i = box.id;
    let index = i.split('-');
    if(x === false){
        currentPlayer.innerHTML = "Player 2's turn";
        box.classList.add(playerX);
        board[1][index[1]] = playerX;
        moveHistory.push(box) ;
        boardHistory.push(JSON.parse(JSON.stringify(board)));
        console.log(boardHistory);
        x = true;
    } 
    else{
        currentPlayer.innerHTML = "Player 1's turn";
        this.classList.add(playerO);
        board[1][index[1]] = playerO;
        moveHistory.push(box) ;
        boardHistory.push(JSON.parse(JSON.stringify(board)));
        console.log(boardHistory);
        x = false;
    }
    
    winningrow();
    winningColumn();
    winningDiagonal();
    drawGame();
}

function clickHandlderR3(e){
    let box = e.target;
    let i = box.id;
    let index = i.split('-');
    if(x === false){
        currentPlayer.innerHTML = "Player 2's turn";
        box.classList.add(playerX);
        board[2][index[1]] = playerX;
        moveHistory.push(box) ;
        boardHistory.push(JSON.parse(JSON.stringify(board)));
        console.log(boardHistory);
        x = true; 
    } 

    else{
        currentPlayer.innerHTML = "Player 1's turn";
        box.classList.add(playerO);                
        board[2][index[1]] = playerO;
        moveHistory.push(box) ;
        boardHistory.push(JSON.parse(JSON.stringify(board)));
        console.log(boardHistory);
        x = false;
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
    
    
    
    // }
    
    // function Event1stRow(){
        //     if(x === false){
    //         currentPlayer.innerHTML = "Player 2's turn";
    //         this.classList.add('x');
    //         console.log(boardj);
    //         row1[index] ='x';
    //         return x = true;
    //     } 
 
    //     else{
    //         currentPlayer.innerHTML = "Player 1's turn";
    //         this.classList.add('o');
    //         console.log(boardj);
    //         row1[index] ='0';
    //         return x= false;
    //     }
    // }
    // function Event2ndRow(){
    //     if(x === false){
    //         currentPlayer.innerHTML = "Player 2's turn";
    //         this.classList.add('x');
    //         console.log(boardj);
    //         row2[index] ='x';
    //         return x = true;
    //     } 
    //     else{
    //         currentPlayer.innerHTML = "Player 1's turn";
    //         this.classList.add('o');
    //         console.log(boardj);
    //         row2[index] ='o';
    //         x = false;
    //     }
    
    // }
    // function Event3rdRow(){
    //     if(x === false){
    //         currentPlayer.innerHTML = "Player 2's turn";
    //         this.classList.add('x');
    //         console.log(boardj);
    //         row3[index] ='x';
    //         return x = true;
    //     } 
    //     else{
    //         currentPlayer.innerHTML = "Player 1's turn";
    //         this.classList.add('o');
    //         console.log(boardj);
    //         row3[index] ='o';
    //         return x = false;
    //     }
    
    // }

     //      function winningrow(){
    //          //Row X
    //          if(row1[0] === winningCombRowX[0] && row1[1] === winningCombRowX[1] && row1[2] === winningCombRowX[2]){
    //              playerWinnerX  = true;
    //              rowWinner();
    //          }

    //          else if(row2[0] === winningCombRowX[0] && row2[1] === winningCombRowX[1] && row2[2] === winningCombRowX[2]){
    //              layerWinnerX  = true;
    //              rowWinner();
    //          }

    //          else if(row3[0] === winningCombRowX[0] && row3[1] === winningCombRowX[1] && row3[2] === winningCombRowX[2]){
    //              playerWinnerX  = true;
    //              rowWinner();
    //          }

    //          //PLAYER O
    //          else if(row1[0] === winningCombRowO[0] && row1[1] === winningCombRowO[1] && row1[2] === winningCombRowO[2]){
    //              playerWinnerO = true;
    //              rowWinner();
    //          }

    //          else if(row2[0] === winningCombRowO[0] && row2[1] === winningCombRowO[1] && row2[2] === winningCombRowO[2]){
    //              playerWinnerO = true;
    //              rowWinner();
    //          }

    //          else if(row3[0] === winningCombRowO[0] && row3[1] === winningCombRowO[1] && row3[2] === winningCombRowO[2]){
    //              playerWinnerO = true;
    //              rowWinner();
    //          }
    //  }

    //     function winningrow(){
//          //Row X
//         if(board[0][0] === playerX && board[0][1] === playerX && board[0][2] === playerX){
//             playerWinnerX  = true;
//             rowWinner();
//         }

//         else if(board[1][0] == playerX && board[1][1] == playerX && board[1][2] == playerX){
//             playerWinnerX  = true;
//             rowWinner();
//         }

//         else if(board[2][0] == playerX && board[2][1] == playerX && board[2][2] == playerX){
//             playerWinnerX  = true;
//             rowWinner();
//         }

//         //PLAYER O
//         else if(board[0][0] ===playerO && board[0][1] === playerO && board[0][2] === playerO){
//             playerWinnerO = true;
//             rowWinner();
//         }

//         else if(board[1][0] === playerO && board[1][1] === playerO && board[1][2] === playerO){
//             playerWinnerO = true;
//             rowWinner();
//         }

//         else if(board[2][0] === playerO && board[2][1] === playerO && board[2][2] ===playerO){
//             playerWinnerO = true;
//             rowWinner();
//         }
// }