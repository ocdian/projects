/*
Dashboard scripts
*/
let error_message = "Something went wrong. We apologize for the inconvenience.";
document.addEventListener("DOMContentLoaded", function () {
    /*  Filling up the stats cards */
    var total_cases_value;
    var total_deaths_value;
    var total_recovered_value;
    var total_active_value;
    var total_serious_value;
    var todayCases;
    var todayDeaths;
    var casesPerOneMillion;
    var deathsPerOneMillion;
    var tests;
    var testsPerOneMillion;
    var affectedCountries;
    var updatedAt;
    fetch("https://corona.lmao.ninja/v2/all")
        .then(response => {
            return response.json();
        })
        .then(result => {
            total_cases_value = result.cases.toLocaleString("en-us", { minimumFractionDigits: 0 });
            total_deaths_value = result.deaths.toLocaleString("en-us", { minimumFractionDigits: 0 });
            total_recovered_value = result.recovered.toLocaleString("en-us", { minimumFractionDigits: 0 });
            total_active_value = result.active.toLocaleString("en-us", { minimumFractionDigits: 0 });
            total_serious_value = result.critical.toLocaleString("en-us", { minimumFractionDigits: 0 });
            todayCases = result.todayCases.toLocaleString("en-us", { minimumFractionDigits: 0 });
            todayDeaths = result.todayDeaths.toLocaleString("en-us", { minimumFractionDigits: 0 });
            casesPerOneMillion = result.casesPerOneMillion.toLocaleString("en-us", { minimumFractionDigits: 0 });
            deathsPerOneMillion = result.deathsPerOneMillion.toLocaleString("en-us", { minimumFractionDigits: 0 });
            tests = result.tests.toLocaleString("en-us", { minimumFractionDigits: 0 });
            testsPerOneMillion = result.testsPerOneMillion.toLocaleString("en-us", { minimumFractionDigits: 0 });
            affectedCountries = result.affectedCountries.toLocaleString("en-us", { minimumFractionDigits: 0 });
            updatedAt = result.updated;
            var total_cases = document.getElementById("total-cases-val");
            var total_deaths = document.getElementById("total-deaths-val");
            var total_recovered = document.getElementById("total-recovered-val");
            var total_active = document.getElementById("total-active-val");
            var total_serious = document.getElementById("total-serious-val");
            var total_cases_today = document.getElementById("total-cases-today-val");
            var total_deaths_today = document.getElementById("total-deaths-today-val");
            var cases_per_mil = document.getElementById("cases-per-mil-val");
            var deaths_per_mil = document.getElementById("deaths-per-mil-val");
            var total_tests = document.getElementById("total-tests-val");
            var test_per_mil = document.getElementById("tests-per-mil-val");
            var affected_countries = document.getElementById("affected-countries-val");
            var updated_at = document.getElementById("updated-at");
            total_cases.innerHTML = total_cases_value;
            total_deaths.innerHTML = total_deaths_value;
            total_recovered.innerHTML = total_recovered_value;
            total_active.innerHTML = total_active_value;
            total_serious.innerHTML = total_serious_value;
            total_cases_today.innerHTML = todayCases;
            total_deaths_today.innerHTML = todayDeaths;
            cases_per_mil.innerHTML = casesPerOneMillion;
            deaths_per_mil.innerHTML = deathsPerOneMillion;
            total_tests.innerHTML = tests;
            test_per_mil.innerHTML = testsPerOneMillion;
            affected_countries.innerHTML = affectedCountries;
            options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: true
            };
            updated_at.innerHTML = new Intl.DateTimeFormat('en-GB', options).format(updatedAt);
        })
        .catch(error => {
            alert(error_message);
            console.log(error);
            return;
        });
    /* Displaying the charts */

    function FormatDate(date) {
        let MonthDayYear = date.split("/");
        let month = parseInt(MonthDayYear[0]) - 1;
        let day = parseInt(MonthDayYear[1]);
        let year = 2000 + parseInt(MonthDayYear[2]);
        return Date.UTC(year, month, day);
    }
    let totalCasesData;
    let totalCasesPointsCollection = new Array();
    let totalDeathsData;
    let totalDeathsPointsCollection = new Array();
    let totalRecoveriesData;
    let totalRecoveriesPointCollection = new Array();
    fetch("https://corona.lmao.ninja/v2/historical/all?lastdays=all")
        .then(response => {
            return response.json();
        })
        .then(result => {
            totalCasesData = result.cases; /* this  holds all the key-value pairs */
            totalDeathsData = result.deaths;
            totalRecoveriesData = result.recovered;
            //for every key (the key here being the date) which has a value, we're giving each point an x and a y
            //the x being the date, the y being the value at that date, and we're pushing each point to a dataset
            //which is the points collection, which in turn we'll push to the chart
            for (var date in totalCasesData) {
                if (totalCasesData.hasOwnProperty(date)) {
                    let point = [FormatDate(date), totalCasesData[date]];
                    totalCasesPointsCollection.push(point);
                }
            }
            for (var date in totalDeathsData) {
                if (totalDeathsData.hasOwnProperty(date)) {
                    let point = [FormatDate(date), totalDeathsData[date]];
                    totalDeathsPointsCollection.push(point);
                }
            }
            for (var date in totalRecoveriesData) {
                if (totalRecoveriesData.hasOwnProperty(date)) {
                    let point = [FormatDate(date), totalRecoveriesData[date]];
                    totalRecoveriesPointCollection.push(point);
                }
            }
            //displaying the chart
            displayChart(totalCasesPointsCollection, totalDeathsPointsCollection, totalRecoveriesPointCollection);
        })
        .catch(error => {
            alert(error_message);
        });
});

function displayChart(totalCasesPointsCollection, totalDeathsPointsCollection, totalRecoveriesPointCollection) {
    var chart = Highcharts.chart('total-chart', {
        chart: {
            type: 'spline',
            plotBackgroundColor: null,
            backgroundColor: null,
            style: {
                fontFamily: 'Manrope',
                fontWeight: '700'
            }
        },
        title: {
            text: 'COVID-19 Global Stats'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0
        },
        series: [
            {
                name: 'Total Cases',
                data: totalCasesPointsCollection.map(elem => elem)
            },
            {
                name: 'Total Deaths',
                data: totalDeathsPointsCollection.map(elem => elem)
            },
            {
                name: 'Total Recovered',
                data: totalRecoveriesPointCollection.map(elem => elem)
            }
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
        /*
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1001
                },
                chartOptions: {
                    chart: {
                        width: screen.width
                    }
                }
            }]
        }*/
    });
}
