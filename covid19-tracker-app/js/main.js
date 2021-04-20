const topCases = []; // <= CONTAINS ALL DATA (CASES) OF EACH COUNTRY //
const formatter = new Intl.NumberFormat('en');

window.addEventListener('load', function(){
  loader();
  iterateActiveCases();
  iterateCountries();
  createMap();
})

function loader(){
  const loader = document.querySelector('.loader');
  setTimeout(()=>{
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    loader.style.transition = 'opacity linear 1s'
  }, 3000)
}

// ============================== GET ALL DATA FROM API ========================================//
async function iterateActiveCases(){ // GETS THE DATA FROM API
  let countries = await fetch('https://api.covid19api.com/summary');
  let json = await countries.json();
  let push = await pushArray(topCases,json); // PUSHES THE DATA (specifically "Countries" properties) FROM THE API TO topCases Array
  let displayWord = await displaytoWorld(json); // DISPLAY THE TOTAL CONFIRMED, DEATHS AND RECOVERY GLOBALLY (From "Global" property)
  let topFive = await displayTopCountries(push); // DISPLAY THE TOP COUNTRIES WITH HIGHEST CASES
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

//========================= DISPLAY GLOBAL CASE ==================================//
function displaytoWorld(obj){
  setTimeout(function(){
    return new Promise(function(resolve){
      const worldCase = document.querySelector('#world-cases');
      let heading = [];
      let subHeading = [];
      let global = obj.Global;
      for(i=0; i < 3;i++){
        let div = document.createElement('div');
        heading[i] = document.createElement('h2');
        subHeading[i] = document.createElement('h2');
        div.className = 'world-stat';
        div.appendChild(heading[i]);
        div.appendChild(subHeading[i]);
        worldCase.appendChild(div);
      }
      heading[0].innerHTML = `TOTAL CONFIRMED `;
      heading[1].innerHTML = `TOTAL DEATHS`;
      heading[2].innerHTML = `TOTAL RECOVERIES`;
      subHeading[0].innerHTML = formatter.format(global.TotalConfirmed);
      subHeading[1].innerHTML = formatter.format(global.TotalDeaths);
      subHeading[2].innerHTML = formatter.format(global.TotalRecovered);
      resolve (worldCase)
    })
  }, 1000)
}

//========================= FOR TOP 5 WITH ACTIVE CASES ==========================//

function displayTopCountries(arr){
  setTimeout(function(){
    return new Promise(function(resolve){
      const topCountry = document.querySelector('#top-positive');
      let date = document.querySelector('#top-positive h1 span');

      date.append(arr[7].Date.slice(0,10))//========== DISPLAY THE DATE WHEN THE DATA WERE UPDATED ===//
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
        row1.insertCell(1).append(formatter.format(arr[i].TotalConfirmed));
  
        row2.insertCell(0).innerHTML = '<strong>Deaths:</strong>';
        row2.insertCell(1).append(formatter.format(arr[i].TotalDeaths));
        row3.insertCell(0).innerHTML = '<strong>Recoveries:</strong>';
        
        // FOR INCOMPLETE "RECOVERED CASES" DATA//
        if(arr[i].TotalRecovered > 0){
          row3.insertCell(1).append(formatter.format(arr[i].TotalRecovered));
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
  }, 1000)
}
//============================== DISPLAY ALL COUNTRIES  =========================================================//
const displayCountries = document.querySelector('#list-countries button');
const nation = document.querySelector('#list-countries');
const nationChild = document.querySelector('#list-countries #country-container');
const pageButtons = document.querySelector('#list-countries #page-btns')
let listClicked = false;
let title = document.createElement('h1');
let counter =0;
let currentPage = 1;
let countryBlock = 6; // NUMBER OF COUNTRY DISPLAY PER PAGE

displayCountries.addEventListener('click', function(){
  if(listClicked === false){
    displayAll();
    displayCountries.innerText = 'Click to hide countries';
    return listClicked = true;
  }
  else if(listClicked === true){
    displayCountries.innerText = 'Click to view more list of countries';
    pageButtons.innerHTML ='';
    title.innerHTML = ''
    listClicked = false;
    while(nationChild.childNodes){
    nationChild.removeChild(nationChild.childNodes[0]);
    }
    
  }
})
async function displayAll(){
  let iterate = await getCountry(topCases, nationChild, countryBlock, currentPage);
  let listBtns = await listButton(topCases, countryBlock, currentPage);
}
function getCountry(arr, container, divNums, page){
  return new Promise(function(resolve, reject){
    container.innerHTML = '';
    title.innerHTML = '';
    let firstDiv = divNums * page;
    let lastDiv = firstDiv + divNums;
    let paginatedItems = arr.slice(firstDiv, lastDiv);
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
        row1.insertCell(1).append(formatter.format(paginatedItems[i].TotalConfirmed));
        row2.insertCell(0).innerHTML = '<strong>Deaths:</strong>';
        row2.insertCell(1).append(formatter.format(paginatedItems[i].TotalDeaths))
        row3.insertCell(0).innerHTML = '<strong>Recovered:</strong>';
        row3.insertCell(1).append(formatter.format(paginatedItems[i].TotalRecovered));
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

//================================ MAP CREATION =================================//

async function iterateCountries(){
  let countries = await fetch('https://covid-api.mmediagroup.fr/v1/cases?');
  let json = await countries.json();
  let iterateCountyList = await iterateCountryList(json, topCases);
}
let heatMapData = [];
function iterateCountryList(item, arr){
  setTimeout(function(){
    return new Promise(function(){
      for(let key in item){
        let country = item[key];
        for(value in country){
          for(i=0; i < arr.length; i++){
            if(arr[i].Country === key || arr[i].CountryCode === country.All.abbreviation){
              let heatWeight;
              if(arr[i].TotalConfirmed < 1000){
                heatWeight = 5;
              }
              else if(arr[i].TotalConfirmed > 1000 && arr[i].TotalConfirmed < 5000){
                heatWeight = 10;
              }
              else if(arr[i].TotalConfirmed > 5000 && arr[i].TotalConfirmed < 10,000){
                heatWeight = 30;
              }
              else if(arr[i].TotalConfirmed > 10000 && arr[i].TotalConfirmed < 100000){
                heatWeight = 40;
              }
              else if(arr[i].TotalConfirmed > 1000000){
                heatWeight = 100;
              }
              heatMapData.push({location: new google.maps.LatLng(parseInt(country[value].lat),parseInt(country[value].long) ), weight: heatWeight})
            }
          }
        }
        
      }
     
    })
  }, 3000)
}

function createMap(){
  let map;
  let ph = new google.maps.LatLng(14.599512, 120.984222);
  map = new google.maps.Map(document.getElementById('map'), {
    center: ph,
    zoom: 3,
    mapId: '811ab3f2e9a97e5d',
    mapTypeControl: false,
    fullscreenControl: false,
  });
  
  let heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData,
    radius: 15
  });
  heatmap.setMap(map);
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

// async function countrySelector(item){
//   let response = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${item}`);
//   // let response = await fetch(`country-list/csvjson.json`)
//   let json = await response.json();
//   return json;
// }

// let opt = document.createElement('option');
// let createText = document.createTextNode(key);
// opt.appendChild(createText);
// opt.value = key;
// optionSelector.appendChild(opt);
