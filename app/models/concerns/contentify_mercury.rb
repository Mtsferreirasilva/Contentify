# frozen_string_literal: true
module ContentifyMercury

  ALLOWED_TAGS = %w(img p a h h1 h2 h3 h4 h5 h6 h7 em i b strong code mark small blockquote
                    sub sup ins del pre br ul li span figure label caption iframe)
  ALLOWED_ATTR = %w(href src for id title aria)

  def contentify_content
    sanitizer = Rails::Html::WhiteListSanitizer.new
    content = sanitizer.sanitize(@article["content"], tags: ALLOWED_TAGS, attributes: ALLOWED_ATTR)
    return false if content.strip.empty?

    html_doc = Nokogiri::HTML(content)
    remove_first_image_tag(html_doc)
    fix_incorrect_image_path(html_doc)

    html_doc.to_s.html_safe
  end

  def contentify_date
    DateTime.parse(@article["date_published"]).strftime('%B %d, %Y')
  end

  def contentify_min_read
    sanitizer = Rails::Html::FullSanitizer.new
    content = sanitizer.sanitize(@article["content"])

    return false if content.nil?

    word_count = content.split(' ').length
    min_read = (word_count / 200).round

    min_read > 0 ? min_read : 1
  end

  private

  def remove_first_image_tag(html_doc)
    first_element = html_doc.root.first_element_child.children.first.name
    if first_element == 'figure' || first_element == 'img'
      html_doc.root.first_element_child.children.first.remove
    end
  end

  def fix_incorrect_image_path(html_doc)
    html_doc.children.xpath("//img").each do |img|
      truncate_link = img.attributes['src'].value
      url = URI(truncate_link).scheme + "://" + URI(truncate_link).host + URI(truncate_link).path
      break unless url.scan(/#{url}/).any?

      validating_url = ""
      url.each_char do |char|
        validating_url += char
        break if ["jpg", "png", "gif"].include? validating_url[-3..-1]
        break if "jpeg" == validating_url[-4..1]
      end

      img.attributes['src'].value = validating_url

      invalid_params = URI(truncate_link).query
      break if invalid_params.nil?
      valid_params = "?"

      invalid_params.each_char do |char|
        break if char == ","
        valid_params += char
      end

      img.attributes['src'].value = url + valid_params
    end
  end
end
