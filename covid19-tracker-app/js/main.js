
//===================== FOR THE DROPDOWN SELECT TAG =======================//
const optionSelector = document.querySelector('#countries');
let selectedOpt = false;
optionSelector.addEventListener('click', function(e){
    let option = e.target;
    if(option.value != '' && selectedOpt){
      countrySelector(option.value)
      return selectedOpt = false;
    }
    selectedOpt = true;
})

async function countrySelector(item){
  let response = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${item}`);
  let json = await response.json();
  return json;
}

async function iterateCountries(){
  let countries = await fetch('https://covid-api.mmediagroup.fr/v1/cases?');
  let json = await countries.json();
  for(let key in json){
    let opt = document.createElement('option');
    let createText = document.createTextNode(key);
    opt.appendChild(createText);
    opt.value = key;
    optionSelector.appendChild(opt);
  }
}
iterateCountries();

const topCases = [];
//========================= DISPLAY WORLD CASES ==================================//
iterateActiveCases();
function displaytoWorld(arr){
  return new Promise(function(resolve, reject){
    const worldCase = document.querySelector('#world-cases');
    let heading = [];
    let subHeading = [];
    for(i=0; i < 3; i++ ){
      let div = document.createElement('div');
      heading[i] = document.createElement('h2');
      subHeading[i] = document.createElement('h2');
      div.className = 'world-stat'
      div.appendChild(heading[i]);
      div.appendChild(subHeading[i]);
      worldCase.appendChild(div);
    }
    heading[0].innerHTML = `TOTAL CONFIRMED `;
    heading[1].innerHTML = `TOTAL DEATHS`;
    heading[2].innerHTML = `TOTAL RECOVERIES`;
    subHeading[0].innerHTML = arr[0].All.confirmed;
    subHeading[1].innerHTML = arr[0].All.deaths;
    subHeading[2].innerHTML = arr[0].All.recovered;
    resolve (worldCase)
  })
}

//========================= FOR TOP 5 WITH ACTIVE CASES ==========================//
async function iterateActiveCases(){
  // let countriesOne = await fetch('https://api.covid19api.com/live/country/philippines');
  // let json1 = await countriesOne.json();
  // console.log(json1)

  let countries = await fetch('https://covid-api.mmediagroup.fr/v1/cases?');
  let json = await countries.json();
  let push = await pushArray(topCases,json);
  let topFive = await displayTopFive(push);
  await displaytoWorld(push);
}
function pushArray(arr, data){
  return new Promise(function (resolve, reject){
    for(let key in data ){
      arr.push(data[key]);
    }
    arr.sort((a,b)=>{
      return b.All.confirmed - a.All.confirmed;
    })
    console.log(arr)
    resolve (arr);
  })
}

function displayTopFive(arr){
  return new Promise(function(resolve, reject){
    const topCountry = document.querySelector('#top-positive');
    let date = document.querySelector('#top-positive h1 span');
    date.append(arr[7].All.updated)
    for(i=1;i < 7; i++){
      let div = document.createElement('div');
      let img = document.createElement('img');
      img.src = `https://www.countryflags.io/${arr[i].All.abbreviation}/flat/64.png`;
      let h1 = document.createElement('h1');
      div.className = 'top-country-with-pos';
      let countryList = document.createElement('table');
      let row1 = countryList.insertRow(-1);
      let row2 = countryList.insertRow(-1);
      let row3 = countryList.insertRow(-1);
      
      h1.append(arr[i].All.country)

      row1.insertCell(0).innerHTML = '<strong>Confirmed Cases:</strong>';
      row1.insertCell(1).append(arr[i].All.confirmed);

      row2.insertCell(0).innerHTML = '<strong>Deaths:</strong>';
      row2.insertCell(1).append(arr[i].All.deaths)
      
      row3.insertCell(0).innerHTML = '<strong>Population:</strong>';
      row3.insertCell(1).append(arr[i].All.population);
      
      topCountry.appendChild(div);
      div.appendChild(countryList);
      div.insertBefore(h1,countryList)
      h1.appendChild(img)
    }
    resolve(topCountry);
  })
}
//============================== DISPLAY ALL COUNTRIES  =========================================================//
const displayCountries = document.querySelector('#list-countries button');
const nation = document.querySelector('#list-countries');
const nationChild = document.querySelector('#list-countries #country-container');
const pageButtons = document.querySelector('#list-countries #paginator')
displayCountries.addEventListener('click', displayAll)


let currentPage = 1;
let countryBlock = 6;
async function displayAll(){
  let iterate = await getCountry(topCases, nationChild, countryBlock, currentPage);
  let paginate = await setPagination(iterate, pageButtons,countryBlock);
  console.log(iterate)
  currentPage++
  console.log(currentPage);
 
}

function getCountry(arr, container, divNums, page){
  return new Promise(function(resolve, reject){
    // container.innerHTML = '';

    let firstDiv = divNums * page;
    let lastDiv = firstDiv + divNums;
    let paginatedItems = arr.slice(firstDiv, lastDiv);
    console.log(paginatedItems)
    // let title = document.createElement('h1');
    // title.id = 'title-list-countries';
    // title.innerHTML = 'STATUS OF COVID-19 CASES OF EACH COUNTRIES';
    // nation.insertBefore(title, container);
   
    for(i=0; i < paginatedItems.length; i++){
      if(paginatedItems[i].All.country != null){
     
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = `https://www.countryflags.io/${paginatedItems[i].All.abbreviation}/flat/64.png`;
        let h1 = document.createElement('h1');
        div.className = 'top-country-with-pos';
        let countryList = document.createElement('table');
        let row1 = countryList.insertRow(-1);
        let row2 = countryList.insertRow(-1);
        let row3 = countryList.insertRow(-1);
        //=========== INSIDE EACH DIV OF COUNTRY==========================================//
        h1.append(paginatedItems[i].All.country)
        row1.insertCell(0).innerHTML = '<strong>Confirmed Cases:</strong>';
        row1.insertCell(1).append(paginatedItems[i].All.confirmed);
        row2.insertCell(0).innerHTML = '<strong>Deaths:</strong>';
        row2.insertCell(1).append(paginatedItems[i].All.deaths)
        row3.insertCell(0).innerHTML = '<strong>Population:</strong>';
        row3.insertCell(1).append(paginatedItems[i].All.population);
        container.appendChild(div);
        div.appendChild(countryList);
        div.insertBefore(h1,countryList);
        h1.appendChild(img);
      }
      else{
        continue;
      }
     
    }
    resolve (paginatedItems);
  })
}
//========================= PAGINATE COUNTRIES =======================================//
function setPagination(arr, container, divNum){
  return new Promise(function(){
    container.innerHTML = '';
    let pageCount = Math.ceil(arr.length / divNum);
    for(i = 1; i < pageCount +1 ; i++){
      let btn = document.createElement('button');
      btn.innerText = i;
      btn.id = i;
      if(btn.id === currentPage){
        btn.classList.add('active');
      }
      container.append(btn);
    }
  })
}

function paginationBtn(page){
    let btn = document.createElement('button');
    btn.innerText = page;
    if(currentPage === page){
      btn.classList.add('active');
    }
    
    btn.addEventListener('click', function(){
      currentPage = page;
    })
}
//======================= MAP CREATION ========================//
let map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//     mapId: '811ab3f2e9a97e5d',
//   });
  
// }
//============= TESTING HEATMAP ======================//

let heatMapData = [
  {location: new google.maps.LatLng(37.782, -122.447), weight: 2},
  new google.maps.LatLng(37.782, -122.445),
  {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
  new google.maps.LatLng(37.782, -122.437),
  {location: new google.maps.LatLng(37.782, -122.435), weight: 5},

];
let ph = new google.maps.LatLng(37.774546, -122.433523);
map = new google.maps.Map(document.getElementById('map'), {
  center: ph,
  zoom: 13,
  mapId: '811ab3f2e9a97e5d'
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatMapData,
  radius: 15
});
heatmap.setMap(map);
