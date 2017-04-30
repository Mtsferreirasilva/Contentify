class Article < ApplicationRecord
  belongs_to :user, counter_cache: true

  def title
    content["title"]
  end

  def url
    content["url"]
  end

  def min_read
    sanitizer = Rails::Html::FullSanitizer.new
    min = sanitizer.sanitize(content["content"])

    return false if min.nil?

    word_count = min.split(' ').length
    min_read = (word_count / 200).round

    min_read > 0 ? min_read : 1
  end

  def date_published
    return false unless content["date_published"]

    DateTime.parse(content["date_published"]).strftime('%B %d, %Y')
  end

  def domain
    content["domain"]
  end

  def author
    content["author"]
  end

  def lead_image_url
    content["lead_image_url"]
  end

  def short_description
    sanitizer = Rails::Html::FullSanitizer.new
    description = sanitizer.sanitize(content["content"])

    return false if content.nil?

    description[0..500]
  end
end
