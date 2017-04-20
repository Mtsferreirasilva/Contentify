# frozen_string_literal: true
module UrlValidator
  extend ActiveSupport::Concern

  included do
    include ActiveModel::Validations
  end

  def ensure_valid_url
    validates_with Validator
    return unless valid?

    invalid_url = @article.parsed_response.nil? || @article.parsed_response['error']
    return errors[:url] << 'your url suck bitch!' if invalid_url
  end

  class Validator < ActiveModel::Validator
    def validate(record)
      return record.errors[:url] << 'your url suck bitch!' if record.url.nil?

      begin
        uri = URI.parse(record.url)
        uri.is_a?(URI::HTTP) && !uri.host.nil?
      rescue URI::InvalidURIError
        record.errors[:url] << 'your url suck bitch!'
      end
    end
  end
end
