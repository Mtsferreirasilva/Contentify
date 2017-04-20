# frozen_string_literal: true
class ReaderController < ApplicationController
  def index
    reader = Reader.new(reader_params[:url])

    @title = reader.title
    @content = reader.content
    @author = reader.author
    @date_published = reader.date_published
    @domain = reader.domain
    @min_read = reader.min_read
  end

  private

  def reader_params
    params.permit(:url)
  end
end
