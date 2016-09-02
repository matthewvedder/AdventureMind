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
        "description": report.description,
        "activity": report.activity,
        "created_at": report.created_at.strftime("Created On %B %d, %Y")
      }
    }
  end
end

