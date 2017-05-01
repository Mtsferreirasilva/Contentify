# frozen_string_literal: true
class ArticleParser
  include UrlValidator
  include HTTParty
  include ContentifyMercury

  base_uri 'https://mercury.postlight.com'

  attr_reader :url
  attr_accessor :article

  def initialize(url)
    @url = url
    @article = {}
    return unless valid_url?(url)

    @article = Rails.cache.fetch(@url)
    return if @article

    @header = { headers: { 'x-api-key' => ENV.fetch('MERCURY_API_KEY') } }
    @article = fetch(url)
    Rails.cache.write("#{@url}", @article.to_h, expires_in: 1.month) if valid_mercury_response?
  end

  def title
    @article['title']
  end

  def content
    return false unless @article["content"]

    contentify_article = contentify_content
    return false unless contentify_article

    article["content"] = contentify_article
  end

  def author
    @article["author"]
  end

  def excerpt
    @article["excerpt"]
  end

  def date_published
    return false unless @article["date_published"]
    @article["date_published"] = contentify_date
  end

  def domain
    @article["domain"]
  end

  def min_read
    sanitizer = Rails::Html::FullSanitizer.new
    content = sanitizer.sanitize(@article["content"])

    return false if content.nil?

    word_count = content.split(' ').length
    min_read = (word_count / 200).round

    min_read > 0 ? min_read : 1
  end

  def lead_image_url
    @article["lead_image_url"]
  end

  private

  def fetch(url)
    self.class.get("/parser?url=#{url}", @header)
  end
end
