

var EarthquakeURL= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(EarthquakeURL, function(data){
  // console.log(data)
  createFeatures(data.features)
})

function createFeatures(earthquakeData){
  function onEachFeature(feature, layer){
    layer.bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h3>Magnitude: " + feature.properties.mag + "</h3> <hr> <h3>Significance: " + feature.properties.sig + "</h3>")
  }


var EarthquakeMap = L.geoJSON(earthquakeData, {
  pointToLayer: function(feature, latlng){
    return L.circleMarker(latlng, {
      radius: markerSize(feature.properties.mag),
      fillColor: colorRange(feature.properties.mag),
      weight: .5,
      color: "white",
      fillOpacity: .75
    })
  },
  onEachFeature: onEachFeature
})

createMap(EarthquakeMap);
}

function createMap(overallMap){
  var colorMap= L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1Ijoia3Jpc3RpbmU4NDgiLCJhIjoiY2s4Z21oa2ZoMDA4djNscDYzMjNvdGZjbiJ9.DKAa-ogtf-BHizt58jXFHg"
})


var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: "pk.eyJ1Ijoia3Jpc3RpbmU4NDgiLCJhIjoiY2s4Z21oa2ZoMDA4djNscDYzMjNvdGZjbiJ9.DKAa-ogtf-BHizt58jXFHg"
})

var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3,
  layers: [colorMap, dark, overallMap]
});
  
var baseMaps ={
  "Color Map": colorMap,
  "Dark Map": dark
}

var overlayMaps ={
  "Earthquakes": overallMap
}

L.control.layers(baseMaps, overlayMaps).addTo(myMap)
}

var baseMaps ={
  "Color Map": colorMap
}

var overlayMaps ={
  "Earthquakes": overallMap
}

L.control.layers(baseMaps, overlayMaps).addTo(myMap)

function colorRange(magnituge) {
    
  switch (true) {
    case magnituge >= 5.0:
      return '#BF1D00';
      break;
  
    case magnituge >= 4.0:
      return '#C6BB00';
      break;
    
    case magnituge >= 3.0:
      return '#00D21B';
      break;
  
    case magnituge >= 2.0:
      return '#0097DD';
      break;
  
    case magnituge >= 1.0:
      return '#1800E5';
      break;
  
    default:
      return '#00D570';
  };
  };
  
  // Reflect the earthquake magnitude
  function markerSize(magnituge) {
    return magnituge*4;
  };




  
