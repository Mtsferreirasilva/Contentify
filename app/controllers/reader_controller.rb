# frozen_string_literal: true
class ReaderController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:save_article]

  before_action :authenticate_user!, only: [:save_article]
  before_action :set_setting, only: [:index]

  def index
    @url = reader_params[:url]
    @article = ArticleParser.new(@url)
    @show_fab = Article.where(url: @url, user_id: current_user.id).any? if current_user
  end

  def save_article
    article_json = JSON.parse(reader_params[:article])
    article = Article.new(url: article_json["url"], content: article_json, user_id: current_user.id)

    respond_to do |format|
      begin
        article.save
        format.json { render json: { status: "created" } }
      rescue ActiveRecord::RecordNotUnique => exception
        Rails.logger.info "Article already saved for this user: #{exception}..."
      end
      format.json { render json: { status: "unprocessable_entity" } }
    end
  end

  private

  def reader_params
    params.permit(:url, :article)
  end

  def set_setting
    @setting = if current_user
      Setting.find_by(user_id: current_user.id)
    else
      Setting.new(font_size: 'normal', theme: 'light')
    end
  end
end
