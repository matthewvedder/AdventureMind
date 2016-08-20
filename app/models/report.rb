class Report < ApplicationRecord
  belongs_to :user
  validates_presence_of :activity, :lat, :long, :description

  def self.parse_as_geojson(report)
   {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [report.long.to_f, report.lat.to_f]
      },
      "properties": {
        "title": report.title,
        "description": report.description
      }
    }
  end
end

