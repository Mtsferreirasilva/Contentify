class AddIndexToContentUrlAndDomainOnUsers < ActiveRecord::Migration[5.0]
  def change
    execute <<-SQL
      CREATE INDEX user_article_content_url_index ON articles USING GIN ((content->'url'));
      CREATE INDEX user_article_content_domain_index ON articles USING GIN ((content->'domain'));
    SQL
  end
end
