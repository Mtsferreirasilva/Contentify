var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <head>
        <meta charset="UTF-8" />
        <title>{this.props.title}</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#212121" />
        <meta name="description" content="THIS IS THE DESCRIPTION... DO YOU LIKE IT?" />

        <link rel="stylesheet" href="stylesheets/style.css" />
      </head>
    );
  }
});
