var React = require('react');
var ReactDOM = require('react-dom');

var ContentifyReaderError = require('../../src/components/ContentifyReaderError.jsx');

var props = window.PROPS;
ReactDOM.render(
  React.createElement(ContentifyReaderError, props), document
)
