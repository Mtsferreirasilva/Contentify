# frozen_string_literal: true
class HomepageController < ApplicationController
  def index
    @brand_link = request.protocol + request.url
    @extension_url = 'https://chrome.google.com/webstore/detail/contentify/amfoahkobkpngjhnofkneikkcodeeldb?hl=en-US'
  end
end
