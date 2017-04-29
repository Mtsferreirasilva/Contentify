# frozen_string_literal: true
class ReaderController < ApplicationController
  before_action :authenticate_user!, only: [:save_article]

  def index
    @url = reader_params[:url]
    @article = ArticleParser.new(@url)
  end

  def save_article
    # Handle authentication
    article = JSON.parse(reader_params[:article])
    binding.pry
    current_user.articles.create(content: article)
    @url = reader_params[:url]
    @article = ArticleParser.new(reader_params[:url])
    # render js response instead
    render :index
  end

  private

  def reader_params
    params.permit(:url, :article)
  end
end
