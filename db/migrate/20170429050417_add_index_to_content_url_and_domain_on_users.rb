class AddIndexToContentUrlAndDomainOnUsers < ActiveRecord::Migration[5.0]
  def change
    execute <<-SQL
      CREATE INDEX user_article_content_url_index ON articles ((content->>'url'));
      CREATE INDEX user_article_content_domain_index ON articles ((content->>'domain'));
    SQL
  end
end
