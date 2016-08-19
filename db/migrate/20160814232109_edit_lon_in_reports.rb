class EditLonInReports < ActiveRecord::Migration[5.0]
  def change
    remove_column :reports, :lon, :string
    add_column :reports, :long, :string
  end
end
