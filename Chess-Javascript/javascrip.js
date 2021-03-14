
const files = ['a','b','c', 'd', 'e', 'f', 'g', 'h'];
const ranks = [8,7,6,5,4,3,2,1];
const tile_names = [];
const tiles = Array.from(document.querySelectorAll('.tile'));
// const pawn = {
//     white: Array.from(document.querySelectorAll('.white-pawn')),
//     black: Array.from(document.querySelectorAll('.black-pawn')),
// }

const pieces = {
    pawn: {
        white:Array.from(document.querySelectorAll('.white-pawn')),
        black: Array.from(document.querySelectorAll('.black-pawn')),
    },
    rook:{
        white: Array.from(document.querySelectorAll('.white-rook')),
        black: Array.from(document.querySelectorAll('.black-rook')),
    },
    knight:{
        white: Array.from(document.querySelectorAll('.white-knight')),
        black: Array.from(document.querySelectorAll('.black-knight')),
    },
    bishop:{
        white: Array.from(document.querySelectorAll('.white-bishop')),
        black: Array.from(document.querySelectorAll('.black-bishop')),
    },
    queen:{
        white: Array.from(document.querySelectorAll('.white-queen')),
        black: Array.from(document.querySelectorAll('.black-queen')),
    },
    king:{
        white: Array.from(document.querySelectorAll('.white-king')),
        black: Array.from(document.querySelectorAll('.black-king')),
    },

};

var whitePieces = Array.from(document.getElementsByClassName('white-piece'));
var blackPieces = Array.from(document.getElementsByClassName('black-piece'));


createTileNames();
function createTileNames(){
    for(i=0; i<ranks.length; i++){
        for(j=0; j<files.length;j++){
            tile_names.push(files[j] + ranks[i]);
        }
    }
    // console.log(tile_names);
     for(k = 0; k <tile_names.length; k++){
        tiles[k].id = tile_names[k];
    }
    // console.log(tiles);
}


//==================MoveSets for Pieces========================================================//
let whiteTurn = true;
var currentPiece;
let pieceSelected = false;
PiecesEvents();

function PiecesEvents(){
//Piece Click Event Listener
tiles.forEach(item=>item.addEventListener('click', pieceMove));
}
function pieceMove(e){
    let piece = e.target;
    if(whiteTurn === true && piece.classList.contains('white-piece') && pieceSelected === false){
        selectPiece();
        pawnRules();
        rookRules();
        bishopRules();
        console.log('white');
       
       
    }
    else if(whiteTurn === false && piece.classList.contains('black-piece') && pieceSelected === false){
        selectPiece();
        pawnRules();
        rookRules();
        console.log('blue');
       
        
    }
    else if(pieceSelected === true){
        tileAppend();
        removeRed();
    }

// Will store the selected Piece to the Variable "currentPiece"
   function selectPiece(){
        currentPiece = piece;
        currentPiece.style.backgroundColor = 'blue';
        console.log(currentPiece);
        return pieceSelected = true;
   }

//========================Placing Pieces in a Tile===============================//
    function tileAppend(){
        let tile = e.currentTarget;
        // let tile_piece = e.target;

        //===If the tile has a Black Piece while currentPiece is White=====//
        if(whiteTurn === true && piece.classList.contains('black-piece')){
            piece.replaceWith(currentPiece);
            currentPiece.classList.add('moved');
            currentPiece.style.backgroundColor = null;
            pieceSelected = false;
            whiteTurn = false;
            console.log('White Just Ate')
        }
        //=====If the tile has a White piece while selected piece is Black ===//
        else if(whiteTurn === true && !piece.classList.contains('white-piece') && tile.style.backgroundColor === 'red'){
            appendEmptyTile();
        }
        else if(whiteTurn === false && piece.classList.contains('white-piece')){
            piece.replaceWith(currentPiece);
            currentPiece.classList.add('moved');
            currentPiece.style.backgroundColor = null;
            pieceSelected = false;
            whiteTurn = true;
            console.log('Black Just Ate')
        }
        else if(whiteTurn === false && !piece.classList.contains('black-piece') && tile.style.backgroundColor === 'red'){
            appendEmptyTile();
        }
        
        else if(whiteTurn === true && !piece.classList.contains('white-piece') || whiteTurn === true && piece.classList.contains('white-piece')){
            currentPiece.style.backgroundColor = null;
            currentPiece = undefined;
            pieceSelected = false;
            removeRed();
        }
        else if(whiteTurn === false && !piece.classList.contains('black-piece') || whiteTurn === false && piece.classList.contains('black-piece')){
            currentPiece.style.backgroundColor = null;
            currentPiece = undefined;
            pieceSelected = false;
            removeRed();
        }
        else if(whiteTurn === false && !piece.classList.contains('black-piece')){
            currentPiece.style.backgroundColor = null;
            currentPiece = undefined;
            pieceSelected = false;
            removeRed();
        }
        
    }
    //================ Placing Pieces in an Empty Tile =========//
    function appendEmptyTile(){
        let tile = e.currentTarget;
        tile.append(currentPiece);
        currentPiece.classList.add('moved');
        currentPiece.style.backgroundColor = null;
        pieceSelected = false;
        console.log('Nothing to Eat')
        if(whiteTurn === true){
            whiteTurn = false;
        }
        else if(whiteTurn === false){
        whiteTurn = true;
        }
            
    }
    //========================== RULES FOR PAWN ===================================//
    function pawnRules(){
        let whitePawns = pieces.pawn.white
        let blackPawns = pieces.pawn.black
        let cellFile = e.currentTarget.id.slice(0,1);
        let cellRank = parseInt(e.currentTarget.id.slice(1));

        //====If white pawn has not been moved yet, pawn can move TWO tiles====///
        if(whitePawns.includes(piece) && !piece.classList.contains('moved')){
            console.log(true);
            for(i = 0; i<3; i++){
                document.getElementById(`${cellFile}${cellRank - i}`).style.backgroundColor = 'red';
            }
            //piece.classList.add('moved');
        }
        //======== if black pawn has not been moved yet, pawn can move TWO tiles ======//
        else if(blackPawns.includes(piece) && !piece.classList.contains('moved')){
            console.log(false)
            for(i = 0; i<3; i++){
                document.getElementById(`${cellFile}${cellRank + i}`).style.backgroundColor = 'red';
            }
            //piece.classList.add('moved');
        }
        //======if White pawn has been moved, white pawn will only move one tile ===///
        else if(whitePawns.includes(piece)){
            document.getElementById(`${cellFile}${cellRank - 1}`).style.backgroundColor = 'red';
        }
        //===== if Black pawn has been moved, black pawn will only move one tile ===//
        else if(blackPawns.includes(piece)){
            document.getElementById(`${cellFile}${cellRank + 1}`).style.backgroundColor = 'red';
        }
        
    }
    function removeRed(){
        tiles.forEach(item => item.style.backgroundColor = null);
    }
    function rookRules(){
        let whiteRook = pieces.rook.white;
        let blackRook = pieces.rook.black;
        let cell_file = e.currentTarget.id.slice(0,1);
        let cell_rank = parseInt(e.currentTarget.id.slice(1));
        console.log(files.indexOf(cell_file));
        if(whiteRook.includes(piece) || blackRook.includes(piece)){
            rookHorizontal();
            rookVertical();
        }
        function rookHorizontal(){
            for(i = 0; i < files.length; i++){
                document.getElementById(`${files[i]}${cell_rank}`).style.backgroundColor = 'red';
            }
        }
        function rookVertical(){
            for(let j = 0; j < ranks.length; j++){
                document.getElementById(`${cell_file}${ranks[j]}`).style.backgroundColor = 'red';
            }
        }   
    }
    function bishopRules(){
        let whiteBishop = pieces.bishop.white;
        let blackBishop = pieces.bishop.black;
        let cellFile = e.currentTarget.id.slice(0,1);
        let cellRank = parseInt(e.currentTarget.id.slice(1));

        if(whiteBishop.includes(piece) && e.currentTarget.classList.contains('edge') && !piece.classList.contains('moved')){
            bishopDiagonal1();
            bishopDiagonal2();
        }
        function bishopDiagonal1(){
             for(i=0; i < ranks.length; i++){
                document.getElementById(`${files[files.indexOf(cellFile)+i]}${cellRank-i}`).style.backgroundColor = 'red';
               if(document.getElementById(`${files[files.indexOf(cellFile)+i]}${cellRank-i}`).classList.contains('edge')){
                   break;
               }
             }
         }
         function bishopDiagonal2(){
            for(i=0; i < ranks.length; i++){
                document.getElementById(`${files[files.indexOf(cellFile)-i]}${cellRank+i}`).style.backgroundColor = 'red';
                
             }
            
         }
    }
}



