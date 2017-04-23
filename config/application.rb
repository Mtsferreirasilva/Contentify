require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Contentify
  class Application < Rails::Application
    config.exceptions_app = self.routes
  end
end
