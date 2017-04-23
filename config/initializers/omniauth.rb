Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV.fetch('GOOGLE_ID'), ENV.fetch('GOOGLE_SECRET')
end
