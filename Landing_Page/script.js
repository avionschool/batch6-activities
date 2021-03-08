const burgerMenu = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu li a");

// console.log(menuLinks);
function openMenu(){
    menu.classList.toggle("menu-screen");
}

function transition(){
    menu.classList.toggle("transfer");
}

burgerMenu.addEventListener("click",openMenu);
menu.addEventListener("click",openMenu);
//For Header Animation

const navBar = document.querySelector('nav');
const upBtn = document.querySelector('.up-button');
console.log(navBar);

function scrollDown(){
    const downScroll = window.pageYOffset;
    if(downScroll >5){
        navBar.classList.add('scroll');
        upBtn.classList.add('show-button');
    }
    else{
        navBar.classList.remove('scroll');
        upBtn.classList.remove('show-button');
    }
}


window.addEventListener('scroll', scrollDown);

//Character Modal

//Nero
const neroImg = document.querySelector('#nero img');
const neroModal = document.querySelector('#nero-modal')
const charContain = document.querySelector('#characters')

neroImg.addEventListener('click', function(){
    neroModal.style.opacity = '1';
    neroModal.style.pointerEvents = 'all';
    neroModal.style.transition = 'opacity .48s ease-in';
});

neroModal.addEventListener('click', function(){
this.style.opacity = '0';
this.style.pointerEvents = 'none';
});

//Dante
const danteImg = document.querySelector('#dante img');
const danteModal = document.querySelector('#dante-modal');

danteImg.addEventListener('click', function(){
    danteModal.style.opacity = '1';
    danteModal.style.pointerEvents = 'all';
    danteModal.style.transition = 'opacity .48s ease-in';
});

danteModal.addEventListener('click', function(){
this.style.opacity = '0';
this.style.pointerEvents = 'none';
});

//V
const vImg = document.querySelector('#V img');
const vModal = document.querySelector('#v-modal');

vImg.addEventListener('click', function(){
    vModal.style.opacity = '1';
    vModal.style.pointerEvents = 'all';
    vModal.style.transition = 'opacity .48s ease-in';
});

vModal.addEventListener('click', function(){
this.style.opacity = '0';
this.style.pointerEvents = 'none';
});


//Slider Embedded Video

const videoContainer = document.querySelector('#video');
const videos = document.querySelectorAll('#video iframe');
const prevBtn = document.querySelector('#vid-prev');
const nextBtn = document.querySelector('#vid-next');

let counter = 1;

const vidSize = videos[0].clientWidth;

videoContainer.style.transform = 'translateX(' + (-vidSize * counter) + 'px)';

nextBtn.addEventListener('click', function(){
    if(videos[counter].id === 'last-vid'){
        this.style.visibility = 'hidden';
        prevBtn.style.visibility = 'visible';
        this.style.transition = 'visibility .06s linear'
    }
    else{
        prevBtn.style.visibility = 'visible';
        this.style.transition = 'color .1s linear';
        videoContainer.style.transition = 'transform 0.6s ease-in-out';
        counter++;
        //console.log(counter);
        videoContainer.style.transform = 'translateX(' + (-vidSize * counter) + 'px)';
    }
});

prevBtn.addEventListener('click', function(){
    if(videos[counter].id === 'first-vid'){
        this.style.visibility = 'hidden';
        this.style.transition = 'visibility .06s linear'
        
    }
    else{
        nextBtn.style.visibility = 'visible';
        this.style.transition = 'color .1s linear';
        videoContainer.style.transition = 'transform 0.6s ease-in-out';
        counter--;
        console.log(counter);
        videoContainer.style.transform = 'translateX(' + (-vidSize * counter) + 'px)';
    }
    
});

