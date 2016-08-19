class ReportsController < ApplicationController

  def new
  end

  def index
    @reports = Report.all
    @geojson = []
    geojson = build_geojson(@reports, @geojson)
    render json: geojson
  end

  def create
    Report.create!( user_id: 1, activity:'hiking', lat: params[:lat] ,long: params[:long] )
    head :ok
  end

  def build_geojson(reports, geojson)
    reports.each do |report|
      geojson << Report.parse_as_geojson(report)
      print geojson
    end
    return geojson
  end

  private

    def report_params
      params.permit(:lat, :long)
    end
end
