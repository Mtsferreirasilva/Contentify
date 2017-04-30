# frozen_string_literal: true
class ReaderController < ApplicationController
  before_action :authenticate_user!, only: [:save_article]

  def index
    @url = reader_params[:url]
    @article = ArticleParser.new(@url)
  end

  def save_article
    article_json = JSON.parse(reader_params[:article])
    article = Article.new(url: reader_params[:url], content: article_json, user_id: current_user.id)

    @url = reader_params[:url]
    @article = ArticleParser.new(@url)

    respond_to do |format|
      begin
        article.save
        format.html { redirect_to request.referer, notice: 'Article was successfully saved!' }
        format.json { render :index, status: :created }
      rescue ActiveRecord::RecordNotUnique => exception
        Rails.logger.info "Article already saved for this user: #{exception}..."
        Bugsnag.notify(exception) if Rails.env.production?
        format.html { render :index, notice: 'Article already saved!' }
        format.json { render json: exception, status: :unprocessable_entity }
      end
    end
  end

  private

  def reader_params
    params.permit(:url, :article)
  end
end
