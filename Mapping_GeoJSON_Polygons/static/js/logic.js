// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    // //opacity: 0.5,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
var satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'satellite-streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    //opacity: 0.5,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Street": streets,
    "Satellite Streets": satelliteStreets
  };

  // Create the map object with center, zoom level and default layer.
let myMap = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(myMap);

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(myMap);

// Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/rrovy4/Mapping_Earthquakes/main/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
// let torontoData = "https://raw.githubusercontent.com/rrovy4/Mapping_Earthquakes/main/torontoRoutes.json";

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/rrovy4/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
    color: "blue",
    weight: 1,
    fillColor: "yellow",
    opacity: 0.5

}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
     console.log(data);
   // Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
     style: myStyle,
     onEachFeature: function(feature, layer) {
         layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
     }
}).addTo(myMap);



//  L.geoJson(data, {
//         onEachFeature: function(feature, layer) {
//             console.log(layer);
//             layer.bindPopup("<h2>" + feature.properties.city + "</h2>");
//         }
//     }).addTo(myMap);

});