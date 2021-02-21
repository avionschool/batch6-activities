var box = document.querySelectorAll(".box");
var pato1 = document.querySelectorAll('.pato1');
var pato2 = document.querySelectorAll('.pato2');
var pato3 = document.querySelectorAll('.pato3');
var board = document.querySelector('#board');
var result = document.querySelector('.game-result');
var currentPlayer = document.getElementById('current-player');
var realTime = document.getElementById('real-time-result');



const row1 = [1,1,1];
const row2 = [1,1,1];
const row3 = [1,1,1];
const boardj = [row1, row2, row3];

const winningCombRowX = ['X', 'X', 'X'];

const winningCombRowO = ['O', 'O', 'O',]

var boardPrint = boardj.toString();



// var X = document.createElement('div');
// X.style.backgroundColor = 'white';
// X.style.width = '50px';
// X.style.height = '50px;
    let x = false;
    var playerX = 'X';
    var playerO = 'O';
    currentPlayer.innerHTML = "Player 1's turn";
    
    pato1.forEach(function(item, index){
        item.addEventListener('click', function(){
            if(x === false){
                currentPlayer.innerHTML = "Player 2's turn";
                this.classList.add('x');
                console.log(boardj);
                row1[index] = playerX;
                x = true;
                
            } 
            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add('o');
                console.log(boardj);
                row1[index] = playerO;
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
                console.log(boardj);
                row2[index] = playerX;
                x = true;
            } 
            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add('o');
                console.log(boardj);
                row2[index] = playerO;
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
                console.log(boardj);
                row3[index] = playerX;
                x = true;
                
            } 
            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add('o');
                console.log(boardj);
                row3[index] = playerO;
                x = false;
            }
            endgame();
            winningrow();
            winningColumn();
            winningDiagonal();
            
            
       }, {once :true});
    })

      function endgame(){
           const draw1 = row1.some(Num1);
           const draw2 = row2.some(Num1);
           const draw3 = row3.some(Num1);
           function Num1(item){
               return item === 1;
           }
           if(draw1 ===false && draw2 === false && draw3 === false){
            result.style.visibility = 'visible';
           }
           
        
        }         
    
    
    function winningrow(){
        var playerWinnerRow = false;
        if(row1[0] === winningCombRowX[0] && row1[1] === winningCombRowX[1] && row1[2] === winningCombRowX[2]){
           playerWinnerRow = true;
           result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
           console.log(playerWinnerRow);
            
            
        }
        else if(row2[0] === winningCombRowX[0] && row2[1] === winningCombRowX[1] && row2[2] === winningCombRowX[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerRow);
           
        }
        else if(row3[0] === winningCombRowX[0] && row3[1] === winningCombRowX[1] && row3[2] === winningCombRowX[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerRow);
        }
        //PLAYER O
        else if(row1[0] === winningCombRowO[0] && row1[1] === winningCombRowO[1] && row1[2] === winningCombRowO[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerRow);
           
        }
        else if(row2[0] === winningCombRowO[0] && row2[1] === winningCombRowO[1] && row2[2] === winningCombRowO[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerRow);
           
        }
        else if(row3[0] === winningCombRowO[0] && row3[1] === winningCombRowO[1] && row3[2] === winningCombRowO[2]){
            playerWinnerRow = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerRow);
           
        }
    }
    
    function winningColumn(){
        var playerWinnerColumn = false;
        if(row1[0] === winningCombRowX[0] && row2[0] === winningCombRowX[0] && row3[0] === winningCombRowX[0]){
            playerColumn = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerColumn);
        }
        else if(row1[1] === winningCombRowX[1] && row2[1] === winningCombRowX[1] && row3[1] === winningCombRowX[1]){
            playerColumn = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerColumn);
        }
        else if(row1[2] === winningCombRowX[2] && row2[2] === winningCombRowX[2] && row3[2] === winningCombRowX[2]){
            playerColumn = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerColumn);
        }
        //PLAYER O
        else if(row1[0] === winningCombRowO[0] && row2[0] === winningCombRowO[0] && row3[0] === winningCombRowO[0]){
            playerColumn = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerColumn);
        }
        else if(row1[1] === winningCombRowO[1] && row2[1] === winningCombRowO[1] && row3[1] === winningCombRowO[1]){
            playerColumn = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerColumn);
        }
        else if(row1[2] === winningCombRowO[2] && row2[2] === winningCombRowO[2] && row3[2] === winningCombRowO[2]){
            playerColumn = true;
            result.style.visibility = 'visible';
            realTime.innerHTML = boardPrint;
            console.log(playerWinnerColumn);
        }
    }

    function winningDiagonal(){
        var playerDiagonal = false;
        if(row1[0] == winningCombRowX[0] && row2[1] == winningCombRowX[1] && row3[2] == winningCombRowX[2]){
            result.style.visibility = 'visible';
            playerDiagonal = true;
            realTime.innerHTML = boardPrint;
            console.log(playerDiagonal);
        }
        else if(row3[0] == winningCombRowX[0] && row2[1] == winningCombRowX[1] && row1[2] == winningCombRowX[2]){
            result.style.visibility = 'visible';
            playerDiagonal = true;
            realTime.innerHTML = boardPrint;
            console.log(playerDiagonal);
        }
        //PLAYER O
        if(row1[0] == winningCombRowO[0] && row2[1] == winningCombRowO[1] && row3[2] == winningCombRowO[2]){
            result.style.visibility = 'visible';
            playerDiagonal = true;
            realTime.innerHTML = boardPrint;
            console.log(playerDiagonal);
        }
        else if(row3[0] == winningCombRowO[0] && row2[1] == winningCombRowO[1] && row1[2] ==winningCombRowO[2]){
            result.style.visibility = 'visible';
            playerDiagonal = true;
            realTime.innerHTML = boardPrint;
            console.log(playerDiagonal);
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
