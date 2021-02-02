// Verse for Encouragement
// If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.
// - James 1:5

let hasClicked = false;
let selectedPiece;
let selectedBox;
let originalBG;

const innerBoxes = document.getElementsByClassName("inner-box");

function animation() {

    //Selecting a piece
    if(this.innerHTML && hasClicked === false) {
        console.log("Selected a Piece");
        hasClicked = true;
        selectedPiece = this.innerHTML;
        selectedBox = this;
        originalBG = selectedBox.style.backgroundColor
        selectedBox.style.backgroundColor = "white";
    }

    //Selecting another piece or clicking same piece
    else if(this.innerHTML && hasClicked === true) {
        console.log("Selected Another Piece");
        selectedBox.style.backgroundColor = originalBG;
        selectedPiece = this.innerHTML;
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

for(let box in innerBoxes) {
    // console.log(innerBoxes[box]);
    innerBoxes[box].addEventListener("click", animation);
}
