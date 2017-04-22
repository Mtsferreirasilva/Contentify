require 'pry-rails'
require 'pry-byebug'

old_prompt = Pry.config.prompt
env = Rails.env.upcase

if Rails.env.development?
  env = Pry::Helpers::Text.green(env)
else
  env = Pry::Helpers::Text.red(env)
end

Pry.config.prompt = [
  proc {|*a| "#{env} #{old_prompt.first.call(*a)}"},
  proc {|*a| "#{env} #{old_prompt.second.call(*a)}"},
]
