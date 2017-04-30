# frozen_string_literal: true
class ReaderController < ApplicationController
  before_action :set_session, only: [:save_article]

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
      end
      format.html { redirect_to request.referer, notice: 'Article already saved!' }
      format.json { render json: exception, status: :unprocessable_entity }
    end
  end

  private

  def reader_params
    params.permit(:url, :article)
  end

  def set_session
    session["user_return_to"] = request.referer
    authenticate_user! unless user_signed_in?
  end
end
