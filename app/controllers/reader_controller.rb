# frozen_string_literal: true
class ReaderController < ApplicationController
  def index
    @article = Article.new(reader_params[:url])
  end

  private

  def reader_params
    params.permit(:url)
  end
end
