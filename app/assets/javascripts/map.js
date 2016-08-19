$( document ).ready(function() {
  var map = L.map('mapid', { zoomControl:false }).setView([42.0000, -97.0000], 4.2);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'veddster.0pl6d53m',
      accessToken: 'pk.eyJ1IjoidmVkZHN0ZXIiLCJhIjoiY2lyNzdlanUzMDBza2djbTM1Z2hlYTdnNSJ9.FpydM0KRrrunXzaHJYCmrA'
  }).addTo(map);

 // geojsonFeature = getReports();
  //console.log(geojsonFeature.latlng)

  $( window ).on("resize", function() {
      $("#mapid").height($(window).height()).width($(window).width());
      map.invalidateSize();
  }).trigger("resize");

  function getReports() {
    $.ajax({
      dataType: 'text',
      url: '/reports',
      success:function(reports) {
        L.geoJson(JSON.parse(reports)).addTo(map);
      },
      error:function() {
        alert("Could not load the reports");
      }
    });
  }

  function createReport(lat,lng) {
    $.post({
      url: '/reports',
      data: { "lat": lat, "long": lng },
    })
      .done(function() {
        getReports();
      });
  };

  var popup = L.popup();
  var createReportForm =
    "<form method='post' action='createReport' id='createReportForm'>\
      Title:<br><input type='text' title='firstname'><br>\
      Report:<br> <input type='text' name='description'>\
      <input class='click' type='submit' name='submit' value='Create a Report'>\
    </form>"

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(createReportForm)
      .openOn(map)
      $("#createReportForm").submit(function(event) {
        event.preventDefault();
        createReport(e.latlng.lat, e.latlng.lng);
        map.closePopup();
    });
  }


  map.on('click', onMapClick);
    //createReport(e.latlng.lat, e.latlng.lng)


  getReports();

  var hikerIcon = L.icon({
    iconUrl: 'http://campflyer.com/media/catalog/category/icon_hiker.png',
    iconSize:     [70, 55],
    iconAnchor:   [40, 50],
    popupAnchor:  [-100, -76]
  });








  //L.marker(e.latlng, {icon: hikerIcon}).addTo(map);
  //<%= escape_javascript(render('report')) %>


});
