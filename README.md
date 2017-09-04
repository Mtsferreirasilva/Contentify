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
BUGSNAG_API_KEY [KEY]
DATABASE_URL [URL]
FACEBOOK_ID [KEY]
FACEBOOK_SECRET [KEY]
LANG = [en_US.UTF-8, ...]
MEMCACHIER_PASSWORD [KEY]
MEMCACHIER_SERVERS [KEY]
MEMCACHIER_USERNAME [KEY]
MERCURY_API_KEY [KEY]
PAPERTRAIL_API_TOKEN [KEY]
RACK_ENV [production|development]
RAILS_ENV [production|development]
RAILS_LOG_TO_STDOUT [enabled|disabled]
RAILS_SERVE_STATIC_FILES [enabled|disabled]
SECRET_KEY_BASE
SHOW_FEATURE [true|false]
```

### Webpack server
`$ ./bin/webpack-dev-server`

### Rails server
`$ rails s`
