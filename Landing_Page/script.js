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


//Slider Embedden Video

const videoContainer = document.querySelector('#video');
const videos = document.querySelectorAll('#video iframe');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

let counter = 1;

const vidSize = videos[0].clientWidth;

videoContainer.style.transform = 'translateX(' + (-vidSize * counter) + 'px)';

nextBtn.addEventListener('click', function(){
    if(videos[counter].id === 'last-vid'){
        videos.style.transform = 'none';
    }
    else{
        videoContainer.style.transition = 'transform 0.4s ease-in-out';
        counter++;
        //console.log(counter);
        videoContainer.style.transform = 'translateX(' + (-vidSize * counter) + 'px)';
    }
});

prevBtn.addEventListener('click', function(){
    if(videos[counter].id === 'first-vid'){
        videos.style.transform = 'none';
    }
    else{
        videoContainer.style.transition = 'transform 0.4s ease-in-out';
        counter--;
        console.log(counter);
        videoContainer.style.transform = 'translateX(' + (-vidSize * counter) + 'px)';
    }
    
});



//For Header Animation
const navBar = document.querySelector('nav');
console.log(navBar);

function scrollDown(){
    const downScroll = window.pageYOffset;
    if(downScroll >5){
        navBar.classList.add('scroll');
    }
    else{
        navBar.classList.remove('scroll');
    }
}

window.addEventListener('scroll', scrollDown);
