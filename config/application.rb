require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Contentify
  class Application < Rails::Application
    config.assets.paths << Rails.root.join("app", "assets", "fonts")
  end
end
