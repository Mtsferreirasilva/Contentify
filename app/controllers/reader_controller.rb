# frozen_string_literal: true
class ReaderController < ApplicationController
  def index
    @url = reader_params[:url]
    @article = Article.new(@url)
  end

  private

  def reader_params
    params.permit(:url)
  end
end
