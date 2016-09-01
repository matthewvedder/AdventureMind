$( document ).ready(function() {
  var map = L.map('mapid', { zoomControl:false }).setView([42.0000, -97.0000], 4.2);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'veddster.0pl6d53m',
      accessToken: 'pk.eyJ1IjoidmVkZHN0ZXIiLCJhIjoiY2lyNzdlanUzMDBza2djbTM1Z2hlYTdnNSJ9.FpydM0KRrrunXzaHJYCmrA'
  }).addTo(map);

  $( window ).on("resize", function() {
      $("#mapid").height($(window).height()).width($(window).width());
      map.invalidateSize();
  }).trigger("resize");

  function getReports() {
    $.ajax({
      dataType: 'text',
      url: '/reports',
      success:function(reports) {
        addReports(reports);
      },
      error:function() {
        alert("Could not load the reports");
      }
    });
  }

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(feature.properties.title + '<hr>' + feature.properties.description);
    }
  }

  function addReports(reports) {
    var geoJsonLayer = L.geoJson(JSON.parse(reports), {
      pointToLayer: function (feature, latlng) {
        var marker = L.marker(latlng, {icon: hikerIcon});
        marker.bindPopup(feature.properties.title + '<hr>' + feature.properties.description).setLatLng(latlng);
        return marker;
      }
    }).addTo(map);
  }

  function createReport(lat,lng,title,description) {
    $.post({
      url: '/reports',
      data: { "lat": lat, "long": lng, "title": title, "description": description },
    })
      .done(function() {
        getReports();
      });
  }

  var popup = L.popup();
  var createReportForm =
    "<form method='post' id='createReportForm'>\
      Title:<br><input type='text' name='title'><br>\
      Report:<br> <input type='text' name='description'>\
      <input class='click' type='submit' name='submit' value='Create a Report'>\
    </form>"

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(createReportForm)
      .openOn(map);
      $("#createReportForm").submit(function(event) {
        event.preventDefault();
        var reportObject = $( this ).serializeArray();
        var properties = setProperties(reportObject);
        createReport(e.latlng.lat, e.latlng.lng, properties[0], properties[1]);
        map.closePopup();
    });
  }

  function setProperties( properties ) {
    var title = properties[0].value;
    var description = properties[1].value;
    return [title, description];
  }


  map.on('click', onMapClick);


  getReports();

  var hikerIcon = L.icon({
    iconUrl: 'http://campflyer.com/media/catalog/category/icon_hiker.png',
    iconSize:     [70, 55],
    iconAnchor:   [40, 50],
    popupAnchor:  [0, -40]
  });

});
