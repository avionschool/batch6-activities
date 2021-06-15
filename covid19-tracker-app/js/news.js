const news_section = document.querySelector('#news-display');

window.addEventListener('load', function(){
    loader();
    displayNews();
})

async function displayNews(){
    let news = await fetch(`https://gnews.io/api/v4/search?q=covid&lang=en&token=1b68a1f52cc9619d89649691880e6de3`);
    let json = await news.json();
    console.log(json)
    let iterateNews = await iterateArticles(json.articles);
}

function iterateArticles(arr){
    return new Promise(function(resolve){
        for(i=0; i < arr.length; i++){
            let div = document.createElement('div');
            let contentContainer = document.createElement('div')
            contentContainer.className = 'content-container'
            let title = document.createElement('a');
            let published = document.createElement('adress')
            let content = document.createElement('p');
            let img = document.createElement('img');

            img.setAttribute('src', arr[i].image);
            title.innerHTML = `<h1>${arr[i].title}</h2>`;
            title.setAttribute('href', arr[i].url);
            title.setAttribute('target', '_blank');
            published.innerHTML =`Source: ${arr[i].source.name} <br> Date published: ${arr[i].publishedAt.slice(0,10)}` ;
            content.innerText = arr[i].description;
            
            news_section.append(div);
            div.append(img);
            div.append(contentContainer)
            contentContainer.append(title);
            contentContainer.append(published);
            contentContainer.append(content);
        }
    })
}

const countryNewsContainer = document.querySelector('#news #display-locally');
const selectCountry = document.querySelector('#news #display-countries #countries');

let select = false;
let optionVal;
selectCountry.addEventListener('click', function(e){
    if(selectCountry.value === '' || select == false){
        select = true;
    }
    else if(select === true){
        countryNewsContainer.innerHTML='';
        countryNewsContainer.style.display = 'grid';
        scrollWindow(news_section)
        displayLocally(selectCountry.value);
        
        select = false;
    }
})

async function displayLocally(countryVal){
    let news = await fetch(`https://gnews.io/api/v4/search?q=covid&sortby=publishedAt&lang=en&country=${countryVal}&token=1b68a1f52cc9619d89649691880e6de3`);
    let json = await news.json();
    console.log(json)
    let iterateLocally = await iterateNewsLocally(json.articles);
}

function iterateNewsLocally(arr){
    return new Promise(function () {
        let titleHeader = document.createElement('h1');
        titleHeader.className = 'title-country';
        titleHeader.innerText = `Headlines About the COVID-19 (Corona Virus Disease) in Selected Country`;
        countryNewsContainer.append(titleHeader)
        for(i=0; i < arr.length; i++){
            let div = document.createElement('div');
            let contentContainer = document.createElement('div');
            contentContainer.className = 'content-container'
            let title = document.createElement('a');
            let published = document.createElement('adress')
            let content = document.createElement('p');
            let img = document.createElement('img');

            img.setAttribute('src', arr[i].image);
            title.innerHTML = `<h1>${arr[i].title}</h2>`;
            title.setAttribute('target', '_blank');
            title.setAttribute('href', arr[i].url);
            
            published.innerHTML =`Source: ${arr[i].source.name} <br> Date published: ${arr[i].publishedAt.slice(0,10)}` ;
            content.innerText = arr[i].description;
            
            countryNewsContainer.append(div);
            div.append(img);
            div.append(contentContainer)
            contentContainer.append(title);
            contentContainer.append(published);
            contentContainer.append(content);
        }
    })
}
function loader(){
    const loader = document.querySelector('.loader');
    setTimeout(()=>{
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      loader.style.transition = 'opacity linear 1s';
    }, 1500)
}
function scrollWindow(heroSection){
    
    setTimeout(function(){
        window.scrollTo({
            top: heroSection.clientHeight,
            behavior: 'smooth'
          });
    }, 500)
}