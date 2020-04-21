//applying theme
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/themes/high-contrast-dark",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,c,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,c))}a=a?a._modules:{};b(a,"themes/high-contrast-dark.js",[a["parts/Globals.js"]],function(a){a.theme={colors:"#a6f0ff #70d49e #e898a5 #007faa #f9db72 #f45b5b #1e824c #e7934c #dadfe1 #a0618b".split(" "),
chart:{backgroundColor:"#1f1f20",plotBorderColor:"#606063"},title:{style:{color:"#F0F0F3"}},subtitle:{style:{color:"#F0F0F3"}},xAxis:{gridLineColor:"#707073",labels:{style:{color:"#F0F0F3"}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",title:{style:{color:"#F0F0F3"}}},yAxis:{gridLineColor:"#707073",labels:{style:{color:"#F0F0F3"}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",title:{style:{color:"#F0F0F3"}}},tooltip:{backgroundColor:"rgba(0, 0, 0, 0.85)",
style:{color:"#F0F0F3"}},plotOptions:{series:{dataLabels:{color:"#F0F0F3"},marker:{lineColor:"#333"}},boxplot:{fillColor:"#505053"},candlestick:{lineColor:"white"},errorbar:{color:"white"},map:{nullColor:"#353535"}},legend:{backgroundColor:"transparent",itemStyle:{color:"#F0F0F3"},itemHoverStyle:{color:"#FFF"},itemHiddenStyle:{color:"#606063"},title:{style:{color:"#D0D0D0"}}},credits:{style:{color:"#F0F0F3"}},labels:{style:{color:"#707073"}},drilldown:{activeAxisLabelStyle:{color:"#F0F0F3"},activeDataLabelStyle:{color:"#F0F0F3"}},
navigation:{buttonOptions:{symbolStroke:"#DDDDDD",theme:{fill:"#505053"}}},rangeSelector:{buttonTheme:{fill:"#505053",stroke:"#000000",style:{color:"#eee"},states:{hover:{fill:"#707073",stroke:"#000000",style:{color:"#F0F0F3"}},select:{fill:"#303030",stroke:"#101010",style:{color:"#F0F0F3"}}}},inputBoxBorderColor:"#505053",inputStyle:{backgroundColor:"#333",color:"#F0F0F3"},labelStyle:{color:"#F0F0F3"}},navigator:{handles:{backgroundColor:"#666",borderColor:"#AAA"},outlineColor:"#CCC",maskFill:"rgba(180,180,255,0.2)",
series:{color:"#7798BF",lineColor:"#A6C7ED"},xAxis:{gridLineColor:"#505053"}},scrollbar:{barBackgroundColor:"#808083",barBorderColor:"#808083",buttonArrowColor:"#CCC",buttonBackgroundColor:"#606063",buttonBorderColor:"#606063",rifleColor:"#FFF",trackBackgroundColor:"#404043",trackBorderColor:"#404043"}};a.setOptions(a.theme)});b(a,"masters/themes/high-contrast-dark.src.js",[],function(){})});

let totalCasesData;
let totalCasesPointsCollection = new Array();
let totalDeathsData;
let totalDeathsPointsCollection = new Array();
let totalRecoveriesData;
let totalRecoveriesPointCollection = new Array();
fetch("https://corona.lmao.ninja/v2/historical/all?lastdays=all", { "method" : "GET" })
.then(response => response.json())
.then(result => {
    totalCasesData = result.cases;
    totalDeathsData = result.deaths;
    totalRecoveriesData = result.recovered;
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
    DisplayWorldCasesChart();
    DisplayWorldDeathsChart();
    DisplayWorldRecoveredChart();
})
.catch(error => console.log(error));

function FormatDate(date) {
    let MonthDayYear = date.split("/");
    let month = parseInt(MonthDayYear[0])-1;
    let day = parseInt(MonthDayYear[1]);
    let year = 2000 + parseInt(MonthDayYear[2]);
    return Date.UTC(year, month, day);
}

function DisplayWorldCasesChart() {
    var chart = Highcharts.chart('total-cases-chart', {
        chart: {
            type: 'spline',
            width: screen.width * 33/100
        },
        title: {
            text: 'Total Cases'
        }, 
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Total Coronavirus Cases'
            },
            min: 0
        }, 
        tooltip: {
            headerFormat: '<b>{point.x: %e. %b}</b><br>',
            pointFormat: 'Total Cases: <b>{point.y}</b>'
        },
        series: [{
            name: 'Total Cases',
            data: totalCasesPointsCollection.map(elem => elem)
        }],
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
        }
    });
}

function DisplayWorldDeathsChart() {
    var chart = Highcharts.chart('total-deaths-chart', {
        chart: {
            type: 'spline',
            width: screen.width * 33/100
        },
        title: {
            text: 'Total Deaths'
        }, 
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Total Coronavirus Deaths'
            },
            min: 0
        }, 
        tooltip: {
            headerFormat: '<b>{point.x: %e. %b}</b><br>',
            pointFormat: 'Total Deaths: <b>{point.y}</b>'
        },
        series: [{
            name: 'Total Deaths',
            data: totalDeathsPointsCollection.map(elem => elem),
            color: '#ff0000'
        }],
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
        }
    });
}

function DisplayWorldRecoveredChart() {
    var chart = Highcharts.chart('total-recovered-chart', {
        chart: {
            type: 'spline',
            width: screen.width * 33/100
        },
        title: {
            text: 'Total Recoveries'
        }, 
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Total Coronavirus Recoveries'
            },
            min: 0
        }, 
        tooltip: {
            headerFormat: '<b>{point.x: %e. %b}</b><br>',
            pointFormat: 'Total Recoveries: <b>{point.y}</b>'
        },
        series: [{
            name: 'Total Recoveries',
            data: totalRecoveriesPointCollection.map(elem => elem),
            color: '#00ff00'
        }],
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
        }
    });
}