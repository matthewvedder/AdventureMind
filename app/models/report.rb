class Report < ApplicationRecord
  belongs_to :user
  validates_presence_of :activity, :lat, :long

  def self.parse_as_geojson(report)
   {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [report.long.to_f, report.lat.to_f]
      },
      properties: {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
      }
    }
  end
end

