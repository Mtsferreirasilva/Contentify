# frozen_string_literal: true
module UrlValidator
  extend ActiveSupport::Concern

  included do
    validates_with Validator
  end

  class Validator < ActiveModel::Validator
    def validate(record)
      return record.errors[:url] << 'your url suck bitch!' if record.url.nil?
      begin
        uri = URI.parse(record.url)
        response = uri.is_a?(URI::HTTP) && !uri.host.nil?
      rescue URI::InvalidURIError
        response = false
      end
      unless response
        record.errors[:url] << 'your url suck bitch!'
      end
    end
  end
end
