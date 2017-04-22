# Show red environment name in pry prompt for non development environments
unless Rails.env.development?
  require 'pry-rails'
  require 'pry-byebug'
  
  old_prompt = Pry.config.prompt
  env = Pry::Helpers::Text.red(Rails.env.upcase)
  Pry.config.prompt = [
    proc {|*a| "#{env} #{old_prompt.first.call(*a)}"},
    proc {|*a| "#{env} #{old_prompt.second.call(*a)}"},
  ]
end
