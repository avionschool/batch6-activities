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

const char = {
    nero:{
        img: document.querySelector('#nero img'),
        modal: document.querySelector('#nero-modal'),
        close_modal: document.querySelector('#nero-modal .close-modal'),
    },
    dante:{
        img: document.querySelector('#dante img'),
        modal:  document.querySelector('#dante-modal'),
        close_modal: document.querySelector('#dante-modal .close-modal'),
    },
    V:{
        img: document.querySelector('#V img'),
        modal: document.querySelector('#v-modal'),
        close_modal: document.querySelector('#v-modal .close-modal'),
    },
}

const charContain = document.querySelector('#characters');
charImg();
function charImg(){
    for(key in char){
     let item = char[key].img;
     let modalItem = char[key].modal;
     let closeModal = char[key].close_modal;
        console.log(item)
        console.log(modalItem)
        console.log(closeModal);
        item.addEventListener('click', function() {
            modalItem.style.opacity = '1'; 
            modalItem.style.pointerEvents = 'all';
        })
        closeModal.addEventListener('click', function() {
            modalItem.style.opacity = '0'; 
            modalItem.style.pointerEvents = 'none';
        })
    }
}
// neroModal.addEventListener('click', function(){
// this.style.opacity = '0';
// this.style.pointerEvents = 'none';
// });

//Dante



// danteModal.addEventListener('click', function(){
// this.style.opacity = '0';
// this.style.pointerEvents = 'none';
// });

//V


// vModal.addEventListener('click', function(){
// this.style.opacity = '0';
// this.style.pointerEvents = 'none';
// });


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

