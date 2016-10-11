var React = require('react');
var ReactDOM = require('react-dom');

var ContentifyReader = require('../../src/components/ContentifyReader.jsx');

var props = window.PROPS;
ReactDOM.render(
  React.createElement(ContentifyReader, props), document
)
