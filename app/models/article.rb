class Article
  include HTTParty

  base_uri 'https://mercury.postlight.com'

  ALLOWED_TAGS = %w(img p a h1 h2 h3 h4 h5 h6 h7 em i b strong code mark small sub sup ins del)
  ALLOWED_ATTR = %w(href src)

  def initialize(url)
    @header = { headers: { 'x-api-key' => ENV.fetch('MERCURY_API_KEY') } }
    @article = fetch(url)
    @sanitizer = Rails::Html::WhiteListSanitizer.new
  end

  def title
    @article['title']
  end

  def content
    @sanitizer.sanitize(@article["content"], tags: ALLOWED_TAGS, attributes: ALLOWED_ATTR).html_safe
  end

  def author
    @article["author"]
  end

  def date_published
    @article["date_published"]
  end

  def domain
    @article["domain"]
  end

  def min_read
    (Integer(@article["word_count"]) / 200).round
  end

  private

  def fetch(url)
    self.class.get("/parser?url=#{url}", @header)
  end
end
