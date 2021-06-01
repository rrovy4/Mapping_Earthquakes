// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
var light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'light-v10',
    tileSize: 512,
    zoomOffset: -1,
    // //opacity: 0.5,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
var dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    //opacity: 0.5,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: light,
    Dark: dark
  };

  // Create the map object with center, zoom level and default layer.
let myMap = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(myMap);

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(myMap);

// Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/rrovy4/Mapping_Earthquakes/main/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/rrovy4/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
     console.log(data);
   // Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Detination: " + feature.properties.dst + "</h3>");
    }
}).addTo(myMap);



//  L.geoJson(data, {
//         onEachFeature: function(feature, layer) {
//             console.log(layer);
//             layer.bindPopup("<h2>" + feature.properties.city + "</h2>");
//         }
//     }).addTo(myMap);

});