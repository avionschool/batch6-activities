
//=================== FOR HEADER ANIMATION ===================//

const navBar = document.querySelector('nav');
const upBtn = document.querySelector('.up-button');
console.log(navBar);

function scrollDown(){
    const downScroll = window.pageYOffset;
    if(downScroll > 5){
        navBar.classList.add('scroll');
        upBtn.classList.add('show-button');
    }
    else{
        navBar.classList.remove('scroll');
        upBtn.classList.remove('show-button');
    }
}

window.addEventListener('scroll', scrollDown);


const burgerMenu = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu li a");


function openMenu(){
    menu.classList.toggle("menu-screen");
}

function transition(){
    menu.classList.toggle("transfer");
}

burgerMenu.addEventListener("click",openMenu);
menu.addEventListener("click",openMenu);



//========================== Character Modal ====================================//

const char = {
    nero:{
        img: document.querySelector('#nero img'),
        modal: document.querySelector('#nero-modal'),
        close_modal: document.querySelector('#nero-modal .close-modal'),
        char_desc_cont: document.querySelector('#nero-modal .caption .inside-caption'),
        char_desc: document.querySelectorAll('#nero-modal .caption .inside-caption div')
    },
    dante:{
        img: document.querySelector('#dante img'),
        modal:  document.querySelector('#dante-modal'),
        close_modal: document.querySelector('#dante-modal .close-modal'),
        char_desc_cont: document.querySelector('#dante-modal .caption .inside-caption'),
        char_desc: document.querySelectorAll('#dante-modal .caption .inside-caption div')
    },
    V:{
        img: document.querySelector('#V img'),
        modal: document.querySelector('#v-modal'),
        close_modal: document.querySelector('#v-modal .close-modal'),
        char_desc_cont: document.querySelector('#v-modal .caption .inside-caption'),
        char_desc: document.querySelectorAll('#v-modal .caption .inside-caption div')
    },
}
const charArrow = {
    prev: document.querySelectorAll('#characters .prev-char'),
    next: document.querySelectorAll('#characters .next-char')
}

const charContain = document.querySelector('#characters');
charModal();

function charModal(){
    let prev = charArrow.prev;
    let next = charArrow.next;
    let counter = 1;
    let cap;
    let cap_container;
    
    for(key in char){
     let item = char[key].img;
     let modalItem = char[key].modal;
     let closeModal = char[key].close_modal;
         item.addEventListener('click', function() {
            modalItem.style.opacity = '1'; 
            modalItem.style.pointerEvents = 'all';
        })
        closeModal.addEventListener('click', function() {
            modalItem.style.opacity = '0'; 
            modalItem.style.pointerEvents = 'none';
            counter = 1;
        })
    }

    for(key in char){
        let cap_container = char[key].char_desc_cont;
        let cap = char[key].char_desc;
        const capSize = cap[0].clientWidth;
        cap_container.style.transform = `translateX(${-capSize * counter}px)`
    }

    next.forEach((item)=> item.addEventListener('click', function (e){
        let btn = e.currentTarget;
        let btn_id =btn.id.split('-');
        cap = document.querySelectorAll(`#${btn_id[0]}-modal .caption .inside-caption div`);
        cap_container = document.querySelector(`#${btn_id[0]}-modal .caption .inside-caption`);
        const capSize = cap[0].clientWidth;
        console.log(cap[counter].classList)
        if(cap[counter].classList[1] === 'second-last'){
            counter++;
            prev.forEach(item => item.style.visibility = 'visible')
            cap_container.style.transform = `translateX(${-capSize * counter}px)`
            cap_container.style.transition = 'transform linear .25s'
            this.style.visibility = 'hidden';
        }
        else{
            counter++;
            prev.forEach(item => item.style.visibility = 'visible');
            this.style.visibility = 'visible';
            cap_container.style.transform = `translateX(${-capSize * counter}px)`
            cap_container.style.transition = 'transform linear .25s'
        }
    }));

    prev.forEach((item)=> item.addEventListener('click', function prevDesc(e){
        let btn = e.currentTarget;
        let btn_id =btn.id.split('-');
        cap = document.querySelectorAll(`#${btn_id[0]}-modal .caption .inside-caption div`);
        cap_container = document.querySelector(`#${btn_id[0]}-modal .caption .inside-caption`);
        const capSize = cap[0].clientWidth;
        if(cap[counter].classList[1] === 'second-first'){
            counter--;
            this.style.visibility = 'hidden';
            next.forEach(item => item.style.visibility = 'visible');
            cap_container.style.transform = `translateX(${-capSize * counter}px)`
            cap_container.style.transition = 'transform linear .25s'
        }
        else{
            counter--;
            next.forEach(item => item.style.visibility = 'visible');
            cap_container.style.transform = `translateX(${-capSize * counter}px)`
            cap_container.style.transition = 'transform linear .25s'
        }
    }))
}

//========================= TRAILER SLIDER ==============================================//

const videoContainer = document.querySelector('#video');
const videos = document.querySelectorAll('#video iframe');
const prevBtn = document.querySelector('#vid-prev');
const nextBtn = document.querySelector('#vid-next');
vidSlider();
function vidSlider(){
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
}


