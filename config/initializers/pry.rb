if Rails.env.development? || Rails.env.test?
  require 'pry-rails'
  require 'pry-byebug'
else
  old_prompt = Pry.config.prompt
  env = Pry::Helpers::Text.red(Rails.env.upcase)
  Pry.config.prompt = [
    proc {|*a| "#{env} #{old_prompt.first.call(*a)}"},
    proc {|*a| "#{env} #{old_prompt.second.call(*a)}"},
  ]
end
