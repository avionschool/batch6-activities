
//================================== HTML ELEMENTS ==============================================================//
const searchQuery = document.querySelector('#tracker-page #search-query');
const submitDateFrom = document.querySelector('#tracker-page #date-from');
const submitDateTo = document.querySelector('#tracker-page #date-to');
const submitQuery = document.querySelector('#tracker-page #submit-btn');
const heroSection = document.querySelector('#form-container');

const tableContainer = document.querySelector('#table-section #table-container');
let table = document.createElement('table');
const chartSection = document.querySelector('.chart');
const chartCanvas = Array.from(document.querySelectorAll('.chart .chart-container canvas'));
//=================================================================================================================//

submitQuery.addEventListener('click', function(e){
    if(searchQuery.value.length > 1 && submitDateFrom.value.length > 7 && submitDateTo.value.length > 7 ){
        e.preventDefault();
        for(i=0;i < chartCanvas.length; i++){
           chartCanvas[i].innerHTML=''
        }
        
        scrollWindow(heroSection);
        table.id = "case-history"
        table.setAttribute("cell-spacing", 0);
        tableContainer.append(table);
        displayCases(searchQuery.value,submitDateFrom.value, submitDateTo.value);
        document.getElementById('refresh-button').style.opacity = '1';
        document.getElementById('refresh-button').style.transition = 'opacity linear .5s'
    }
})

function scrollWindow(heroSection){
    document.querySelector('#table-section').style.display = 'flex';
    chartSection.style.display = 'flex';
    setTimeout(function(){
        window.scrollTo({
            top: heroSection.clientHeight,
            behavior: 'smooth'
          });
    }, 1000)
}
//=========================== LIST OF COUNTRIES ================================//
let listCountries = [];
const date = [];
const cases = {
    confirmed :[],
    deaths : [],
    recovered: []
}
const tableData = [];
let currentPage = 0;
let maxRows = 10; // NUMBER OF COUNTRY DISPLAY PER PAGE
const pageButtons = document.createElement('div');
async function displayCases(country,from, to){
    try{
        let data = await fetch('https://api.covid19api.com/countries');
        let json = await data.json();
        
        let arrayCountries = await pushArray(listCountries, json);
        let Slug = await getSlug(arrayCountries, country);
        
        let confirmedData = await fetch(`https://api.covid19api.com/total/country/${Slug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`);
        let confirmedjson = await confirmedData.json();
    
        let deathsData = await fetch(`https://api.covid19api.com/total/country/${Slug}/status/deaths?from=${from}T00:00:00Z&to=${to}T00:00:00Z`);
        let deathsjson = await deathsData.json();
    
        let recoveredData = await fetch(`https://api.covid19api.com/total/country/${Slug}/status/recovered?from=${from}T00:00:00Z&to=${to}T00:00:00Z`);
        let recoveredjson = await recoveredData.json();
        let arrJson = await pushJSON(confirmedjson, deathsjson, recoveredjson, arrayCountries, country)
       
        // let table = await inserTable(cases.confirmed, cases.deaths, cases.recovered, arrayCountries, country)
        let table = await inserTable(tableData);
    }
    catch{
        alert('Encountered a problem while calling the API. Try to Refresh the page and Run it again')
    }
}

function pushArray(arr, obj){
    return new Promise(function(resolve){
        for(key in obj){
            arr.push(obj[key]);
        }
        resolve(arr);
    })
}

function pushJSON(confirmed, deaths, recovered, arrayCountries, country){
    return new  Promise(function(resolve){
            cases.confirmed.length = 0;
            cases.deaths.length = 0;
            cases.recovered.length = 0;
            date.length = 0;
            tableData.length=0;
        for(j=0; j < arrayCountries.length; j ++){
            if(arrayCountries[j].Country === country){
                for(i=0; i < confirmed.length; i++){
                    cases.confirmed.push(confirmed[i].Cases)
                    cases.deaths.push(deaths[i].Cases)
                    cases.recovered.push(recovered[i].Cases)
                    date.push(confirmed[i].Date.slice(0,10))
                    tableData.push({'country': country, 'ISO2': arrayCountries[j].ISO2, 'confirmed':confirmed[i].Cases, 'deaths':deaths[i].Cases, 'recovered': recovered[i].Cases, 'date':confirmed[i].Date.slice(0,10)})
                }
            }
        }
        // tableData.sort((a,b)=> b.confirmed - a.confirmed);
        resolve(tableData)
    })
}
function getSlug(arr, value){
    return new Promise(function(resolve){
        let slug;
        if(arr.some(item => item.Country === value)){
            for(i=0; i < arr.length; i++){
                if(arr[i].Country === value){
                   slug = arr[i].Slug;
                }
            }
        }
        else{
            alert('Country not found. Check the spelling of correct. Remember to CAPITALIZE the first beginning of the country name (e.g Japan, South Africa, United States of America')
        }
       resolve(slug)
    })
}


const formatter = new Intl.NumberFormat('en');
function inserTable(arr){
    return new Promise(function(){
      
        let headRow = table.insertRow(0);
        let headCell = [];
        createTable(arr, headCell, headRow);
        initChart();
       
    })
}
function createTable(arr, headCell, headRow){
   
    if(headCell.length < 1){
        for(j=0; j < 6; j++){
            headCell[j] = headRow.insertCell(-1);
            headCell[j].className = 'head-cell';
        }
        headCell[0].innerHTML = '<th>Flag</th>';
        headCell[1].innerHTML = '<th>Country</th>';
        headCell[2].innerHTML = '<th>Confirmed</th>';
        headCell[3].innerHTML = '<th>Deaths</th>';
        headCell[4].innerHTML = '<th>Recovered</th>';
        headCell[5].innerHTML = '<th>Date</th>';
    }
    
    for(i=0; i < arr.length; i++){
        let row = table.insertRow(1);
        let cell = [];
        let img = document.createElement('img');
        img.src = `https://flagcdn.com/84x63/${arr[i].ISO2.toLowerCase()}.png`;  //https://flagcdn.com/16x12/${arrCode}.png
        for(z = 0; z < 6; z++){
            cell[z] = row.insertCell(-1);
        }
        cell[0].append(img);
        cell[1].append(arr[i].country)
        cell[2].append(formatter.format(arr[i].confirmed));
        cell[3].append(formatter.format(arr[i].deaths));
        cell[4].append(formatter.format(arr[i].recovered));
        cell[5].append(arr[i].date);               
    }
}

function initChart(){
    createChart(date, cases.confirmed, 'confirmed','rgba(255, 166, 0, 0.339)');
    createChart(date, cases.deaths, 'deaths', 'rgba(255, 0, 0, 0.339)');
    createChart(date, cases.recovered, 'recovered', 'rgba(0, 255, 0, 0.339)');
}
//======================= GRAPH DATA ============================================//

function createChart(arrDate, objData, status, bgColor){
    let ctx = document.getElementById(`${status}-chart`).getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrDate,
            datasets: [{
                label: status,
                data: objData,
                backgroundColor: [
                    bgColor
                ],
                borderColor: [
                    bgColor,
                ],
                borderWidth: 1,
                fill: {
                    target: 'origin',
                    above: bgColor,   // Area will be red above the origin
                }
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

//===================================== REFRESH BUTTON  ============================================//

const refreshBtn = document.querySelector('#refresh-button');
refreshBtn.addEventListener('click', ()=> location.reload());

