# frozen_string_literal: true
module UrlValidator
  extend ActiveSupport::Concern

  included do
    include ActiveModel::Validations
  end

  def valid_url?(url)
    errors[:url] << 'your url is empty ma friend' if url.blank?
    return false if url.blank?

    begin
      uri = URI.parse(url)
      url_valid = uri.is_a?(URI::HTTP) && !uri.host.nil?
    rescue URI::InvalidURIError
      url_valid = false
    end
    errors[:url] << 'your url suck bitch!' unless url_valid
    url_valid
  end

  def valid_mercury_response
    url_valid = nil
    if @article.nil? || @article['error'].present?
      url_valid = false
    elsif @article.present?
      url_valid = true
    else
      url_valid true
    end
    errors[:url] << 'your url suck bitch!' unless url_valid
    url_valid
  end
end
