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



//BOARD MOVEMENTS CHECKER
var row1 = [1,1,1];
var row2 = [1,1,1];
var row3 = [1,1,1];


const winningCombRowX = ['X', 'X', 'X'];
const winningCombRowO = ['O', 'O', 'O',]

var boardHistory = [];

var playerX = 'X';
var playerO = 'O';
currentPlayer.innerHTML = "Player 1's turn";
var count = 0;
let x = false;

resultEvent();
cellRow1.forEach(function(item, index){
    item.addEventListener('click', function(){
        if(x === false){
            currentPlayer.innerHTML = "Player 2's turn";
            this.classList.add('x');
            row1[index] = playerX;
            boardHistory.push(this) ;
            console.log(boardHistory);
            x = true;
            
        } 
        else{
            currentPlayer.innerHTML = "Player 1's turn";
            this.classList.add('o');
            row1[index] = playerO;
            boardHistory.push(this) ;
            console.log(boardHistory);
            
            x= false;
        }
            endgame();
            winningrow();
            winningColumn();
            winningDiagonal();   
    }, {once :true});
})
    
    
    cellRow2.forEach(function(item, index){
        item.addEventListener('click', function(){
            if(x === false){
                currentPlayer.innerHTML = "Player 2's turn";
                this.classList.add('x');
                row2[index] = playerX;
                boardHistory.push(this) ;
                console.log(boardHistory);
                x = true;
            } 
            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add('o');
                row2[index] = playerO;
                boardHistory.push(this) ;
                console.log(boardHistory);
                x = false;
            }
            
            endgame();
            winningrow();
            winningColumn();
            winningDiagonal();
        }, {once :true});
    })
    
    cellRow3.forEach(function(item, index){
        item.addEventListener('click', function(){
            if(x === false){
                currentPlayer.innerHTML = "Player 2's turn";
                this.classList.add('x');
                row3[index] = playerX;
                boardHistory.push(this) ;
                console.log(boardHistory);
                x = true; 
            } 

            else{
                currentPlayer.innerHTML = "Player 1's turn";
                this.classList.add('o');                
                row3[index] = playerO;
                boardHistory.push(this) ;
                console.log(boardHistory);
                x = false;
            }

            endgame();
            winningrow();
            winningColumn();
            winningDiagonal();
        }, {once :true});
    })
    

//FUNCTIONS
//RESULT OF GAME
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
    
//DRAW!!
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
            //    announcer.innerHTML = "Draw!";
            document.querySelector('#game-result h1').innerHTML = 'Draw!!';
            }
        }         
        
        var playerWinnerX = false;
        var playerWinnerO = false;
        function winningrow(){
            //Row X
            if(row1[0] === winningCombRowX[0] && row1[1] === winningCombRowX[1] && row1[2] === winningCombRowX[2]){
                playerWinnerX  = true;
                rowWinner();
            }

            else if(row2[0] === winningCombRowX[0] && row2[1] === winningCombRowX[1] && row2[2] === winningCombRowX[2]){
                layerWinnerX  = true;
                rowWinner();
            }

            else if(row3[0] === winningCombRowX[0] && row3[1] === winningCombRowX[1] && row3[2] === winningCombRowX[2]){
                layerWinnerX  = true;
                rowWinner();
            }

            //PLAYER O
            else if(row1[0] === winningCombRowO[0] && row1[1] === winningCombRowO[1] && row1[2] === winningCombRowO[2]){
                playerWinnerO = true;
                rowWinner();
            }

            else if(row2[0] === winningCombRowO[0] && row2[1] === winningCombRowO[1] && row2[2] === winningCombRowO[2]){
                playerWinnerO = true;
                rowWinner();
            }

            else if(row3[0] === winningCombRowO[0] && row3[1] === winningCombRowO[1] && row3[2] === winningCombRowO[2]){
                playerWinnerO = true;
                rowWinner();
            }
    }
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

    //COLUMNS WINNING CONDITIONS
    function winningColumn(){
        if(row1[0] === winningCombRowX[0] && row2[0] === winningCombRowX[0] && row3[0] === winningCombRowX[0]){
            playerWinnerX = true;
            rowWinner();
        }
        else if(row1[1] === winningCombRowX[1] && row2[1] === winningCombRowX[1] && row3[1] === winningCombRowX[1]){
            playerWinnerX  = true;
            rowWinner();
        }
        else if(row1[2] === winningCombRowX[2] && row2[2] === winningCombRowX[2] && row3[2] === winningCombRowX[2]){
            playerWinnerX  = true;
            rowWinner();
        }
        //PLAYER O
        else if(row1[0] === winningCombRowO[0] && row2[0] === winningCombRowO[0] && row3[0] === winningCombRowO[0]){
            playerWinnerO = true;
            rowWinner();
        }
        else if(row1[1] === winningCombRowO[1] && row2[1] === winningCombRowO[1] && row3[1] === winningCombRowO[1]){
            playerWinnerO = true;
            rowWinner();
        }
        else if(row1[2] === winningCombRowO[2] && row2[2] === winningCombRowO[2] && row3[2] === winningCombRowO[2]){
            playerWinnerO = true;
            rowWinner();
        }
    }

    //WINNING DIAGONALS
    function winningDiagonal(){
        var playerDiagonal = false;
        if(row1[0] == winningCombRowX[0] && row2[1] == winningCombRowX[1] && row3[2] == winningCombRowX[2]){
            playerWinnerX = true;
            rowWinner();
            
        }
        else if(row3[0] == winningCombRowX[0] && row2[1] == winningCombRowX[1] && row1[2] == winningCombRowX[2]){
            playerWinnerX = true;
            rowWinner();
            
        }
        //PLAYER O
        if(row1[0] == winningCombRowO[0] && row2[1] == winningCombRowO[1] && row3[2] == winningCombRowO[2]){
            playerWinnerO = true;
            rowWinner();
            
        }
        else if(row3[0] == winningCombRowO[0] && row2[1] == winningCombRowO[1] && row1[2] ==winningCombRowO[2]){
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
