class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
      t.references :user, foreign_key: true
      t.string :url
      t.jsonb :content, null: false, default: '{}'

      t.timestamps
    end

    add_index :articles, :content, using: :gin
    add_index :articles, :url, unique: true
  end

end
