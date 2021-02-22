var pato1 = document.querySelectorAll('.pato1');
var pato2 = document.querySelectorAll('.pato2');
var pato3 = document.querySelectorAll('.pato3');
var result = document.querySelector('.game-result');
var announcer = document.querySelector('.game-result h1');
var currentPlayer = document.getElementById('current-player');
var realTime = document.getElementById('real-time-result');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');



var row1 = [1,1,1];
var row2 = [1,1,1];
var row3 = [1,1,1];
var boardj = [row1, row2, row3];

const winningCombRowX = ['X', 'X', 'X'];
const winningCombRowO = ['O', 'O', 'O',]
var boardR1 = [];
var boardR2 = [];
var boardR3 = [];
var boardHistory = [boardR1, boardR2, boardR3];
const boardMoves = [];


    let x = false;
    var playerX = 'X';
    var playerO = 'O';
    currentPlayer.innerHTML = "Player 1's turn";
    var count = 0;

    resultEvent();
    pato1.forEach(function(item, index){
        item.addEventListener('click', function(){
            if(x === false){
                currentPlayer.innerHTML = "Player 2's turn";
                this.classList.add('x');
                row1[index] = playerX;
                boardR1[index] = this;
                console.log(boardj);

                boardMoves.push(boardHistory);
                console.log( boardMoves);
                x = true;
                
            } 
            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add('o');
                row1[index] = playerO;
                boardR1[index] = this;
                console.log(boardj);

                boardMoves.push(boardHistory);
                console.log( boardMoves);
                x= false;
            }
             endgame();
            winningrow();
            winningColumn();
            winningDiagonal();
            
                        
       }, {once :true});
    })


    pato2.forEach(function(item, index){
        item.addEventListener('click', function(){
            if(x === false){
                currentPlayer.innerHTML = "Player 2's turn";
                this.classList.add('x');
                row2[index] = playerX;
                boardR2[index] = this;

                boardMoves.push(boardHistory);
                console.log( boardMoves);
                
                
                x = true;
            } 
            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add('o');
                row2[index] = playerO;
                boardR2[index] = this;

                boardMoves.push(boardHistory);
                console.log( boardMoves);
                x = false;
            }
            
            endgame();
            winningrow();
            winningColumn();
            winningDiagonal();
            
            
       }, {once :true});
    })
   
    pato3.forEach(function(item, index){
        item.addEventListener('click', function(){
            if(x === false){
                currentPlayer.innerHTML = "Player 2's turn";
                this.classList.add('x');
                row3[index] = playerX;
                boardR3[index] = this;

                boardMoves.push(boardHistory);
                console.log( boardMoves);
                x = true;
                
            } 
            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add('o');

                boardMoves.push(boardHistory);
                console.log( boardMoves);
                row3[index] = playerO;
                boardR3[index] = this;
                x = false;
            }
            endgame();
            winningrow();
            winningColumn();
            winningDiagonal();
            
            
       }, {once :true});
    })


    function resultEvent(){
        var i = 1;
        prevBtn.addEventListener('click', function(){
            i++;

          console.log(boardMoves[boardMoves.length - i]);
        });
    }
        

      function endgame(){
           const draw1 = row1.some(Num1);
           const draw2 = row2.some(Num1);
           const draw3 = row3.some(Num1);
           function Num1(item){
               return item === 1;
           }
           if(draw1 ===false && draw2 === false && draw3 === false){
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Draw!";
           
           }
        }         
    
    
    function winningrow(){
        var playerWinnerRow = false;
        if(row1[0] === winningCombRowX[0] && row1[1] === winningCombRowX[1] && row1[2] === winningCombRowX[2]){
           playerWinnerRow = true;
           result.style.visibility = 'visible';
           result.style.pointerEvents = 'all';
           announcer.innerHTML = "<h1>Winner Player 1!</h1>";
           console.log(playerWinnerRow);
            
            
        }
        else if(row2[0] === winningCombRowX[0] && row2[1] === winningCombRowX[1] && row2[2] === winningCombRowX[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 1!";
            
           
        }
        else if(row3[0] === winningCombRowX[0] && row3[1] === winningCombRowX[1] && row3[2] === winningCombRowX[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 1!";

        }
        //PLAYER O
        else if(row1[0] === winningCombRowO[0] && row1[1] === winningCombRowO[1] && row1[2] === winningCombRowO[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 2!";
        }
        else if(row2[0] === winningCombRowO[0] && row2[1] === winningCombRowO[1] && row2[2] === winningCombRowO[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 2!";
           
        }
        else if(row3[0] === winningCombRowO[0] && row3[1] === winningCombRowO[1] && row3[2] === winningCombRowO[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 2!";
           
        }
    }
    
    function winningColumn(){
        var playerWinnerColumn = false;
        if(row1[0] === winningCombRowX[0] && row2[0] === winningCombRowX[0] && row3[0] === winningCombRowX[0]){
            playerColumn = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 1!";
            
            
        }
        else if(row1[1] === winningCombRowX[1] && row2[1] === winningCombRowX[1] && row3[1] === winningCombRowX[1]){
            playerColumn = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 1!";
            
            
        }
        else if(row1[2] === winningCombRowX[2] && row2[2] === winningCombRowX[2] && row3[2] === winningCombRowX[2]){
            playerColumn = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 1!";
            
            
        }
        //PLAYER O
        else if(row1[0] === winningCombRowO[0] && row2[0] === winningCombRowO[0] && row3[0] === winningCombRowO[0]){
            playerColumn = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 2!";
            
            
        }
        else if(row1[1] === winningCombRowO[1] && row2[1] === winningCombRowO[1] && row3[1] === winningCombRowO[1]){
            playerColumn = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 2!";
            
            
        }
        else if(row1[2] === winningCombRowO[2] && row2[2] === winningCombRowO[2] && row3[2] === winningCombRowO[2]){
            playerColumn = true;
            result.style.visibility = 'visible';
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 2!";
            
            
        }
    }

    function winningDiagonal(){
        var playerDiagonal = false;
        if(row1[0] == winningCombRowX[0] && row2[1] == winningCombRowX[1] && row3[2] == winningCombRowX[2]){
            result.style.visibility = 'visible';
            playerDiagonal = true;
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 1!";
            
        }
        else if(row3[0] == winningCombRowX[0] && row2[1] == winningCombRowX[1] && row1[2] == winningCombRowX[2]){
            result.style.visibility = 'visible';
            playerDiagonal = true;
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 1!";
            
        }
        //PLAYER O
        if(row1[0] == winningCombRowO[0] && row2[1] == winningCombRowO[1] && row3[2] == winningCombRowO[2]){
            result.style.visibility = 'visible';
            playerDiagonal = true;
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 2!";
            
        }
        else if(row3[0] == winningCombRowO[0] && row2[1] == winningCombRowO[1] && row1[2] ==winningCombRowO[2]){
            result.style.visibility = 'visible';
            playerDiagonal = true;
            result.style.pointerEvents = 'all';
            announcer.innerHTML = "Winner Player 2!";
           
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
