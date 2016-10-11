var path = require('path');

module.exports = {
  context: path.resolve(__dirname + "/src/javascript-bundle"),
  entry: {
    reader: './reader.js',
    reader_error: './reader_error.js'
  },
  output: {
    filename: 'contentify-[name].js',
    path: 'public/javascripts'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      }
    ]
  }
};
