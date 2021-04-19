

const topCases = []; // <= CONTAINS ALL DATA (CASES) OF EACH COUNTRY //
iterateCountries();
async function iterateCountries(){
  let countries = await fetch('https://covid-api.mmediagroup.fr/v1/cases?');
  let json = await countries.json();
  console.log(json)
  let iterateCountyList = await iterateCountryList(json, topCases);
  console.log(iterateCountyList);
}

//========================= DISPLAY GLOBAL CASE ==================================//
iterateActiveCases();
async function iterateActiveCases(){
  let countries = await fetch('https://api.covid19api.com/summary');
  let json = await countries.json();
  console.log(json)
  let push = await pushArray(topCases,json);
  let displayWord = await displaytoWorld(json);
  let topFive = await displayTopFive(push);
}
function pushArray(arr, data){
  return new Promise(function (resolve, reject){
    for(let key in data ){
      if(key === 'Countries'){
        for(let subKey in data[key]){
          let items = data[key][subKey]
          arr.push(items)
        }
      }
    }
    arr.sort((a,b)=>{
      return b.TotalConfirmed - a.TotalConfirmed;
    })
    resolve (arr);
  })
}
function displaytoWorld(obj){
  return new Promise(function(resolve, reject){
    const worldCase = document.querySelector('#world-cases');
    let heading = [];
    let subHeading = [];
    console.log(obj.Global)
    let global = obj.Global;
    for(i=0; i < 3;i++){
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
    subHeading[0].innerHTML = global.TotalConfirmed;
    subHeading[1].innerHTML = global.TotalDeaths;
    subHeading[2].innerHTML = global.TotalRecovered;
    resolve (worldCase)
  })
}

//========================= FOR TOP 5 WITH ACTIVE CASES ==========================//

function displayTopFive(arr){
  return new Promise(function(resolve, reject){
    const topCountry = document.querySelector('#top-positive');
    let date = document.querySelector('#top-positive h1 span');
    date.append(arr[7].Date.slice(0,10))
    for(i=0;i < 6; i++){
      let div = document.createElement('div');
      let img = document.createElement('img');
      img.src = `https://www.countryflags.io/${arr[i].CountryCode}/flat/64.png`;
      let h1 = document.createElement('h1');
      div.className = 'top-country-with-pos';
      let countryList = document.createElement('table');
      let row1 = countryList.insertRow(-1);
      let row2 = countryList.insertRow(-1);
      let row3 = countryList.insertRow(-1);
      
      h1.append(arr[i].Country)

      row1.insertCell(0).innerHTML = '<strong>Confirmed Cases:</strong>';
      row1.insertCell(1).append(arr[i].TotalConfirmed);

      row2.insertCell(0).innerHTML = '<strong>Deaths:</strong>';
      row2.insertCell(1).append(arr[i].TotalDeaths)
      row3.insertCell(0).innerHTML = '<strong>Recoveries:</strong>';
      if(arr[i].TotalRecovered > 0){
        row3.insertCell(1).append(arr[i].TotalRecovered);
      }
      else if(arr[i].TotalRecovered <= 0){
        row3.insertCell(1).append('(Data not Available)');
      }
     
      
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
const pageButtons = document.querySelector('#list-countries #page-btns')
let listClicked = false;

displayCountries.addEventListener('click', function(){
  if(listClicked === false){
    displayAll();
    displayCountries.innerText = 'Click to hide countries';
    return listClicked = true;
  }
  else if(listClicked === true){
    // listClicked = false;
    displayCountries.innerText = 'Click to view more list of countries';
    pageButtons.innerHTML ='';
    listClicked = false;
    while(nationChild.childNodes){
    nationChild.removeChild(nationChild.childNodes[0]);
    }
    
  }
})

let counter =0;
let currentPage = 1;
let countryBlock = 6;
async function displayAll(){
  let iterate = await getCountry(topCases, nationChild, countryBlock, currentPage);
  let listBtns = await listButton(topCases, countryBlock, currentPage);
}
let title = document.createElement('h1');
function getCountry(arr, container, divNums, page){
  return new Promise(function(resolve, reject){
    container.innerHTML = '';
    let firstDiv = divNums * page;
    let lastDiv = firstDiv + divNums;
    let paginatedItems = arr.slice(firstDiv, lastDiv);
    console.log(paginatedItems)
    title.id = 'title-list-countries';
    title.innerHTML = 'STATUS OF COVID-19 CASES OF EACH COUNTRIES';
    nation.insertBefore(title, container);
   
    for(i=0; i < paginatedItems.length; i++){
      if(paginatedItems[i].Country != null){
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = `https://www.countryflags.io/${paginatedItems[i].CountryCode}/flat/64.png`;
        let h1 = document.createElement('h1');
        div.className = 'top-country-with-pos';
        let countryList = document.createElement('table');
        let row1 = countryList.insertRow(-1);
        let row2 = countryList.insertRow(-1);
        let row3 = countryList.insertRow(-1);
        //=========== INSIDE EACH DIV OF COUNTRY==========================================//
        h1.append(paginatedItems[i].Country)
        row1.insertCell(0).innerHTML = '<strong>Confirmed Cases:</strong>';
        row1.insertCell(1).append(paginatedItems[i].TotalConfirmed);
        row2.insertCell(0).innerHTML = '<strong>Deaths:</strong>';
        row2.insertCell(1).append(paginatedItems[i].TotalDeaths)
        row3.insertCell(0).innerHTML = '<strong>Recovered:</strong>';
        row3.insertCell(1).append(paginatedItems[i].TotalRecovered);
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
function listButton (arr, divNum, page){
  return new Promise(function(resolve){
    let pageNum = Math.ceil(arr.length/divNum)
    for(i=1; i < pageNum; i++){
      let btn = document.createElement('button');
      btn.id= i;
      btn.innerText = i;
      pageButtons.appendChild(btn);
      if(btn.innerText === currentPage){
        btn.classList.add('active');
      }
      btn.addEventListener('click', function(e){
        currentPage = btn.id;
        pageButtons.innerHTML = '';
        displayAll();
        console.log(currentPage);
      })
    }
  })

}

//===================== FOR THE DROPDOWN SELECT TAG =======================//
// const optionSelector = document.querySelector('#countries');
// let selectedOpt = false;
// optionSelector.addEventListener('click', function(e){
//     let option = e.target;
//     if(option.value != '' && selectedOpt){
//       countrySelector(option.value)
//       return selectedOpt = false;
//     }
//     selectedOpt = true;
// })

//================================ MAP CREATION =================================//

let heatMapData = [];

// async function countrySelector(item){
//   let response = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${item}`);
//   // let response = await fetch(`country-list/csvjson.json`)
//   let json = await response.json();
//   return json;
// }

function iterateCountryList(item, arr){
  return new Promise(function(){
    for(let key in item){
      // let opt = document.createElement('option');
      // let createText = document.createTextNode(key);
      // opt.appendChild(createText);
      // opt.value = key;
      // optionSelector.appendChild(opt);

      let country = item[key];
      for(value in country){
        for(i=0; i < arr.length; i++){
          if(arr[i].Country === key || arr[i].CountryCode === country.All.abbreviation){
            let heatWeight;
            if(arr[i].TotalConfirmed < 1,000){
              heatWeight = 1;
            }
            else if(arr[i].TotalConfirmed > 1,000 && arr[i].TotalConfirmed < 5,000){
              heatWeight = 2;
            }
            else if(arr[i].TotalConfirmed > 5,000 && arr[i].TotalConfirmed < 10,000){
              heatWeight = 3;
            }
            else if(arr[i].TotalConfirmed > 10,000 && arr[i].TotalConfirmed < 100,000){
              heatWeight = 4;
            }
            else if(arr[i].TotalConfirmed > 10000000){
              heatWeight = 5;
            }
            heatMapData.push({location: new google.maps.LatLng(parseInt(country[value].lat),parseInt(country[value].long) ), weight: heatWeight})
          }
        }
      }
      
    }
   
  })
}

createMap();
function createMap(){
  let map;
 
  let ph = new google.maps.LatLng(14.599512, 120.984222);
  map = new google.maps.Map(document.getElementById('map'), {
    center: ph,
    zoom: 5,
    mapId: '811ab3f2e9a97e5d',
    mapTypeControl: false,
    fullscreenControl: false,
  });
  
  let heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData,
    radius: 20
  });
  heatmap.setMap(map);
}
