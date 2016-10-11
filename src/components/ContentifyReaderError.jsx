var React = require('react');

var ContentifyHead = require('./ContentifyHead.jsx');

module.exports = React.createClass({
  _handleClick: function() {
    alert('VAAi');
  },
  render: function() {
    return (
      <html>
        <ContentifyHead title={this.props.title}/>
        <body>
          <h1>Oops! Something went wrong.</h1>
          <p>{this.props.error}</p>
          <button onClick={this._handleClick}>Click me bitch</button>

          <script dangerouslySetInnerHTML={{
              __html: 'window.PROPS=' + JSON.stringify(this.props)
            }} />
          <script src="javascripts/contentify-reader_error.js"/>
        </body>
      </html>
    );
  }
});
