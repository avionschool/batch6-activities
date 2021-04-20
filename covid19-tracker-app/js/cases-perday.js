
//================================== HTML ELEMENTS ==============================================================//
const searchQuery = document.querySelector('#tracker-page #search-query');
const submitDateFrom = document.querySelector('#tracker-page #date-from');
const submitDateTo = document.querySelector('#tracker-page #date-to');
const submitQuery = document.querySelector('#tracker-page #submit-btn');

submitQuery.addEventListener('click', function(e){
    if(searchQuery.value.length > 1 && submitDateFrom.value.length > 7 && submitDateTo.value.length > 7 ){
        e.preventDefault()
        displayCases(searchQuery.value,submitDateFrom.value, submitDateTo.value)
    }
})

//=========================== LIST OF COUNTRIES ================================//
let listCountries = [];
const date = [];
const cases = {
    confirmed :[],
    deaths : [],
    recovered: []
}
async function displayCases(country,from, to){
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
    console.log(recoveredjson);
    let objJson = await pushJSON(confirmedjson, deathsjson, recoveredjson)
    console.log(objJson)
    let table = await inserTable(cases.confirmed, cases.deaths, cases.recovered, arrayCountries, country)
    return table;
}

function pushArray(arr, obj){
    return new Promise(function(resolve){
        for(key in obj){
            arr.push(obj[key]);
        }
        resolve(arr);
    })
}

function pushJSON(confirmed, deaths, recovered){
    return new  Promise(function(resolve){
            cases.confirmed.length = 0;
            cases.deaths.length = 0;
            cases.recovered.length = 0;
            date.length = 0;

        for(i=0; i < confirmed.length; i++){
            cases.confirmed.push(confirmed[i].Cases)
            cases.deaths.push(deaths[i].Cases)
            cases.recovered.push(recovered[i].Cases)
            date.push(confirmed[i].Date.slice(0,10))
        }
        resolve ({confirmed, deaths, recovered})
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
const tableContainer = document.querySelector('#tracker-page #table-container');
function inserTable(confirmed, deaths, recovered, arr, country){
    return new Promise(function(resolve){

        createChart(date, cases.confirmed, 'confirmed','rgba(255, 166, 0, 0.339)');
        createChart(date, cases.deaths, 'deaths', 'rgba(255, 0, 0, 0.339)');
        createChart(date, cases.recovered, 'recovered', 'rgba(0, 255, 0, 0.339)');

        tableContainer.innerHTML = '';
        let table = document.createElement('table');
        table.id = 'case-history'
        table.setAttribute('cellspacing', '0');
        tableContainer.appendChild(table);
        let headRow = table.insertRow(0);
        let headCell = [];
        for(a=0; a < arr.length; a++){
            if(arr[a].Country === country){
                createTable(arr[a].ISO2, table, headCell, headRow, confirmed, deaths, recovered, country);
            }
        }
        resolve(tableContainer);
    })
}
function createTable(arrCode, table, headCell,headRow, confirmed, deaths, recovered, country){
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
    
    for(i=0; i < confirmed.length; i++){
        let row = table.insertRow(1);
        let cell = [];
        let img = document.createElement('img');
        img.src = `https://www.countryflags.io/${arrCode}/flat/64.png`;
        for(z = 0; z < 6; z++){
            cell[z] = row.insertCell(-1);
        }
        cell[0].append(img);
        cell[1].append(country)
        cell[2].append(confirmed[i]);
        cell[3].append(deaths[i]);
        cell[4].append(recovered[i]);
        cell[5].append(date[i]);               
    }
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

