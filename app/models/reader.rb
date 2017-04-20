class Reader
  include HTTParty

  base_uri 'https://mercury.postlight.com'

  ALLOWED_TAGS = %w(img p a h1 h2 h3 h4 h5 h6 h7 em i b strong code mark small sub sup ins del)
  ALLOWED_ATTR = %w(href src)

  def initialize(url)
    @header = { headers: { 'x-api-key' => ENV.fetch('MERCURY_API_KEY') } }
    @reader = fetch(url)
    @sanitizer = Rails::Html::WhiteListSanitizer.new
  end

  def title
    @reader['title']
  end

  def content
    @sanitizer.sanitize(@reader["content"], tags: ALLOWED_TAGS, attributes: ALLOWED_ATTR).html_safe
  end

  def author
    @reader["author"]
  end

  def date_published
    @reader["date_published"]
  end

  def domain
    @reader["domain"]
  end

  def min_read
    (Integer(@reader["word_count"]) / 200).round
  end

  private

  def fetch(url)
    self.class.get("/parser?url=#{url}", @header)
  end
end
