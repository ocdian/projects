var paginateBy = 6;
var totalPages;
var currentPage;
var startLocation;
var endLocation;
var itemsCount;
var data = [];
var tableBody;
var prevBtn;
var nextBtn;
var totalPagesEl;
var currentPageEl;
var firstBtn;
var lastBtn;
var countryPickerDatalist;
var countryPickerInput;
var countryIDs = []; //each country is a key, with a value equal to its index in the original data array, we can use it to fetch the country's data
var totalCases;
var totalDeaths; 
var totalRecovered;
var error_message = "Something went wrong. We apologize for the inconvenience.";
var proxy = "https://cors-anywhere.herokuapp.com/";
let all_link = "https://disease.sh/v2/all";
let countries_list = "https://disease.sh/v2/countries?sort=cases";

document.addEventListener("DOMContentLoaded", function () {
    tableBody = document.getElementById("table-body");
    prevBtn = document.getElementById("prev-btn");
    nextBtn = document.getElementById("next-btn");
    totalPagesEl = document.getElementById("total-pages");
    currentPageEl = document.getElementById("current-page"); 
    firstBtn = document.getElementById("first-btn");
    lastBtn = document.getElementById("last-btn");
    countryPickerDatalist = document.getElementById("countries-datalist");
    countryPickerInput = document.getElementById("country-picker");
    
    fetch(all_link)
    .then(response => response.json())
    .then(result => {
        totalCases = result.cases
        totalDeaths = result.deaths;
        totalRecovered = result.recovered;
    })
    .catch(error => {
        alert(error_message);
        console.log(error);
    });
    fetch(countries_list)
    .then(response => response.json())
    .then(result => {
        itemsCount = result.length;
        totalPages = Math.ceil(itemsCount / paginateBy);
        currentPage = 0;
        startLocation = 0;
        endLocation = paginateBy-1;
        data = result;
        countryPickerInput.value = data[0].country;
        Paginate(1);
        PopulateDatalist();
        CountryPickerUpdate();
    })
    .catch(error => {
        alert(error_message);
        console.log(error);
    });

    prevBtn.onclick = function() {
        if (currentPage === 1) return;
        endLocation  = startLocation-1;
        startLocation -= paginateBy;
        Paginate(-1)
    }

    nextBtn.onclick = function() {
        if (currentPage === totalPages) return;
        startLocation = endLocation+1;
        endLocation  = startLocation+paginateBy-1;
        Paginate(1);
    }

    firstBtn.onclick = function() {
        if (currentPage === 1) return;
        startLocation = 0;
        endLocation = paginateBy-1;
        Paginate(1-currentPage);
    }

    lastBtn.onclick = function() {
        if (currentPage === totalPages) return;
        let rem = itemsCount % paginateBy;
        let itemsInLastPage = (rem > 0) ? rem : itemsCount / totalPages;
        startLocation = itemsCount - itemsInLastPage;
        endLocation = itemsCount-1;
        Paginate(totalPages-currentPage);
    }
    countryPickerInput.onchange = CountryPickerUpdate;
    document.getElementById("details-country-picker-btn").onclick = CountryPickerUpdate;
});


function calculatePecentage(part, total) {
    return 100 * part / total;
}

function PopulateDatalist() {
    for (let i = 0; i < itemsCount; i++) {
        var datalistItem = document.createElement("option");
        let countryName = data[i].country;
        datalistItem.value = countryName;
        countryPickerDatalist.appendChild(datalistItem);
        countryIDs[countryName.toLowerCase()] = i;
    }
}

function CountryPickerUpdate() {
    console.log(totalCases);
    let chosenCountryName = countryPickerInput.value.toLowerCase();
    let chosenCountryID = countryIDs[chosenCountryName];
    let chosenCountry = data[chosenCountryID];
    if (chosenCountry === undefined) return;
    document.getElementById("country-picker-total-cases").innerHTML = chosenCountry.cases.toLocaleString("en-us", { minimumFractionDigits: 0 });
    document.getElementById("country-picker-total-deaths").innerHTML = chosenCountry.deaths.toLocaleString("en-us", { minimumFractionDigits: 0 });
    document.getElementById("country-picker-total-recovered").innerHTML = chosenCountry.recovered.toLocaleString("en-us", { minimumFractionDigits: 0 });
    document.getElementById("country-picker-total-active").innerHTML = chosenCountry.active.toLocaleString("en-us", { minimumFractionDigits: 0 });
    document.getElementById("country-picker-total-serious").innerHTML = chosenCountry.critical.toLocaleString("en-us", { minimumFractionDigits: 0 });
    document.getElementById("country-picker-total-tests").innerHTML = chosenCountry.tests.toLocaleString("en-us", { minimumFractionDigits: 0 });
    document.getElementById("country-picker-new-cases").innerHTML = chosenCountry.todayCases.toLocaleString("en-us", { minimumFractionDigits: 0 });
    document.getElementById("country-picker-cases-per-mil").innerHTML = chosenCountry.casesPerOneMillion.toLocaleString("en-us", { minimumFractionDigits: 2 });
    document.getElementById("country-picker-new-deaths").innerHTML = chosenCountry.todayDeaths.toLocaleString("en-us", { minimumFractionDigits: 0 });
    document.getElementById("country-picker-deaths-per-mil").innerHTML = chosenCountry.deathsPerOneMillion.toLocaleString("en-us", { minimumFractionDigits: 2 });
    document.getElementById("country-picker-tests-per-mil").innerHTML = chosenCountry.testsPerOneMillion.toLocaleString("en-us", { minimumFractionDigits: 2 });
    document.getElementById("country-picker-rank").innerHTML = chosenCountryID+1; 
    document.getElementById("country-picker-flag").src = chosenCountry.countryInfo.flag;
    document.getElementById("cases-percent").innerHTML = calculatePecentage(chosenCountry.cases, totalCases).toLocaleString("en-us", { minimumFractionDigits: 2 });
    document.getElementById("deaths-percent").innerHTML = calculatePecentage(chosenCountry.deaths, totalDeaths).toLocaleString("en-us", { minimumFractionDigits: 2 });
    document.getElementById("recovered-percent").innerHTML = calculatePecentage(chosenCountry.recovered, totalRecovered).toLocaleString("en-us", { minimumFractionDigits: 2 });
}

function Paginate(ChangeCurrentPage) {
    currentPage += ChangeCurrentPage;
    totalPagesEl.innerHTML = totalPages;
    currentPageEl.innerHTML = currentPage;
    console.log(currentPage, startLocation, endLocation);
    tableBody.innerHTML = '';
    for (let i = startLocation; i <= Math.min(endLocation, itemsCount-1); i++) {
        var currentObject = data[i];
        var row = document.createElement("tr");
        var countryCell = document.createElement("td");
        var casesCell = document.createElement("td");
        //var casesTodayCell = document.createElement("td");
        var deathsCell = document.createElement("td");
        //var deathsTodayCell = document.createElement("td");
        var recoveredCell = document.createElement("td");
        var activeCell = document.createElement("td");
        var criticalCell = document.createElement("td");
        //var casesPerMilCell = document.createElement("td");
        //var deathsPerMilCell = document.createElement("td");
        var testsCell = document.createElement("td");
        //var testsPerMilCell = document.createElement("td");
        countryCell.innerHTML = currentObject.country;
        casesCell.innerHTML = currentObject.cases.toLocaleString("en-us", { minimumFractionDigits: 0 });
        //casesTodayCell.innerHTML = currentObject.todayCases.toLocaleString("en-us", { minimumFractionDigits: 0 });
        deathsCell.innerHTML = currentObject.deaths.toLocaleString("en-us", { minimumFractionDigits: 0 });
        //deathsTodayCell.innerHTML = currentObject.todayDeaths.toLocaleString("en-us", { minimumFractionDigits: 0 });
        recoveredCell.innerHTML = currentObject.recovered.toLocaleString("en-us", { minimumFractionDigits: 0 });
        activeCell.innerHTML = currentObject.active.toLocaleString("en-us", { minimumFractionDigits: 0 });
        criticalCell.innerHTML = currentObject.critical.toLocaleString("en-us", { minimumFractionDigits: 0 });
        //casesPerMilCell.innerHTML = currentObject.casesPerOneMillion;
        //deathsPerMilCell.innerHTML = currentObject.deathsPerOneMillion;
        testsCell.innerHTML = currentObject.tests.toLocaleString("en-us", { minimumFractionDigits: 0 });
        //testsPerMilCell.innerHTML = currentObject.testsPerOneMillion;
        row.appendChild(countryCell);
        row.appendChild(casesCell);
        //row.appendChild(casesTodayCell);
        row.appendChild(deathsCell);
        //row.appendChild(deathsTodayCell);
        row.appendChild(recoveredCell);
        row.appendChild(activeCell);
        row.appendChild(criticalCell);
        //row.appendChild(casesPerMilCell);
        //row.appendChild(deathsPerMilCell);
        row.appendChild(testsCell);
        //row.appendChild(testsPerMilCell);
        tableBody.appendChild(row);
    }
}
