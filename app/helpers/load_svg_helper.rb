# frozen_string_literal: true
module LoadSvgHelper
  def svg(path)
    File.open("app/assets/images/#{path}", "r") do |file|
      raw file.read
    end
  end
end
