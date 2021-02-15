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
    for (let i=0; i<sections.length; i++) {
      let navStyle = navLinks[i].style
      if (sections[i].id === selectedSection) {
        sections[i].style.display = "flex"
        navStyle.textShadow = ".1vw .1vw 1vw #fff, .1vw .1vw 1vw #ccc"
        navStyle.filter = "drop-shadow(.1vw .1vw 1vw #ccc)"
      }
      else {
        sections[i].style.display = "none"
        navStyle.textShadow = "inherit"
        navStyle.filter = "inherit"
      }    
  }
}


// Features Slideshow
var slideIndex = 1;
showDivs(slideIndex);

function currentSlide(n) {
  var slides = document.getElementsByClassName("slide");
  showDivs(slideIndex = n);
  slides[slideIndex-1].className += " fade"
}

function plusDivs(n, direction) {
  var slides = document.getElementsByClassName("slide");
  showDivs(slideIndex += n);

  if (direction === 'left') {
    slides[slideIndex-1].className += " animate-left"

  }
  else if (direction === 'right') {
    slides[slideIndex-1].className += " animate-right"
  }

}

function showDivs(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length} ;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].className = "slide"
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
}

// 

// Videos Slide show
var slideIndex2 = 1;
showDivs2(slideIndex2);

function plusDivs2(n, direction) {
  var slides = document.getElementsByClassName("video-items");
  showDivs2(slideIndex2 += n);
  if (direction === 'left') {
    slides[slideIndex2-1].className += " animate-left"
    console.log("left")
  }
  else if (direction === 'right') {
    slides[slideIndex2-1].className += " animate-right"
    console.log("right")
  }
}

function currentSlide2(n) {
  var slides = document.getElementsByClassName("video-items");
  showDivs2(slideIndex2 = n);
  slides[slideIndex2-1].className += " fade"
}

function showDivs2(n) {
  var i;
  var slides = document.getElementsByClassName("video-items");
  var dots = document.getElementsByClassName("dot2");
  if (n > slides.length) {slideIndex2 = 1}
  if (n < 1) {slideIndex2 = slides.length} ;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].className = "video-items"
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex2-1].style.display = "flex";
  dots[slideIndex2-1].className += " active";
}

const thumbnails = document.getElementsByClassName("thumbnail");

for(let i=0; i<thumbnails.length; i++) {
thumbnails[i].addEventListener("click", replaceVideo)
}

function replaceVideo() {
let video = document.getElementById("video");
this.style.filter = "drop-shadow(.1vw .1vw 1vw #ccc)"
video.src = this.id;
console.log(this.id)
for(let i=0; i<thumbnails.length; i++) {
    if(thumbnails[i] !== this) {
      thumbnails[i].style = "initial"
    }
  }
}

