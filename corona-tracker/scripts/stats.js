let totalDeaths = document.getElementById("total-deaths");
let totalCases = document.getElementById("total-cases");
let totalRecoveries = document.getElementById("total-recoveries");
let activeCases = document.getElementById("active-cases");
let countriesAffected = document.getElementById("countries-affected");
let table = document.getElementById("table");
fetch("https://corona.lmao.ninja/v2/all", { "method": "GET" })
    .then(response => response.json().then(data => {
        totalCases.innerHTML = data.cases;
        totalDeaths.innerHTML = data.deaths;
        totalRecoveries.innerHTML = data.recovered;
        activeCases.innerHTML = data.active;
        countriesAffected.innerHTML = data.affectedCountries;
    }))
    .catch(err => {
        console.log(err);
    });

fetch("https://corona.lmao.ninja/v2/countries", { "method": "GET" })
    .then(response => response.json().then(data => {
        let countriesArray = data;
        countriesArray.sort((a,b) => b.cases - a.cases);
        for (let i = 0; i < countriesArray.length; i++) {
            let currentCountry = countriesArray[i];
            let row = table.insertRow(i+1);
            let countryName = row.insertCell(0);
            let countryCases = row.insertCell(1);
            let countryDeaths = row.insertCell(2);
            countryDeaths.classList.add("death-stats")
            let countrySerious = row.insertCell(3);
            let countryRecovered = row.insertCell(4);
            countryRecovered.classList.add("recovery-stats")
            countryName.innerHTML = currentCountry.country;
            countryCases.innerHTML = currentCountry.cases;
            countryDeaths.innerHTML = currentCountry.deaths;
            countrySerious.innerHTML = currentCountry.critical;
            countryRecovered.innerHTML = currentCountry.recovered;
        }
    }))
    .catch(err => {
        console.log(err);
    });
