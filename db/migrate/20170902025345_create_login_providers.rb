class CreateLoginProviders < ActiveRecord::Migration[5.0]
  def change
    create_table :login_providers do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :uid
      t.string :access_token
      t.string :access_token_secret
      t.string :refresh_token
      t.datetime :expires_at

      t.timestamps
    end
  end
end
