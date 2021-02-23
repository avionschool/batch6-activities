// Verse for Encouragement
// If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.
// - James 1:5

//GLOBAL CHESS VARIABLES
let hasClicked = false;
let selectedPiece;
let selectedBox;
let originalBG;
let pieceColor;

// CHESS PIECES
// WHITE
const whitePieces = [
// "Rook" 
    "&#9814;",
// "Knight"
    "&#9816;",
// "Bishop"
    "&#9815;",
//  "Queen"
    "&#9813;",
//  "King"
    "&#9812;",
//  "Pawn" 
    "&#9817;"
]
// BLACK
const blackPieces = [
//  "Rook" 
    "&#9820;",
//  "Knight"
    "&#9822;",
//  "Bishop"
    "&#9821;",
//  "Queen"
    "&#9819;",
//  "King" 
    "&#9818;",
//  "Pawn" 
    "&#9823;"
]

//ADDING EVENT LISTNERS
const innerBoxes = document.getElementsByClassName("inner-box");

for(let box in innerBoxes) {
    // console.log(innerBoxes[box]);
    innerBoxes[box].addEventListener("click", movement);
}

//MOVEMENT FUNCTION
function movement() {

    //Selecting a piece
    if(this.innerHTML && hasClicked === false) {
        hasClicked = true;
        selectedPiece = this.innerHTML;
        if(whitePieces.includes(this.value)){
            return pieceColor = "White"
        }
        else if(blackPieces.includes(this.value)){
            return pieceColor = "Black"
        }
        
        console.log("Selected a Piece");
        console.log(selectedPiece + this.id + pieceColor);
        selectedBox = this;
        originalBG = selectedBox.style.backgroundColor
        selectedBox.style.backgroundColor = "white";
    }

    //Deseleting a piece
    else if(selectedBox === this) {
        console.log("Deselected a Piece")
        this.style.backgroundColor = originalBG;
        hasClicked = false;
        selectedPiece = "";
        selectedBox = "";
    }

    //Selecting another piece
    else if(this.innerHTML && hasClicked === true) {
        console.log("Selected Another Piece");
        selectedBox.style.backgroundColor = originalBG;
        selectedPiece = this.innerHTML;
        console.log(selectedPiece + this.id)
        selectedBox = this;
        originalBG = selectedBox.style.backgroundColor
        selectedBox.style.backgroundColor = "white";
    }

    //For setting down a piece
    else if(!this.innerHTML && hasClicked === true) {
        console.log("Set Down a Piece");
        selectedBox.innerHTML = "";
        this.innerHTML = selectedPiece;
        selectedBox.style.backgroundColor = originalBG;
        console.log(selectedPiece + this.id);
        selectedPiece = "";
        selectedBox = "";
        hasClicked = false;
    }

    //For Clicking an empty box
    else {
        console.log("No Piece Selected")
        hasClicked = false;
        selectedPiece = "";
        selectedBox = "";
    }

}


