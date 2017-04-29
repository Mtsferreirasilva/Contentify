# frozen_string_literal: true
class ArticleParser
  include UrlValidator
  include HTTParty

  base_uri 'https://mercury.postlight.com'

  ALLOWED_TAGS = %w(img p a h h1 h2 h3 h4 h5 h6 h7 em i b strong code mark small blockquote
                    sub sup ins del pre br ul li span figure label caption iframe)
  ALLOWED_ATTR = %w(href src for id title aria)

  attr_reader :url

  def initialize(url)
    @url = url
    @header = { headers: { 'x-api-key' => ENV.fetch('MERCURY_API_KEY') } }
    @article = fetch(url)
    ensure_valid_url
  end

  def title
    @article['title']
  end

  def content
    return false unless @article["content"]

    sanitizer = Rails::Html::WhiteListSanitizer.new
    content = sanitizer.sanitize(@article["content"], tags: ALLOWED_TAGS, attributes: ALLOWED_ATTR)

    return false if content.empty?

    # Remove first tag if it is image.
    html_doc = Nokogiri::HTML(content)
    first_element = html_doc.root.first_element_child.children.first.name
    if first_element == 'figure' || first_element == 'img'
      html_doc.root.first_element_child.children.first.remove
    end

    html_doc.to_s.html_safe
  end

  def author
    @article["author"]
  end

  def excerpt
    @article["excerpt"]
  end

  def date_published
    return false unless @article["date_published"]

    DateTime.parse(@article["date_published"]).strftime('%B %d, %Y')
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
