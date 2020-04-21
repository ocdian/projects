var proxy = "https://cors-anywhere.herokuapp.com/";
var api = "https://corona.lmao.ninja/v2/countries?sort=cases";
var error_message = "Something went wrong. We apologize for the inconvenience.";

function formatNumber(value) {
    return value.toLocaleString("en-us", { minimumFractionDigits: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
    fetch(proxy + api)
        .then(response => response.json())
        .then(result => {
            var data = new Array();
            for (let i = 0; i < result.length; i++) {
                let point = {
                    country: result[i].country,
                    iso3: result[i].countryInfo.iso3,
                    flag: result[i].countryInfo.flag,
                    z: result[i].cases,
                    active: result[i].active,
                    critical: result[i].critical,
                    deaths: result[i].deaths,
                    recovered: result[i].recovered
                }
                data.push(point);
            }
            Highcharts.mapChart('map', {
                chart: {
                    map: 'custom/world',
                    style: {
                        fontFamily: 'Manrope'
                    }
                },

                title: {
                    text: "COVID-19 Map"
                },

                mapNavigation: {
                    enabled: true
                },

                series: [{
                    name: 'Countries',
                    color: '#E0E0E0',
                    enableMouseTracking: false
                }, {
                    type: 'mapbubble',
                    name: 'COVID-19 Cases',
                    joinBy: ['iso-a3', 'iso3'],
                    data: data,
                    minSize: 15,
                    maxSize: '11%',
                    tooltip: {
                        pointFormat:
                            "<strong>Country:</strong> " + "{point.country}<br>" +
                            "<strong>Total cases: </strong>" + "{point.z}" + "<br>" +
                            "<strong>Active cases: </strong>" + "{point.active}" + "<br>" +
                            "<strong>Serious cases: </strong>" + "{point.critical}" + "<br>" +
                            "<strong>Total deaths: </strong>" + "{point.deaths}" + "<br>" +
                            "<strong>Total recovered: </strong>" + "{point.recovered}" + "<br>"

                    }
                }]
            });
        })
        .catch(error => {
            alert(error_message);
            console.log(error);
        })
});
