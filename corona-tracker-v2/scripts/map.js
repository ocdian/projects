var proxy = "https://cors-anywhere.herokuapp.com/";
var api = "https://corona.lmao.ninja/v2/countries?sort=cases";
var error_message = "Something went wrong. We apologize for the inconvenience.";

function formatNumber(value) {
    return value.toLocaleString("en-us", { minimumFractionDigits: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
    fetch(api)
        .then(response => response.json())
        .then(result => {
            var data = new Array();
            for (let i = 0; i < result.length; i++) {
                let point = {
                    country: result[i].country,
                    iso3: result[i].countryInfo.iso3,
                    flag: result[i].countryInfo.flag,
                    value: result[i].cases,
                    active: result[i].active,
                    critical: result[i].critical,
                    deaths: result[i].deaths,
                    recovered: result[i].recovered
                }
                data.push(point);
            }
            Highcharts.mapChart('map', {
                chart: {
                    panning: {
                        enabled: true,
                        type: 'xy'
                    }
                },

                title: {
                    text: "COVID-19 Map"
                },

                mapNavigation: {
                    enabled: true
                },

                colorAxis: {
                    min: 1,
                    type: 'logarithmic'
                },

                series: [
                    {
                        name: "COVID-19 Cases",
                        data: data,
                        mapData: Highcharts.maps['custom/world'],
                        joinBy: ['iso-a3', 'iso3'],
                        tooltip: {
                            pointFormat:
                                "<strong>Country:</strong> " + "{point.country}<br>" +
                                "<strong>Total cases: </strong>" + "{point.value}" + "<br>" +
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
