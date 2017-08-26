# Contentify

## Services

[![heroku](http://i.imgur.com/5VVREDx.png)](https://dashboard.heroku.com/apps/contentify/metrics/web)
[![cloudflare](http://i.imgur.com/JJJy6Gb.png)](https://www.cloudflare.com/a/overview/contentify.io)
[![bugsnag](http://i.imgur.com/Ti8ASGe.png)](https://app.bugsnag.com/contentify/contentify/)
[![mercury](http://i.imgur.com/rPtygA2.png)](https://mercury.postlight.com/web-parser/)
[![analytics](http://i.imgur.com/oIRDSl1.png)](https://analytics.google.com/analytics/web/#report/defaultid/a28701911w144310886p148973418/)

## Development

Rails Version: 5.0.2

### Enviorment Variables
Add all the credentials to `.env`
```
BUGSNAG_API_KEY
DATABASE_URL
FACEBOOK_ID
FACEBOOK_SECRET
GOOGLE_ID
GOOGLE_SECRET
LANG
MEMCACHIER_PASSWORD
MEMCACHIER_SERVERS
MEMCACHIER_USERNAME
MERCURY_API_KEY
PAPERTRAIL_API_TOKEN
RACK_ENV
RAILS_ENV
RAILS_LOG_TO_STDOUT
RAILS_SERVE_STATIC_FILES
SECRET_KEY_BASE
SHOW_FEATURE
```

### Webpack server 
`$ ./bin/webpack-dev-server`

### Rails server 
`$ rails s`
