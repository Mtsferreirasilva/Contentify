class CreateSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :settings do |t|
      t.references :user, foreign_key: true
      t.string :font_size
      t.string :theme

      t.timestamps
    end
  end
end
