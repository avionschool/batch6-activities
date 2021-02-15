function imgSlider(anything) {
  document.querySelector(".frontImage").src = anything;
}

let changeCircleColor = function (color) {
  const circle = document.querySelector('.circle');
  circle.style.background = color;
}

let toggle = function () {
  let toggler = document.querySelector('.toggle');
  let nav = document.querySelector('.navigation')
  toggler.classList.toggle('active');
  nav.classList.toggle('active');
}

// modal function
let modalBg = document.querySelector('.modal-bg');
let signUpBtn = document.querySelector('.signUp');
let modalCloseBtn = document.querySelector('.modal-closeBtn')

// pop up modal
signUpBtn.addEventListener('click', function () {
  modalBg.classList.add('modal-active')
});

// remove modal
modalCloseBtn.addEventListener('click', function () {
  modalBg.classList.remove('modal-active')
});

// continue browsing modal
let rightSubmitBtn = document.querySelector('.rightSubmit');
let rightModal = document.querySelector('.continueBrowsing');
let cbBtn = document.querySelector('.cbBtn');

// pop up modal
rightSubmitBtn.addEventListener('click', function () {
  rightModal.classList.add('continueBrowsing-active')
});

// remove modal
cbBtn.addEventListener('click', function () {
  rightModal.classList.remove('continueBrowsing-active')
});


// intersection observer
const leftandright = document.querySelector('.leftandright');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

const callbackFunction = function (entries) {
  console.log(entries[0]);
  if (entries[0].intersectionRatio > 0) {
    entries[0].target.style.animation = `flow 600ms forwards ease-out`;
  } else {
    entries[0].target.style.animation = 'none';
  }
};
const appearOptions = {
  threshold: 0.7,
};

observer = new IntersectionObserver(callbackFunction, appearOptions)
observer.observe(leftandright);

// change nav color
// you can use intersection observer on this too
const header = document.querySelector('#header');

window.onscroll = function () {
  let top = window.scrollY;
  console.log(top);
  if (top >= 200) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}