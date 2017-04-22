# frozen_string_literal: true
module UrlValidator
  extend ActiveSupport::Concern

  included do
    include ActiveModel::Validations
  end

  def ensure_valid_url
    validates_with Validator
    return false unless valid?
    valid_url = true

    valid_url = @article['error'].present? ||
      @article.parsed_response.nil? ||
      @article.parsed_response.try(:error).present?

    valid_url = @article.parsed_response.present? && !@article.try(:error)
    debugger

    errors[:url] << 'your url suck bitch!' unless valid_url
    return valid_url
  end

  class Validator < ActiveModel::Validator
    def validate(record)
      return record.errors[:url] << 'your url suck bitch!' if record.url.nil?

      begin
        uri = URI.parse(record.url)
        invalid_url = uri.is_a?(URI::HTTP) && !uri.host.nil?
      rescue URI::InvalidURIError
        invalid_url = false
      end
      unless invalid_url
        record.errors[:url] << 'your url suck bitch!'
        false
      end
    end
  end
end
