# frozen_string_literal: true
module LoadSvgHelper
  def svg(path)
    begin
      File.open("app/assets/images/#{path}", "r") do |file|
        raw file.read
      end
    rescue Errno::ENOENT
      puts "Could not load svg: #{path}"
    end
  end
end
