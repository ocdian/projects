document.getElementById("map").style.height = screen.height + "px";
var map = L.map('map').setView([0.505, 0.09], 3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib2NkaWFuIiwiYSI6ImNrOGthNjllbTAzMnkzbnA2OHR1aXY2MmYifQ.cMECj54l750F-Libj85MPg'
}).addTo(map);

fetch("https://corona.lmao.ninja/v2/countries", { "method": "GET" })
    .then(respone => respone.json())
    .then(data => {
        //check that we have countries in the data array and exit the function if we don't
        var hasData = Array.isArray(data) && data.length > 0;
        if (!hasData) return;
        console.log(data);
        /*
        create a geoJSON object that will be the geoJSON document
        Loop through each country in data, obtaining lat and lng which will be used to create a point on the map
        */
        const geoJSON = {
            type: 'FeatureCollection',
            features: data.map((country = {}) => {
                const { countryInfo = {} } = country;
                const { lat, long: lng } = countryInfo;
                return {
                    'type': 'Feature',
                    'properties': {
                        ...country
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [lng, lat]
                    }
                }
            })
        }
        var markerOptions = {
            radius: 8,
            fillColor: "rgba(0, 0, 0, 0.7)",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }    
        function attachPopups(feature, layer) {
            var content = "<b>Country:</b> " + feature.properties.country + " <img style='border:1px solid black;' height='10px' width='20px' src='" + feature.properties.countryInfo.flag + "'>" +"<br>"
            + "<b>Active Cases:</b> " + feature.properties.active + "<br>"
            + "<b>Total Cases:</b> " + feature.properties.cases + "<br>"
            + "<b>Critical Cases:</b> " + feature.properties.critical + "<br>"
            + "<b>Total Deaths:</b> <span style='color:red;'>" + feature.properties.deaths + "</span><br>"
            + "<b>Total Recoveries:</b> <span style='color:green;'>" + feature.properties.recovered + "</span><br>"
            + "<b>New Cases:</b> " + feature.properties.recovered + "<br>"
            + "<b>New Deaths: </b> <span style='color:red;'>" + feature.properties.todayDeaths + "</span>";
            layer.bindPopup(content);
        }
        L.geoJSON(geoJSON, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, markerOptions);
            },
            onEachFeature: attachPopups
        }).addTo(map);
        console.log(geoJSON);
    })
    .catch(error => {
        console.log(error);
        return;
    });