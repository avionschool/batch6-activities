//Product Landing Page Scripts

// Navbar 
const navLinks = document.getElementsByClassName("nav");
const sections = document.getElementsByTagName("section");

for(let i=0; i<navLinks.length; i++) {
  navLinks[i].addEventListener("click", sectioning)
}

function sectioning() {
  let selectedSection = this.href;
  selectedSection = selectedSection.split("#").pop();
  console.log(selectedSection);
  for (let section in sections) {
    if (sections[section].id === selectedSection) {
      sections[section].style.display = "flex"
    }
    else {
      sections[section].style.display = "none"
    }
  }
}

// Features Slideshow
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "flex";
}
// 

// Videos Slide show
var slideIndex2 = 1;
showDivs2(slideIndex2);

function plusDivs2(n) {
  showDivs2(slideIndex2 += n);
}

function showDivs2(n) {
  var i;
  var x = document.getElementsByClassName("video-items");
  if (n > x.length) {slideIndex2 = 1}
  if (n < 1) {slideIndex2 = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex2-1].style.display = "flex";
}

const thumbnails = document.getElementsByClassName("thumbnail");

for(let i=0; i<thumbnails.length; i++) {
thumbnails[i].addEventListener("click", replaceVideo)
}

function replaceVideo() {
let video = document.getElementById("video");
video.src = this.id;
console.log(this.id)
}
