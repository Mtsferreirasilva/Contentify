namespace :myapp do

  desc 'Test task that raises an exception'
  task :test_exception do
    raise 'This is a sample exception'
  end

end
