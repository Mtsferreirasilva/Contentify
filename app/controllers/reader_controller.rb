# frozen_string_literal: true
class ReaderController < ApplicationController
  ALLOWED_TAGS = %w(img p a h1 h2 h3 h4 h5 h6 h7 em i b strong code mark small sub sup ins del)
  ALLOWED_ATTR = %w(href src)

  def index
    reader = Reader.new.page(reader_params[:url])
    sanitizer = Rails::Html::WhiteListSanitizer.new

    @title = reader["title"].html_safe
    @content = sanitizer.sanitize(reader["content"], tags: ALLOWED_TAGS, attributes: ALLOWED_ATTR).html_safe
  end

  private

  def reader_params
    params.permit(:url)
  end
end
