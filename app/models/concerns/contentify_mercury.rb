# frozen_string_literal: true
module ContentifyMercury

  ALLOWED_TAGS = %w(img p a h h1 h2 h3 h4 h5 h6 h7 em i b strong code mark small blockquote
                    sub sup ins del pre br ul li span figure label caption iframe)
  ALLOWED_ATTR = %w(href src for id title aria)

  def contentify_content
    sanitizer = Rails::Html::WhiteListSanitizer.new
    content = sanitizer.sanitize(@article["content"], tags: ALLOWED_TAGS, attributes: ALLOWED_ATTR)
    return false if content.strip.empty?

    remove_first_image_tag(content)
  end

  def contentify_date
    DateTime.parse(@article["date_published"]).strftime('%B %d, %Y')
  end

  private

  def remove_first_image_tag(content)
    html_doc = Nokogiri::HTML(content)
    first_element = html_doc.root.first_element_child.children.first.name
    if first_element == 'figure' || first_element == 'img'
      html_doc.root.first_element_child.children.first.remove
    end

    html_doc.to_s.html_safe
  end
end
