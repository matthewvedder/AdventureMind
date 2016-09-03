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
        var marker = L.marker(latlng, {icon: whichIcon(feature.properties.activity)});
        marker.bindPopup('<h4>' + feature.properties.title + '</h4>' + '<p>' + feature.properties.created_at + '<p>' + '<hr>' + feature.properties.description).setLatLng(latlng);
        return marker;
      }
    });
    var markers = L.markerClusterGroup();
    markers.addLayer(geoJsonLayer);
    markers.addTo(map);
  }

  function createReport(lat, lng, title, description, activity) {
    $.post({
      url: '/reports',
      data: { "lat": lat, "long": lng, "activity": activity, "title": title, "description": description }
    })
      .done(function() {
        getReports();
      });
  }

  var popup = L.popup();
  var createReportForm =
    '<form method="post" id="createReportForm">\
      <label for="type">Report Type:</label>\
      <select class="form-control" name="activity">\
        <option value="trail">Trail</option>\
        <option value="climbing">Climbing</option>\
        <option value="skiing">Skiing</option>\
        <option value="paddling">Paddling</option>\
        <option value="access">Access</option>\
        <option value="avalanche">Avalanche</option>\
        <option value="wildlife">Wildlife</option>\
        <option value="incident">Incident</option>\
      </select>\
      <strong>Title</strong>:<br><input type="text" name="title"><br>\
      <div class="form-group">\
        <label for="description">Report:</label>\
        <textarea class="form-control" name="description"></textarea>\
      </div>\
      <input class="click" type="submit" name="submit" value="Create a Report">\
    </form>'

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(createReportForm)
      .openOn(map);
      $("#createReportForm").submit(function(event) {
        event.preventDefault();
        var reportObject = $( this ).serializeArray();
        var properties = setProperties(reportObject);
        createReport(e.latlng.lat, e.latlng.lng, properties[0], properties[1], properties[2]);
        map.closePopup();
    });
  }

  function setProperties( properties ) {
    var title = properties[1].value;
    var description = properties[2].value;
    var activity = properties[0].value;
    return [title, description, activity];
  }


  map.on('click', onMapClick);


  getReports();

  function whichIcon(activity) {
    var iconUrl = '';
    switch(activity) {
      case "hiking":
        iconUrl = 'http://campflyer.com/media/catalog/category/icon_hiker.png';
        break;
      case "climbing":
        iconUrl = "https://d30y9cdsu7xlg0.cloudfront.net/png/529-200.png";
        break;
      case "skiing":
        iconUrl = "https://cdn2.iconfinder.com/data/icons/sports-attitudes/1451/skying-512.png";
        break;
      case "avalanche":
        iconUrl = "https://cdn0.iconfinder.com/data/icons/natural-disasters/512/avalanche-512.png";
        break;
      case "access":
        iconUrl = "http://www.stevenscreektrail.org/images/alert_icon.png";
        break;
      case "wildlife":
        iconUrl = "https://cdn0.iconfinder.com/data/icons/animal-traces/128/wolf_one_paw-512.png";
        break;
      case "paddling":
        iconUrl = "https://cdn4.iconfinder.com/data/icons/sports-i/92/21-512.png";
        break;
      default:
        iconUrl = 'http://campflyer.com/media/catalog/category/icon_hiker.png';
    }

    var icon = L.icon({
      iconUrl: iconUrl,
      iconSize:     [55],
      iconAnchor:   [40, 50],
      popupAnchor:  [0, -40]
    });
    return icon;
  }
});
