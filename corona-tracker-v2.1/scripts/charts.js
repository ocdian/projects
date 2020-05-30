var firstChart;
var secondChart;
function DisplayChart(chartID, chartType, chartTitle, totalCasesPointsCollection, totalDeathsPointsCollection, totalRecoveriesPointCollection) {
    var chart = Highcharts.chart(chartID, {
        chart: {
            type: chartType,
            plotBackgroundColor: null,
            backgroundColor: null,
            style: {
                fontFamily: 'Manrope',
                fontWeight: '700'
            }
        },
        title: {
            text: chartTitle
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
    });
    if (chartID === "country-chart-first") firstChart = chart;
    else secondChart = chart;
}

function UpdateChart(chart, countryName, newCases, newDeaths, newRecovered) {
    chart.update({
        title: {
            text: countryName
        },
        series: [
        {
            data: newCases.map(elem => elem)
        },
        {
            data: newDeaths.map(elem => elem)
        },
        {
            data: newRecovered.map(elem => elem)
        }
    ]
    });
}

function FormatDate(date) {
    let MonthDayYear = date.split("/");
    let month = parseInt(MonthDayYear[0]) - 1;
    let day = parseInt(MonthDayYear[1]);
    let year = 2000 + parseInt(MonthDayYear[2]);
    return Date.UTC(year, month, day);
}

let error_message = "Something went wrong. We apologize for the inconvenience.";

function getChartPoints(data) {
    var pointsCollection = new Array();
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var point = [FormatDate(key), data[key]]
            pointsCollection.push(point);
        }
    }
    return pointsCollection;
}

var casesPointCollection;
var deathsPointCollection;
var recoveredPointCollection;

function getHistoricalCountry(countryName, lastDays, chartID, update = false) {
    let historical_country = `https://disease.sh/v2/historical/${countryName}?lastdays=${lastDays}`;
    fetch(historical_country)
    .then(response => response.json())
    .then(result => {
        if (result.message) {
            alert(result.message);
            return;
        }
        var timeline = result.timeline;
        var casesTimeline = timeline.cases;
        var deathsTimeline = timeline.deaths;
        var recoveredTimeline = timeline.recovered;
        casesPointCollection = getChartPoints(casesTimeline);
        deathsPointCollection = getChartPoints(deathsTimeline);
        recoveredPointCollection = getChartPoints(recoveredTimeline);
        if (!update) DisplayChart(chartID, "spline", countryName, casesPointCollection, deathsPointCollection, recoveredPointCollection); 
        else {
            var chartToUpdate;
            if (chartID === "country-picker-first") {        
                chartToUpdate = firstChart;
            }
            else if (chartID === "country-picker-second") {
                chartToUpdate = secondChart;
            }
            UpdateChart(chartToUpdate, countryName ,casesPointCollection, deathsPointCollection, recoveredPointCollection);
        }
    })
    .catch(error => {
        alert(error_message);
        console.log(error);
    })
}

function populateDatalist() {
    var countries_list = "https://disease.sh/v2/countries?sort=cases";
    fetch(countries_list)
    .then(response => response.json())
    .then(result => {
        for (let i = 0; i < result.length; i++) {
            var datalistItem = document.createElement("option");
            datalistItem.value = result[i].country;
            document.getElementById("countries-datalist").appendChild(datalistItem);
        }
    })
}

function updateFirst() {
    var countryName = document.getElementById("country-picker-first").value;
    if (countryName)
        getHistoricalCountry(countryName, "all", "country-picker-first", true);
}

function updateSecond() {
    var countryName = document.getElementById("country-picker-second").value;
    if (countryName)
        getHistoricalCountry(countryName, "all", "country-picker-second", true);
}

document.addEventListener("DOMContentLoaded", function() {
   populateDatalist();
   getHistoricalCountry("Spain", "all", "country-chart-first");
   getHistoricalCountry("Germany", "all", "country-chart-second");
   document.getElementById("country-picker-first").value = '';
   document.getElementById("country-picker-second").value = '';
   document.getElementById("country-picker-btn-first").onclick = updateFirst;
   document.getElementById("country-picker-btn-second").onclick = updateSecond;
});