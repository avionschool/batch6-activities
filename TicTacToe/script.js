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


//BOARD
var board =[
    [1,1,1],
    [1,1,1],
    [1,1,1]
];


var boardHistory = [];

var playerX = 'X';
var playerO = 'O';
currentPlayer.innerHTML = "Player 1's turn";
var count = 0;
let x = false;

resultEvent();
resetEvent();
cellRow1.forEach(function (item, index){
    item.addEventListener('click', function clickHandlderR1(){
        if(x === false){
            currentPlayer.innerHTML = "Player 2's turn";
            this.classList.add(playerX);
            board[0][index] = playerX;
            boardHistory.push(this) ;
            console.log(boardHistory);
            console.log(board);
            x = true;
            
        } 
        else{
            currentPlayer.innerHTML = "Player 1's turn";
            this.classList.add(playerO);
            board[0][index] = playerO;
            boardHistory.push(this) ;
            console.log(boardHistory);
            console.log(board);
            x= false;
        }
            drawGame();
            winningrow();
            winningColumn();
            winningDiagonal();   
    }, {once :true});
})
    
    
    cellRow2.forEach(function(item, index){
        item.addEventListener('click', function clickHandlderR2(){
            if(x === false){
                currentPlayer.innerHTML = "Player 2's turn";
                this.classList.add(playerX);
                board[1][index] = playerX;
                boardHistory.push(this) ;
                console.log(boardHistory);
                console.log(board);
                x = true;
            } 
            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add(playerO);
                board[1][index] = playerO;
                boardHistory.push(this) ;
                console.log(boardHistory);
                console.log(board);
                x = false;
            }
            
            drawGame();
            winningrow();
            winningColumn();
            winningDiagonal();
        }, {once :true});
    })
    
    cellRow3.forEach(function(item, index){
        item.addEventListener('click', function clickHandlderR3(){
            if(x === false){
                currentPlayer.innerHTML = "Player 2's turn";
                this.classList.add(playerX);
                board[2][index] = playerX;
                boardHistory.push(this) ;
                console.log(boardHistory);
                console.log(board);
                x = true; 
            } 

            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add(playerO);                
                board[2][index] = playerO;
                boardHistory.push(this) ;
                console.log(boardHistory);
                console.log(board);
                x = false;
            }

            drawGame();
            winningrow();
            winningColumn();
            winningDiagonal();
        }, {once :true});
    })
    

//FUNCTIONS
//PREVIOUS AND NEXT BUTTON
    function resultEvent(){
        console.log(i);
        var i = 0;
        prevBtn.addEventListener('click', function(){
            if(boardHistory[0].style.visibility == "hidden"){
                this.style.visibility = 'hidden';
            }
            else{
                i++;
                nextBtn.style.visibility = 'visible';
                boardHistory[boardHistory.length - i].style.visibility = "hidden";
                console.log(boardHistory.length - i);
            }
           });
           
        
        nextBtn.addEventListener('click', function(){
            if(boardHistory[boardHistory.length -1].style.visibility == "visible"){
                this.style.visibility = 'hidden';
            }
            else{
                prevBtn.style.visibility = 'visible';
                this.style.visibility = 'visible';
                boardHistory[boardHistory.length - i].style.visibility = "visible";
                console.log(boardHistory.length - i);
                i --;
            }
            
        });
    }
    function resetEvent(){
        resetBtn.addEventListener('click', function(){
            for(i =0; i < 3; i ++){

                 cellRow1[i].classList.remove(playerX);
                 cellRow2[i].classList.remove(playerX);
                 cellRow3[i].classList.remove(playerX);
                 cellRow1[i].classList.remove(playerO);
                 cellRow2[i].classList.remove(playerO);
                 cellRow3[i].classList.remove(playerO);
            } 
        });
    }

    
    //RESET BUTTON 
    //DRAW!!
    function drawGame(){
        const draw1 = board[0].some(Num1);
        const draw2 = board[1].some(Num1);
        const draw3 = board[2].some(Num1);
        function Num1(item){
            return item === 1;
        }
           if(draw1 ===false && draw2 === false && draw3 === false){
               result.style.visibility = 'visible';
               result.style.pointerEvents = 'all';
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
            }
            else if(playerWinnerX == false && playerWinnerO == true){
                result.style.visibility = 'visible';
                result.style.pointerEvents = 'all';
                announcer.innerHTML = "Player 2!";
            }
    } 

    

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