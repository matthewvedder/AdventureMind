class AddFieldsToReports < ActiveRecord::Migration[5.0]
  def change
    add_column :reports, :lat, :string
    add_column :reports, :lon, :string
    add_reference :reports, :user, foreign_key: true
  end
end
