class AddTitleDescriptionImageToReports < ActiveRecord::Migration[5.0]
  def change
    add_column :reports, :title, :string
    add_column :reports, :description, :string
    add_column :reports, :image, :string
    add_reference :reports, :region, foreign_key: true
  end
end
