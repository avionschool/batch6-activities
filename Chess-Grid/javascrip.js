const whitePawn = document.querySelectorAll('.white-pawn');
const blackPawn = document.querySelectorAll('.black-pawn');
const whiteTile = document.querySelectorAll('.white');
const blackTile = document.querySelectorAll('.black');

console.log(whitePawn);
console.log(blackPawn);
console.log(whiteTile);
console.log(whiteTile);

//Functions//
function onDrag(){
    this.style.opacity = '.5';
}

function aftDrag(){
   
    this.style.opacity = '1';
}


function dragOver(event){
    
    event.preventDefault();
    this.style.opacity = '.8';
    
}

function dragEnter(){
    this.style.opacity = '1';
    console.log('enter');
}

function dragLeave(){
    console.log('leave');
    this.style.opacity = '1';
}

function dragDropblack(){

    this.appendChild(whitePawn[0]);
}

function replace(){
    this.remove();
}


//Pieces Listeners//
whitePawn.forEach(function(pawn){
    pawn.addEventListener('dragstart', onDrag);
    pawn.addEventListener('dragend', aftDrag);
    pawn.addEventListener('dragover', replace);
   
});

blackPawn.forEach(function(pawn){
    pawn.addEventListener('dragstart', onDrag);
    pawn.addEventListener('dragend', aftDrag);
    pawn.addEventListener('dragover', replace);
   
});

 
//Tiles//
whiteTile.forEach(function(tile){
    tile.addEventListener('dragover', dragOver);
    tile.addEventListener('dragenter', dragEnter);
    tile.addEventListener('dragleave', dragLeave);
    tile.addEventListener('drop', dragDropblack);
    tile.addEventListener('drop', dragDropblack);
    
});

blackTile.forEach(function(tile){
    tile.addEventListener('dragover', dragOver);
    tile.addEventListener('dragenter', dragEnter);
    tile.addEventListener('dragleave', dragLeave);
    tile.addEventListener('drop', dragDropblack);
    
});