class MapController < ApplicationController

  def show
  end

  def region
    case params[:region]
    when 'White Mountains'
      [[42.0000, -97.0000], 4.2]
    else
      [[42.0000, -97.0000], 4.2]
    end
  end

  private
    def map_params
      params.permit(:region)
    end
end
