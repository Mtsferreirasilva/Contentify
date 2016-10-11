var React = require('react');
var ContentifyHead = require('./ContentifyHead.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <ContentifyHead title={this.props.title}/>
        <body>
          <h1>Page not Found</h1>
        </body>
      </html>
    );
  }
});
